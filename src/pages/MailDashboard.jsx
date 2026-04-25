import { useState, useEffect, useRef, useCallback } from 'react'

async function api(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

const callList = (body) => api('/api/mail-list', body)
const callGet  = (body) => api('/api/mail-get',  body)
const callSend = (body) => api('/api/mail-send', body)

const F      = "'Sora', sans-serif"
const BLUE   = '#1565c0'
const DARK   = '#0d1b2e'
const GRAY   = '#5a7599'
const BG     = '#f7faff'
const BORDER = '#dce8f7'

function fmtDate(iso) {
  if (!iso) return ''
  const d   = new Date(iso)
  const now = new Date()
  if (d.toDateString() === now.getDate().toString() ||
      now.toDateString() === d.toDateString()) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  if (now - d < 7 * 86400000) {
    return d.toLocaleDateString([], { weekday: 'short' })
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function addrName(addr) {
  if (!addr) return 'Unknown'
  return addr.name || addr.address || 'Unknown'
}

const inp = {
  padding: '12px 14px', border: `1px solid ${BORDER}`, borderRadius: '10px',
  fontFamily: F, fontSize: '13px', outline: 'none',
  background: BG, color: DARK, width: '100%', boxSizing: 'border-box',
}

const btn = (primary) => ({
  background: primary ? BLUE : 'none',
  color: primary ? '#fff' : GRAY,
  border: primary ? 'none' : `1px solid ${BORDER}`,
  padding: '10px 22px', borderRadius: '8px',
  fontFamily: F, fontSize: '13px', fontWeight: primary ? 700 : 400,
  cursor: 'pointer',
})

// ─────────────────────────────────────────────────────────────────────────────

export default function MailDashboard() {
  const [creds, setCreds] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('afl_mail') || 'null') }
    catch { return null }
  })

  const [emails,      setEmails]      = useState([])
  const [stats,       setStats]       = useState({ total: 0, unseen: 0 })
  const [page,        setPage]        = useState(1)
  const [loadingList, setLoadingList] = useState(false)
  const [selected,    setSelected]    = useState(null)
  const [loadingMsg,  setLoadingMsg]  = useState(false)
  const [replyOpen,   setReplyOpen]   = useState(false)
  const [replyBody,   setReplyBody]   = useState('')
  const [sending,     setSending]     = useState(false)
  const [error,       setError]       = useState(null)
  const [mobile,      setMobile]      = useState(window.innerWidth < 768)
  const [mobileView,  setMobileView]  = useState('list')

  // Login form
  const [lEmail,   setLEmail]   = useState('')
  const [lPass,    setLPass]    = useState('')
  const [lLoading, setLLoading] = useState(false)
  const [lError,   setLError]   = useState(null)

  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const fetchList = useCallback(async (c, p) => {
    setLoadingList(true)
    setError(null)
    try {
      const data = await callList({ email: c.email, password: c.password, page: p })
      setEmails(p === 1 ? data.emails : prev => [...prev, ...data.emails])
      setStats({ total: data.total, unseen: data.unseen })
      setPage(p)
    } catch (e) {
      setError(e.message || 'Failed to load inbox')
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    if (creds) fetchList(creds, 1)
  }, [creds, fetchList])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!lEmail.endsWith('@afolaray.com')) {
      setLError('Use your @afolaray.com work email')
      return
    }
    setLLoading(true)
    setLError(null)
    try {
      const { data } = await callList({ email: lEmail, password: lPass, page: 1 })
      const c = { email: lEmail, password: lPass }
      sessionStorage.setItem('afl_mail', JSON.stringify(c))
      setCreds(c)
      setEmails(data.emails)
      setStats({ total: data.total, unseen: data.unseen })
    } catch (e) {
      setLError(
        e.message?.includes('Wrong') || e.message?.includes('auth')
          ? 'Wrong email or password'
          : (e.message || 'Login failed')
      )
    } finally {
      setLLoading(false)
    }
  }

  const openEmail = async (email) => {
    setSelected(null)
    setLoadingMsg(true)
    setReplyOpen(false)
    setReplyBody('')
    setError(null)
    if (mobile) setMobileView('email')
    try {
      const data = await callGet({ email: creds.email, password: creds.password, uid: email.uid })
      setSelected(data)
      setEmails(prev => prev.map(e => e.uid === email.uid ? { ...e, seen: true } : e))
      if (!email.seen) setStats(p => ({ ...p, unseen: Math.max(0, p.unseen - 1) }))
    } catch (e) {
      setError(e.message || 'Failed to load email')
    } finally {
      setLoadingMsg(false)
    }
  }

  const sendReply = async () => {
    if (!replyBody.trim() || !selected) return
    setSending(true)
    setError(null)
    try {
      const replyTo = selected.from?.[0]?.address
      const subj    = selected.subject?.startsWith('Re:') ? selected.subject : `Re: ${selected.subject}`
      const refs    = [selected.references, selected.messageId].filter(Boolean).join(' ')
      await callSend({
        email:     creds.email,
        password:  creds.password,
        to:        replyTo,
        subject:   subj,
        html: `<div style="font-family:sans-serif">${replyBody.replace(/\n/g, '<br/>')}</div>
               <br/><hr style="border:none;border-top:1px solid #eee"/>
               <blockquote style="border-left:3px solid #ccc;margin:0;padding-left:14px;color:#666">
                 ${selected.html || `<pre>${selected.text || ''}</pre>`}
               </blockquote>`,
        text:      replyBody,
        inReplyTo: selected.messageId,
        references: refs || undefined,
      })
      setReplyBody('')
      setReplyOpen(false)
    } catch (e) {
      setError(e.message || 'Failed to send reply')
    } finally {
      setSending(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem('afl_mail')
    setCreds(null)
    setEmails([])
    setSelected(null)
    setError(null)
  }

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!creds) {
    return (
      <div style={{
        minHeight: '100vh', background: BG, fontFamily: F,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}>
        <div style={{
          background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '20px',
          padding: '2.5rem 2rem', width: '100%', maxWidth: '400px',
          boxShadow: '0 24px 60px rgba(21,101,192,0.08)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontWeight: 800, fontSize: '22px', color: DARK }}>Afolaray Mail</div>
            <div style={{ fontSize: '13px', color: GRAY, fontWeight: 300, marginTop: '5px' }}>
              Sign in with your work email
            </div>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email" placeholder="you@afolaray.com"
              value={lEmail} onChange={e => setLEmail(e.target.value)}
              required style={inp}
            />
            <input
              type="password" placeholder="Password"
              value={lPass} onChange={e => setLPass(e.target.value)}
              required style={inp}
            />
            {lError && (
              <div style={{ color: '#c62828', fontSize: '12px', fontWeight: 500 }}>{lError}</div>
            )}
            <button type="submit" disabled={lLoading} style={{
              ...btn(true), padding: '13px', width: '100%', marginTop: '4px',
              cursor: lLoading ? 'not-allowed' : 'pointer',
              opacity: lLoading ? 0.7 : 1,
            }}>
              {lLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const showList    = !mobile || mobileView === 'list'
  const showContent = !mobile || mobileView === 'email'

  // ── Mail dashboard ────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: F, overflow: 'hidden' }}>

      {/* Header */}
      <div style={{
        height: '56px', flexShrink: 0, background: '#fff',
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '12px',
      }}>
        <span style={{ fontWeight: 800, fontSize: '16px', color: DARK, flexGrow: 1 }}>
          Afolaray Mail
        </span>
        {stats.unseen > 0 && (
          <span style={{
            background: BLUE, color: '#fff', borderRadius: '999px',
            padding: '2px 10px', fontSize: '11px', fontWeight: 700,
          }}>
            {stats.unseen} unread
          </span>
        )}
        {!mobile && (
          <span style={{ fontSize: '12px', color: GRAY }}>{creds.email}</span>
        )}
        <button onClick={logout} style={{
          background: 'none', border: `1px solid ${BORDER}`, borderRadius: '8px',
          padding: '6px 14px', fontFamily: F, fontSize: '12px', cursor: 'pointer', color: GRAY,
        }}>
          Sign out
        </button>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        {showList && (
          <div style={{
            width: mobile ? '100%' : '340px',
            flexShrink: 0,
            borderRight: mobile ? 'none' : `1px solid ${BORDER}`,
            overflowY: 'auto',
            background: BG,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              padding: '13px 16px', borderBottom: `1px solid ${BORDER}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
            }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: DARK }}>Inbox</span>
              <span style={{ fontSize: '11px', color: GRAY }}>{stats.total} messages</span>
            </div>

            {loadingList && emails.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>Loading…</div>
            ) : emails.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>No emails</div>
            ) : (
              emails.map(email => (
                <EmailRow
                  key={email.uid}
                  email={email}
                  active={selected?.uid === email.uid}
                  onClick={() => openEmail(email)}
                />
              ))
            )}

            {emails.length < stats.total && (
              <button
                onClick={() => fetchList(creds, page + 1)}
                disabled={loadingList}
                style={{
                  margin: '12px 16px', background: 'none', border: `1px solid ${BORDER}`,
                  borderRadius: '8px', padding: '10px', fontFamily: F,
                  fontSize: '12px', cursor: 'pointer', color: GRAY,
                }}
              >
                {loadingList ? 'Loading…' : 'Load more'}
              </button>
            )}
          </div>
        )}

        {/* Email content */}
        {showContent && (
          <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: '#fff' }}>

            {mobile && (
              <button onClick={() => setMobileView('list')} style={{
                background: 'none', border: 'none', borderBottom: `1px solid ${BORDER}`,
                padding: '12px 16px', fontFamily: F, fontSize: '13px',
                cursor: 'pointer', color: BLUE, textAlign: 'left', flexShrink: 0,
              }}>
                ← Inbox
              </button>
            )}

            {loadingMsg ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>Loading…</div>
            ) : !selected ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>
                Select an email to read
              </div>
            ) : (
              <EmailView
                email={selected}
                replyOpen={replyOpen}
                replyBody={replyBody}
                sending={sending}
                error={error}
                onReplyOpen={() => setReplyOpen(true)}
                onReplyChange={setReplyBody}
                onSend={sendReply}
                onCancel={() => { setReplyOpen(false); setReplyBody('') }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Email list row ────────────────────────────────────────────────────────────

function EmailRow({ email, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '13px 16px',
        borderBottom: `1px solid ${BORDER}`,
        cursor: 'pointer',
        background: active ? '#eaf4ff' : 'transparent',
        borderLeft: active ? `3px solid ${BLUE}` : '3px solid transparent',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <span style={{
          fontWeight: email.seen ? 400 : 700, fontSize: '13px', color: DARK,
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
        }}>
          {addrName(email.from)}
        </span>
        <span style={{ fontSize: '11px', color: GRAY, flexShrink: 0 }}>
          {fmtDate(email.date)}
        </span>
      </div>
      <div style={{
        fontSize: '12px', color: email.seen ? GRAY : DARK,
        fontWeight: email.seen ? 300 : 500,
        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '3px',
      }}>
        {email.subject}
      </div>
      {!email.seen && (
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE, marginTop: '5px' }} />
      )}
    </div>
  )
}

// ── Full email view ───────────────────────────────────────────────────────────

function EmailView({ email, replyOpen, replyBody, sending, error, onReplyOpen, onReplyChange, onSend, onCancel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

      {/* Email header */}
      <div style={{ padding: '1.5rem 2rem', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: 'clamp(16px,3vw,20px)', fontWeight: 800, color: DARK, lineHeight: 1.3 }}>
          {email.subject}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <MetaRow label="From" val={`${email.from?.[0]?.name ? email.from[0].name + ' ' : ''}<${email.from?.[0]?.address ?? ''}>`} />
          <MetaRow label="To"   val={email.to?.map(t => t.address).join(', ')} />
          {email.cc?.length > 0 && (
            <MetaRow label="Cc" val={email.cc.map(t => t.address).join(', ')} />
          )}
          <MetaRow label="Date" val={email.date ? new Date(email.date).toLocaleString() : ''} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1 }}>
        <EmailBody html={email.html} text={email.text} />
      </div>

      {/* Attachments */}
      {email.attachments?.length > 0 && (
        <div style={{ padding: '1rem 2rem', borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: GRAY, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Attachments
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {email.attachments.map((a, i) => (
              <div key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '7px 12px', fontSize: '12px', color: DARK }}>
                {a.filename} ({(a.size / 1024).toFixed(1)} KB)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply area */}
      <div style={{ padding: '1.25rem 2rem 2rem', borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
        {error && (
          <div style={{ color: '#c62828', fontSize: '12px', marginBottom: '10px' }}>{error}</div>
        )}
        {!replyOpen ? (
          <button onClick={onReplyOpen} style={btn(true)}>Reply</button>
        ) : (
          <div>
            <div style={{ fontSize: '12px', color: GRAY, marginBottom: '8px' }}>
              To: {email.from?.[0]?.address}
            </div>
            <textarea
              value={replyBody}
              onChange={e => onReplyChange(e.target.value)}
              placeholder="Write your reply…"
              rows={6}
              style={{
                width: '100%', border: `1px solid ${BORDER}`, borderRadius: '10px',
                padding: '12px', fontFamily: F, fontSize: '13px', resize: 'vertical',
                outline: 'none', boxSizing: 'border-box', color: DARK,
              }}
            />
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button
                onClick={onSend}
                disabled={sending || !replyBody.trim()}
                style={{
                  ...btn(true),
                  cursor: sending || !replyBody.trim() ? 'not-allowed' : 'pointer',
                  opacity: sending || !replyBody.trim() ? 0.7 : 1,
                }}
              >
                {sending ? 'Sending…' : 'Send Reply'}
              </button>
              <button onClick={onCancel} style={btn(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sandboxed HTML email renderer ─────────────────────────────────────────────

function EmailBody({ html, text }) {
  const ref = useRef()
  const body = html || `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${text ?? ''}</pre>`
  const doc  = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
    <style>body{font-family:sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;margin:24px;word-break:break-word;}
    img{max-width:100%;height:auto;}a{color:#1565c0;}</style>
    </head><body>${body}</body></html>`

  return (
    <iframe
      ref={ref}
      sandbox="allow-same-origin"
      srcDoc={doc}
      style={{ width: '100%', border: 'none', minHeight: '300px', display: 'block' }}
      onLoad={e => {
        try {
          const h = e.target.contentDocument?.body?.scrollHeight
          if (h) e.target.style.height = (h + 48) + 'px'
        } catch {}
      }}
    />
  )
}

function MetaRow({ label, val }) {
  return (
    <div style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.5 }}>
      <span style={{ color: GRAY, width: '36px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: DARK, wordBreak: 'break-word' }}>{val}</span>
    </div>
  )
}
