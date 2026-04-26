import 'dotenv/config'
import { guard, mkImap, isAuthError, openMailbox } from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, uid, action, folder = 'INBOX' } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  if (!uid)    return res.status(400).json({ error: 'uid is required' })
  if (!action) return res.status(400).json({ error: 'action is required' })

  const client = mkImap(email, password)
  try {
    await client.connect()
    const { lock, folder: actualFolder } = await openMailbox(client, folder)
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
          if (/trash|deleted/i.test(actualFolder)) {
            // Already in trash — permanently delete
            await client.messageDelete({ uid }, { uid: true })
          } else {
            // Move to Trash; fall back to permanent delete if move fails
            try {
              const { lock: trashLock, folder: trashFolder } = await openMailbox(
                // We need the trash path — look it up via openMailbox on a temp client
                // to avoid re-using the locked client. Instead, attempt move directly.
                client, 'Trash'
              )
              // openMailbox would steal the lock — release first, then move
              trashLock.release()
              await client.messageMove({ uid }, trashFolder, { uid: true })
            } catch {
              await client.messageDelete({ uid }, { uid: true })
            }
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