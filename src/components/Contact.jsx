import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" style={{ padding: '5rem 3rem', background: '#0d1b2e' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Get in touch
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15 }}>
            Request a quote.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', marginTop: '3rem' }}>
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {[
              {
                icon: <MapPin size={16} color="#42a5f5" />,
                label: 'Head Office',
                val: '11A Apapa-Oshodi Expressway\nAmuwo, Lagos, Nigeria',
              },
              {
                icon: <Phone size={16} color="#42a5f5" />,
                label: 'Phone & WhatsApp',
                val: '+234 703 357 6017',
                href: 'tel:+2347033576017',
              },
              {
                icon: <Mail size={16} color="#42a5f5" />,
                label: 'Email',
                val: 'Afolaraynigerialimited@gmail.com',
                href: 'mailto:Afolaraynigerialimited@gmail.com',
              },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.6, textDecoration: 'none' }}>
                      {item.val}
                    </a>
                  ) : (
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.val}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Office hours</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300 }}>
                Mon – Fri · 8:00 AM – 6:00 PM WAT<br />WhatsApp available outside hours
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Full Name', type: 'text', placeholder: 'Your name', full: false },
                { label: 'Phone / WhatsApp', type: 'tel', placeholder: '+234...', full: false },
                { label: 'Email', type: 'email', placeholder: 'your@email.com', full: true },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: f.full ? '1 / -1' : 'auto' }}>
                  <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    style={{
                      background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff', padding: '10px 12px', borderRadius: '8px',
                      fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 300,
                      outline: 'none', width: '100%',
                    }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Service needed</label>
                <select style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '10px 12px', borderRadius: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', width: '100%' }}>
                  <option>Ocean Freight (FCL)</option>
                  <option>Ocean Freight (LCL)</option>
                  <option>Customs Clearance</option>
                  <option>Import Documentation</option>
                  <option>Warehousing</option>
                  <option>Full Logistics Package</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cargo details & route</label>
                <textarea
                  rows={3}
                  placeholder="Cargo type, origin, destination, weight/volume..."
                  style={{
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff', padding: '10px 12px', borderRadius: '8px',
                    fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 300,
                    outline: 'none', width: '100%', resize: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: sent ? '#2e7d32' : '#1e88e5',
                  color: '#fff', border: 'none', padding: '12px 28px',
                  borderRadius: '8px', fontFamily: "'Sora',sans-serif",
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                {sent ? "Sent! We'll be in touch." : 'Send enquiry →'}
              </motion.button>

              <a
                href="https://wa.me/2347033576017"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
