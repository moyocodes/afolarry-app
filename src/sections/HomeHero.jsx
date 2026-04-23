import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

const words = ['Connecting', 'You', 'to', 'Global', 'Vehicle', 'Markets']

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(count, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate(v) {
        setDisplay(to >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString())
      },
    })
    return ctrl.stop
  }, [inView, to, count])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { value: 12, suffix: '+', label: 'Years Experience' },
  { value: 8500, suffix: '+', label: 'Vehicles Delivered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

export default function HomeHero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* BG image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,14,30,0.78) 0%, rgba(4,14,30,0.55) 50%, rgba(4,14,30,0.92) 100%)',
        }} />
        {/* subtle blue glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,101,192,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 3rem 5rem', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>

        {/* Headline */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14px', marginBottom: '1.6rem', alignItems: 'baseline' }}>
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
                fontWeight: 800,
                color: ['Global', 'Vehicle', 'Markets'].includes(word) ? '#42a5f5' : '#fff',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: 'easeOut' }}
          style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.85, maxWidth: '540px', fontWeight: 300, marginBottom: '2.4rem' }}
        >
          Your trusted partner for seamless vehicle import, customs clearance, and international logistics. Efficiency meets reliability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
        >
          <Link to="/track">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1565c0', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}
            >
              Track Shipment <ArrowRight size={16} />
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 28px', borderRadius: '10px', fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)' }}
          >
            Our Services
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        style={{
          position: 'relative', zIndex: 1,
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '0',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', fontWeight: 400, letterSpacing: '0.04em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
