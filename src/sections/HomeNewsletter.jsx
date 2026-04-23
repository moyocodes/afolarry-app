import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomeNewsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 5000)
  }

  return (
    <section style={{ padding: '5rem 3rem', background: '#f7faff', borderTop: '1px solid #dce8f7' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.4rem', color: '#1565c0' }}>
            <Mail size={22} />
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, color: '#0d1b2e', letterSpacing: '-0.025em', marginBottom: '0.8rem' }}>
            Stay updated.
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.2rem' }}>
            Get shipping tips, rate updates, and logistics news from Afolaray Nigeria Limited.
          </p>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '12px', padding: '1.1rem 1.6rem' }}
            >
              <CheckCircle size={18} color="#2e7d32" />
              <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', fontWeight: 600, color: '#2e7d32' }}>
                You're subscribed!
              </span>
            </motion.div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', gap: '8px', maxWidth: '480px', margin: '0 auto' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1, padding: '13px 16px', border: '1.5px solid #dce8f7',
                  borderRadius: '10px', fontFamily: "'Sora',sans-serif", fontSize: '13px',
                  outline: 'none', background: '#fff', color: '#0d1b2e',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#1565c0'}
                onBlur={e => e.target.style.borderColor = '#dce8f7'}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#1565c0', color: '#fff', border: 'none',
                  padding: '13px 22px', borderRadius: '10px',
                  fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px',
                  flexShrink: 0,
                }}
              >
                Subscribe <ArrowRight size={15} />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
