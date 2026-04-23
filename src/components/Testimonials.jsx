import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Emeka Okafor',
    role: 'CEO, Okafor Trading Ltd',
    text: 'Afolaray handled our 40ft FCL from Shanghai flawlessly. Customs cleared in under 48 hours. They\'ve been our go-to for three years.',
    stars: 5,
    avatar: 'EO',
  },
  {
    name: 'Funke Adeyemi',
    role: 'Import Manager, Lagos',
    text: 'Finally a freight company that picks up the phone. Our dedicated account manager knows our shipments by heart. Zero stress.',
    stars: 5,
    avatar: 'FA',
  },
  {
    name: 'Bayo Akinwale',
    role: 'MD, West Coast Imports',
    text: 'Used four other forwarders before Afolaray. The difference in transparency and speed is night and day. Highly recommended.',
    stars: 5,
    avatar: 'BA',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: '5rem 3rem', background: '#fff', borderTop: '1px solid #dce8f7' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Client voices
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.15 }}>
            What our clients say.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#f7faff', borderRadius: '16px',
                border: '1px solid #dce8f7', padding: '2rem',
                transition: 'box-shadow 0.25s',
              }}
            >
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1.2rem' }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#1e88e5" color="#1e88e5" />
                ))}
              </div>
              <p style={{ fontSize: '14px', color: '#0d1b2e', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2e' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: '#5a7599', fontWeight: 400 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
