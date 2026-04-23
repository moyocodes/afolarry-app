import { motion } from 'framer-motion'
import { Ship, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const S = { fontFamily: "'Sora',sans-serif" }
const fade = { hidden: { opacity: 0, y: 24 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i*0.1 } }) }

const schedules = [
  { from: 'Houston, TX (USA)', to: 'Lagos, NG', carrier: 'Sallaum Lines', transit: '28–32 days', freq: 'Bi-weekly', next: 'Contact for next departure', type: 'RoRo / Vehicle' },
  { from: 'Baltimore, MD (USA)', to: 'Lagos, NG', carrier: 'Grimaldi Lines', transit: '26–30 days', freq: 'Weekly', next: 'Contact for next departure', type: 'RoRo / Vehicle' },
  { from: 'Rotterdam, NL', to: 'Lagos, NG', carrier: 'MSC / Various', transit: '14–18 days', freq: 'Weekly', next: 'Contact for next departure', type: 'FCL / LCL' },
  { from: 'Shanghai, CN', to: 'Lagos, NG', carrier: 'MSC / CMA CGM', transit: '28–35 days', freq: 'Weekly', next: 'Contact for next departure', type: 'FCL / LCL' },
  { from: 'Antwerp, BE', to: 'Lagos, NG', carrier: 'Grimaldi / MSC', transit: '16–20 days', freq: 'Bi-weekly', next: 'Contact for next departure', type: 'RoRo / FCL' },
  { from: 'Dubai, UAE', to: 'Lagos, NG', carrier: 'Various', transit: '18–24 days', freq: 'Weekly', next: 'Contact for next departure', type: 'FCL / LCL' },
]

export default function Schedules() {
  return (
    <div style={S}>
      <div style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)', padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 40%, rgba(66,165,245,0.18) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Schedules</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Sailing schedules &amp; transit times.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontWeight: 300, maxWidth: '500px' }}>
              Indicative departure schedules for our key trade lanes. Contact us for exact vessel dates and booking.
            </p>
          </motion.div>
        </div>
      </div>

      <section style={{ padding: '4rem 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#dce8f7', border: '1px solid #dce8f7', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.8fr 1.2fr 1fr 1fr 1fr', background: '#0d1b2e', padding: '1rem 1.5rem', gap: '1rem' }}>
              {['Origin', 'Destination', 'Carrier', 'Transit', 'Frequency', 'Type'].map(h => (
                <div key={h} style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {schedules.map((s, i) => (
              <motion.div
                key={i}
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                  display: 'grid', gridTemplateColumns: '1.8fr 1.8fr 1.2fr 1fr 1fr 1fr',
                  background: '#fff', padding: '1.1rem 1.5rem', gap: '1rem',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <MapPin size={13} color="#1565c0" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0d1b2e' }}>{s.from}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <Ship size={13} color="#1565c0" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0d1b2e' }}>{s.to}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#5a7599', fontWeight: 400 }}>{s.carrier}</div>
                <div style={{ fontSize: '12px', color: '#0d1b2e', fontWeight: 600 }}>{s.transit}</div>
                <div>
                  <span style={{ background: '#e3f2fd', color: '#0c447c', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px' }}>{s.freq}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#5a7599', fontWeight: 400 }}>{s.type}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fade} custom={6} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ marginTop: '2rem', background: '#e3f2fd', border: '1px solid #dce8f7', borderRadius: '14px', padding: '1.4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0c447c', marginBottom: '3px' }}>Need an exact sailing date or booking?</div>
              <div style={{ fontSize: '12px', color: '#5a7599', fontWeight: 300 }}>Contact our operations team for firm vessel schedules and booking confirmation.</div>
            </div>
            <Link to="/contact" style={{ fontSize: '13px', color: '#fff', background: '#1565c0', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
