import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Phone } from 'lucide-react'

export default function ScreenCTA() {
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mobile, setMobile]     = useState(() => window.innerWidth < 560)

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 560)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          style={{
            position: 'fixed',
            bottom: mobile ? '16px' : '88px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 900,
            background: '#fff',
            border: '1px solid #dce8f7',
            borderRadius: mobile ? '14px' : '16px',
            padding: mobile ? '0.75rem 1rem' : '1rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: mobile ? '8px' : '12px',
            boxShadow: '0 8px 32px rgba(21,101,192,0.16)',
            width: 'min(calc(100vw - 2rem), 520px)',
          }}
        >
          {!mobile && (
            <span style={{ fontFamily: "'Sora',sans-serif", fontSize: '13px', color: '#5a7599', fontWeight: 300, flex: 1, whiteSpace: 'nowrap' }}>
              Ready to ship your vehicle?
            </span>
          )}

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: mobile ? 1 : 'none' }}>
            <Link to="/#contact" style={{ flex: mobile ? 1 : 'none', display: 'flex' }}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#1565c0', color: '#fff', padding: mobile ? '9px 14px' : '8px 16px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'pointer', flex: mobile ? 1 : 'none', whiteSpace: 'nowrap' }}
              >
                {mobile ? 'Get a Quote' : 'Get a Free Quote'} <ArrowRight size={13} />
              </motion.div>
            </Link>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="tel:+2347033576017"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0f7ff', color: '#1565c0', padding: mobile ? '9px 12px' : '8px 14px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: 600, textDecoration: 'none', border: '1px solid #dce8f7', whiteSpace: 'nowrap' }}
            >
              <Phone size={13} /> {!mobile && 'Call'}
            </motion.a>
          </div>

          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{ background: '#f0f7ff', border: '1px solid #dce8f7', borderRadius: '7px', width: '30px', height: '30px', cursor: 'pointer', color: '#9ab2cc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
