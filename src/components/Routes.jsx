import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const routes = [
  { flag: '🇺🇸', name: 'USA & Canada', preview: 'New York · Houston · Los Angeles', ports: 'New York · Houston · Los Angeles · Vancouver · Miami' },
  { flag: '🇬🇧', name: 'UK & Europe', preview: 'Rotterdam · Hamburg · Antwerp', ports: 'Rotterdam · Hamburg · Antwerp · Felixstowe · Bremerhaven' },
  { flag: '🇨🇳', name: 'China & Far East', preview: 'Shanghai · Guangzhou · Ningbo', ports: 'Shanghai · Guangzhou · Ningbo · Tokyo · Busan · Shenzhen' },
  { flag: '🇦🇪', name: 'Middle East', preview: 'Dubai · Abu Dhabi · Kuwait', ports: 'Dubai (Jebel Ali) · Abu Dhabi · Kuwait · Bahrain · Muscat' },
  { flag: '🇮🇳', name: 'India & South Asia', preview: 'Mumbai · Chennai · Colombo', ports: 'Mumbai · Chennai · Nhava Sheva · Colombo · Chittagong' },
  { flag: '🌍', name: 'West Africa', preview: 'Cotonou · Tema · Abidjan', ports: 'Cotonou · Tema · Abidjan · Dakar · Accra · Douala' },
]

export default function Routes() {
  const [sel, setSel] = useState(null)
  const scroll = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="routes" style={{ padding: '5rem 3rem', background: '#f7faff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Trade lanes
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.15, marginBottom: '0.6rem' }}>
            Where we ship.
          </h2>
          <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, maxWidth: '400px' }}>
            Select a region to see key ports we serve.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '2rem' }}>
          {routes.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => setSel(sel === i ? null : i)}
              style={{
                background: sel === i ? '#e3f2fd' : '#fff',
                borderRadius: '12px',
                border: sel === i ? '1.5px solid #1565c0' : '1px solid #dce8f7',
                padding: '1.4rem',
                cursor: 'pointer',
                transition: 'all 0.25s',
                position: 'relative',
              }}
            >
              {sel === i && (
                <div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', width: '20px', height: '20px', borderRadius: '50%', background: '#1565c0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
              <div style={{ fontSize: '22px', marginBottom: '0.6rem' }}>{r.flag}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: sel === i ? '#0c447c' : '#0d1b2e', marginBottom: '0.3rem', transition: 'color 0.2s' }}>{r.name}</div>
              <div style={{ fontSize: '11px', color: sel === i ? '#185fa5' : '#5a7599', lineHeight: 1.5, fontWeight: 300, transition: 'color 0.2s' }}>{r.preview}</div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {sel !== null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{
                marginTop: '12px', background: '#fff',
                border: '1px solid #dce8f7', borderRadius: '12px',
                padding: '1.2rem 1.6rem',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#5a7599', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Ports served
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0d1b2e' }}>{routes[sel].ports}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03, background: '#0d47a1' }}
                whileTap={{ scale: 0.97 }}
                onClick={scroll}
                style={{
                  fontSize: '13px', color: '#fff', background: '#1565c0',
                  border: 'none', padding: '10px 20px', borderRadius: '8px',
                  cursor: 'pointer', fontFamily: "'Sora',sans-serif", fontWeight: 600,
                  transition: 'background 0.2s',
                }}
              >
                Get rate for this lane →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
