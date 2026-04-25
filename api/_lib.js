import { ImapFlow } from 'imapflow'
import nodemailer from 'nodemailer'

export const ALLOWED_DOMAIN = '@afolaray.com'
export const IMAP_HOST = 'mail.privateemail.com'
export const SMTP_HOST = 'mail.privateemail.com'
export const PAGE_SIZE = 30

// RFC 6154 special-use flags
const SPECIAL_USE_FLAG = {
  Sent:   '\\Sent',
  Spam:   '\\Junk',
  Trash:  '\\Trash',
  Drafts: '\\Drafts',
}

// First name in each list is used when auto-creating a missing folder
const FOLDER_CREATE_NAME = {
  Sent:   'Sent',
  Spam:   'Junk',
  Trash:  'Trash',
  Drafts: 'Drafts',
}

// Opens the best-matching mailbox and returns { lock, folder: actualName }.
//
// Namecheap/cPanel Dovecot servers often use the INBOX. namespace prefix so
// LIST "" "*" only returns INBOX. We therefore scan four patterns to catch
// every possible layout, then fall back to auto-creating the folder.
export async function openMailbox(client, folder) {
  // 1. Try direct open with common names (fastest path, no extra round-trip)
  const directNames = {
    Sent:   ['Sent', 'INBOX.Sent', 'Sent Messages', 'Sent Items'],
    Spam:   ['Junk', 'Spam', 'INBOX.Junk', 'INBOX.Spam', 'Junk Mail'],
    Trash:  ['Trash', 'INBOX.Trash', 'Deleted', 'Deleted Messages'],
    Drafts: ['Drafts', 'INBOX.Drafts'],
  }
  for (const name of directNames[folder] ?? [folder]) {
    try {
      const lock = await client.getMailboxLock(name)
      return { lock, folder: name }
    } catch {}
  }

  // 2. Discover via multi-pattern LIST (handles INBOX. namespace and others)
  const settled = await Promise.allSettled([
    client.list('', '*'),       // root namespace
    client.list('', '%'),       // root immediate children
    client.list('INBOX', '*'),  // INBOX sub-namespace (no dot)
    client.list('INBOX.', '*'), // INBOX. sub-namespace (with dot)
  ])
  const seen = new Set()
  const all = settled
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .filter(m => !seen.has(m.path) && seen.add(m.path))

  const flag  = SPECIAL_USE_FLAG[folder]
  const lower = folder.toLowerCase()
  const match =
    (flag  && all.find(m => m.flags?.has(flag))) ||
    all.find(m => m.path.toLowerCase() === lower) ||
    all.find(m => m.path.toLowerCase().endsWith('.' + lower)) ||
    all.find(m => m.path.toLowerCase().includes(lower)) ||
    (folder === 'Spam'  && all.find(m => m.path.toLowerCase().includes('junk'))) ||
    (folder === 'Trash' && all.find(m => /deleted|trash/i.test(m.path)))

  if (match) {
    try {
      const lock = await client.getMailboxLock(match.path)
      return { lock, folder: match.path }
    } catch {}
  }

  // 3. Auto-create the folder — Dovecot allows this and it fixes fresh accounts
  const createName = FOLDER_CREATE_NAME[folder] ?? folder
  try {
    await client.mailboxCreate(createName)
    const lock = await client.getMailboxLock(createName)
    return { lock, folder: createName }
  } catch {}

  const available = all.map(m => m.path).join(', ') || 'none found'
  throw new Error(`Mailbox "${folder}" not found. Server returned: ${available}`)
}

export function guard(email) {
  if (!email?.endsWith(ALLOWED_DOMAIN)) {
    const err = new Error('Only @afolaray.com accounts are permitted')
    err.status = 403
    throw err
  }
}

export function mkImap(user, pass) {
  return new ImapFlow({
    host: IMAP_HOST,
    port: 993,
    secure: true,
    auth: { user, pass },
    logger: false,
  })
}

export function mkSmtp(user, pass) {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: 465,
    secure: true,
    auth: { user, pass },
  })
}

export function isAuthError(err) {
  const msg = err?.message ?? ''
  return err?.authenticationFailed || /auth|login|credentials|password/i.test(msg)
}
