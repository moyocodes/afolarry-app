import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        setDisplay(
          to >= 1000
            ? Math.round(v).toLocaleString()
            : Math.round(v).toString()
        )
      },
    })
    return controls.stop
  }, [inView, to, duration, count])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { value: 12, suffix: '+', label: 'Years in business' },
  { value: 8500, suffix: '+', label: 'Shipments delivered' },
  { value: 30, suffix: '+', label: 'Global trade lanes' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
]

export default function StatsRow() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      borderBottom: '1px solid #dce8f7',
      borderTop: '1px solid #dce8f7',
    }}>
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{
            padding: '2.2rem 1rem',
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid #dce8f7' : 'none',
          }}
        >
          <div style={{
            fontFamily: "'Sora',sans-serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 700,
            color: '#1565c0',
            letterSpacing: '-0.02em',
          }}>
            <Counter to={s.value} suffix={s.suffix} />
          </div>
          <div style={{ fontSize: '11px', color: '#5a7599', marginTop: '5px', fontWeight: 400, letterSpacing: '0.04em' }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
