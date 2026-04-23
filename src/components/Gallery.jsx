import { motion } from 'framer-motion'

const images = [
  { src: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80&auto=format&fit=crop', alt: 'Container port aerial', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1565776358648-d3e2b7b1b4b1?w=400&q=80&auto=format&fit=crop', alt: 'Customs clearance', span: '' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80&auto=format&fit=crop', alt: 'Cargo containers', span: '' },
  { src: 'https://images.unsplash.com/photo-1566936737687-8f392a237b8b?w=700&q=80&auto=format&fit=crop', alt: 'Lagos port operations', span: '' },
  { src: 'https://images.unsplash.com/photo-1531496515174-4a73b9b3d773?w=400&q=80&auto=format&fit=crop', alt: 'Ship loading', span: 'col-span-2' },
]

export default function Gallery() {
  return (
    <section style={{ padding: '5rem 3rem', background: '#0d1b2e' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Our operations
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            From Lagos to the world.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'auto auto', gap: '12px' }}>
          {/* Large image spanning 2 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 2', borderRadius: '14px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}
          >
            <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=80&auto=format&fit=crop" alt="Container port aerial" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,46,0.5) 0%, transparent 60%)', borderRadius: '14px' }} />
            <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.4rem', color: '#fff', fontSize: '13px', fontWeight: 600 }}>Container Terminal Operations</div>
          </motion.div>

          {/* Small image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative' }}
          >
            <img src="https://images.unsplash.com/photo-1565876427310-83c4f4d1a9a3?w=400&q=80&auto=format&fit=crop" alt="Documentation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '200px' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,46,0.5) 0%, transparent 60%)', borderRadius: '14px' }} />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', fontSize: '12px', fontWeight: 600 }}>Documentation</div>
          </motion.div>

          {/* Row 2 */}
          {[
            { src: 'https://images.unsplash.com/photo-1604629615861-3cd34038e5e9?w=400&q=80&auto=format&fit=crop', label: 'Customs Clearance' },
            { src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&q=80&auto=format&fit=crop', label: 'Cargo Loading' },
            { src: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?w=400&q=80&auto=format&fit=crop', label: 'Warehousing' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              whileHover={{ scale: 1.02 }}
              style={{ borderRadius: '14px', overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}
            >
              <img src={item.src} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,46,0.6) 0%, transparent 60%)', borderRadius: '14px' }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', color: '#fff', fontSize: '12px', fontWeight: 600 }}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
