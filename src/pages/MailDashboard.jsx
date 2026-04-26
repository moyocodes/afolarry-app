import { useState, useEffect, useRef, useCallback } from 'react'
import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import {
  Inbox, Send, Star, Trash2, PenSquare, Calendar, LogOut,
  Search, RefreshCw, Reply, Forward, ChevronLeft, MailOpen,
  ShieldAlert, X, ChevronRight, Bell, Eye, EyeOff, Paperclip, Download,
} from 'lucide-react'

// ─── API ─────────────────────────────────────────────────────────────────────

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

const callList   = b => api('/api/mail-list',   b)
const callGet    = b => api('/api/mail-get',    b)
const callSend   = b => api('/api/mail-send',   b)
const callAction = b => api('/api/mail-action', b)

// ─── Constants ───────────────────────────────────────────────────────────────

const F    = "'Sora', sans-serif"
const DARK = '#0d1b2e'
const BLUE = '#1565c0'
const GRAY = '#5a7599'
const BDR  = '#e2eaf5'

const S = {
  bg:         '#0d1b2e',
  text:       'rgba(255,255,255,0.58)',
  active:     'rgba(255,255,255,1)',
  activeBg:   'rgba(21,101,192,0.42)',
  hover:      'rgba(255,255,255,0.07)',
  divider:    'rgba(255,255,255,0.08)',
}

const FOLDERS = [
  { id: 'INBOX',   label: 'Inbox',   Icon: Inbox,       canDelete: true  },
  { id: 'Sent',    label: 'Sent',    Icon: Send,        canDelete: false },
  { id: 'Starred', label: 'Starred', Icon: Star,        canDelete: true  },
  { id: 'Spam',    label: 'Spam',    Icon: ShieldAlert, canDelete: true  },
  { id: 'Trash',   label: 'Trash',   Icon: Trash2,      canDelete: true  },
]

const iStyle = {
  padding: '11px 14px', border: `1px solid ${BDR}`, borderRadius: '10px',
  fontFamily: F, fontSize: '13px', outline: 'none',
  background: '#f4f7fb', color: DARK, width: '100%', boxSizing: 'border-box',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso), now = new Date()
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (now - d < 7 * 86400000)
    return d.toLocaleDateString([], { weekday: 'short' })
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function addrName(a) {
  if (!a) return 'Unknown'
  return a.name || a.address || 'Unknown'
}

function blankCompose(overrides = {}) {
  return { to: '', cc: '', showCc: false, subject: '', body: '', inReplyTo: null, references: null, attachments: [], ...overrides }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MailDashboard() {
  const [creds, setCreds] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('afl_mail') || 'null') } catch { return null }
  })

  const [folder,       setFolder]       = useState('INBOX')
  const [emails,       setEmails]       = useState([])
  const [stats,        setStats]        = useState({ total: 0, unseen: 0 })
  const [page,         setPage]         = useState(1)
  const [loadingList,  setLoadingList]  = useState(false)
  const [selected,     setSelected]     = useState(null)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [panel,        setPanel]        = useState('list') // 'list'|'email'|'compose'
  const [compose,      setCompose]      = useState(blankCompose())
  const [sending,      setSending]      = useState(false)
  const [search,       setSearch]       = useState('')
  const [reminders,    setReminders]    = useState(() => {
    try { return JSON.parse(localStorage.getItem('afl_reminders') || '[]') } catch { return [] }
  })
  const [showCal,     setShowCal]      = useState(false)
  const [remModal,    setRemModal]     = useState(null)   // { date: Date }
  const [remForm,     setRemForm]      = useState({ title: '', note: '', time: '09:00' })
  const [error,       setError]        = useState(null)
  const [sentOk,      setSentOk]       = useState(false)
  const [mobile,      setMobile]       = useState(window.innerWidth < 900)
  const [mobPage,     setMobPage]      = useState('list') // mobile: 'list'|'email'|'compose'

  // Login form
  const [lEmail, setLEmail] = useState('')
  const [lPass,  setLPass]  = useState('')
  const [lLoad,  setLLoad]  = useState(false)
  const [lErr,   setLErr]   = useState(null)

  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 900)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => {
    localStorage.setItem('afl_reminders', JSON.stringify(reminders))
  }, [reminders])

  // Reminder notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default')
      Notification.requestPermission()
    const t = setInterval(() => {
      setReminders(prev => prev.map(r => {
        if (!r.fired && new Date(r.datetime) <= new Date()) {
          if (Notification.permission === 'granted')
            new Notification('⏰ ' + r.title, { body: r.note || '' })
          return { ...r, fired: true }
        }
        return r
      }))
    }, 60000)
    return () => clearInterval(t)
  }, [])

  const fetchList = useCallback(async (c, f, p) => {
    setLoadingList(true); setError(null)
    try {
      const data = await callList({ email: c.email, password: c.password, folder: f, page: p })
      setEmails(p === 1 ? data.emails : prev => [...prev, ...data.emails])
      setStats({ total: data.total, unseen: data.unseen })
      setPage(p)
    } catch (e) { setError(e.message) }
    finally { setLoadingList(false) }
  }, [])

  useEffect(() => { if (creds) fetchList(creds, folder, 1) }, [creds, folder, fetchList])

  const handleLogin = async e => {
    e.preventDefault()
    if (!lEmail.endsWith('@afolaray.com')) { setLErr('Use your @afolaray.com work email'); return }
    setLLoad(true); setLErr(null)
    try {
      const data = await callList({ email: lEmail, password: lPass, folder: 'INBOX', page: 1 })
      const c = { email: lEmail, password: lPass }
      sessionStorage.setItem('afl_mail', JSON.stringify(c))
      setCreds(c); setEmails(data.emails); setStats({ total: data.total, unseen: data.unseen })
      // Also sign into Firebase so Cars admin access works
      signInWithEmailAndPassword(auth, lEmail, lPass).catch(() => {})
    } catch (e) {
      setLErr(e.message?.includes('Wrong') ? 'Wrong email or password' : e.message || 'Login failed')
    } finally { setLLoad(false) }
  }

  const openEmail = async email => {
    setSelected(null); setLoadingEmail(true); setError(null)
    setPanel('email'); if (mobile) setMobPage('email')
    try {
      const data = await callGet({ email: creds.email, password: creds.password, uid: email.uid, folder })
      setSelected(data)
      setEmails(prev => prev.map(e => e.uid === email.uid ? { ...e, seen: true } : e))
      if (!email.seen) setStats(p => ({ ...p, unseen: Math.max(0, p.unseen - 1) }))
    } catch (e) { setError(e.message) }
    finally { setLoadingEmail(false) }
  }

  const doAction = async (uid, action) => {
    const f = folder === 'Starred' ? 'INBOX' : folder
    try {
      await callAction({ email: creds.email, password: creds.password, uid, action, folder: f })
      if (action === 'delete') {
        setEmails(prev => prev.filter(e => e.uid !== uid))
        if (selected?.uid === uid) { setSelected(null); setPanel('list'); setMobPage('list') }
      }
      if (action === 'star' || action === 'unstar') {
        const starred = action === 'star'
        setEmails(prev => prev.map(e => e.uid === uid ? { ...e, starred } : e))
        if (selected?.uid === uid) setSelected(s => ({ ...s, starred }))
      }
      if (action === 'markUnread') {
        setEmails(prev => prev.map(e => e.uid === uid ? { ...e, seen: false } : e))
        setStats(p => ({ ...p, unseen: p.unseen + 1 }))
        if (selected?.uid === uid) { setSelected(null); setPanel('list'); setMobPage('list') }
      }
    } catch (e) { setError(e.message) }
  }

  const openCompose = (opts = {}) => {
    setCompose(blankCompose(opts)); setPanel('compose'); if (mobile) setMobPage('compose')
  }

  const replyTo = (all = false) => {
    if (!selected) return
    const to = all
      ? [...(selected.from?.map(a => a.address) || []), ...(selected.to?.map(a => a.address) || [])]
          .filter(a => a !== creds.email).join(', ')
      : selected.from?.[0]?.address || ''
    openCompose({
      to, subject: selected.subject?.startsWith('Re:') ? selected.subject : `Re: ${selected.subject}`,
      body: `\n\n────────────────\nOn ${new Date(selected.date).toLocaleString()}, ${selected.from?.[0]?.address} wrote:\n\n${selected.text || ''}`,
      inReplyTo: selected.messageId,
      references: [selected.references, selected.messageId].filter(Boolean).join(' '),
    })
  }

  const forwardEmail = () => {
    if (!selected) return
    openCompose({
      subject: selected.subject?.startsWith('Fwd:') ? selected.subject : `Fwd: ${selected.subject}`,
      body: `\n\n────────────────\n---------- Forwarded message ----------\nFrom: ${selected.from?.[0]?.address}\nDate: ${new Date(selected.date).toLocaleString()}\nSubject: ${selected.subject}\n\n${selected.text || ''}`,
    })
  }

  const sendEmail = async () => {
    if (!compose.to.trim() || !compose.subject.trim()) return
    setSending(true); setError(null)
    try {
      await callSend({
        email: creds.email, password: creds.password,
        to: compose.to, subject: compose.subject,
        html: `<div style="font-family:sans-serif;white-space:pre-wrap">${compose.body.replace(/\n/g, '<br/>')}</div>`,
        text: compose.body,
        ...(compose.inReplyTo   ? { inReplyTo:   compose.inReplyTo   } : {}),
        ...(compose.references  ? { references:  compose.references  } : {}),
        ...(compose.cc.trim()   ? { cc:          compose.cc          } : {}),
        ...(compose.attachments?.length ? { attachments: compose.attachments } : {}),
      })
      setPanel('list'); setMobPage('list'); setCompose(blankCompose())
      setSentOk(true); setTimeout(() => setSentOk(false), 4000)
    } catch (e) { setError(e.message) }
    finally { setSending(false) }
  }

  const logout = () => {
    sessionStorage.removeItem('afl_mail')
    fbSignOut(auth).catch(() => {})
    setCreds(null); setEmails([]); setSelected(null); setError(null)
  }

  const saveReminder = () => {
    if (!remModal || !remForm.title.trim()) return
    const [h, m] = remForm.time.split(':')
    const dt = new Date(remModal.date); dt.setHours(+h, +m, 0, 0)
    setReminders(prev => [...prev, { id: Date.now(), title: remForm.title, note: remForm.note, datetime: dt.toISOString(), fired: false }])
    setRemModal(null); setRemForm({ title: '', note: '', time: '09:00' })
  }

  const deleteReminder = id => setReminders(prev => prev.filter(r => r.id !== id))

  const filtered = search.trim()
    ? emails.filter(e => addrName(e.from).toLowerCase().includes(search.toLowerCase()) || e.subject?.toLowerCase().includes(search.toLowerCase()))
    : emails

  const upcoming = reminders.filter(r => !r.fired && new Date(r.datetime) > new Date())
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).slice(0, 4)

  const folderMeta = FOLDERS.find(f => f.id === folder) || FOLDERS[0]

  // ── Login ─────────────────────────────────────────────────────────────────
  if (!creds) return (
    <div style={{ minHeight: '100vh', background: '#f4f7fb', fontFamily: F, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', border: `1px solid ${BDR}`, borderRadius: '20px', padding: '2.5rem 2rem', width: '100%', maxWidth: '400px', boxShadow: '0 24px 60px rgba(21,101,192,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Afolaray" style={{ height: '52px', objectFit: 'contain', marginBottom: '1rem' }} />
          <div style={{ fontWeight: 800, fontSize: '20px', color: DARK }}>Afolaray Mail</div>
          <div style={{ fontSize: '13px', color: GRAY, fontWeight: 300, marginTop: '5px' }}>Sign in with your work email</div>
        </div>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="email" placeholder="you@afolaray.com" value={lEmail} onChange={e => setLEmail(e.target.value)} required style={iStyle} />
          <input type="password" placeholder="Password" value={lPass} onChange={e => setLPass(e.target.value)} required style={iStyle} />
          {lErr && <div style={{ color: '#c62828', fontSize: '12px', fontWeight: 500 }}>{lErr}</div>}
          <button type="submit" disabled={lLoad} style={{ background: BLUE, color: '#fff', border: 'none', padding: '13px', borderRadius: '10px', fontFamily: F, fontSize: '14px', fontWeight: 700, cursor: lLoad ? 'not-allowed' : 'pointer', opacity: lLoad ? 0.7 : 1, marginTop: '4px' }}>
            {lLoad ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )

  const H = '100vh'

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div style={{ height: H, display: 'flex', overflow: 'hidden', fontFamily: F }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      {(!mobile || mobPage === 'list') && (
        <div style={{ width: mobile ? '100%' : '220px', flexShrink: 0, background: S.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Logo */}
          <div style={{ padding: '1.25rem 1rem 0.5rem', flexShrink: 0 }}>
            <img src="/logo.png" alt="Afolaray" style={{ height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          </div>

          {/* Compose */}
          <div style={{ padding: '0.5rem 1rem 0.75rem', flexShrink: 0 }}>
            <button onClick={() => openCompose()} style={{ width: '100%', background: BLUE, color: '#fff', border: 'none', borderRadius: '10px', padding: '11px', fontFamily: F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(21,101,192,0.4)' }}>
              <PenSquare size={14} /> Compose
            </button>
          </div>

          {/* Folders */}
          <nav style={{ padding: '0 0.75rem', flexShrink: 0 }}>
            {FOLDERS.map(({ id, label, Icon }) => {
              const active = folder === id
              const badge  = id === 'INBOX' && stats.unseen > 0 ? stats.unseen : null
              return (
                <button key={id} onClick={() => { setFolder(id); setSelected(null); setSearch(''); if (mobile) setMobPage('email') }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '9px', border: 'none', cursor: 'pointer', background: active ? S.activeBg : 'transparent', color: active ? S.active : S.text, fontFamily: F, fontSize: '13px', fontWeight: active ? 600 : 400, marginBottom: '2px', transition: 'all 0.15s' }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = S.hover }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={14} style={{ flexShrink: 0 }} />
                  <span style={{ flexGrow: 1, textAlign: 'left' }}>{label}</span>
                  {badge && <span style={{ background: BLUE, color: '#fff', borderRadius: '999px', padding: '1px 7px', fontSize: '10px', fontWeight: 700 }}>{badge}</span>}
                </button>
              )
            })}
          </nav>

          <div style={{ height: '1px', background: S.divider, margin: '0.75rem 1rem' }} />

          {/* Reminders toggle */}
          <button onClick={() => setShowCal(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 1.5rem', border: 'none', background: 'transparent', color: showCal ? '#fff' : S.text, fontFamily: F, fontSize: '13px', cursor: 'pointer', width: '100%', flexShrink: 0 }}>
            <Calendar size={14} /><span style={{ flexGrow: 1, textAlign: 'left' }}>Reminders</span>
            {upcoming.length > 0 && <span style={{ background: '#e53935', color: '#fff', borderRadius: '999px', padding: '1px 7px', fontSize: '10px', fontWeight: 700 }}>{upcoming.length}</span>}
          </button>

          {/* Calendar + reminders */}
          {showCal && (
            <div style={{ padding: '0 0.75rem 0.5rem', overflowY: 'auto', flexShrink: 0 }}>
              <MiniCalendar reminders={reminders} onDay={d => setRemModal({ date: d })} />
              <div style={{ marginTop: '8px' }}>
                {upcoming.length === 0
                  ? <div style={{ fontSize: '11px', color: S.text, padding: '8px 4px' }}>No upcoming reminders</div>
                  : upcoming.map(r => (
                    <div key={r.id} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '8px 10px', marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>{r.title}</div>
                        <div style={{ fontSize: '10px', color: S.text, marginTop: '2px' }}>
                          {new Date(r.datetime).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {r.note && <div style={{ fontSize: '10px', color: S.text }}>{r.note}</div>}
                      </div>
                      <button onClick={() => deleteReminder(r.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.text, padding: '0', flexShrink: 0 }}><X size={11} /></button>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          <div style={{ flexGrow: 1 }} />

          {/* Account */}
          <div style={{ borderTop: `1px solid ${S.divider}`, padding: '1rem', flexShrink: 0 }}>
            <div style={{ fontSize: '11px', color: S.text, fontWeight: 300, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{creds.email}</div>
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: S.text, fontFamily: F, fontSize: '12px', cursor: 'pointer', padding: 0 }}>
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      )}

      {/* ══ LIST PANE ════════════════════════════════════════════════════════ */}
      {(!mobile || mobPage === 'email') && !mobile && (
        <div style={{ width: '320px', flexShrink: 0, borderRight: `1px solid ${BDR}`, background: '#f4f7fb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ListPane
            folder={folderMeta} emails={filtered} stats={stats} page={page}
            loading={loadingList} search={search} selected={selected}
            onSearch={setSearch} onOpen={openEmail}
            onRefresh={() => fetchList(creds, folder, 1)}
            onLoadMore={() => fetchList(creds, folder, page + 1)}
          />
        </div>
      )}

      {/* Mobile: list takes full width */}
      {mobile && mobPage === 'email' && (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f4f7fb' }}>
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${BDR}`, display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button onClick={() => setMobPage('list')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, fontFamily: F, fontSize: '13px', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ChevronLeft size={16} /> Folders
            </button>
            <span style={{ fontSize: '13px', fontWeight: 700, color: DARK, flexGrow: 1 }}>{folderMeta.label}</span>
          </div>
          <ListPane
            folder={folderMeta} emails={filtered} stats={stats} page={page}
            loading={loadingList} search={search} selected={selected}
            onSearch={setSearch} onOpen={e => { openEmail(e); setMobPage('compose') }}
            onRefresh={() => fetchList(creds, folder, 1)}
            onLoadMore={() => fetchList(creds, folder, page + 1)}
          />
        </div>
      )}

      {/* ══ CONTENT / COMPOSE PANE ══════════════════════════════════════════ */}
      {(!mobile || mobPage === 'compose') && (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>

          {/* Mobile back */}
          {mobile && (
            <button onClick={() => setMobPage('email')} style={{ background: 'none', border: 'none', borderBottom: `1px solid ${BDR}`, padding: '12px 16px', fontFamily: F, fontSize: '13px', cursor: 'pointer', color: BLUE, textAlign: 'left', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ChevronLeft size={16} /> Back
            </button>
          )}

          {panel === 'compose' ? (
            <ComposePane
              compose={compose} setCompose={setCompose} sending={sending}
              error={error} onSend={sendEmail} onDiscard={() => { setPanel('list'); setCompose(blankCompose()); if (mobile) setMobPage('email') }}
            />
          ) : loadingEmail ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: GRAY, fontSize: '13px' }}>Loading…</div>
          ) : !selected ? (
            <EmptyState onCompose={() => openCompose()} />
          ) : (
            <EmailView
              email={selected} folder={folder}
              onReply={() => replyTo(false)}
              onReplyAll={() => replyTo(true)}
              onForward={forwardEmail}
              onStar={() => doAction(selected.uid, selected.starred ? 'unstar' : 'star')}
              onDelete={() => doAction(selected.uid, 'delete')}
              onMarkUnread={() => doAction(selected.uid, 'markUnread')}
            />
          )}
        </div>
      )}

      {/* Reminder modal */}
      {remModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.75rem', width: '100%', maxWidth: '360px', boxShadow: '0 24px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ fontWeight: 800, fontSize: '16px', color: DARK, marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Add Reminder</span>
              <button onClick={() => setRemModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GRAY }}><X size={18} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Title *" value={remForm.title} onChange={e => setRemForm(p => ({ ...p, title: e.target.value }))} style={iStyle} />
              <input placeholder="Note (optional)" value={remForm.note} onChange={e => setRemForm(p => ({ ...p, note: e.target.value }))} style={iStyle} />
              <input type="time" value={remForm.time} onChange={e => setRemForm(p => ({ ...p, time: e.target.value }))} style={iStyle} />
              <div style={{ fontSize: '12px', color: GRAY }}>
                Date: {remModal.date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={saveReminder} disabled={!remForm.title.trim()} style={{ flex: 1, background: BLUE, color: '#fff', border: 'none', padding: '11px', borderRadius: '9px', fontFamily: F, fontSize: '13px', fontWeight: 700, cursor: remForm.title.trim() ? 'pointer' : 'not-allowed', opacity: remForm.title.trim() ? 1 : 0.6 }}>Save</button>
                <button onClick={() => setRemModal(null)} style={{ flex: 1, background: 'none', border: `1px solid ${BDR}`, padding: '11px', borderRadius: '9px', fontFamily: F, fontSize: '13px', cursor: 'pointer', color: GRAY }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {sentOk && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#2e7d32', color: '#fff', padding: '12px 22px', borderRadius: '10px', fontSize: '13px', fontFamily: F, zIndex: 600, display: 'flex', gap: '10px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}>
          ✓ Email sent successfully
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#c62828', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontSize: '13px', fontFamily: F, zIndex: 600, display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
          {error}
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><X size={14} /></button>
        </div>
      )}
    </div>
  )
}

// ─── List Pane ────────────────────────────────────────────────────────────────

function ListPane({ folder, emails, stats, page, loading, search, selected, onSearch, onOpen, onRefresh, onLoadMore }) {
  return (
    <>
      <div style={{ padding: '12px 12px 8px', flexShrink: 0, borderBottom: `1px solid ${BDR}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 700, fontSize: '13px', color: DARK }}>{folder.label}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {stats.unseen > 0 && <span style={{ background: BLUE, color: '#fff', borderRadius: '999px', padding: '1px 8px', fontSize: '10px', fontWeight: 700 }}>{stats.unseen} unread</span>}
            <button onClick={onRefresh} disabled={loading} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GRAY, padding: '4px', display: 'flex', borderRadius: '6px' }} title="Refresh">
              <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            </button>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: GRAY }} />
          <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search…" style={{ ...iStyle, paddingLeft: '30px', fontSize: '12px', padding: '8px 8px 8px 30px' }} />
        </div>
      </div>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {loading && emails.length === 0
          ? <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>Loading…</div>
          : emails.length === 0
          ? <div style={{ padding: '3rem', textAlign: 'center', color: GRAY, fontSize: '13px' }}>No emails</div>
          : emails.map(e => <EmailRow key={e.uid} email={e} active={selected?.uid === e.uid} onClick={() => onOpen(e)} />)
        }
        {emails.length < stats.total && (
          <button onClick={onLoadMore} disabled={loading} style={{ width: '100%', background: 'none', border: 'none', borderTop: `1px solid ${BDR}`, padding: '12px', fontFamily: F, fontSize: '12px', cursor: 'pointer', color: GRAY }}>
            {loading ? 'Loading…' : 'Load more'}
          </button>
        )}
      </div>
    </>
  )
}

// ─── Email Row ────────────────────────────────────────────────────────────────

function EmailRow({ email, active, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: '13px 14px', borderBottom: `1px solid ${BDR}`, cursor: 'pointer', background: active ? '#e8f1fd' : '#fff', borderLeft: active ? `3px solid ${BLUE}` : '3px solid transparent', transition: 'background 0.12s' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f8faff' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = '#fff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontWeight: email.seen ? 400 : 700, fontSize: '13px', color: DARK, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {addrName(email.from)}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          {email.starred && <Star size={11} fill="#f59e0b" color="#f59e0b" />}
          <span style={{ fontSize: '11px', color: GRAY }}>{fmtDate(email.date)}</span>
        </div>
      </div>
      <div style={{ fontSize: '12px', color: email.seen ? GRAY : DARK, fontWeight: email.seen ? 300 : 500, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '3px' }}>
        {email.subject}
      </div>
      {!email.seen && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: BLUE, marginTop: '5px' }} />}
    </div>
  )
}

// ─── Email View ───────────────────────────────────────────────────────────────

function EmailView({ email, folder, onReply, onReplyAll, onForward, onStar, onDelete, onMarkUnread }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ padding: '10px 1.5rem', borderBottom: `1px solid ${BDR}`, display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, flexWrap: 'wrap' }}>
        <ToolBtn icon={<Reply size={14} />}   label="Reply"       onClick={onReply} />
        <ToolBtn icon={<Reply size={14} style={{ transform: 'scaleX(-1)' }} />} label="Reply All" onClick={onReplyAll} />
        <ToolBtn icon={<Forward size={14} />} label="Forward"     onClick={onForward} />
        <div style={{ width: '1px', height: '20px', background: BDR, margin: '0 2px' }} />
        <ToolBtn icon={<Star size={14} fill={email.starred ? '#f59e0b' : 'none'} color={email.starred ? '#f59e0b' : GRAY} />} label={email.starred ? 'Unstar' : 'Star'} onClick={onStar} />
        <ToolBtn icon={<EyeOff size={14} />} label="Mark unread" onClick={onMarkUnread} />
        {folder !== 'Sent' && <ToolBtn icon={<Trash2 size={14} />} label="Delete" onClick={onDelete} danger />}
      </div>

      {/* Header */}
      <div style={{ padding: '1.5rem 1.75rem 1rem', borderBottom: `1px solid ${BDR}`, flexShrink: 0 }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: 'clamp(15px,2.5vw,20px)', fontWeight: 800, color: DARK, lineHeight: 1.3 }}>{email.subject}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <MetaRow label="From" val={`${email.from?.[0]?.name ? email.from[0].name + ' ' : ''}<${email.from?.[0]?.address ?? ''}>`} />
          <MetaRow label="To"   val={email.to?.map(t => t.address).join(', ')} />
          {email.cc?.length > 0 && <MetaRow label="Cc" val={email.cc.map(t => t.address).join(', ')} />}
          <MetaRow label="Date" val={email.date ? new Date(email.date).toLocaleString() : ''} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <EmailBody html={email.html} text={email.text} />
      </div>

      {/* Attachments */}
      {email.attachments?.length > 0 && (
        <div style={{ padding: '0.75rem 1.75rem 1rem', borderTop: `1px solid ${BDR}`, flexShrink: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: GRAY, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Paperclip size={11} /> Attachments ({email.attachments.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {email.attachments.map((a, i) => <AttachmentChip key={i} a={a} />)}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Attachment Chip ─────────────────────────────────────────────────────────

function AttachmentChip({ a }) {
  const [preview, setPreview] = useState(false)
  const isImage = a.contentType?.startsWith('image/')
  const dataUri = a.content ? `data:${a.contentType};base64,${a.content}` : null

  const download = () => {
    if (!dataUri) return
    const el = document.createElement('a')
    el.href = dataUri
    el.download = a.filename
    el.click()
  }

  return (
    <div>
      {/* Image preview */}
      {isImage && dataUri && preview && (
        <div style={{ marginBottom: '8px' }}>
          <img src={dataUri} alt={a.filename} style={{ maxWidth: '100%', maxHeight: '260px', borderRadius: '8px', border: `1px solid ${BDR}`, display: 'block' }} />
        </div>
      )}
      {/* Chip row */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f4f7fb', border: `1px solid ${BDR}`, borderRadius: '9px', padding: '7px 12px' }}>
        <Paperclip size={13} color={GRAY} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: DARK, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.filename}</span>
        <span style={{ fontSize: '11px', color: GRAY, whiteSpace: 'nowrap' }}>({(a.size / 1024).toFixed(0)} KB)</span>
        {isImage && dataUri && (
          <button onClick={() => setPreview(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, fontSize: '11px', fontFamily: F, padding: '0 2px', whiteSpace: 'nowrap' }}>
            {preview ? 'Hide' : 'Preview'}
          </button>
        )}
        {dataUri ? (
          <button onClick={download} title="Download" style={{ background: 'none', border: 'none', cursor: 'pointer', color: BLUE, display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontFamily: F, padding: '0 2px', whiteSpace: 'nowrap' }}>
            <Download size={12} /> Download
          </button>
        ) : (
          <span style={{ fontSize: '11px', color: GRAY, fontStyle: 'italic' }}>too large to preview</span>
        )}
      </div>
    </div>
  )
}

// ─── Compose Pane ─────────────────────────────────────────────────────────────

const MAX_FILE_BYTES = 5 * 1024 * 1024 // 5 MB per file

function ComposePane({ compose, setCompose, sending, error, onSend, onDiscard }) {
  const set     = (k, v) => setCompose(p => ({ ...p, [k]: v }))
  const fileRef = useRef()
  const ready   = compose.to.trim() && compose.subject.trim()

  const handleFiles = e => {
    Array.from(e.target.files).forEach(file => {
      if (file.size > MAX_FILE_BYTES) {
        alert(`"${file.name}" exceeds the 5 MB limit and was skipped.`)
        return
      }
      const reader = new FileReader()
      reader.onload = ev => {
        const base64 = ev.target.result.split(',')[1]
        setCompose(p => ({
          ...p,
          attachments: [...(p.attachments ?? []), {
            filename: file.name, content: base64,
            contentType: file.type || 'application/octet-stream',
            size: file.size,
          }],
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeAttachment = idx =>
    setCompose(p => ({ ...p, attachments: p.attachments.filter((_, i) => i !== idx) }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${BDR}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontWeight: 800, fontSize: '15px', color: DARK }}>New Message</span>
        <button onClick={onDiscard} style={{ background: 'none', border: 'none', cursor: 'pointer', color: GRAY }}><X size={18} /></button>
      </div>

      {/* Address fields */}
      <div style={{ padding: '0 1.5rem', flexShrink: 0 }}>
        <CompField label="To" value={compose.to} onChange={v => set('to', v)} placeholder="recipient@email.com" />
        {compose.showCc
          ? <CompField label="Cc" value={compose.cc} onChange={v => set('cc', v)} placeholder="cc@email.com" />
          : <button onClick={() => set('showCc', true)} style={{ fontSize: '11px', color: BLUE, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', display: 'block' }}>+ Add Cc</button>
        }
        <CompField label="Subject" value={compose.subject} onChange={v => set('subject', v)} placeholder="Subject" />
      </div>

      {/* Body */}
      <div style={{ flexGrow: 1, padding: '0.5rem 1.5rem 0', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <textarea
          value={compose.body}
          onChange={e => set('body', e.target.value)}
          placeholder="Write your message…"
          style={{ flexGrow: 1, border: `1px solid ${BDR}`, borderRadius: '10px', padding: '12px', fontFamily: F, fontSize: '13px', resize: 'none', outline: 'none', color: DARK, lineHeight: 1.7, minHeight: '200px' }}
        />
      </div>

      {/* Attachment chips */}
      {compose.attachments?.length > 0 && (
        <div style={{ padding: '8px 1.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          {compose.attachments.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#eef4ff', border: `1px solid #c7d7f5`, borderRadius: '20px', padding: '4px 8px 4px 11px', fontSize: '12px', color: DARK }}>
              <Paperclip size={11} color={BLUE} style={{ flexShrink: 0 }} />
              <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.filename}</span>
              <span style={{ color: GRAY, fontSize: '10px', whiteSpace: 'nowrap' }}>({(a.size / 1024).toFixed(0)} KB)</span>
              <button onClick={() => removeAttachment(i)} title="Remove" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 3px', color: GRAY, display: 'flex', lineHeight: 1, flexShrink: 0 }}><X size={11} /></button>
            </div>
          ))}
        </div>
      )}

      {/* Footer actions */}
      <div style={{ padding: '0.75rem 1.5rem 1.25rem', borderTop: `1px solid ${BDR}`, marginTop: '0.75rem', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
        <button onClick={onSend} disabled={sending || !ready} style={{ background: BLUE, color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '9px', fontFamily: F, fontSize: '13px', fontWeight: 700, cursor: sending || !ready ? 'not-allowed' : 'pointer', opacity: sending || !ready ? 0.65 : 1 }}>
          {sending ? 'Sending…' : 'Send'}
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          title="Attach files (max 5 MB each)"
          style={{ background: 'none', border: `1px solid ${BDR}`, padding: '9px 14px', borderRadius: '9px', fontFamily: F, fontSize: '13px', cursor: 'pointer', color: GRAY, display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Paperclip size={14} />
          <span>Attach</span>
          {compose.attachments?.length > 0 && (
            <span style={{ background: BLUE, color: '#fff', borderRadius: '999px', padding: '0 6px', fontSize: '10px', fontWeight: 700 }}>{compose.attachments.length}</span>
          )}
        </button>
        <input ref={fileRef} type="file" multiple style={{ display: 'none' }} onChange={handleFiles} />
        <button onClick={onDiscard} style={{ background: 'none', border: `1px solid ${BDR}`, padding: '10px 20px', borderRadius: '9px', fontFamily: F, fontSize: '13px', cursor: 'pointer', color: GRAY }}>Discard</button>
        {error && <span style={{ fontSize: '12px', color: '#c62828' }}>{error}</span>}
      </div>
    </div>
  )
}

function CompField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${BDR}`, padding: '8px 0' }}>
      <span style={{ fontSize: '12px', color: GRAY, width: '44px', flexShrink: 0 }}>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ flexGrow: 1, border: 'none', outline: 'none', fontFamily: F, fontSize: '13px', color: DARK, background: 'transparent' }} />
    </div>
  )
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar({ reminders, onDay }) {
  const [view, setView] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })
  const today  = new Date()
  const first  = new Date(view.y, view.m, 1).getDay()
  const days   = new Date(view.y, view.m + 1, 0).getDate()
  const mName  = new Date(view.y, view.m).toLocaleString([], { month: 'short' })

  const hasReminder = d => reminders.some(r => {
    const rd = new Date(r.datetime)
    return !r.fired && rd.getFullYear() === view.y && rd.getMonth() === view.m && rd.getDate() === d
  })

  const cells = Array.from({ length: first + days }, (_, i) => i < first ? null : i - first + 1)

  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '10px', marginBottom: '4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button onClick={() => setView(p => { const d = new Date(p.y, p.m - 1); return { y: d.getFullYear(), m: d.getMonth() } })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.text, padding: '2px' }}><ChevronLeft size={13} /></button>
        <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>{mName} {view.y}</span>
        <button onClick={() => setView(p => { const d = new Date(p.y, p.m + 1); return { y: d.getFullYear(), m: d.getMonth() } })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: S.text, padding: '2px' }}><ChevronRight size={13} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '9px', color: S.text, paddingBottom: '3px', fontWeight: 600 }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />
          const isToday = d === today.getDate() && view.m === today.getMonth() && view.y === today.getFullYear()
          const hasDot  = hasReminder(d)
          const isPast  = new Date(view.y, view.m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          return (
            <button key={i} onClick={() => !isPast && onDay(new Date(view.y, view.m, d))}
              style={{ background: isToday ? BLUE : 'transparent', color: isToday ? '#fff' : isPast ? 'rgba(255,255,255,0.25)' : S.text, border: 'none', borderRadius: '5px', fontSize: '10px', padding: '3px 1px', cursor: isPast ? 'default' : 'pointer', position: 'relative', fontFamily: F }}
            >
              {d}
              {hasDot && <span style={{ position: 'absolute', bottom: '1px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '3px', borderRadius: '50%', background: '#f59e0b', display: 'block' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onCompose }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: GRAY, gap: '12px' }}>
      <MailOpen size={48} color="#dce8f7" strokeWidth={1.5} />
      <div style={{ fontSize: '14px', fontWeight: 600, color: '#c5d4e8' }}>Select an email to read</div>
      <button onClick={onCompose} style={{ marginTop: '8px', background: BLUE, color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '9px', fontFamily: F, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
        Compose New
      </button>
    </div>
  )
}

// ─── Tool Button ──────────────────────────────────────────────────────────────

function ToolBtn({ icon, label, onClick, danger }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '5px', background: hover ? (danger ? '#fff5f5' : '#f4f7fb') : 'transparent', border: 'none', borderRadius: '7px', padding: '6px 9px', cursor: 'pointer', color: danger ? (hover ? '#c62828' : '#e57373') : GRAY, fontFamily: F, fontSize: '12px', transition: 'all 0.15s' }}
    >
      {icon}<span style={{ display: 'none' }}>{label}</span>
    </button>
  )
}

// ─── Email Body ───────────────────────────────────────────────────────────────

function EmailBody({ html, text }) {
  const ref = useRef()
  const body = html || `<pre style="font-family:sans-serif;font-size:14px;line-height:1.7;white-space:pre-wrap;padding:24px;margin:0">${text ?? ''}</pre>`
  const doc  = `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>body{font-family:sans-serif;font-size:14px;color:#1a1a1a;line-height:1.7;margin:0;padding:24px;word-break:break-word;}img{max-width:100%;height:auto;}a{color:#1565c0;}blockquote{border-left:3px solid #dce8f7;margin:0;padding-left:14px;color:#666;}</style></head><body>${body}</body></html>`
  return (
    <iframe ref={ref} sandbox="allow-same-origin" srcDoc={doc}
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

// ─── Meta Row ─────────────────────────────────────────────────────────────────

function MetaRow({ label, val }) {
  return (
    <div style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.5 }}>
      <span style={{ color: GRAY, width: '36px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: DARK, wordBreak: 'break-word' }}>{val}</span>
    </div>
  )
}
