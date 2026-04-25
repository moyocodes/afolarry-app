import { simpleParser } from 'mailparser'
import { guard, mkImap, isAuthError } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, uid } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const client = mkImap(email, password)
  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')
    try {
      await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true })

      let result = null
      for await (const msg of client.fetch(
        { uid },
        { uid: true, flags: true, source: true },
        { uid: true }
      )) {
        const p = await simpleParser(msg.source)
        result = {
          uid:         msg.uid,
          from:        p.from?.value      ?? [],
          to:          p.to?.value        ?? [],
          cc:          p.cc?.value        ?? [],
          subject:     p.subject          ?? '(no subject)',
          date:        p.date?.toISOString() ?? null,
          messageId:   p.messageId        ?? null,
          inReplyTo:   p.inReplyTo        ?? null,
          references:  Array.isArray(p.references)
                         ? p.references.join(' ')
                         : (p.references ?? null),
          html:        p.html             ?? null,
          text:        p.text             ?? null,
          attachments: (p.attachments ?? []).map(a => ({
            filename:    a.filename,
            contentType: a.contentType,
            size:        a.size,
          })),
        }
      }

      return res.json(result)
    } finally { lock.release() }
  } catch (err) {
    if (isAuthError(err)) return res.status(401).json({ error: 'Wrong email or password' })
    return res.status(500).json({ error: err.message || 'IMAP error' })
  } finally {
    await client.logout().catch(() => {})
  }
}
