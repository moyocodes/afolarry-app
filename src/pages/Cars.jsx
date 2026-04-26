import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import emailjs from '@emailjs/browser'
import { db, storage, auth } from '../lib/firebase'
import { EJS_SERVICE, EJS_ORDER, EJS_PUBLIC } from '../lib/emailjs'
import PageHeader from '../components/PageHeader'
import {
  Search, X, Plus, Pencil, Trash2,
  LogOut, Upload, CheckCircle, AlertCircle, ChevronLeft, ChevronRight,
  ShieldCheck,
} from 'lucide-react'

const S = { fontFamily: "'Sora',sans-serif" }
const PER_PAGE = 8


const fmt = n => '₦' + Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2 })

const BLANK_FORM = { name: '', type: 'Used Nigeria', location: 'Nigeria (Used)', price: '', status: 'available', image: '', description: '' }

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ car, onClose }) {
  const formRef = useRef()
  const [status, setStatus] = useState(null)

  const send = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_ORDER, formRef.current, EJS_PUBLIC)
      setStatus('ok')
      setTimeout(() => { setStatus(null); onClose() }, 3000)
    } catch {
      setStatus('err')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(13,27,46,0.75)', zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }}
        style={{ background: '#0d1b2e', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Place Your Order</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{car.name}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>{fmt(car.price)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', width: '34px', height: '34px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} />
          </button>
        </div>
        <form ref={formRef} onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="hidden" name="car_name" value={car.name} />
          <input type="hidden" name="car_price" value={fmt(car.price)} />
          <input type="hidden" name="car_type" value={car.type} />
          {[
            { name: 'from_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
            { name: 'from_email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234...' },
            { name: 'city', label: 'Preferred Delivery City', type: 'text', placeholder: 'e.g. Lagos, Abuja' },
          ].map(f => (
            <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.label}</label>
              <input name={f.name} type={f.type} placeholder={f.placeholder} required
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '10px 14px', borderRadius: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', width: '100%' }} />
            </div>
          ))}
          <motion.button type="submit" disabled={status === 'sending'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ marginTop: '0.5rem', background: status === 'ok' ? '#2e7d32' : status === 'err' ? '#c62828' : '#1e88e5', color: '#fff', border: 'none', padding: '12px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {status === 'sending' ? 'Submitting…' : status === 'ok' ? <><CheckCircle size={15} /> Order sent!</> : status === 'err' ? <><AlertCircle size={15} /> Failed — try again</> : 'Submit Order'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ─── Admin Drawer ─────────────────────────────────────────────────────────────
function AdminDrawer({ open, onClose, user, cars, onRefresh }) {
  const [form, setForm] = useState(BLANK_FORM)
  const [editId, setEditId] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [imgPreview, setImgPreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState(null)
  const [tab, setTab] = useState('list')

  const resetForm = () => { setForm(BLANK_FORM); setEditId(null); setImgFile(null); setImgPreview(null); setSaveErr(null) }

  const pickFile = e => {
    const file = e.target.files[0]
    if (!file) return
    setImgFile(file)
    setImgPreview(URL.createObjectURL(file))
    setForm(p => ({ ...p, image: '' }))
  }

  const uploadImage = () => new Promise((resolve, reject) => {
    if (!imgFile) return resolve(form.image)
    const storageRef = ref(storage, `cars/${Date.now()}_${imgFile.name}`)
    const task = uploadBytesResumable(storageRef, imgFile)
    task.on('state_changed',
      snap => setUploadProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
      reject,
      async () => { resolve(await getDownloadURL(task.snapshot.ref)) }
    )
  })

  const save = async e => {
    e.preventDefault()
    setSaving(true); setSaveErr(null); setUploadProgress(null)
    try {
      const imageUrl = await uploadImage()
      const data = { ...form, price: Number(form.price), image: imageUrl }
      if (editId) {
        await updateDoc(doc(db, 'cars', editId), data)
      } else {
        await addDoc(collection(db, 'cars'), { ...data, createdAt: Date.now() })
      }
      resetForm(); setTab('list'); onRefresh()
    } catch (err) {
      setSaveErr(err.message || 'Save failed. Check Firebase rules.')
    } finally {
      setSaving(false); setUploadProgress(null)
    }
  }

  const startEdit = car => {
    setForm({ name: car.name, type: car.type, location: car.location, price: car.price, status: car.status, image: car.image || '', description: car.description || '' })
    setEditId(car.id); setImgFile(null); setImgPreview(car.image || null); setSaveErr(null)
    setTab('add')
  }

  const remove = async id => {
    if (!window.confirm('Delete this car?')) return
    try {
      await deleteDoc(doc(db, 'cars', id))
      onRefresh()
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  const inp = { background: '#fff', border: '1px solid #dce8f7', color: '#0d1b2e', padding: '9px 12px', borderRadius: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', width: '100%' }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(13,27,46,0.45)', zIndex: 800 }} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '480px', background: '#fff', zIndex: 810, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(13,27,46,0.18)' }}
          >
            {/* Header */}
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #dce8f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d1b2e', flexShrink: 0 }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#42a5f5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{user?.email}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => signOut(auth).then(onClose)}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '7px 12px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontFamily: "'Sora',sans-serif" }}>
                  <LogOut size={13} /> Sign out
                </button>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '7px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #dce8f7', flexShrink: 0 }}>
              {[{ id: 'list', label: `Cars (${cars.length})` }, { id: 'add', label: editId ? 'Edit Car' : 'Add Car' }].map(t => (
                <button key={t.id}
                  onClick={() => { setTab(t.id); if (t.id === 'list') resetForm() }}
                  style={{ flex: 1, padding: '12px', background: tab === t.id ? '#fff' : '#f7faff', border: 'none', borderBottom: tab === t.id ? '2px solid #1565c0' : '2px solid transparent', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? '#1565c0' : '#5a7599', cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              {tab === 'list' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => { resetForm(); setTab('add') }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1565c0', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '0.25rem' }}>
                    <Plus size={15} /> Add New Car
                  </button>
                  {cars.length === 0 && <div style={{ fontSize: '13px', color: '#5a7599', textAlign: 'center', padding: '2rem' }}>No cars yet.</div>}
                  {cars.map(car => (
                    <div key={car.id} style={{ background: '#f7faff', border: '1px solid #dce8f7', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      {car.image && <img src={car.image} alt={car.name} style={{ width: '70px', height: '52px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0d1b2e', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{car.name}</div>
                        <div style={{ fontSize: '12px', color: '#1565c0', fontWeight: 600, marginBottom: '3px' }}>{fmt(car.price)}</div>
                        <span style={{ background: car.status === 'available' ? '#e8f5e9' : '#fff3e0', color: car.status === 'available' ? '#2e7d32' : '#e65100', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px' }}>
                          {car.status === 'available' ? 'Available' : 'Pre-Order'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <button onClick={() => startEdit(car)} style={{ background: '#e3f2fd', border: 'none', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: '#1565c0', display: 'flex' }}><Pencil size={14} /></button>
                        <button onClick={() => remove(car.id)} style={{ background: '#ffebee', border: 'none', borderRadius: '7px', padding: '7px', cursor: 'pointer', color: '#c62828', display: 'flex' }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0d1b2e', margin: '0 0 0.2rem' }}>{editId ? 'Edit Car' : 'Add New Car'}</h3>

                  {[
                    { key: 'name', label: 'Car Name', type: 'text', placeholder: 'e.g. Toyota Camry (Used)' },
                    { key: 'price', label: 'Price (₦)', type: 'number', placeholder: '0' },
                    { key: 'location', label: 'Location', type: 'text', placeholder: 'Nigeria (Used)' },
                  ].map(f => (
                    <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '10px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} required
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={inp} />
                    </div>
                  ))}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Type</label>
                    <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={inp}>
                      <option>Used Nigeria</option><option>Tokunbo</option><option>Pre-Order</option><option>New</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Status</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={inp}>
                      <option value="available">Available Now</option><option value="preorder">Pre-Order</option>
                    </select>
                  </div>

                  {/* Image upload */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Image</label>
                    <input type="text" placeholder="Paste image URL (optional)" value={form.image}
                      onChange={e => { setForm(p => ({ ...p, image: e.target.value })); setImgFile(null); setImgPreview(e.target.value || null) }} style={inp} />
                    <div style={{ fontSize: '11px', color: '#5a7599', textAlign: 'center' }}>— or upload a file —</div>
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f7faff', border: '1.5px dashed #c7d7f5', borderRadius: '9px', padding: '10px', cursor: 'pointer', fontSize: '12px', color: '#5a7599', fontWeight: 500 }}>
                      <Upload size={14} color="#1565c0" />
                      {imgFile ? imgFile.name : 'Click to upload image'}
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={pickFile} />
                    </label>
                    {/* Preview */}
                    {imgPreview && (
                      <div style={{ position: 'relative' }}>
                        <img src={imgPreview} alt="preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '9px', border: '1px solid #dce8f7', display: 'block' }} />
                        <button type="button" onClick={() => { setImgFile(null); setImgPreview(null); setForm(p => ({ ...p, image: '' })) }}
                          style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.55)', border: 'none', borderRadius: '6px', padding: '4px', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    {/* Upload progress */}
                    {uploadProgress !== null && (
                      <div style={{ background: '#e3f2fd', borderRadius: '6px', overflow: 'hidden', height: '6px' }}>
                        <div style={{ width: uploadProgress + '%', height: '100%', background: '#1565c0', transition: 'width 0.3s' }} />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Description</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ ...inp, resize: 'vertical' }} />
                  </div>

                  {saveErr && (
                    <div style={{ fontSize: '12px', color: '#c62828', background: '#ffebee', padding: '10px 12px', borderRadius: '8px', lineHeight: 1.5 }}>
                      <strong>Error:</strong> {saveErr}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                    <button type="submit" disabled={saving}
                      style={{ flex: 2, background: '#1565c0', color: '#fff', border: 'none', padding: '11px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                      {saving ? 'Saving…' : editId ? 'Update Car' : 'Add Car'}
                    </button>
                    <button type="button" onClick={() => { resetForm(); setTab('list') }}
                      style={{ flex: 1, background: '#f7faff', border: '1px solid #dce8f7', color: '#5a7599', padding: '11px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Cars Page ────────────────────────────────────────────────────────────────
export default function Cars() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [orderCar, setOrderCar] = useState(null)
  const [adminOpen, setAdminOpen] = useState(false)

  // Track Firebase Auth state at page level
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setAuthReady(true) })
    return unsub
  }, [])

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'cars'), orderBy('createdAt', 'desc')))
      setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      setCars([])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const types = ['All', ...Array.from(new Set(cars.map(c => c.type)))]

  const filtered = cars.filter(c => {
    if (filterType !== 'All' && c.type !== filterType) return false
    if (minPrice && c.price < Number(minPrice)) return false
    if (maxPrice && c.price > Number(maxPrice)) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Cars"
        title="Available Cars & Pre-Orders"
        description="Browse in-stock vehicles or place a pre-order for upcoming arrivals."
        image="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80&auto=format&fit=crop"
      />

      {/* Filters */}
      <div style={{ background: '#f7faff', borderBottom: '1px solid #dce8f7', padding: '1.2rem 3rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ position: 'relative', flex: '1 1 200px' }}>
            <Search size={14} color="#5a7599" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="text" placeholder="Search cars…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
              style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #dce8f7', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '9px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Type</label>
            <select value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1) }}
              style={{ padding: '9px 12px', border: '1px solid #dce8f7', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', background: '#fff', minWidth: '140px' }}>
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '9px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Min ₦</label>
            <input type="number" placeholder="0" value={minPrice} onChange={e => { setMinPrice(e.target.value); setPage(1) }}
              style={{ padding: '9px 12px', border: '1px solid #dce8f7', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', background: '#fff', width: '120px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '9px', fontWeight: 700, color: '#5a7599', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Max ₦</label>
            <input type="number" placeholder="No limit" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setPage(1) }}
              style={{ padding: '9px 12px', border: '1px solid #dce8f7', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', outline: 'none', background: '#fff', width: '120px' }} />
          </div>
          {(search || filterType !== 'All' || minPrice || maxPrice) && (
            <button onClick={() => { setSearch(''); setFilterType('All'); setMinPrice(''); setMaxPrice(''); setPage(1) }}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#ffebee', border: 'none', color: '#c62828', padding: '9px 14px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              <X size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <section style={{ padding: '3rem', maxWidth: '1280px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#5a7599', fontSize: '14px' }}>Loading cars…</div>
        ) : cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '18px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.5rem' }}>No vehicles listed yet</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#5a7599', fontWeight: 300, maxWidth: '380px', margin: '0 auto' }}>
              Check back soon — new stock and pre-orders will appear here once uploaded.
            </div>
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#5a7599', fontSize: '14px' }}>No cars match your filters.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {paginated.map((car, i) => (
              <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -5 }}
                style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(21,101,192,0.05)', position: 'relative' }}>
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#f7faff' }}>
                  {car.image
                    ? <img src={car.image} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a7599', fontSize: '12px' }}>No image</div>
                  }
                  <div style={{ position: 'absolute', top: '0.7rem', left: '0.7rem', background: car.status === 'available' ? '#2e7d32' : '#e65100', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', letterSpacing: '0.06em' }}>
                    {car.status === 'available' ? 'Available Now' : 'Pre-Order'}
                  </div>
                  {/* Admin quick-action overlay */}
                  {user && (
                    <div style={{ position: 'absolute', top: '0.7rem', right: '0.7rem', display: 'flex', gap: '5px' }}>
                      <button onClick={() => { setAdminOpen(true) }}
                        title="Edit"
                        style={{ background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '7px', padding: '6px', cursor: 'pointer', display: 'flex', color: '#1565c0' }}>
                        <Pencil size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '1.2rem' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0d1b2e', marginBottom: '0.3rem' }}>{car.name}</div>
                  <div style={{ fontSize: '11px', color: '#5a7599', marginBottom: '2px' }}>Type: {car.type}</div>
                  <div style={{ fontSize: '11px', color: '#5a7599', marginBottom: '0.8rem' }}>Location: {car.location}</div>
                  {car.description && <div style={{ fontSize: '11px', color: '#5a7599', lineHeight: 1.6, marginBottom: '0.8rem', fontWeight: 300 }}>{car.description}</div>}
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#1565c0', marginBottom: '1rem' }}>{fmt(car.price)}</div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setOrderCar(car)}
                    style={{ width: '100%', background: '#1565c0', color: '#fff', border: 'none', padding: '11px', borderRadius: '9px', fontFamily: "'Sora',sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                    Order This Car
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '3rem' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ background: page === 1 ? '#f7faff' : '#e3f2fd', border: '1px solid #dce8f7', borderRadius: '8px', padding: '8px 14px', cursor: page === 1 ? 'default' : 'pointer', color: '#1565c0', display: 'flex', alignItems: 'center', opacity: page === 1 ? 0.4 : 1 }}>
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontSize: '13px', color: '#5a7599', fontWeight: 500 }}>Page {page} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ background: page === totalPages ? '#f7faff' : '#e3f2fd', border: '1px solid #dce8f7', borderRadius: '8px', padding: '8px 14px', cursor: page === totalPages ? 'default' : 'pointer', color: '#1565c0', display: 'flex', alignItems: 'center', opacity: page === totalPages ? 0.4 : 1 }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* Admin FAB — only visible when logged in via mail dashboard */}
      {user && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={() => setAdminOpen(true)}
          title="Admin panel"
          style={{ position: 'fixed', bottom: '88px', right: '20px', zIndex: 800, width: '48px', height: '48px', borderRadius: '50%', background: '#1565c0', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(21,101,192,0.4)' }}
        >
          <ShieldCheck size={20} />
        </motion.button>
      )}

      <AnimatePresence>
        {orderCar && <OrderModal car={orderCar} onClose={() => setOrderCar(null)} />}
      </AnimatePresence>

      {user && (
        <AdminDrawer open={adminOpen} onClose={() => setAdminOpen(false)} user={user} cars={cars} onRefresh={load} />
      )}
    </div>
  )
}
