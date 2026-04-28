import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  Home,
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
  const [loading, setLoading]   = useState(true)
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [status, setStatus]           = useState(null)
  const [showPass, setShowPass]       = useState(false)
  const [showConf, setShowConf]       = useState(false)
  const [resetStatus, setResetStatus] = useState(null)
  const navigate                      = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setLoading(false)
      if (u) navigate('/admin', { replace: true })
    })
    return unsub
  }, [])

  const reset = () => { setEmail(''); setPassword(''); setConfirm(''); setStatus(null) }

  const sendReset = async () => {
    const e = email.trim()
    if (!e) { setResetStatus('no-email'); setTimeout(() => setResetStatus(null), 3000); return }
    setResetStatus('sending')
    try {
      await sendPasswordResetEmail(auth, e)
      setResetStatus('sent')
      setTimeout(() => setResetStatus(null), 5000)
    } catch {
      setResetStatus('error')
      setTimeout(() => setResetStatus(null), 4000)
    }
  }

  const submit = async e => {
    e.preventDefault()
    if (mode === 'signup' && password !== confirm) {
      setStatus('Passwords do not match')
      return
    }
    setStatus('working')
    try {
      const cred = mode === 'login'
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password)

      // Mirror user to Firestore so admin dashboard can list users
      await setDoc(doc(db, 'adminUsers', cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        lastLogin: serverTimestamp(),
        isAdmin: true,
        ...(mode === 'signup' ? { createdAt: serverTimestamp(), role: 'admin' } : {}),
      }, { merge: true })

      setStatus('ok')
      // auth listener handles navigation to /admin
    } catch (err) {
      setStatus(err.message || 'Authentication failed')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  if (loading) return (
    <div style={{ ...S, minHeight: '100dvh', background: '#060e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#42a5f5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

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

      {/* Home button — top left */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 20, left: 20,
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '9px 16px',
          color: '#fff', fontSize: 13, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Sora,sans-serif',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Home size={15} /> Home
      </motion.button>

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
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 0 }}>
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
                  <button type="button" onClick={() => setShowConf(p => !p)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', display: 'flex', padding: 0 }}>
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
              fontSize: 14, fontWeight: 700,
              cursor: status === 'working' || status === 'ok' ? 'not-allowed' : 'pointer',
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

          {mode === 'login' && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button
                type="button"
                onClick={sendReset}
                disabled={resetStatus === 'sending' || resetStatus === 'sent'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, fontFamily: 'Sora,sans-serif',
                  color: resetStatus === 'sent' ? '#66bb6a'
                    : resetStatus === 'error' ? '#ef9a9a'
                    : resetStatus === 'no-email' ? '#ffb74d'
                    : 'rgba(255,255,255,0.35)',
                  transition: 'color 0.2s',
                  padding: 0,
                }}
              >
                {resetStatus === 'sending' ? 'Sending…'
                  : resetStatus === 'sent' ? '✓ Reset email sent — check your inbox'
                  : resetStatus === 'error' ? 'Could not send — try again'
                  : resetStatus === 'no-email' ? 'Enter your email above first'
                  : 'Forgot password?'}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
