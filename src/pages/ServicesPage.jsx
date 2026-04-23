import Services from '../components/Services'
import { motion } from 'framer-motion'

export default function ServicesPage() {
  return (
    <div style={{ fontFamily: "'Sora',sans-serif" }}>
      <div style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)', padding: '4rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(66,165,245,0.15) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>What We Offer</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Complete sea freight services.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontWeight: 300, maxWidth: '520px' }}>
              From FCL ocean freight to Nigerian customs clearance, import documentation, warehousing, and live tracking — every service under one roof.
            </p>
          </motion.div>
        </div>
      </div>
      <Services />
    </div>
  )
}
