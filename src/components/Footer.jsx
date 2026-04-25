import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="section-pad" style={{ background: '#060f1c', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '3rem', fontFamily: "'Sora',sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* Faint watermark logo */}
      <img
        src="/logo.png"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-40px',
          width: '380px',
          opacity: 0.05,
          filter: 'brightness(0) invert(1)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="responsive-footer-grid" style={{ marginBottom: '2rem' }}>
          <div>
            <div style={{ marginBottom: '0.9rem' }}>
              <img src="/logo.png" alt="Afolaray Nigeria Limited" style={{ height: '48px', width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontWeight: 300, maxWidth: '260px' }}>
              Reliable sea freight and vehicle logistics across global markets. We handle documentation, customs clearance, and end-to-end delivery.
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Quick Links</h5>
            {[
              { to: '/', l: 'Home' },
              { to: '/#services', l: 'Services' },
              { to: '/#contact', l: 'Contact' },
              { to: '/#solutions', l: 'Solutions' },
            ].map(item => (
              <Link key={item.l} to={item.to} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 300, transition: 'color 0.2s' }}>
                {item.l}
              </Link>
            ))}
          </div>

          <div>
            <h5 style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Navigation</h5>
            {[
              { to: '/schedules', l: 'Schedules' },
              { to: '/track', l: 'Track Shipment' },
              { to: '/cars', l: 'Cars' },
              { to: '/#about', l: 'About' },
            ].map(item => (
              <Link key={item.l} to={item.to} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 300 }}>
                {item.l}
              </Link>
            ))}
          </div>

          <div>
            <h5 style={{ fontSize: '10px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</h5>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontWeight: 300, marginBottom: '0.5rem' }}>
              11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria
            </p>
            <a href="tel:+2347033576017" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', marginBottom: '0.3rem', fontWeight: 300 }}>+2347033576017</a>
            <a href="mailto:Afolaraynigerialimited@gmail.com" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.72)', textDecoration: 'none', fontWeight: 300 }}>Afolaraynigerialimited@gmail.com</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>© 2025 AFOLARAY NIGERIA LIMITED · Sea freight logistics only.</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>11A Apapa-Oshodi Expressway, Amuwo, Lagos · +234 703 357 6017</p>
        </div>
      </div>
    </footer>
  )
}
