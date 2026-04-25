import { ImapFlow } from 'imapflow'
import nodemailer from 'nodemailer'

export const ALLOWED_DOMAIN = '@afolaray.com'
export const IMAP_HOST = 'mail.privateemail.com'
export const SMTP_HOST = 'mail.privateemail.com'
export const PAGE_SIZE = 30

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
