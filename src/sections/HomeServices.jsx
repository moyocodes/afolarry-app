import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Car, FileText, Shield, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    num: '01',
    Icon: Car,
    title: 'Vehicle Import',
    body: 'Complete assistance with sourcing and importing vehicles from major global markets including USA, Canada, and Europe.',
    img: 'https://i.pinimg.com/736x/9b/16/ed/9b16ed1ccbf20a60a8b1dbab3a04f3da.jpg',
  },
  {
    num: '02',
    Icon: FileText,
    title: 'Import Documentation',
    body: 'Accurate import paperwork and compliance support to keep your shipments moving without delays.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
  },
  {
    num: '03',
    Icon: Shield,
    title: 'Customs Clearance',
    body: "Navigating complex customs regulations so you don't have to. We handle all documentation and compliance.",
    img: 'https://platinumfreight.co.nz/wp-content/uploads/2023/11/customs-clearance.jpg',
  },
  {
    num: '04',
    Icon: Package,
    title: 'Logistics Management',
    body: 'End-to-end transportation solutions including inland trucking, ocean freight, and warehousing.',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop',
  },
]

export default function HomeServices() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive(p => (p + 1) % services.length), 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section id="services" style={{ padding: '7rem clamp(1.2rem, 4vw, 3rem)', background: '#0d1b2e', overflow: 'hidden', position: 'relative', scrollMarginTop: '96px' }}>
      <div id="solutions" style={{ position: 'absolute', top: '96px' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(21,101,192,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              What we offer
            </div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
              Our Services
            </h2>
          </div>
        </motion.div>

        {/* Desktop: sidebar tabs + image panel */}
        {!mobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', minHeight: '420px' }}>

            {/* Left: service list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  onHoverStart={() => { setPaused(true); setActive(i) }}
                  onHoverEnd={() => setPaused(false)}
                  onClick={() => setActive(i)}
                  animate={{
                    background: active === i ? 'rgba(21,101,192,0.22)' : 'transparent',
                    borderLeft: active === i ? '3px solid #42a5f5' : '3px solid transparent',
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ padding: '1.8rem 2rem', cursor: 'pointer', flex: 1, borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                    <motion.div animate={{ color: active === i ? '#42a5f5' : 'rgba(255,255,255,0.35)' }} transition={{ duration: 0.25 }}>
                      <s.Icon size={22} />
                    </motion.div>
                    <motion.div
                      animate={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.55)' }}
                      style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 700 }}
                    >
                      {s.title}
                    </motion.div>
                  </div>
                  <motion.div
                    animate={{ color: active === i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)' }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: '12.5px', fontWeight: 300, lineHeight: 1.65, paddingLeft: '34px' }}
                  >
                    {s.body}
                  </motion.div>
                  {active === i && !paused && (
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', marginTop: '1rem', overflow: 'hidden' }}>
                      <motion.div
                        key={active}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'linear' }}
                        style={{ height: '100%', background: '#42a5f5', borderRadius: '1px' }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right: image panel */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: '420px' }}>
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(4,14,30,0.55) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '3rem', fontWeight: 800, color: 'rgba(255,255,255,0.08)', lineHeight: 1, letterSpacing: '-0.04em' }}>{s.num}</div>
                  </div>
                </motion.div>
              ))}
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '6px', zIndex: 2 }}>
                {services.map((_, i) => (
                  <motion.div
                    key={i}
                    onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 6000) }}
                    animate={{ width: active === i ? '20px' : '6px', background: active === i ? '#fff' : 'rgba(255,255,255,0.3)' }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '6px', borderRadius: '3px', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile: card grid */}
        {mobile && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                }}
              >
                <div style={{ position: 'relative', height: '100%', minHeight: '110px' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,14,30,0.3)' }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontFamily: "'Sora',sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>{s.num}</div>
                </div>
                <div style={{ padding: '1.2rem 1.2rem 1.2rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <s.Icon size={16} color="#42a5f5" />
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff' }}>{s.title}</div>
                  </div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontWeight: 300 }}>{s.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '2rem' }}>
          <Link
            to="/solutions"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1565c0', color: '#fff', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700 }}
          >
            View Solutions
          </Link>
          <Link
            to="/#contact"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.14)', padding: '12px 22px', borderRadius: '10px', textDecoration: 'none', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700 }}
          >
            Request a Quote
          </Link>
        </div>

      </div>
    </section>
  )
}
