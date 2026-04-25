import { guard, mkImap, isAuthError } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, uid, action, folder = 'INBOX' } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  const client = mkImap(email, password)
  try {
    await client.connect()
    const lock = await client.getMailboxLock(folder)
    try {
      switch (action) {
        case 'star':
          await client.messageFlagsAdd({ uid }, ['\\Flagged'], { uid: true })
          break
        case 'unstar':
          await client.messageFlagsRemove({ uid }, ['\\Flagged'], { uid: true })
          break
        case 'markRead':
          await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true })
          break
        case 'markUnread':
          await client.messageFlagsRemove({ uid }, ['\\Seen'], { uid: true })
          break
        case 'delete':
          if (folder === 'Trash') {
            await client.messageDelete({ uid }, { uid: true })
          } else {
            await client.messageMove({ uid }, 'Trash', { uid: true })
          }
          break
        default:
          return res.status(400).json({ error: 'Unknown action' })
      }
      return res.json({ success: true })
    } finally { lock.release() }
  } catch (err) {
    if (isAuthError(err)) return res.status(401).json({ error: 'Wrong email or password' })
    return res.status(500).json({ error: err.message || 'IMAP error' })
  } finally {
    await client.logout().catch(() => {})
  }
}
