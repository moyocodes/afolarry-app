import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { EJS_SERVICE, EJS_CONTACT, EJS_PUBLIC } from '../lib/emailjs'
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Star, ExternalLink } from 'lucide-react'

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } },
})

const inp = (dark) => ({
  width: '100%', padding: '11px 14px', borderRadius: '9px', outline: 'none',
  fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 300,
  background: dark ? 'rgba(255,255,255,0.07)' : '#fff',
  border: dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #dce8f7',
  color: dark ? '#fff' : '#0d1b2e',
})

export default function HomeContact() {
  const formRef = useRef()
  const [status, setStatus] = useState(null)
  const reviewUrl = 'https://maps.app.goo.gl/YNQDgaeAs6stD2gU7'

  const contactVideoSrc = '/animate-it.mp4'

  const send = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_CONTACT, formRef.current, EJS_PUBLIC)
      setStatus('ok')
      formRef.current.reset()
      setTimeout(() => setStatus(null), 5000)
    } catch {
      setStatus('err')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="contact" style={{ background: '#f7faff', overflow: 'hidden', scrollMarginTop: '96px', borderTop: '1px solid #dce8f7' }}>
      {/* Map strip */}
      <div style={{ height: '360px', position: 'relative' }}>
        <iframe
          title="Afolaray Nigeria Limited location"
          src="https://maps.google.com/maps?cid=9330721875799411647&output=embed&hl=en&gl=NG"
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block', filter: 'grayscale(20%) contrast(0.9)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,28,0.12) 0%, rgba(6,15,28,0.2) 52%, rgba(13,27,46,0.88) 100%)', pointerEvents: 'none' }} />
        <motion.div
          className="map-review-badge"
          variants={fade(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            background: 'rgba(6,15,28,0.8)',
            border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '1.2rem 1.25rem',
          }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '10px', fontWeight: 700, color: '#7dc4ff', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>
            Google Reviews
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.65rem' }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} size={18} fill="#FBBC05" color="#FBBC05" />
            ))}
          </div>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.9rem' }}>
            See what customers are saying about Afolaray Nigeria Limited right from the contact section.
          </p>
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              background: '#1565c0',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontFamily: "'Sora',sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Leave a Review <ExternalLink size={14} />
          </a>
        </motion.div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #0d1b2e)', pointerEvents: 'none' }} />
      </div>

      {/* Content */}
      <div className="section-pad" style={{ position: 'relative', padding: '2rem 3rem 6rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '28px' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={contactVideoSrc}
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(247,250,255,0.96) 100%)' }} />
        </div>
        <motion.div variants={fade()} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ position: 'relative', zIndex: 1, marginBottom: '3rem', paddingTop: '1.5rem' }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '11px', fontWeight: 800, color: '#1565c0', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            Reach us
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(2.1rem,4vw,3.35rem)', fontWeight: 800, color: '#0d1b2e', lineHeight: 1.02, letterSpacing: '-0.03em', margin: 0 }}>
            Get In Touch
          </h2>
          <p style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(15px,2vw,18px)', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, maxWidth: '640px', marginTop: '0.9rem' }}>
            Reach our team quickly for tracking help, booking guidance, or a fresh shipping quote.
          </p>
        </motion.div>

        <div className="responsive-contact-grid" style={{ position: 'relative', zIndex: 1, alignItems: 'start', background: '#fff', border: '1px solid #dce8f7', borderRadius: '24px', boxShadow: '0 24px 60px rgba(21,101,192,0.08)', padding: '2rem' }}>

          {/* Left: Contact info */}
          <motion.div variants={fade(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 800, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              Contact Information
            </div>

            {[
              {
                icon: <MapPin size={15} color="#42a5f5" />,
                label: 'Head Office',
                val: '11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria',
              },
              {
                icon: <Phone size={15} color="#42a5f5" />,
                label: 'Phone',
                val: '+2347033576017',
                href: 'tel:+2347033576017',
              },
              {
                icon: <Mail size={15} color="#42a5f5" />,
                label: 'Email',
                val: 'Afolaraynigerialimited@gmail.com',
                href: 'mailto:Afolaraynigerialimited@gmail.com',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                variants={fade(i * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '1.8rem' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eaf4ff', border: '1px solid #dce8f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '10px', fontWeight: 800, color: '#1565c0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#0d1b2e', fontWeight: 400, lineHeight: 1.6, textDecoration: 'none' }}>{item.val}</a>
                    : <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '15px', color: '#0d1b2e', fontWeight: 400, lineHeight: 1.6 }}>{item.val}</div>
                  }
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fade(1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 800, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              Send us a message
            </div>

            <form ref={formRef} onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input name="from_name" type="text" placeholder="Your Name" required style={inp(false)} />
              <input name="from_email" type="email" placeholder="Your Email" required style={inp(false)} />
              <textarea name="message" rows={5} placeholder="Message" required style={{ ...inp(false), resize: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '0.4rem' }}>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: status === 'ok' ? '#2e7d32' : status === 'err' ? '#c62828' : '#1e88e5',
                    color: '#fff', border: 'none', padding: '13px 28px', borderRadius: '9px',
                    fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    transition: 'background 0.3s', opacity: status === 'sending' ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  {status === 'sending' ? 'Sending…'
                    : status === 'ok' ? <><CheckCircle size={15} /> Sent!</>
                    : status === 'err' ? <><AlertCircle size={15} /> Failed — retry</>
                    : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
