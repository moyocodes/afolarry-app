import { guard, mkImap, PAGE_SIZE, isAuthError, openMailbox } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, page = 1, folder = 'INBOX' } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const client = mkImap(email, password)
  try {
    await client.connect()

    const isStarred = folder === 'Starred'
    const rawFolder = isStarred ? 'INBOX' : folder

    const { lock, folder: actualFolder } = await openMailbox(client, rawFolder)
    try {
      if (isStarred) {
        const uids = await client.search({ flagged: true })
        if (!uids.length) return res.json({ emails: [], total: 0, unseen: 0, page: 1 })

        const emails = []
        for await (const msg of client.fetch(uids, {
          uid: true, flags: true, envelope: true,
        }, { uid: true })) {
          emails.push({
            uid:       msg.uid,
            seen:      msg.flags.has('\\Seen'),
            starred:   true,
            from:      msg.envelope.from?.[0]  ?? null,
            subject:   msg.envelope.subject    ?? '(no subject)',
            date:      msg.envelope.date?.toISOString() ?? null,
            messageId: msg.envelope.messageId  ?? null,
          })
        }
        return res.json({ emails: emails.reverse(), total: emails.length, unseen: 0, page: 1 })
      }

      // Use client.mailbox.exists instead of STATUS on the selected mailbox
      // (calling STATUS on the currently selected mailbox violates RFC 3501)
      const total = client.mailbox.exists ?? 0
      const unseen = folder === 'INBOX'
        ? (await client.search({ seen: false })).length
        : 0

      if (total === 0) return res.json({ emails: [], total: 0, unseen: 0, page, folder: actualFolder })

      const hi = total - (page - 1) * PAGE_SIZE
      const lo = Math.max(1, hi - PAGE_SIZE + 1)

      const emails = []
      for await (const msg of client.fetch(`${lo}:${hi}`, {
        uid: true, flags: true, envelope: true,
      })) {
        emails.push({
          uid:       msg.uid,
          seen:      msg.flags.has('\\Seen'),
          starred:   msg.flags.has('\\Flagged'),
          from:      msg.envelope.from?.[0]  ?? null,
          subject:   msg.envelope.subject    ?? '(no subject)',
          date:      msg.envelope.date?.toISOString() ?? null,
          messageId: msg.envelope.messageId  ?? null,
        })
      }

      return res.json({ emails: emails.reverse(), total, unseen, page, folder: actualFolder })
    } finally { lock.release() }
  } catch (err) {
    if (isAuthError(err)) return res.status(401).json({ error: 'Wrong email or password' })
    return res.status(500).json({ error: err.message || 'IMAP error' })
  } finally {
    await client.logout().catch(() => {})
  }
}
