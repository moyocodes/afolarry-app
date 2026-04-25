import { ImapFlow } from 'imapflow'
import nodemailer from 'nodemailer'

export const ALLOWED_DOMAIN = '@afolaray.com'
export const IMAP_HOST = 'mail.privateemail.com'
export const SMTP_HOST = 'mail.privateemail.com'
export const PAGE_SIZE = 30

// Common name guesses per virtual folder name
const FOLDER_ALIASES = {
  Sent:   ['Sent', 'Sent Messages', 'Sent Items', 'INBOX.Sent'],
  Spam:   ['Spam', 'Junk', 'INBOX.Spam', 'INBOX.Junk', 'Junk Mail', 'Bulk Mail'],
  Trash:  ['Trash', 'Deleted Messages', 'Deleted Items', 'INBOX.Trash', 'Deleted'],
  Drafts: ['Drafts', 'Draft', 'INBOX.Drafts'],
}

// RFC 6154 special-use flags — server tags folders with these regardless of name
const SPECIAL_USE_FLAG = {
  Sent:   '\\Sent',
  Spam:   '\\Junk',
  Trash:  '\\Trash',
  Drafts: '\\Drafts',
}

// Opens the best-matching mailbox and returns { lock, folder: actualName }.
// Strategy:
//   1. Try known name aliases
//   2. List all folders, find by RFC 6154 special-use flag (most reliable)
//   3. Fuzzy name match as last resort
export async function openMailbox(client, folder) {
  // 1. Try name aliases
  for (const name of FOLDER_ALIASES[folder] ?? [folder]) {
    try {
      const lock = await client.getMailboxLock(name)
      return { lock, folder: name }
    } catch {}
  }

  // 2 & 3. Discover via folder listing
  const all = await client.list()
  const flag = SPECIAL_USE_FLAG[folder]
  const lower = folder.toLowerCase()

  const match =
    // special-use flag match (e.g. \Junk regardless of folder name)
    (flag && all.find(m => m.flags?.has(flag))) ||
    // exact path match
    all.find(m => m.path.toLowerCase() === lower) ||
    // path contains the virtual name (e.g. "INBOX.Junk" contains "junk" for Spam)
    all.find(m => m.path.toLowerCase().includes(lower)) ||
    // for Spam specifically also try junk in any path
    (folder === 'Spam' && all.find(m => m.path.toLowerCase().includes('junk'))) ||
    (folder === 'Trash' && all.find(m => m.path.toLowerCase().includes('deleted')))

  if (match) {
    const lock = await client.getMailboxLock(match.path)
    return { lock, folder: match.path }
  }

  const available = all.map(m => m.path).join(', ')
  throw new Error(`Mailbox "${folder}" not found. Available: ${available}`)
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
