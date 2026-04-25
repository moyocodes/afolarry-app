import { guard, mkSmtp, isAuthError } from './_lib.js'

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, to, cc, subject, html, text, inReplyTo, references, attachments } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const transport = mkSmtp(email, password)
  const mail = { from: email, to, subject, html: html || text, text }
  if (cc)         mail.cc         = cc
  if (inReplyTo)  mail.inReplyTo  = inReplyTo
  if (references) mail.references = references
  if (attachments?.length) {
    mail.attachments = attachments.map(a => ({
      filename:    a.filename,
      content:     Buffer.from(a.content, 'base64'),
      contentType: a.contentType,
    }))
  }

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
