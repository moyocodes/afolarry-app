import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Clock, MapPin } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
}

const SHIP_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop'
const PORT_IMG = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80&auto=format&fit=crop'

export default function Hero() {
  const scroll = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section style={{ background: '#fff', overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>
      {/* Background grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, #e3f2fd 0%, transparent 55%), radial-gradient(circle at 10% 90%, #e3f2fd 0%, transparent 45%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '5rem 3rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', minHeight: '80vh' }} className="hero-grid">

          {/* LEFT — copy */}
          <div>
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="show"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#e3f2fd', color: '#0c447c',
                fontSize: '11px', fontWeight: 600, padding: '6px 14px',
                borderRadius: '20px', marginBottom: '1.8rem', letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#1e88e5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Lagos, Nigeria · Est. 2012
            </motion.div>

            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="show"
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: '#0d1b2e',
                marginBottom: '1.4rem',
                letterSpacing: '-0.02em',
              }}
            >
              Sea freight<br />
              that{' '}
              <span style={{ color: '#1565c0' }}>actually</span>
              <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                delivers.
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.7, ease: 'easeOut' }}
                  style={{
                    position: 'absolute', bottom: '-4px', left: 0, right: 0,
                    height: '4px', background: '#1565c0', borderRadius: '2px',
                    display: 'block',
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="show"
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: '15px', color: '#5a7599', lineHeight: 1.85,
                maxWidth: '480px', fontWeight: 300, marginBottom: '2.2rem',
              }}
            >
              End-to-end ocean logistics from Lagos to the world. Customs clearance,
              documentation, and real-time tracking — handled by people who know
              what they're doing.
            </motion.p>

            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '3rem' }}
            >
              <motion.button
                whileHover={{ scale: 1.03, background: '#0d47a1' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scroll('#contact')}
                style={{
                  fontSize: '14px', color: '#fff', background: '#1565c0',
                  border: 'none', padding: '13px 26px', borderRadius: '10px',
                  cursor: 'pointer', fontFamily: "'Sora',sans-serif", fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.2s',
                }}
              >
                Get a free quote <ArrowRight size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, background: '#e3f2fd' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scroll('#services')}
                style={{
                  fontSize: '14px', color: '#1565c0', background: 'none',
                  border: '1.5px solid #42a5f5', padding: '12px 24px',
                  borderRadius: '10px', cursor: 'pointer', fontFamily: "'Sora',sans-serif",
                  fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'background 0.2s',
                }}
              >
                <Play size={14} fill="#1565c0" /> See services
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              {[
                { icon: <Shield size={14} color="#1565c0" />, text: 'NCS Licensed' },
                { icon: <Clock size={14} color="#1565c0" />, text: '12+ Years' },
                { icon: <MapPin size={14} color="#1565c0" />, text: 'Lagos Based' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5a7599', fontWeight: 500 }}>
                  {item.icon} {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — visuals */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Main ship image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(21,101,192,0.18)',
                border: '1px solid #dce8f7',
                aspectRatio: '16/10',
              }}
            >
              <img
                src={SHIP_IMG}
                alt="Container ship at sea"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(13,27,46,0.6) 0%, transparent 50%)',
                borderRadius: '20px',
              }} />
            </motion.div>

            {/* Live tracking card — floats bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                position: 'absolute', bottom: '-20px', left: '-30px',
                background: '#fff', borderRadius: '14px',
                border: '1px solid #dce8f7',
                boxShadow: '0 16px 40px rgba(21,101,192,0.14)',
                padding: '1.2rem 1.4rem', minWidth: '220px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0d1b2e' }}>AFN-2025-0847</span>
                <span style={{ background: '#e8f5e9', color: '#2e7d32', fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.05em' }}>
                  IN TRANSIT
                </span>
              </div>
              <div style={{ height: '4px', background: '#e3f2fd', borderRadius: '2px', position: 'relative', marginBottom: '0.6rem' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '63%' }}
                  transition={{ delay: 1.2, duration: 1.2, ease: 'easeOut' }}
                  style={{ height: '4px', background: '#1565c0', borderRadius: '2px', position: 'absolute' }}
                />
                <div style={{ position: 'absolute', top: '50%', left: '63%', transform: 'translate(-50%,-50%)', width: '11px', height: '11px', borderRadius: '50%', background: '#1565c0', border: '2px solid #fff', outline: '2px solid #1565c0' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#5a7599', fontWeight: 600 }}>
                <span>Rotterdam, NL</span>
                <span style={{ color: '#1565c0' }}>63%</span>
                <span>Lagos, NG</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginTop: '0.8rem' }}>
                {[['14d','ETA'],['FCL','Type'],['22T','Cargo']].map(([v,l]) => (
                  <div key={l} style={{ background: '#f7faff', borderRadius: '7px', padding: '6px', textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1565c0' }}>{v}</div>
                    <div style={{ fontSize: '8px', color: '#5a7599', marginTop: '1px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Port image — floats top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '140px', height: '100px', borderRadius: '14px', overflow: 'hidden',
                border: '2px solid #fff',
                boxShadow: '0 12px 30px rgba(21,101,192,0.18)',
              }}
            >
              <img src={PORT_IMG} alt="Lagos port" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Docs cleared badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              style={{
                position: 'absolute', top: '50%', right: '-20px',
                background: '#fff', borderRadius: '12px', border: '1px solid #dce8f7',
                boxShadow: '0 8px 24px rgba(21,101,192,0.1)',
                padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={15} color="#1565c0" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0d1b2e' }}>NCS Cleared</div>
                <div style={{ fontSize: '9px', color: '#5a7599' }}>Customs approved</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.85); }
        }
        @media (max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
