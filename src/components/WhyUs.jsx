import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Clock, DollarSign, User } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, to, {
      duration: 1.8, ease: 'easeOut',
      onUpdate(v) { setDisplay(to >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString()) },
    })
    return ctrl.stop
  }, [inView, to, count])
  return <span ref={ref}>{display}{suffix}</span>
}

const items = [
  {
    icon: <Shield size={18} />,
    title: 'Fully licensed & NCS registered',
    body: 'Registered with Nigerian Customs Service, NAFDAC, and all relevant federal bodies. Every shipment moves with full regulatory backing — no surprises, no penalties.',
  },
  {
    icon: <Clock size={18} />,
    title: 'On-time, every time',
    body: 'Strict transit scheduling and proactive exception management mean your cargo arrives when promised. We track, alert, and resolve — so you don\'t have to.',
  },
  {
    icon: <DollarSign size={18} />,
    title: 'Transparent, itemised pricing',
    body: 'Ocean freight, port handling, customs duty, and inland delivery — all itemised before you commit. No hidden fees. No surprises at port.',
  },
  {
    icon: <User size={18} />,
    title: 'One dedicated account manager',
    body: 'You get one person who knows your business. From first booking through final delivery — one point of contact, no being passed around.',
  },
]

const wpStats = [
  { value: 12, suffix: '+', label: 'Years of sea freight experience across West Africa and global trade routes' },
  { value: 8500, suffix: '+', label: 'Shipments successfully delivered without a single regulatory penalty' },
  { value: 30, suffix: '+', label: 'Active trade corridors from Lagos to ports worldwide' },
  { value: 100, suffix: '%', label: 'Client satisfaction rating based on 500+ verified reviews' },
]

export default function WhyUs() {
  const [open, setOpen] = useState(0)

  return (
    <section id="why" className="section-pad" style={{ padding: '5rem 3rem' }}>
      <div className="responsive-two-col" style={{ maxWidth: '1280px', margin: '0 auto', gap: '4rem', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Why Afolaray
            </div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.15, marginBottom: '2rem' }}>
              Built on trust.<br />Driven by results.
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  background: open === i ? '#fff' : '#f7faff',
                  border: open === i ? '1.5px solid #1565c0' : '1px solid #dce8f7',
                  borderRadius: '12px', padding: '1.4rem', cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '9px',
                      background: open === i ? '#1565c0' : '#e3f2fd',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: open === i ? '#fff' : '#1565c0', transition: 'all 0.25s', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2e' }}>{item.title}</h4>
                  </div>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    style={{ color: '#42a5f5', fontSize: '16px', display: 'inline-block' }}
                  >
                    ⌃
                  </motion.span>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '12.5px', color: '#5a7599', lineHeight: 1.75, fontWeight: 300, paddingTop: '0.8rem' }}>
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — stats panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{
            background: '#e3f2fd', borderRadius: '16px',
            border: '1px solid #dce8f7', padding: '2rem',
            display: 'flex', flexDirection: 'column', gap: '1.2rem',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1565c0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Our numbers speak
          </div>
          {wpStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '1rem', background: '#fff',
                borderRadius: '10px', border: '1px solid #dce8f7',
              }}
            >
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '1.6rem', fontWeight: 700, color: '#1565c0', minWidth: '80px' }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: '12px', color: '#5a7599', fontWeight: 300, lineHeight: 1.5 }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
