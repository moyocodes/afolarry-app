import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  { title: 'Consultation', sub: 'We discuss your needs', body: 'We sit down (or call) to understand your cargo requirements, preferred routes, timeline, and any regulatory considerations specific to your goods.' },
  { title: 'Quotation', sub: 'Itemised, no hidden fees', body: 'You receive a fully itemised quote covering ocean freight, port handling charges, customs duties, documentation fees, and inland delivery costs. No surprises.' },
  { title: 'Documentation', sub: 'All paperwork handled', body: 'We prepare and verify every required document — bill of lading, NAFDAC Form M, pre-arrival assessment report (PAAR), certificate of value and origin, and import duty invoices.' },
  { title: 'Shipping', sub: 'Cargo dispatched + tracked', body: 'Your cargo is securely loaded and dispatched. You receive a tracking link with real-time vessel position and milestone updates throughout the voyage.' },
  { title: 'Delivery', sub: 'Cleared and delivered', body: 'On arrival at Lagos port, we handle full customs clearance and coordinate inland delivery — straight to your warehouse, facility, or nominated address.' },
]

export default function Process() {
  const [active, setActive] = useState(2)

  return (
    <section id="process" style={{ padding: '5rem 3rem', background: '#f7faff', borderTop: '1px solid #dce8f7', borderBottom: '1px solid #dce8f7' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            How it works
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.15 }}>
            Five steps from enquiry<br />to your door.
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, marginTop: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '28px', left: '10%', right: '10%', height: '1px', background: '#dce8f7' }} />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              style={{ textAlign: 'center', padding: '1rem 0.5rem', cursor: 'pointer' }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  border: '1px solid #dce8f7',
                  background: (i < active || i === active) ? '#1565c0' : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '13px', fontWeight: 700,
                  color: (i < active || i === active) ? '#fff' : '#1565c0',
                  position: 'relative', zIndex: 2,
                  boxShadow: i === active ? '0 0 0 6px #e3f2fd' : 'none',
                  transition: 'all 0.25s',
                }}
              >
                {i < active ? '✓' : i + 1}
              </motion.div>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.3rem' }}>{s.title}</h4>
              <p style={{ fontSize: '11px', color: '#5a7599', lineHeight: 1.6, fontWeight: 300 }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#fff', borderRadius: '16px', border: '1px solid #dce8f7',
              padding: '2rem', marginTop: '2rem',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1565c0', marginBottom: '0.6rem' }}>
              {steps[active].title}
            </h3>
            <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300 }}>
              {steps[active].body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
