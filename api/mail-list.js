import { guard, mkImap, PAGE_SIZE, isAuthError } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, page = 1 } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const client = mkImap(email, password)
  try {
    await client.connect()
    const lock = await client.getMailboxLock('INBOX')
    try {
      const st = await client.status('INBOX', { messages: true, unseen: true })
      const total = st.messages ?? 0
      const unseen = st.unseen ?? 0

      if (total === 0) return res.json({ emails: [], total: 0, unseen: 0, page })

      const hi = total - (page - 1) * PAGE_SIZE
      const lo = Math.max(1, hi - PAGE_SIZE + 1)

      const emails = []
      for await (const msg of client.fetch(`${lo}:${hi}`, {
        uid: true, flags: true, envelope: true,
      })) {
        emails.push({
          uid:       msg.uid,
          seen:      msg.flags.has('\\Seen'),
          from:      msg.envelope.from?.[0]  ?? null,
          subject:   msg.envelope.subject    ?? '(no subject)',
          date:      msg.envelope.date?.toISOString() ?? null,
          messageId: msg.envelope.messageId  ?? null,
        })
      }

      return res.json({ emails: emails.reverse(), total, unseen, page })
    } finally { lock.release() }
  } catch (err) {
    if (isAuthError(err)) return res.status(401).json({ error: 'Wrong email or password' })
    return res.status(500).json({ error: err.message || 'IMAP error' })
  } finally {
    await client.logout().catch(() => {})
  }
}
