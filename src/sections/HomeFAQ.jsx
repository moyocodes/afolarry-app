import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  { q: 'What documents do I need to ship a vehicle by sea?', a: 'Typically you need the vehicle title, invoice, ID, and export documentation. We guide you through the full checklist.' },
  { q: 'How long does ocean shipping take?', a: 'Transit time depends on the port of origin and destination. Most routes take 3 to 8 weeks.' },
  { q: 'Do you handle customs clearance?', a: 'Yes. We handle documentation and customs clearance so your shipment moves without delays.' },
  { q: 'Can I track my shipment?', a: 'Yes. We provide tracking updates and you can use the Track Shipment page to follow your cargo.' },
  { q: 'Do you offer RoRo and container options?', a: 'Yes. We support RoRo, containerized shipments, and high & heavy cargo by sea.' },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{ padding: '7rem 3rem', background: '#fff', borderTop: '1px solid #dce8f7' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>FAQ</div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '0.8rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300 }}>
            Answers to common questions about our sea freight logistics and vehicle imports.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              {/* Question tile */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.4rem 0', background: 'none', border: 'none',
                  borderBottom: `1px solid ${open === i ? 'transparent' : '#dce8f7'}`,
                  cursor: 'pointer', textAlign: 'left', gap: '1.5rem',
                }}
              >
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', fontWeight: 700, color: open === i ? '#1565c0' : '#0d1b2e', lineHeight: 1.4, flex: 1, transition: 'color 0.2s' }}>
                  {f.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0, background: open === i ? '#1565c0' : '#e3f2fd' }}
                  transition={{ duration: 0.25 }}
                  style={{ width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <Plus size={16} color={open === i ? '#fff' : '#1565c0'} />
                </motion.div>
              </button>

              {/* Answer tile — slides down as its own card */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      margin: '0 0 1.2rem 0',
                      background: '#f7faff',
                      border: '1px solid #dce8f7',
                      borderTop: '2px solid #1565c0',
                      borderRadius: '0 0 12px 12px',
                      padding: '1.4rem 1.6rem',
                    }}>
                      <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#5a7599', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
                        {f.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
