import { motion } from 'framer-motion'

const fade = (dir = 0) => ({
  hidden: { opacity: 0, x: dir * 40, y: dir === 0 ? 30 : 0 },
  show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

export default function HomeAbout() {
  return (
    <section id="about" style={{ padding: '7rem 3rem', background: '#fff', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

        {/* Text */}
        <motion.div variants={fade(-1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '48px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: '3px', background: '#1565c0', borderRadius: '2px', marginBottom: '1.8rem' }}
          />
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '1.6rem' }}>
            About Afolaray<br />Nigeria Limited
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.2rem' }}>
            Afolaray Limited is a premier vehicle import company dedicated to simplifying the global vehicle trade. With over a decade of experience, we have established ourselves as a trusted partner for individuals and dealerships looking to move vehicles across borders.
          </p>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', lineHeight: 1.9, fontWeight: 300 }}>
            Our mission is to provide transparent, efficient, and secure logistics solutions. We handle everything from procurement and customs clearance to final delivery, ensuring peace of mind for our clients.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fade(1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{ position: 'relative' }}
        >
          {/* Main image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 30px 80px rgba(21,101,192,0.16)' }}
          >
            <img
              src="https://afolary-limited-5d4i.vercel.app/assets/Afolary-image-DbVIOQKx.jpg"
              alt="Afolary Limited operations"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* caption overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(4,14,30,0.75) 0%, transparent 100%)' }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, letterSpacing: '0.05em' }}>
                Afolary Limited operations
              </div>
            </div>
          </motion.div>

          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              position: 'absolute', bottom: '-20px', left: '-24px',
              background: '#1565c0', color: '#fff',
              borderRadius: '14px', padding: '1.2rem 1.4rem',
              boxShadow: '0 16px 40px rgba(21,101,192,0.35)',
            }}
          >
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>12+</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 400, opacity: 0.8, marginTop: '3px' }}>Years of<br />experience</div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`@media(max-width:768px){#about .about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
