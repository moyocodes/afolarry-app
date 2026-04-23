import { motion } from 'framer-motion'
import { ExternalLink, Ship } from 'lucide-react'
import { Link } from 'react-router-dom'

const S = { fontFamily: "'Sora',sans-serif" }
const fade = { hidden: { opacity: 0, y: 24 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i*0.1 } }) }

const carriers = [
  {
    name: 'Sallaum Lines',
    desc: 'Track ocean freight and shipment status.',
    url: 'https://www.sallaumlines.com/cargo-tracking',
    logo: 'SL',
    color: '#003087',
  },
  {
    name: 'Grimaldi e-Service',
    desc: 'RoRo tracking for Grimaldi lines.',
    url: 'https://www.grimaldi-logistics.com/tracking',
    logo: 'GR',
    color: '#d32f2f',
  },
  {
    name: 'MSC Tracking',
    desc: 'Track MSC container shipments.',
    url: 'https://www.msc.com/en/tracking',
    logo: 'MSC',
    color: '#ff6d00',
  },
]

export default function TrackShipment() {
  return (
    <div style={S}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)', padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(66,165,245,0.15) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Track Shipment</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Get real-time updates on your ocean freight and vehicle shipments.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
              Select a carrier below to track your shipment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Carrier cards */}
      <section style={{ padding: '5rem 3rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Track Your Shipment</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0d1b2e' }}>Select a carrier below to track your shipment.</h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {carriers.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#fff', border: '1.5px solid #dce8f7',
                  borderRadius: '14px', padding: '1.6rem 2rem',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 12px rgba(21,101,192,0.06)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1565c0'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(21,101,192,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#dce8f7'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(21,101,192,0.06)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '13px', fontWeight: 800, letterSpacing: '0.02em', flexShrink: 0,
                  }}>
                    {c.logo}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0d1b2e', marginBottom: '3px' }}>{c.name}</div>
                    <div style={{ fontSize: '13px', color: '#5a7599', fontWeight: 300 }}>{c.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1565c0', fontWeight: 600, flexShrink: 0 }}>
                  Track now <ExternalLink size={14} />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Afolaray own tracking */}
          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              marginTop: '2rem', background: '#e3f2fd',
              border: '1px solid #dce8f7', borderRadius: '14px', padding: '1.4rem 2rem',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}
          >
            <Ship size={20} color="#1565c0" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '13px', color: '#0c447c', lineHeight: 1.7, fontWeight: 400 }}>
              Looking for an Afolaray shipment tracking update?{' '}
              <Link to="/contact" style={{ color: '#1565c0', fontWeight: 700, textDecoration: 'underline' }}>
                Contact us directly
              </Link>{' '}
              and we'll send you a real-time update within the hour.
            </p>
          </motion.div>

          {/* Help box */}
          <motion.div
            variants={fade}
            custom={4}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              marginTop: '3rem', padding: '2rem',
              background: '#0d1b2e', borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Need help with your shipment?</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>Our team is available Mon–Fri 8 AM – 6 PM WAT · WhatsApp outside hours</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="tel:+2347033576017" style={{ fontSize: '13px', color: '#fff', background: '#1565c0', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                Call Now
              </a>
              <a href="https://wa.me/2347033576017" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#fff', background: '#25d366', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
