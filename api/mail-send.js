import 'dotenv/config'
import { Resend } from 'resend'
import { guard } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, to, cc, subject, html, text, inReplyTo, references, attachments } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(500).json({ error: 'RESEND_API_KEY environment variable is not set' })

  const resend = new Resend(key)

  const toArr = typeof to === 'string'
    ? to.split(',').map(s => s.trim()).filter(Boolean)
    : (Array.isArray(to) ? to : [])

  const payload = {
    from: email,
    to:   toArr,
    subject,
    html: html || `<pre style="font-family:sans-serif;white-space:pre-wrap">${text ?? ''}</pre>`,
    text: text ?? '',
    ...(cc ? { cc: cc.split(',').map(s => s.trim()).filter(Boolean) } : {}),
    ...(inReplyTo || references ? {
      headers: {
        ...(inReplyTo  ? { 'In-Reply-To': inReplyTo  } : {}),
        ...(references ? { 'References':  references  } : {}),
      },
    } : {}),
    ...(attachments?.length ? {
      attachments: attachments.map(a => ({
        filename: a.filename,
        content:  Buffer.from(a.content, 'base64'),
      })),
    } : {}),
  }

  try {
    const { data, error } = await resend.emails.send(payload)
    if (error) return res.status(400).json({ error: error.message })
    return res.json({ success: true, id: data?.id })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Send failed' })
  }
}
