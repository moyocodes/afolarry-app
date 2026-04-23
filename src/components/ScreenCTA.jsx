import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Phone } from 'lucide-react'

export default function ScreenCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed && window.scrollY > 600) setVisible(true)
      else if (window.scrollY <= 600) setVisible(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const dismiss = () => { setDismissed(true); setVisible(false) }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          style={{
            position: 'fixed', bottom: '84px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 900,
            background: '#0d1b2e',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '1rem 1.4rem',
            display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 16px 50px rgba(4,14,30,0.45)',
            backdropFilter: 'blur(12px)',
            flexWrap: 'wrap',
            width: 'min(calc(100vw - 2rem), 560px)',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300, flex: '1 1 180px' }}>
            Ready to ship your vehicle?
          </span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/#contact">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1565c0', color: '#fff', padding: '8px 16px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}
              >
                Get a Free Quote <ArrowRight size={13} />
              </motion.div>
            </Link>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="tel:+2347033576017"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '8px 14px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <Phone size={13} /> Call
            </motion.a>
          </div>

          <button
            onClick={dismiss}
            style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '7px', width: '28px', height: '28px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
