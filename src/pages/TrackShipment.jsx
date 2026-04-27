import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { ExternalLink, Ship, ArrowRight, Search, CheckCircle, Clock, AlertCircle, Anchor } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const S = { fontFamily: "'Sora',sans-serif" }

const carriers = [
  {
    id: 'afolaray',
    name: 'Afolaray Nigeria Limited',
    desc: 'Track your AFL shipment in real time.',
    short: 'AFL',
    accent: '#1565c0',
  },
  {
    id: 'sallaum',
    name: 'Sallaum Lines',
    desc: 'Track ocean freight and shipment status.',
    url: 'https://www.sallaumlines.com/cargo-tracking',
    short: 'SL',
    accent: '#003087',
    hint: 'Use your booking or cargo reference to check the latest milestone.',
  },
  {
    id: 'grimaldi',
    name: 'Grimaldi e-Service',
    desc: 'RoRo tracking for Grimaldi lines.',
    url: 'https://www.grimaldi-logistics.com/tracking',
    short: 'GR',
    accent: '#c62828',
    hint: 'Best for RoRo vehicle movements and Grimaldi shipment follow-up.',
  },
  {
    id: 'msc',
    name: 'MSC Tracking',
    desc: 'Track MSC container shipments.',
    url: 'https://www.msc.com/en/tracking',
    short: 'MSC',
    accent: '#ff6d00',
    hint: 'Use the container, booking, or bill of lading reference where available.',
  },
]

const STATUS_STYLES = {
  'In Transit':        { bg: '#e3f2fd', color: '#1565c0', dot: '#1e88e5' },
  'Booking Confirmed': { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' },
  'Departed':          { bg: '#fff3e0', color: '#e65100', dot: '#fb8c00' },
  'Arrived':           { bg: '#e8f5e9', color: '#2e7d32', dot: '#43a047' },
  'Customs Clearance': { bg: '#f3e5f5', color: '#6a1b9a', dot: '#8e24aa' },
  'Delivered':         { bg: '#e8f5e9', color: '#1b5e20', dot: '#2e7d32' },
  'Pending':           { bg: '#f5f5f5', color: '#616161', dot: '#9e9e9e' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: '#f5f5f5', color: '#616161', dot: '#9e9e9e' }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', letterSpacing: '0.04em' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
      {status}
    </span>
  )
}

function AflPanel() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const fmt = (ts) => ts ? new Date(ts).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  const track = async (e) => {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    if (!id) return
    setLoading(true)
    setSearched(true)
    setResult(null)
    try {
      const snap = await getDocs(query(collection(db, 'shipments'), where('shipmentId', '==', id)))
      setResult(snap.empty ? 'not_found' : { id: snap.docs[0].id, ...snap.docs[0].data() })
    } catch {
      setResult('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.2rem' }}>
        <Anchor size={14} color="#42a5f5" />
        <span style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Afolaray Shipment Tracker
        </span>
      </div>
      <h3 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: '0.2rem' }}>
        Track Your Shipment
      </h3>
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
        Enter your Shipment ID to see the latest status.
      </p>

      {/* Search */}
      <form onSubmit={track} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '140px', position: 'relative' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AFL-22801"
            style={{
              width: '100%', padding: '11px 12px 11px 38px', borderRadius: '9px',
              border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
              color: '#fff', fontFamily: "'Sora',sans-serif", fontSize: '14px',
              fontWeight: 600, outline: 'none', letterSpacing: '0.04em', boxSizing: 'border-box',
            }}
          />
          <Search size={13} color="rgba(255,255,255,0.35)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: '#1e88e5', color: '#fff', border: 'none', padding: '11px 18px',
            borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.55 : 1, whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Searching…' : 'Track Now'}
        </button>
      </form>

      {/* Result */}
      <AnimatePresence>
        {searched && !loading && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {result === 'not_found' && (
              <div style={{ background: 'rgba(255,152,0,0.12)', border: '1px solid rgba(255,152,0,0.25)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="#ffb74d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>Not found</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.6 }}>
                    No record for <strong style={{ color: '#fff' }}>{input.trim().toUpperCase()}</strong>.{' '}
                    <Link to="/contact" style={{ color: '#42a5f5' }}>Contact us</Link> for help.
                  </p>
                </div>
              </div>
            )}

            {result === 'error' && (
              <div style={{ background: 'rgba(198,40,40,0.15)', border: '1px solid rgba(198,40,40,0.3)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <AlertCircle size={16} color="#ef9a9a" />
                <p style={{ fontSize: '13px', color: '#ef9a9a', fontWeight: 600 }}>Connection error — please try again.</p>
              </div>
            )}

            {result && result !== 'not_found' && result !== 'error' && (
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', overflow: 'hidden' }}>
                {/* Status row */}
                <div style={{ padding: '0.9rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '0.03em' }}>{result.shipmentId}</p>
                  <StatusBadge status={result.status || 'Pending'} />
                </div>

                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Route */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '100px' }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Origin</p>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{result.origin || '—'}</p>
                    </div>
                    <Ship size={14} color="#42a5f5" style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: '100px' }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Destination</p>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{result.destination || '—'}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      { l: 'Carrier', v: result.carrier },
                      { l: 'Vessel', v: result.vessel },
                      { l: 'ETA', v: result.eta ? fmt(result.eta) : null },
                      { l: 'Customer', v: result.customerName },
                    ].filter(d => d.v).map(({ l, v }) => (
                      <div key={l} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '8px', padding: '6px 10px', flex: '1 1 90px' }}>
                        <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>{l}</p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Milestones */}
                  {Array.isArray(result.milestones) && result.milestones.length > 0 && (
                    <div>
                      <p style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>Timeline</p>
                      {result.milestones.map((m, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: m.done ? '#1e88e5' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                              {m.done ? <CheckCircle size={11} color="#fff" /> : <Clock size={9} color="rgba(255,255,255,0.35)" />}
                            </div>
                            {i < result.milestones.length - 1 && (
                              <div style={{ width: 2, flex: 1, minHeight: 14, background: m.done ? '#1e88e5' : 'rgba(255,255,255,0.1)', margin: '3px 0' }} />
                            )}
                          </div>
                          <div style={{ paddingBottom: i < result.milestones.length - 1 ? '10px' : 0 }}>
                            <p style={{ fontSize: '12px', fontWeight: m.done ? 700 : 300, color: m.done ? '#fff' : 'rgba(255,255,255,0.4)' }}>{m.label}</p>
                            {m.date && <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{fmt(m.date)}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {result.notes && (
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem', fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                      <strong style={{ color: 'rgba(255,255,255,0.8)', display: 'block', marginBottom: '3px' }}>Note</strong>
                      {result.notes}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TrackShipment() {
  const [active, setActive] = useState(0)
  const selected = carriers[active]

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Track Shipment"
        title="Track Your Shipment"
        description="Select Afolaray to track your AFL shipment, or choose a carrier portal below."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80&auto=format&fit=crop"
        maxWidth="980px"
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/schedules" style={{ fontSize: '14px', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, backdropFilter: 'blur(8px)' }}>
            View Schedules
          </Link>
          <Link to="/solutions" style={{ fontSize: '14px', color: '#1565c0', background: '#fff', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 800 }}>
            Explore Solutions
          </Link>
        </div>
      </PageHeader>

      <section style={{ padding: '5rem 3rem' }}>
        <div className="responsive-two-col" style={{ maxWidth: '1100px', margin: '0 auto', gap: '1.5rem', alignItems: 'stretch' }}>

          {/* Left: carrier list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
                Select a tracker
              </div>
              <h2 style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.12, marginBottom: '0.8rem' }}>
                Where is your shipment?
              </h2>
              <p style={{ fontSize: '16px', color: '#5a7599', lineHeight: 1.85, fontWeight: 300 }}>
                Choose Afolaray to track an AFL shipment, or open a carrier portal directly.
              </p>
            </div>

            {carriers.map((carrier, index) => (
              <motion.button
                key={carrier.id}
                type="button"
                onClick={() => setActive(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%', textAlign: 'left',
                  background: active === index ? '#0d1b2e' : '#fff',
                  border: active === index ? `1.5px solid ${carrier.accent}` : '1.5px solid #dce8f7',
                  borderRadius: '18px', padding: '1.35rem 1.4rem', cursor: 'pointer',
                  boxShadow: active === index ? '0 18px 40px rgba(13,27,46,0.12)' : '0 6px 18px rgba(21,101,192,0.05)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: carrier.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, flexShrink: 0 }}>
                    {carrier.short}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: active === index ? '#fff' : '#0d1b2e', marginBottom: '0.25rem' }}>{carrier.name}</div>
                    <div style={{ fontSize: '13px', color: active === index ? 'rgba(255,255,255,0.65)' : '#5a7599', lineHeight: 1.6, fontWeight: 300 }}>{carrier.desc}</div>
                  </div>
                  <ArrowRight size={18} color={active === index ? '#fff' : carrier.accent} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(180deg, #0d1b2e 0%, #122844 100%)',
                borderRadius: '24px', padding: '2rem', color: '#fff',
                display: 'flex', flexDirection: 'column', minHeight: '420px',
                boxShadow: '0 22px 48px rgba(13,27,46,0.16)',
              }}
            >
              {selected.id === 'afolaray' ? (
                <AflPanel />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', flex: 1 }}>
                  <div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: selected.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, marginBottom: '1.2rem' }}>
                      {selected.short}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#7dc4ff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Public Tracking Page</div>
                    <h3 style={{ fontSize: 'clamp(1.8rem,2.8vw,2.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.85rem' }}>{selected.name}</h3>
                    <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.76)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.2rem' }}>{selected.desc}</p>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.56)', lineHeight: 1.8, fontWeight: 300 }}>{selected.hint}</div>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#0d1b2e', padding: '13px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 800 }}>
                      Open Tracking Portal <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ maxWidth: '1100px', margin: '1.5rem auto 0', padding: '2rem', background: '#0d1b2e', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>Need help with your shipment?</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.58)', fontWeight: 300, lineHeight: 1.8 }}>Our team is available Monday to Friday, 8 AM to 6 PM WAT.</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="tel:+2347033576017" style={{ fontSize: '14px', color: '#fff', background: '#1565c0', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Call Now</a>
            <a href="https://wa.me/2347033576017" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#fff', background: '#25d366', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>WhatsApp</a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
