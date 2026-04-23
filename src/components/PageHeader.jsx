import { motion } from 'framer-motion'

const defaultImage =
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&auto=format&fit=crop'

export default function PageHeader({
  eyebrow,
  title,
  description,
  image = defaultImage,
  children,
  maxWidth = '1280px',
}) {
  return (
    <section
      className="section-pad"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 3rem',
        minHeight: '320px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(6,15,28,0.92) 0%, rgba(13,27,46,0.82) 42%, rgba(21,101,192,0.62) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 78% 36%, rgba(66,165,245,0.2) 0%, transparent 40%)',
          }}
        />
      </div>

      <div
        className="page-header-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#7dc4ff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
              fontFamily: "'Sora',sans-serif",
            }}
          >
            {eyebrow}
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem,4vw,3.2rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.08,
              margin: '0 0 1rem',
              letterSpacing: '-0.02em',
              fontFamily: "'Sora',sans-serif",
              maxWidth: '720px',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: '560px',
                margin: 0,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {children ? (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
