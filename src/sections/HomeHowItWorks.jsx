import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  { num: '1', title: 'Consultation', body: 'We discuss your vehicle needs and shipping requirements.' },
  { num: '2', title: 'Procurement', body: 'We source or receive your vehicle and handle documentation.' },
  { num: '3', title: 'Shipping', body: 'Your vehicle is securely loaded and shipped with tracking.' },
  { num: '4', title: 'Delivery', body: 'Customs cleared and delivered to your doorstep.' },
]

export default function HomeHowItWorks() {
  const [active, setActive] = useState(0)
  const [mobile, setMobile] = useState(() => window.innerWidth < 640)
  const stepRefs = useRef([])

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    const observers = steps.map((_, i) => {
      const el = stepRefs.current[i]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const circleSize = mobile ? 52 : 72
  const lineLeft   = mobile ? 26 : 35

  return (
    <section id="how-it-works" style={{ padding: '7rem clamp(1.2rem, 4vw, 3rem)', background: '#f7faff', borderTop: '1px solid #dce8f7', scrollMarginTop: '96px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: mobile ? '3rem' : '5rem' }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            The process
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
            How It Works
          </h2>
        </motion.div>

        {/* Vertical steps */}
        <div style={{ position: 'relative' }}>

          {/* Animated vertical line */}
          <div style={{ position: 'absolute', left: lineLeft + 'px', top: circleSize / 2 + 'px', bottom: circleSize / 2 + 'px', width: '2px', background: '#dce8f7', zIndex: 0 }}>
            <motion.div
              style={{ width: '100%', background: '#1565c0', borderRadius: '1px', transformOrigin: 'top' }}
              animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                ref={el => stepRefs.current[i] = el}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: mobile ? '1rem' : '2rem',
                  padding: mobile ? '1.5rem 0' : '2.5rem 0',
                  position: 'relative', zIndex: 1,
                  borderBottom: i < steps.length - 1 ? '1px solid #dce8f7' : 'none',
                }}
              >
                {/* Number circle */}
                <motion.div
                  animate={{
                    background: i <= active ? '#1565c0' : '#fff',
                    boxShadow: i === active ? '0 0 0 8px rgba(21,101,192,0.1)' : '0 0 0 0px transparent',
                    scale: i === active ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: circleSize + 'px',
                    height: circleSize + 'px',
                    flexShrink: 0,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: i <= active ? '#1565c0' : '#dce8f7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <motion.span
                    animate={{ color: i <= active ? '#fff' : '#5a7599' }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: mobile ? '16px' : '22px', fontWeight: 800 }}
                  >
                    {i < active ? '✓' : s.num}
                  </motion.span>
                </motion.div>

                {/* Text */}
                <motion.div
                  animate={{ opacity: i === active ? 1 : 0.45 }}
                  transition={{ duration: 0.35 }}
                  style={{ paddingTop: mobile ? '6px' : '14px', flex: 1 }}
                >
                  <motion.h3
                    animate={{ color: i === active ? '#1565c0' : '#0d1b2e' }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: mobile ? '1.05rem' : 'clamp(1.1rem,2.5vw,1.4rem)', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.015em' }}
                  >
                    {s.title}
                  </motion.h3>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: mobile ? '13px' : '15px', color: '#5a7599', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                    {s.body}
                  </p>
                  <motion.div
                    animate={{ scaleX: i === active ? 1 : 0, opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ height: '3px', width: '40px', background: '#1565c0', borderRadius: '2px', marginTop: '0.75rem', transformOrigin: 'left' }}
                  />
                </motion.div>

                {/* Step chip — hidden on mobile */}
                {!mobile && (
                  <motion.div
                    animate={{ background: i === active ? '#1565c0' : '#e3f2fd', color: i === active ? '#fff' : '#5a7599' }}
                    transition={{ duration: 0.3 }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: '10px', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0, marginTop: '18px' }}
                  >
                    Step {s.num}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
