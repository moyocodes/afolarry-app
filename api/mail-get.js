import { simpleParser } from 'mailparser'
import { guard, mkImap, isAuthError, openMailbox } from './_lib.js'

const ATTACH_LIMIT = 5 * 1024 * 1024 // include content up to 5 MB

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password, uid, folder = 'INBOX' } = req.body ?? {}

  try { guard(email) } catch (e) {
    return res.status(403).json({ error: e.message })
  }

  // FIX: validate uid before attempting any IMAP operation
  if (!uid) return res.status(400).json({ error: 'uid is required' })

  const client = mkImap(email, password)
  try {
    await client.connect()
    const { lock } = await openMailbox(client, folder)
    try {
      // Don't mark-as-read for Sent — those are already read
      if (folder !== 'Sent') {
        await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true })
      }

      let result = null
      for await (const msg of client.fetch(
        { uid },
        { uid: true, flags: true, source: true },
        { uid: true }
      )) {
        const p = await simpleParser(msg.source)

        // Build cid→dataURI map for inline images embedded in the HTML body
        const cidMap = {}
        for (const att of p.attachments ?? []) {
          if (att.cid && att.content) {
            cidMap[att.cid] = `data:${att.contentType};base64,${att.content.toString('base64')}`
          }
        }

        let html = p.html || null
        if (html && Object.keys(cidMap).length) {
          html = html.replace(/cid:([^"'\s>]+)/g, (_, cid) => cidMap[cid] ?? `cid:${cid}`)
        }

        result = {
          uid:        msg.uid,
          from:       p.from?.value      ?? [],
          to:         p.to?.value        ?? [],
          cc:         p.cc?.value        ?? [],
          subject:    p.subject          ?? '(no subject)',
          date:       p.date?.toISOString() ?? null,
          messageId:  p.messageId        ?? null,
          inReplyTo:  p.inReplyTo        ?? null,
          references: Array.isArray(p.references)
                        ? p.references.join(' ')
                        : (p.references ?? null),
          html,
          text:       p.text             ?? null,
          // Exclude inline embedded images (cid attachments) from the list
          attachments: (p.attachments ?? [])
            .filter(a => !a.cid)
            .map(a => ({
              filename:    a.filename || 'attachment',
              contentType: a.contentType,
              size:        a.size,
              // Include base64 content so the browser can preview/download
              content:     a.content && a.size <= ATTACH_LIMIT
                             ? a.content.toString('base64')
                             : null,
            })),
        }
      }

      if (!result) return res.status(404).json({ error: 'Message not found' })
      return res.json(result)
    } finally { lock.release() }
  } catch (err) {
    if (isAuthError(err)) return res.status(401).json({ error: 'Wrong email or password' })
    return res.status(500).json({ error: err.message || 'IMAP error' })
  } finally {
    await client.logout().catch(() => {})
  }
}