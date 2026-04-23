import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

export default function HomeTestimonials() {
  const reviewUrl = 'https://www.google.com/search?q=Afolaray+Nigeria+Limited'

  return (
    <section style={{ padding: '7rem 3rem', background: '#f7faff', borderTop: '1px solid #dce8f7' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            Reviews
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '0.8rem' }}>
            Google Testimonials
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300 }}>
            See what customers are saying about Afolaray Nigeria Limited on Google.
          </p>
        </motion.div>

        {/* Google badge card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#fff', border: '1px solid #dce8f7',
            borderRadius: '20px', padding: '3rem 2.5rem',
            boxShadow: '0 16px 50px rgba(21,101,192,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
          }}
        >
          {/* Google logo */}
          <svg width="96" height="32" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
            <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
            <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
            <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
            <path fill="#EA4335" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65H35.29z"/>
          </svg>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3,4,5].map(n => (
              <motion.div
                key={n}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + n * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
              >
                <Star size={28} fill="#FBBC05" color="#FBBC05" />
              </motion.div>
            ))}
          </div>

          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', fontWeight: 300, lineHeight: 1.7, maxWidth: '500px' }}>
            See what customers are saying about Afolaray Nigeria Limited on Google.
          </p>

          {/* CTA */}
          <motion.a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#1565c0', color: '#fff',
              padding: '13px 28px', borderRadius: '10px',
              fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 700,
              textDecoration: 'none', marginTop: '0.5rem',
            }}
          >
            Leave a Review <ExternalLink size={15} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
