import { motion } from 'framer-motion'
import { Shield, Award, Users, Globe } from 'lucide-react'

const S = { fontFamily: "'Sora',sans-serif" }

const values = [
  { icon: <Shield size={22} />, title: 'Integrity', body: 'Every document, every duty, every declaration handled with full transparency and zero compromise.' },
  { icon: <Award size={22} />, title: 'Excellence', body: 'Twelve years of refining our process. We do not cut corners on compliance or customer care.' },
  { icon: <Users size={22} />, title: 'Relationships', body: 'Long-term client partnerships built on consistency. You get one account manager from booking to delivery.' },
  { icon: <Globe size={22} />, title: 'Global Reach', body: 'Thirty active trade corridors. From Houston to Hamburg to Guangzhou — we know the ports and the paperwork.' },
]

const team = [
  { name: 'Afolabi Ogunsanya', role: 'Managing Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop' },
  { name: 'Ronke Adeyemi', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&auto=format&fit=crop' },
  { name: 'Chukwudi Eze', role: 'Customs & Compliance', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop' },
]

const fade = { hidden: { opacity: 0, y: 24 }, show: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i*0.1 } }) }

export default function About() {
  return (
    <div style={S}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)', padding: '5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(66,165,245,0.15) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div variants={fade} custom={0} initial="hidden" animate="show">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>About Us</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>
              Nigeria's trusted<br />sea freight partner.
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, maxWidth: '520px', fontWeight: 300 }}>
              Founded in 2012, Afolaray Nigeria Limited has grown from a single-operator clearing agency into one of Lagos's most respected ocean freight forwarders — moving cargo across 30+ global trade lanes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div variants={fade} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Our Story</div>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e', lineHeight: 1.2, marginBottom: '1.2rem' }}>
              Built in Lagos.<br />Connected to the world.
            </h2>
            <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.9, fontWeight: 300, marginBottom: '1rem' }}>
              Afolaray Nigeria Limited was established in 2012 on Apapa-Oshodi Expressway, Amuwo — the heartbeat of Lagos port logistics. From day one, our goal was simple: move cargo correctly, completely, and on time.
            </p>
            <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.9, fontWeight: 300, marginBottom: '1rem' }}>
              Over twelve years we have built deep relationships with Nigerian Customs Service, NAFDAC, and shipping lines across Europe, Asia, and North America. Every shipment we handle carries the weight of that accumulated trust.
            </p>
            <p style={{ fontSize: '14px', color: '#5a7599', lineHeight: 1.9, fontWeight: 300 }}>
              Today we serve importers, manufacturers, traders, and individuals — from single LCL consignments to multi-container FCL programmes — with the same standard of care we applied to our very first clearance job.
            </p>
          </motion.div>
          <motion.div variants={fade} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(21,101,192,0.15)' }}>
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80&auto=format&fit=crop" alt="Lagos port" style={{ width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '4rem 3rem', background: '#f7faff', borderTop: '1px solid #dce8f7', borderBottom: '1px solid #dce8f7' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>What we stand for</div>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e' }}>Our values</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: '16px', padding: '2rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1565c0', marginBottom: '1.2rem' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.6rem' }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: '#5a7599', lineHeight: 1.75, fontWeight: 300 }}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>The people</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 700, color: '#0d1b2e' }}>Meet the team</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {team.map((m, i) => (
            <motion.div key={m.name} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '3px solid #e3f2fd', boxShadow: '0 8px 24px rgba(21,101,192,0.1)' }}>
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0d1b2e', marginBottom: '4px' }}>{m.name}</div>
              <div style={{ fontSize: '12px', color: '#5a7599', fontWeight: 400 }}>{m.role}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
