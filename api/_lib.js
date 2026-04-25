import { ImapFlow } from 'imapflow'
import nodemailer from 'nodemailer'

export const ALLOWED_DOMAIN = '@afolaray.com'
export const IMAP_HOST = 'mail.privateemail.com'
export const SMTP_HOST = 'mail.privateemail.com'
export const PAGE_SIZE = 30

// Namecheap Private Email (cPanel/Dovecot) uses different folder names depending
// on account setup — try the most common variants in order.
const FOLDER_ALIASES = {
  Sent:   ['Sent', 'Sent Messages', 'Sent Items', 'INBOX.Sent'],
  Spam:   ['Spam', 'Junk', 'INBOX.Spam', 'INBOX.Junk'],
  Trash:  ['Trash', 'Deleted Messages', 'Deleted Items', 'INBOX.Trash'],
  Drafts: ['Drafts', 'Draft', 'INBOX.Drafts'],
}

// Opens the best-matching mailbox and returns { lock, folder: actualName }
export async function openMailbox(client, folder) {
  const candidates = FOLDER_ALIASES[folder] ?? [folder]
  for (const name of candidates) {
    try {
      const lock = await client.getMailboxLock(name)
      return { lock, folder: name }
    } catch {}
  }
  throw new Error(`Mailbox not found: ${folder}`)
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
