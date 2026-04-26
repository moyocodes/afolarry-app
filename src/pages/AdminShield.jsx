import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import {
  ShieldCheck,
  LogOut,
  CheckCircle,
  AlertCircle,
  Car,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const S = { fontFamily: "'Sora',sans-serif" }

const inp =
  'border border-white/12 px-4 py-3 rounded-xl font-[Sora,sans-serif] text-[14px] outline-none w-full focus:border-[#42a5f5] transition'

const inpStyle = {
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  WebkitTextFillColor: '#fff',
}

const placeholderStyle = `
  .shield-inp::placeholder { color: rgba(255,255,255,0.3); opacity: 1; }
`

export default function AdminShield() {
  const [user, setUser]       = useState(undefined) // undefined = loading
  const [mode, setMode]       = useState('login')   // 'login' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus]     = useState(null)      // null | 'working' | 'ok' | string(err)
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const navigate                = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u ?? null))
    return unsub
  }, [])

  const reset = () => {
    setEmail('')
    setPassword('')
    setConfirm('')
    setStatus(null)
  }

  const submit = async e => {
    e.preventDefault()
    if (mode === 'signup' && password !== confirm) {
      setStatus('Passwords do not match')
      return
    }
    setStatus('working')
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      setStatus('ok')
    } catch (err) {
      setStatus(err.message || 'Authentication failed')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const logout = async () => {
    await signOut(auth).catch(() => {})
    reset()
  }

  // Still loading Firebase auth state
  if (user === undefined) {
    return (
      <div style={{ ...S, minHeight: '100dvh', background: '#060e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#42a5f5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  // ── Logged in ──────────────────────────────────────────────────────────────
  if (user) {
    return (
      <div
        style={{
          ...S,
          minHeight: '100dvh',
          background: 'radial-gradient(ellipse at 50% 30%, #0d2a50 0%, #060e1a 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        {/* Glow */}
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,101,192,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}
        >
          {/* Shield icon */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
              boxShadow: '0 0 60px rgba(21,101,192,0.5), 0 0 120px rgba(21,101,192,0.2)',
              marginBottom: 28,
            }}
          >
            <ShieldCheck size={48} color="#fff" strokeWidth={1.5} />
          </motion.div>

          <p style={{ fontSize: 11, fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
            Admin Access
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>
            You're in
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 36 }}>
            {user.email}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/cars')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: 'linear-gradient(135deg, #1565c0 0%, #1255a8 100%)',
                color: '#fff', border: 'none', borderRadius: 14, padding: '14px 24px',
                fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora,sans-serif',
                boxShadow: '0 4px 20px rgba(21,101,192,0.35)',
              }}
            >
              <Car size={18} />
              Manage Cars
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)', borderRadius: 14, padding: '14px 24px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora,sans-serif',
              }}
            >
              <LogOut size={16} />
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── Auth form ──────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        ...S,
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 50% 30%, #0d2a50 0%, #060e1a 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <style>{placeholderStyle}</style>
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,101,192,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: 'rgba(13,27,46,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 420,
        }}
      >
        {/* Icon */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
            boxShadow: '0 0 40px rgba(21,101,192,0.4)', marginBottom: 16,
          }}>
            <ShieldCheck size={34} color="#fff" strokeWidth={1.5} />
          </div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#42a5f5', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            Afolaray Admin
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>
            {mode === 'login' ? 'Sign in to continue' : 'Create admin account'}
          </h1>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
          {[['login', Lock, 'Login'], ['signup', UserPlus, 'Create Account']].map(([m, Icon, label]) => (
            <button
              key={m}
              onClick={() => { setMode(m); reset() }}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: mode === m ? 'rgba(21,101,192,0.7)' : 'transparent',
                border: 'none', borderRadius: 9, padding: '9px 12px',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.35)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora,sans-serif',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="admin@afolaray.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={`shield-inp ${inp}`}
              style={inpStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`shield-inp ${inp}`}
                style={{ ...inpStyle, paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 0 }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mode === 'signup' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConf ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required={mode === 'signup'}
                    className={`shield-inp ${inp}`}
                    style={{ ...inpStyle, paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConf(p => !p)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 0 }}
                  >
                    {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={status === 'working' || status === 'ok'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: status === 'ok'
                ? 'linear-gradient(135deg, #2e7d32, #1b5e20)'
                : typeof status === 'string' && status !== 'working'
                  ? 'linear-gradient(135deg, #c62828, #b71c1c)'
                  : 'linear-gradient(135deg, #1565c0, #0d47a1)',
              color: '#fff', border: 'none', borderRadius: 12, padding: '14px 24px',
              fontSize: 14, fontWeight: 700, cursor: status === 'working' || status === 'ok' ? 'not-allowed' : 'pointer',
              fontFamily: 'Sora,sans-serif',
              opacity: status === 'working' || status === 'ok' ? 0.75 : 1,
              boxShadow: '0 4px 20px rgba(21,101,192,0.3)',
              transition: 'background 0.2s',
            }}
          >
            {status === 'working' ? (
              mode === 'login' ? 'Signing in…' : 'Creating account…'
            ) : status === 'ok' ? (
              <><CheckCircle size={15} /> Success!</>
            ) : typeof status === 'string' ? (
              <><AlertCircle size={15} /> {status}</>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
