import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Ship, CheckCircle, Clock, AlertCircle, Anchor, Home, Search, ArrowRight,
} from 'lucide-react'

const S = { fontFamily: "'Sora',sans-serif" }

const STATUS_STYLES = {
  'In Transit':        { bg: '#e3f2fd', color: '#1565c0', dot: '#1e88e5' },
  'Booking Confirmed': { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' },
  Departed:            { bg: '#fff3e0', color: '#e65100', dot: '#fb8c00' },
  Arrived:             { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' },
  'Customs Clearance': { bg: '#f3e5f5', color: '#6a1b9a', dot: '#8e24aa' },
  Delivered:           { bg: '#e8f5e9', color: '#1b5e20', dot: '#2e7d32' },
  Pending:             { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: s.bg, color: s.color, fontSize: 12, fontWeight: 700,
      padding: '5px 12px', borderRadius: 999, letterSpacing: '0.04em',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  )
}

const fmt = ts => ts
  ? new Date(ts).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
  : '—'

export default function PublicTrack() {
  const { pathname } = useLocation()
  const urlId = pathname.startsWith('/public-track/') ? pathname.slice(14) : ''
  const navigate = useNavigate()
  const [input, setInput] = useState(urlId || '')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const track = async (id) => {
    const sid = (id || input).trim().toUpperCase()
    if (!sid) return
    setLoading(true)
    setSearched(true)
    setResult(null)
    try {
      const snap = await getDocs(query(collection(db, 'shipments'), where('shipmentId', '==', sid)))
      setResult(snap.empty ? 'not_found' : { id: snap.docs[0].id, ...snap.docs[0].data() })
    } catch {
      setResult('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (urlId) track(urlId)
  }, [urlId])

  const handleSearch = e => {
    e.preventDefault()
    const sid = input.trim().toUpperCase()
    if (!sid) return
    navigate(`/public-track/${sid}`, { replace: true })
    track(sid)
  }

  return (
    <div style={{ ...S, minHeight: '100dvh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem', height: 60,
        background: '#fff', borderBottom: '1px solid #e9f0f9',
        flexShrink: 0, boxShadow: '0 1px 8px rgba(21,101,192,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg,#1565c0,#0d47a1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Anchor size={15} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#0d1b2e', margin: 0 }}>Afolaray</p>
            <p style={{ fontSize: 10, color: '#9ab2cc', margin: 0 }}>Shipment Tracker</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/track')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0f6ff', border: '1px solid #dce8f7',
              borderRadius: 9, padding: '7px 14px', color: '#1565c0',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora,sans-serif',
            }}
          >
            <ArrowRight size={13} /> All Trackers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#0d1b2e', border: 'none',
              borderRadius: 9, padding: '7px 14px', color: '#fff',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora,sans-serif',
            }}
          >
            <Home size={13} /> Home
          </motion.button>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: 620 }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#1565c0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
              Real-time Tracking
            </p>
            <h1 style={{ fontSize: 'clamp(1.7rem,4vw,2.5rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.12, margin: '0 0 12px' }}>
              Track Your Shipment
            </h1>
            <p style={{ fontSize: 15, color: '#5a7599', fontWeight: 300, lineHeight: 1.7 }}>
              Enter your AFL Shipment ID to see live status and milestones.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: '2rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="e.g. AFL-22801"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '14px 14px 14px 44px', borderRadius: 12,
                  border: '1.5px solid #dce8f7',
                  background: '#fff', color: '#0d1b2e',
                  fontFamily: 'Sora,sans-serif', fontSize: 15, fontWeight: 600,
                  outline: 'none', letterSpacing: '0.04em',
                  boxShadow: '0 2px 8px rgba(21,101,192,0.06)',
                }}
              />
              <Search size={16} color="#9ab2cc"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading || !input.trim()}
              style={{
                background: '#1565c0', color: '#fff', border: 'none',
                padding: '14px 22px', borderRadius: 12, fontFamily: 'Sora,sans-serif',
                fontSize: 14, fontWeight: 700,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.55 : 1, whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: 7,
                boxShadow: '0 4px 16px rgba(21,101,192,0.25)',
              }}
            >
              {loading ? 'Searching…' : <><ArrowRight size={16} /> Track</>}
            </motion.button>
          </form>

          {/* Result */}
          <AnimatePresence>
            {searched && !loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                {result === 'not_found' && (
                  <div style={{
                    background: '#fff8ed', border: '1px solid #fde68a',
                    borderRadius: 16, padding: '1.25rem 1.5rem',
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                  }}>
                    <AlertCircle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#0d1b2e', marginBottom: 4 }}>Shipment not found</p>
                      <p style={{ fontSize: 13, color: '#5a7599', fontWeight: 300, lineHeight: 1.6 }}>
                        No record for <strong style={{ color: '#0d1b2e' }}>{input.trim().toUpperCase()}</strong>.{' '}
                        <Link to="/contact" style={{ color: '#1565c0' }}>Contact us</Link> for help.
                      </p>
                    </div>
                  </div>
                )}

                {result === 'error' && (
                  <div style={{
                    background: '#fff1f2', border: '1px solid #fecaca',
                    borderRadius: 16, padding: '1.25rem 1.5rem',
                    display: 'flex', gap: 12, alignItems: 'center',
                  }}>
                    <AlertCircle size={18} color="#dc2626" />
                    <p style={{ fontSize: 13, color: '#dc2626', fontWeight: 600 }}>
                      Connection error — please try again.
                    </p>
                  </div>
                )}

                {result && result !== 'not_found' && result !== 'error' && (
                  <div style={{
                    background: '#fff',
                    border: '1.5px solid #dce8f7',
                    borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(21,101,192,0.08)',
                  }}>
                    {/* Header row */}
                    <div style={{
                      padding: '1.1rem 1.4rem',
                      borderBottom: '1px solid #e9f0f9',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      flexWrap: 'wrap', gap: 10,
                      background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f2ff 100%)',
                    }}>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: '#9ab2cc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                          Shipment ID
                        </p>
                        <p style={{ fontSize: 20, fontWeight: 800, color: '#0d1b2e', letterSpacing: '0.04em' }}>
                          {result.shipmentId}
                        </p>
                      </div>
                      <StatusBadge status={result.status || 'Pending'} />
                    </div>

                    <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {/* Route */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
                        background: '#f8fafc', border: '1px solid #e9f0f9',
                        borderRadius: 12, padding: '0.9rem 1rem',
                      }}>
                        <div style={{ flex: 1, minWidth: 100 }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#9ab2cc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Origin</p>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#0d1b2e' }}>{result.origin || '—'}</p>
                        </div>
                        <Ship size={18} color="#1565c0" style={{ flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 100 }}>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#9ab2cc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Destination</p>
                          <p style={{ fontSize: 14, fontWeight: 700, color: '#0d1b2e' }}>{result.destination || '—'}</p>
                        </div>
                      </div>

                      {/* Details chips */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {[
                          { l: 'Carrier', v: result.carrier },
                          { l: 'Vessel', v: result.vessel },
                          { l: 'ETA', v: result.eta ? fmt(result.eta) : null },
                          { l: 'Customer', v: result.customerName },
                          { l: 'Car / Model', v: result.carMake },
                          { l: 'VIN', v: result.vin },
                        ].filter(d => d.v).map(({ l, v }) => (
                          <div key={l} style={{
                            background: '#f8fafc', border: '1px solid #e9f0f9',
                            borderRadius: 10, padding: '8px 14px', flex: '1 1 100px',
                          }}>
                            <p style={{ fontSize: 9, fontWeight: 700, color: '#9ab2cc', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{l}</p>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b2e' }}>{v}</p>
                          </div>
                        ))}
                      </div>

                      {/* Milestones */}
                      {Array.isArray(result.milestones) && result.milestones.length > 0 && (
                        <div>
                          <p style={{ fontSize: 9, fontWeight: 700, color: '#9ab2cc', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                            Timeline
                          </p>
                          {result.milestones.map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                <div style={{
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: m.done ? '#1565c0' : '#f1f5f9',
                                  border: `2px solid ${m.done ? '#1565c0' : '#dce8f7'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
                                }}>
                                  {m.done
                                    ? <CheckCircle size={13} color="#fff" />
                                    : <Clock size={11} color="#9ab2cc" />}
                                </div>
                                {i < result.milestones.length - 1 && (
                                  <div style={{ width: 2, flex: 1, minHeight: 16, background: m.done ? '#1565c0' : '#e9f0f9', margin: '3px 0' }} />
                                )}
                              </div>
                              <div style={{ paddingBottom: i < result.milestones.length - 1 ? 12 : 0 }}>
                                <p style={{ fontSize: 13, fontWeight: m.done ? 700 : 400, color: m.done ? '#0d1b2e' : '#9ab2cc' }}>
                                  {m.label}
                                </p>
                                {m.date && (
                                  <p style={{ fontSize: 11, color: '#9ab2cc', marginTop: 2 }}>{fmt(m.date)}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Notes */}
                      {result.notes && (
                        <div style={{
                          background: '#f8fafc', border: '1px solid #e9f0f9',
                          borderRadius: 12, padding: '1rem',
                          fontSize: 13, color: '#5a7599', lineHeight: 1.7,
                        }}>
                          <strong style={{ color: '#0d1b2e', display: 'block', marginBottom: 4 }}>Note</strong>
                          {result.notes}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help footer */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#9ab2cc', fontWeight: 400, marginBottom: 12 }}>
              Need help with your shipment?
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+2347033576017"
                style={{ fontSize: 13, color: '#fff', background: '#1565c0', padding: '10px 18px', borderRadius: 9, textDecoration: 'none', fontWeight: 700 }}>
                Call Us
              </a>
              <a href="https://wa.me/2347033576017" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: '#fff', background: '#25d366', padding: '10px 18px', borderRadius: 9, textDecoration: 'none', fontWeight: 700 }}>
                WhatsApp
              </a>
              <Link to="/track"
                style={{ fontSize: 13, color: '#5a7599', background: '#fff', border: '1px solid #dce8f7', padding: '10px 18px', borderRadius: 9, textDecoration: 'none', fontWeight: 600 }}>
                All Trackers
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
