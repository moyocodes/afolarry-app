import { guard, mkSmtp, isAuthError } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, to, subject, html, text, inReplyTo, references } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const transport = mkSmtp(email, password)
  const mail = { from: email, to, subject, html: html || text, text }
  if (inReplyTo)  mail.inReplyTo  = inReplyTo
  if (references) mail.references = references

  try {
    await transport.sendMail(mail)
    return res.json({ success: true })
  } catch (err) {
    if (isAuthError(err) || err?.responseCode === 535) {
      return res.status(401).json({ error: 'Wrong email or password' })
    }
    return res.status(500).json({ error: err.message || 'SMTP error' })
  }
}
