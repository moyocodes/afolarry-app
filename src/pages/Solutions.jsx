import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Ship, FileText, Package, Truck, Gavel, MapPin, ArrowRight } from 'lucide-react'

const S = { fontFamily: "'Sora',sans-serif" }
const fade = { hidden: { opacity: 0, y: 24 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i*0.1 } }) }

const cargoTypes = [
  { icon: <Ship size={22} />, title: 'RoRo Shipments', body: 'Cars, trucks, SUVs, buses, and rolling equipment moved safely via RoRo vessels.' },
  { icon: <Truck size={22} />, title: 'High & Heavy', body: 'Oversized machinery, construction equipment, and industrial units handled with care.' },
  { icon: <Package size={22} />, title: 'Containerized Cargo', body: 'Standard, high-cube, and specialty containers organized for efficient ocean transit.' },
  { icon: <FileText size={22} />, title: 'General Cargo', body: 'Mixed freight and boxed goods consolidated for reliable port-to-port delivery.' },
]

const destinations = [
  { flag: '🇺🇸', name: 'North America', body: 'Major U.S. and Canadian ports with frequent departures.' },
  { flag: '🌍', name: 'West Africa', body: 'Key coastal ports for fast clearance and local delivery coordination.' },
  { flag: '⚓', name: 'Port-to-Port Focus', body: 'We specialise in sea freight routing with consistent schedules and tracking.' },
]

export default function Solutions() {
  return (
    <div style={S}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)', padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 40%, rgba(66,165,245,0.18) 0%, transparent 55%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Solutions</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.2rem', maxWidth: '600px' }}>
              Sea Freight Solutions Built for Vehicle Logistics
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, maxWidth: '520px', fontWeight: 300, marginBottom: '2rem' }}>
              We move vehicles, machinery, and cargo by sea only. From planning and documentation to loading and port delivery, our ocean-forwarding team keeps every shipment on course.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/track" style={{ fontSize: '13px', color: '#fff', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '11px 22px', borderRadius: '9px', textDecoration: 'none', fontWeight: 600, backdropFilter: 'blur(8px)' }}>
                Track Shipment
              </Link>
              <Link to="/contact" style={{ fontSize: '13px', color: '#1565c0', background: '#fff', padding: '11px 22px', borderRadius: '9px', textDecoration: 'none', fontWeight: 700 }}>
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mode of transport */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Mode of Transport</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.2, marginBottom: '0.6rem' }}>We operate exclusively by sea.</h2>
          <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, maxWidth: '560px' }}>
            Ideal when cost efficiency is essential and timelines are planned. We coordinate export documentation, port handling, and customs clearance for smooth ocean transit.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {[
            {
              title: 'Sea Freight', color: '#e3f2fd',
              features: ['FCL and LCL shipments', 'RoRo and break-bulk options', 'Door-to-port or door-to-door'],
              body: 'Ideal when cost efficiency is essential and timelines are planned. We coordinate export documentation, port handling, and customs clearance for smooth ocean transit.',
            },
            {
              title: 'Ocean Compliance', color: '#f7faff',
              features: ['Export documentation support', 'Customs coordination', 'Real-time tracking updates'],
              body: 'Our team handles shipping instructions, compliance checks, and vessel scheduling to keep cargo moving across North America and West Africa.',
            },
          ].map((item, i) => (
            <motion.div key={item.title} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ background: item.color, border: '1px solid #dce8f7', borderRadius: '16px', padding: '2rem' }}>
              <Ship size={28} color="#1565c0" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.8rem' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#5a7599', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.2rem' }}>{item.body}</p>
              {item.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0c447c', marginBottom: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1565c0', flexShrink: 0, display: 'inline-block' }} />
                  {f}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cargo types */}
      <section style={{ padding: '4rem 3rem', background: '#f7faff', borderTop: '1px solid #dce8f7', borderBottom: '1px solid #dce8f7' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Cargo Types We Handle</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e' }}>Flexible sea freight solutions for vehicles, equipment, and general cargo.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.2rem' }}>
            {cargoTypes.map((c, i) => (
              <motion.div key={c.title} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: '14px', padding: '1.6rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0', marginBottom: '1rem' }}>
                  {c.icon}
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.5rem' }}>{c.title}</h4>
                <p style={{ fontSize: '12px', color: '#5a7599', lineHeight: 1.7, fontWeight: 300 }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction services */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Auction Services</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.2, marginBottom: '1rem' }}>
              Support for auction vehicles from bid to vessel loading.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                { title: 'Transport from Auctions', body: 'We pick up vehicles from auction yards and coordinate inland delivery to the nearest port for sea shipment.' },
                { title: 'Bid & Buy Assistance', body: 'Guidance on paperwork, title readiness, and export procedures so your purchase ships without delays.' },
              ].map(item => (
                <div key={item.title} style={{ background: '#f7faff', border: '1px solid #dce8f7', borderRadius: '12px', padding: '1.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <Gavel size={16} color="#1565c0" />
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0d1b2e' }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: '#5a7599', lineHeight: 1.75, fontWeight: 300 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fade} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(21,101,192,0.12)' }}>
              <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80&auto=format&fit=crop" alt="Vehicle auction" style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations */}
      <section style={{ padding: '4rem 3rem', background: '#0d1b2e' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Destinations</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#fff' }}>Focused routes across North America and West Africa.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginBottom: '2.5rem' }}>
            {destinations.map((d, i) => (
              <motion.div key={d.name} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1.6rem' }}>
                <div style={{ fontSize: '28px', marginBottom: '0.8rem' }}>{d.flag}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{d.name}</h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300 }}>{d.body}</p>
              </motion.div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/track" style={{ fontSize: '13px', color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', padding: '11px 22px', borderRadius: '9px', textDecoration: 'none', fontWeight: 600 }}>
              Track Shipment
            </Link>
            <Link to="/contact" style={{ fontSize: '13px', color: '#0d1b2e', background: '#fff', padding: '11px 22px', borderRadius: '9px', textDecoration: 'none', fontWeight: 700 }}>
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
