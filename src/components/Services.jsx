import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, FileText, Shield, Home, Clock, Users } from 'lucide-react'

const svcData = [
  {
    icon: <Truck size={20} />,
    title: 'Ocean Freight',
    desc: 'FCL and LCL cargo to any major port worldwide with competitive rates.',
    full: 'Full container load (FCL) and less-than-container-load (LCL) services connecting Nigerian importers to ports across North America, Europe, Asia, and the Middle East.',
    feats: ['FCL & LCL options', 'Competitive ocean rates', 'Reliable transit times', 'Ro-Ro available on request'],
  },
  {
    icon: <FileText size={20} />,
    title: 'Import Documentation',
    desc: 'Bill of lading, NAFDAC clearance, PAAR and all compliance paperwork.',
    full: 'Every import document prepared, verified, and submitted on your behalf — from Form M and bill of lading to NAFDAC and combined certificate of value.',
    feats: ['Form M processing', 'Bill of lading', 'NAFDAC documentation', 'PAAR submission'],
  },
  {
    icon: <Shield size={20} />,
    title: 'Customs Clearance',
    desc: 'NCS-compliant duty assessment and tariff classification — zero delays.',
    full: 'We handle Nigerian Customs Service (NCS) compliance end-to-end — duty assessment, tariff classification, and all clearance filings to eliminate port delays.',
    feats: ['NCS compliant clearance', 'Duty assessment', 'Tariff classification', 'Pre-clearance support'],
  },
  {
    icon: <Home size={20} />,
    title: 'Warehousing',
    desc: 'Secure short and long-term storage at our Amuwo, Lagos facility.',
    full: 'Secure, monitored warehousing at our Amuwo, Lagos facility. Short and long-term storage with cargo consolidation and inventory management services.',
    feats: ['Secure facility, Lagos', 'Short & long-term', 'Inventory management', 'Cargo consolidation'],
  },
  {
    icon: <Clock size={20} />,
    title: 'Live Tracking',
    desc: 'Real-time shipment visibility with proactive updates at every milestone.',
    full: 'Real-time shipment tracking with automated milestone alerts. Know exactly where your cargo is — from vessel departure to port arrival to final delivery.',
    feats: ['Live location updates', 'Milestone alerts', 'Exception notifications', 'Dedicated tracking link'],
  },
  {
    icon: <Users size={20} />,
    title: 'Consultancy',
    desc: 'Expert guidance on incoterms, duty optimisation, and import regulations.',
    full: 'Expert advisory on import regulations, freight route optimisation, incoterms, and duty reduction strategies. We protect your commercial interests at every stage.',
    feats: ['Import regulation advice', 'Incoterms guidance', 'Duty optimisation', 'Route planning'],
  },
]

export default function Services() {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section id="services" style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          What we do
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.15, marginBottom: '0.4rem' }}>
              Every service you need,<br />under one roof.
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, maxWidth: '300px' }}>
            Click any service to see what's included.
          </p>
        </div>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '1px', background: '#dce8f7',
        marginTop: '3rem', border: '1px solid #dce8f7',
        borderRadius: '16px', overflow: 'hidden',
      }}>
        {svcData.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => toggle(i)}
            style={{
              background: open === i ? '#1565c0' : '#fff',
              padding: '2rem 1.6rem',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.2s',
            }}
          >
            <span style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              color: open === i ? '#fff' : '#42a5f5',
              fontSize: '18px', transition: 'all 0.2s',
              transform: open === i ? 'rotate(90deg)' : 'none',
            }}>→</span>

            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: open === i ? 'rgba(255,255,255,0.15)' : '#e3f2fd',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.2rem',
              color: open === i ? '#fff' : '#1565c0',
              transition: 'all 0.2s',
            }}>
              {s.icon}
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: open === i ? '#fff' : '#0d1b2e', marginBottom: '0.5rem' }}>
              {s.title}
            </div>
            <div style={{ fontSize: '12px', color: open === i ? 'rgba(255,255,255,0.75)' : '#5a7599', lineHeight: 1.75, fontWeight: 300 }}>
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drawer */}
      <AnimatePresence mode="wait">
        {open !== null && (
          <motion.div
            key={open}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', background: '#e3f2fd', border: '1px solid #dce8f7', borderRadius: '16px', marginTop: '1px' }}
          >
            <div style={{ padding: '2rem 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div style={{ fontSize: '14px', color: '#0c447c', lineHeight: 1.8, fontWeight: 300 }}>
                {svcData[open].full}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {svcData[open].feats.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0c447c', fontWeight: 400 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1565c0', flexShrink: 0, display: 'inline-block' }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
