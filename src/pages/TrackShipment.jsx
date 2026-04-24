import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Ship, PackageSearch, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const S = { fontFamily: "'Sora',sans-serif" }

const trackingCarriers = [
  {
    name: 'Sallaum Lines',
    desc: 'Track ocean freight and shipment status.',
    url: 'https://www.sallaumlines.com/cargo-tracking',
    short: 'SL',
    accent: '#003087',
    hint: 'Use your booking or cargo reference to check the latest milestone.',
  },
  {
    name: 'Grimaldi e-Service',
    desc: 'RoRo tracking for Grimaldi lines.',
    url: 'https://www.grimaldi-logistics.com/tracking',
    short: 'GR',
    accent: '#c62828',
    hint: 'Best for RoRo vehicle movements and Grimaldi shipment follow-up.',
  },
  {
    name: 'MSC Tracking',
    desc: 'Track MSC container shipments.',
    url: 'https://www.msc.com/en/tracking',
    short: 'MSC',
    accent: '#ff6d00',
    hint: 'Use the container, booking, or bill of lading reference where available.',
  },
]

export default function TrackShipment() {
  const [active, setActive] = useState(0)
  const selected = trackingCarriers[active]

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Track Shipment"
        title="Track Your Shipment"
        description="Select a carrier below to track your shipment."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80&auto=format&fit=crop"
        maxWidth="980px"
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/schedules" style={{ fontSize: '14px', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, backdropFilter: 'blur(8px)' }}>
            View Schedules
          </Link>
          <Link to="/solutions" style={{ fontSize: '14px', color: '#1565c0', background: '#f7faff', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontWeight: 800 }}>
            Explore Solutions
          </Link>
        </div>
      </PageHeader>

      <section className="section-pad" style={{ padding: '5rem 3rem' }}>
        <div className="responsive-two-col" style={{ maxWidth: '1100px', margin: '0 auto', gap: '1.5rem', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
                Track Your Shipment
              </div>
              <h2 style={{ fontSize: 'clamp(1.9rem,3vw,2.6rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.12, marginBottom: '0.8rem' }}>
                Select a carrier below to track your shipment.
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.85, fontWeight: 300 }}>
                Tracking is separate from schedules. Choose the carrier you want, then open the correct public tracking portal.
              </p>
            </div>

            {trackingCarriers.map((carrier, index) => (
              <motion.button
                key={carrier.name}
                type="button"
                onClick={() => setActive(index)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: active === index ? '#0d1b2e' : '#f7faff',
                  border: active === index ? `1.5px solid ${carrier.accent}` : '1.5px solid rgba(143,76,41,0.14)',
                  borderRadius: '18px',
                  padding: '1.35rem 1.4rem',
                  cursor: 'pointer',
                  boxShadow: active === index ? '0 18px 40px rgba(13,27,46,0.12)' : '0 6px 18px rgba(21,101,192,0.05)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: carrier.accent,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {carrier.short}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: active === index ? '#f7faff' : '#0d1b2e', marginBottom: '0.3rem' }}>
                      {carrier.name}
                    </div>
                    <div style={{ fontSize: '15px', color: active === index ? 'rgba(255,255,255,0.72)' : '#64748b', lineHeight: 1.7, fontWeight: 300 }}>
                      {carrier.desc}
                    </div>
                  </div>
                  <ArrowRight size={18} color={active === index ? '#fff' : carrier.accent} />
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: 'linear-gradient(180deg, #0d1b2e 0%, #1565c0 100%)',
              borderRadius: '24px',
              padding: '2rem',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '100%',
              boxShadow: '0 22px 48px rgba(13,27,46,0.16)',
            }}
          >
            <div>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  background: selected.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 800,
                  marginBottom: '1.2rem',
                }}
              >
                {selected.short}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#7dc4ff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Public Tracking Page
              </div>
              <h3 style={{ fontSize: 'clamp(1.8rem,2.8vw,2.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.85rem' }}>
                {selected.name}
              </h3>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.76)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.2rem' }}>
                {selected.desc}
              </p>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.56)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.4rem' }}>
                {selected.hint}
              </div>
              {/* <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1.1rem', fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>
                {selected.url}
              </div> */}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '1.5rem' }}>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#fff',
                  color: '#0d1b2e',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                }}
              >
                Open Tracking Portal <ExternalLink size={15} />
              </a>
              
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            maxWidth: '1100px',
            margin: '1.5rem auto 0',
            background: '#e3f2fd',
            border: '1px solid rgba(143,76,41,0.14)',
            borderRadius: '18px',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <PackageSearch size={22} color="#8f4c29" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0c447c', marginBottom: '0.35rem' }}>
              Looking for Afolary shipment tracking?
            </div>
            <div style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, fontWeight: 300 }}>
              Use the public tracking page. If you need extra help verifying your shipment details,{' '}
              <Link to="/#contact" style={{ color: '#1565c0', fontWeight: 700, textDecoration: 'underline' }}>
                contact us directly
              </Link>
              .
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: '1100px',
            margin: '1.5rem auto 0',
            padding: '2rem',
            background: '#0d1b2e',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
              Need help with your shipment?
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.58)', fontWeight: 300, lineHeight: 1.8 }}>
              Our team is available Monday to Friday, 8 AM to 6 PM WAT.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a href="tel:+2347033576017" style={{ fontSize: '14px', color: '#f7faff', background: '#1565c0', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>
              Call Now
            </a>
            <a href="https://wa.me/2347033576017" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#fff', background: '#25d366', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
