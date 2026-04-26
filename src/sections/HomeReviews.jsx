import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const fade = (i = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } },
})

const reviews = [
  {
    name:   'Fatima Aliyu',
    role:   'Private Buyer · Abuja',
    rating: 5,
    text:   'I was nervous about buying a pre-order car, but the team walked me through every step. My Toyota Camry arrived in perfect condition and ahead of the estimated date.',
  },
  {
    name:   'Adebayo Olusegun',
    role:   'Fleet Manager · Port Harcourt',
    rating: 5,
    text:   'We have sourced over 20 vehicles through Afolaray for our company fleet. Their pricing is transparent, the tracking updates are reliable, and the service is consistently professional.',
  },
]

export default function HomeReviews() {
  return (
    <section
      id="reviews"
      style={{
        padding: '7rem clamp(1.2rem, 4vw, 3rem)',
        background: '#f7faff',
        borderTop: '1px solid #dce8f7',
        scrollMarginTop: '96px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Heading */}
        <motion.div
          variants={fade(0)} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            Client Reviews
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '0.8rem' }}>
            What Our Clients Say
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', margin: '0 auto' }}>
            Real experiences from individuals and businesses who trust Afolaray Nigeria Limited.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
        }}>
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              variants={fade(i * 0.12)} initial="hidden" whileInView="show" viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(21,101,192,0.12)' }}
              style={{
                background: '#fff',
                border: '1px solid #dce8f7',
                borderRadius: '20px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                boxShadow: '0 4px 18px rgba(21,101,192,0.06)',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: r.rating }).map((_, n) => (
                  <Star key={n} size={16} fill="#FBBC05" color="#FBBC05" />
                ))}
              </div>

              {/* Quote */}
              <div style={{ position: 'relative', flex: 1 }}>
                <Quote
                  size={28}
                  style={{ position: 'absolute', top: '-4px', left: '-4px', opacity: 0.07, color: '#1565c0' }}
                />
                <p style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: '14px',
                  color: '#334155',
                  lineHeight: 1.85,
                  fontWeight: 300,
                  paddingLeft: '0.25rem',
                  margin: 0,
                }}>
                  "{r.text}"
                </p>
              </div>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '0.8rem', borderTop: '1px solid #dce8f7' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '15px', color: '#fff',
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, color: '#0d1b2e' }}>
                    {r.name}
                  </div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', color: '#5a7599', fontWeight: 300, marginTop: '2px' }}>
                    {r.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google review CTA */}
        <motion.div
          variants={fade(0.4)} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#5a7599', fontWeight: 300, marginBottom: '1.2rem' }}>
            Had a great experience? Let others know.
          </p>
          <a
            href="https://maps.app.goo.gl/YNQDgaeAs6stD2gU7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#fff', color: '#0d1b2e',
              border: '1px solid #dce8f7',
              padding: '12px 22px', borderRadius: '10px',
              fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(21,101,192,0.06)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.5 12.23c0-.82-.07-1.61-.2-2.37H12v4.48h5.9a5.04 5.04 0 0 1-2.19 3.31v2.75h3.54c2.08-1.92 3.27-4.74 3.27-8.17Z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.75c-.98.66-2.23 1.05-3.74 1.05-2.88 0-5.31-1.95-6.18-4.56H2.17v2.84A10.99 10.99 0 0 0 12 23Z" fill="#34A853"/>
              <path d="M5.82 14.08A6.6 6.6 0 0 1 5.48 12c0-.72.12-1.42.34-2.08V7.08H2.17A11.01 11.01 0 0 0 1 12c0 1.77.42 3.45 1.17 4.92l3.65-2.84Z" fill="#FBBC05"/>
              <path d="M12 5.36c1.62 0 3.07.56 4.21 1.65l3.16-3.16A10.94 10.94 0 0 0 12 1 11 11 0 0 0 2.17 7.08l3.65 2.84C6.69 7.31 9.12 5.36 12 5.36Z" fill="#EA4335"/>
            </svg>
            Leave a Google Review
          </a>
        </motion.div>

      </div>
    </section>
  )
}
