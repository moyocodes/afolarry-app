import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy,
} from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { db, auth } from '../lib/firebase'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, LogOut, X, CheckCircle, Clock,
  Ship, ChevronLeft, Save,
} from 'lucide-react'

const S = { fontFamily: "'Sora',sans-serif" }

const DEFAULT_MILESTONES = [
  'Booking Confirmed',
  'Cargo Collected',
  'Departed Origin Port',
  'In Transit',
  'Arrived Destination Port',
  'Customs Clearance',
  'Delivered',
]

const STATUSES = [
  'Pending',
  'Booking Confirmed',
  'In Transit',
  'Departed',
  'Arrived',
  'Customs Clearance',
  'Delivered',
]

const BLANK = {
  shipmentId: '',
  status: 'Pending',
  customerName: '',
  customerEmail: '',
  recipientEmail: '',
  origin: '',
  destination: '',
  carrier: '',
  vessel: '',
  eta: '',
  notes: '',
  milestones: DEFAULT_MILESTONES.map(label => ({ label, done: false, date: '' })),
}

const inp = 'w-full px-3 py-2.5 rounded-lg border border-[#dce8f7] bg-white text-[#0d1b2e] font-[Sora,sans-serif] text-[13px] outline-none focus:border-[#1565c0] transition'
const lbl = 'text-[10px] font-bold text-[#5a7599] tracking-[0.1em] uppercase'

export default function ShipmentsAdmin() {
  const [user, setUser] = useState(undefined)
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'form'
  const [form, setForm] = useState(BLANK)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState(null)
  const [sendEmail, setSendEmail] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      if (!u) navigate('/shield')
      else setUser(u)
    })
    return unsub
  }, [])

  const load = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(query(collection(db, 'shipments'), orderBy('createdAt', 'desc')))
      setShipments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      setShipments([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (user) load() }, [user])

  const resetForm = () => {
    setForm(BLANK)
    setEditId(null)
    setSaveErr(null)
    setSendEmail(true)
  }

  const startEdit = (s) => {
    setForm({
      shipmentId: s.shipmentId || '',
      status: s.status || 'Pending',
      customerName: s.customerName || '',
      customerEmail: s.customerEmail || '',
      recipientEmail: s.recipientEmail || '',
      origin: s.origin || '',
      destination: s.destination || '',
      carrier: s.carrier || '',
      vessel: s.vessel || '',
      eta: s.eta ? new Date(s.eta).toISOString().slice(0, 10) : '',
      notes: s.notes || '',
      milestones: Array.isArray(s.milestones) && s.milestones.length
        ? s.milestones.map(m => ({ label: m.label, done: !!m.done, date: m.date ? new Date(m.date).toISOString().slice(0, 10) : '' }))
        : BLANK.milestones,
    })
    setEditId(s.id)
    setSaveErr(null)
    setView('form')
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveErr(null)
    try {
      const data = {
        ...form,
        shipmentId: form.shipmentId.trim().toUpperCase(),
        eta: form.eta ? new Date(form.eta).getTime() : null,
        milestones: form.milestones.map(m => ({
          label: m.label,
          done: m.done,
          date: m.date ? new Date(m.date).getTime() : null,
        })),
      }
      if (editId) {
        await updateDoc(doc(db, 'shipments', editId), data)
      } else {
        await addDoc(collection(db, 'shipments'), { ...data, createdAt: Date.now() })
      }
      if (sendEmail) {
        fetch('/api/shipment-notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shipmentId: data.shipmentId,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            recipientEmail: data.recipientEmail,
            origin: data.origin,
            destination: data.destination,
            carrier: data.carrier,
            vessel: data.vessel,
            eta: data.eta,
            status: data.status,
            notes: data.notes,
            isUpdate: !!editId,
          }),
        }).catch(() => {})
      }
      resetForm()
      setView('list')
      load()
    } catch (err) {
      setSaveErr(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this shipment?')) return
    await deleteDoc(doc(db, 'shipments', id)).catch(() => {})
    load()
  }

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const setMilestone = (i, key, val) =>
    setForm(p => ({
      ...p,
      milestones: p.milestones.map((m, idx) => idx === i ? { ...m, [key]: val } : m),
    }))

  const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  if (user === undefined) return (
    <div style={{ ...S, minHeight: '100dvh', background: '#060e1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,0.15)', borderTopColor: '#42a5f5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return (
    <div style={{ ...S, minHeight: '100dvh', background: '#f7faff' }}>
      {/* Top bar */}
      <div style={{ background: '#0d1b2e', padding: '0 1.5rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/shield')}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '6px 10px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'Sora,sans-serif' }}
          >
            <ChevronLeft size={14} /> Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ship size={16} color="#42a5f5" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Shipments Admin</span>
          </div>
        </div>
        <button
          onClick={() => signOut(auth).then(() => navigate('/shield'))}
          style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8, padding: '6px 12px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'Sora,sans-serif' }}
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <AnimatePresence mode="wait">

          {/* ── List ── */}
          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0d1b2e', margin: 0 }}>Shipments</h1>
                  <p style={{ fontSize: 13, color: '#5a7599', fontWeight: 300, marginTop: 3 }}>{shipments.length} record{shipments.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => { resetForm(); setView('form') }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1565c0', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Sora,sans-serif' }}
                >
                  <Plus size={15} /> Add Shipment
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#5a7599', fontSize: 13 }}>Loading…</div>
              ) : shipments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 16, border: '1px solid #dce8f7' }}>
                  <Ship size={32} color="#dce8f7" style={{ marginBottom: 12 }} />
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#0d1b2e', marginBottom: 6 }}>No shipments yet</p>
                  <p style={{ fontSize: 13, color: '#5a7599', fontWeight: 300 }}>Click "Add Shipment" to create the first one.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {shipments.map(s => (
                    <div key={s.id} style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: 14, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#0d1b2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Ship size={18} color="#42a5f5" />
                      </div>
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#0d1b2e', marginBottom: 2 }}>{s.shipmentId}</p>
                        <p style={{ fontSize: 12, color: '#5a7599', fontWeight: 300 }}>
                          {s.origin || '—'} → {s.destination || '—'}
                          {s.customerName ? ` · ${s.customerName}` : ''}
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, background: '#e3f2fd', color: '#1565c0', padding: '2px 9px', borderRadius: 999 }}>{s.status}</span>
                        {s.eta && <span style={{ fontSize: 11, color: '#9ab2cc', fontWeight: 300 }}>ETA {fmtDate(s.eta)}</span>}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button onClick={() => startEdit(s)} style={{ background: '#e3f2fd', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#1565c0', display: 'flex' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => remove(s.id)} style={{ background: '#ffebee', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#c62828', display: 'flex' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Form ── */}
          {view === 'form' && (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
                <button
                  onClick={() => { resetForm(); setView('list') }}
                  style={{ background: '#e3f2fd', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: '#1565c0', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: 'Sora,sans-serif', fontWeight: 600 }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0d1b2e', margin: 0 }}>
                  {editId ? 'Edit Shipment' : 'Add Shipment'}
                </h1>
              </div>

              <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#1565c0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shipment Details</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '0.75rem' }}>
                    {[
                      { key: 'shipmentId', label: 'Shipment ID', placeholder: 'AFL-22801' },
                      { key: 'customerName', label: 'Customer Name', placeholder: 'John Doe' },
                      { key: 'customerEmail', label: 'Customer Email', placeholder: 'john@example.com', type: 'email' },
                      { key: 'recipientEmail', label: 'Recipient Email', placeholder: 'recipient@example.com', type: 'email' },
                      { key: 'origin', label: 'Origin', placeholder: 'Rotterdam, Netherlands' },
                      { key: 'destination', label: 'Destination', placeholder: 'Apapa Port, Lagos' },
                      { key: 'carrier', label: 'Carrier', placeholder: 'MSC' },
                      { key: 'vessel', label: 'Vessel', placeholder: 'MSC OSCAR' },
                    ].map(f => (
                      <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label className={lbl}>{f.label}</label>
                        <input
                          type={f.type || 'text'}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          required={f.key === 'shipmentId'}
                          onChange={e => setField(f.key, e.target.value)}
                          className={inp}
                        />
                      </div>
                    ))}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label className={lbl}>Status</label>
                      <select value={form.status} onChange={e => setField('status', e.target.value)} className={inp}>
                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <label className={lbl}>ETA (optional)</label>
                      <input type="date" value={form.eta} onChange={e => setField('eta', e.target.value)} className={inp} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label className={lbl}>Notes (optional)</label>
                    <textarea rows={3} value={form.notes} onChange={e => setField('notes', e.target.value)} placeholder="Any additional info for the customer…" className={`${inp} resize-y`} />
                  </div>
                </div>

                {/* Milestones */}
                <div style={{ background: '#fff', border: '1px solid #dce8f7', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#1565c0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Timeline / Milestones</p>

                  {form.milestones.map((m, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.6rem 0.75rem', background: m.done ? '#f0f7ff' : '#f7faff', borderRadius: 10, border: `1px solid ${m.done ? '#bbdefb' : '#dce8f7'}` }}>
                      <button
                        type="button"
                        onClick={() => setMilestone(i, 'done', !m.done)}
                        style={{ background: m.done ? '#1565c0' : '#fff', border: `2px solid ${m.done ? '#1565c0' : '#dce8f7'}`, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}
                      >
                        {m.done ? <CheckCircle size={13} color="#fff" /> : <Clock size={11} color="#9ab2cc" />}
                      </button>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: m.done ? 600 : 400, color: m.done ? '#0d1b2e' : '#5a7599' }}>{m.label}</span>
                      <input
                        type="date"
                        value={m.date}
                        onChange={e => setMilestone(i, 'date', e.target.value)}
                        style={{ fontSize: 12, color: '#5a7599', border: '1px solid #dce8f7', borderRadius: 6, padding: '4px 8px', fontFamily: 'Sora,sans-serif', outline: 'none', background: '#fff' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Email notification toggle */}
                <div
                  onClick={() => setSendEmail(p => !p)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.85rem 1rem', background: sendEmail ? '#e3f2fd' : '#f7faff', border: `1px solid ${sendEmail ? '#bbdefb' : '#dce8f7'}`, borderRadius: 10, cursor: 'pointer', userSelect: 'none', transition: 'all 0.18s' }}
                >
                  <div style={{ width: 36, height: 20, borderRadius: 999, background: sendEmail ? '#1565c0' : '#dce8f7', position: 'relative', flexShrink: 0, transition: 'background 0.18s' }}>
                    <div style={{ position: 'absolute', top: 2, left: sendEmail ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.18s' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#0d1b2e' }}>
                      Send email notification
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: '#5a7599' }}>
                      {sendEmail
                        ? (editId ? 'Will notify customer & recipient of update' : 'Will notify customer & recipient on save')
                        : 'No email will be sent'}
                    </p>
                  </div>
                </div>

                {saveErr && (
                  <div style={{ background: '#ffebee', border: '1px solid #ffcdd2', borderRadius: 10, padding: '0.75rem 1rem', fontSize: 13, color: '#c62828' }}>
                    {saveErr}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#1565c0', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.65 : 1, fontFamily: 'Sora,sans-serif' }}
                  >
                    <Save size={15} /> {saving ? 'Saving…' : editId ? 'Update Shipment' : 'Add Shipment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { resetForm(); setView('list') }}
                    style={{ flex: 1, background: '#f7faff', border: '1px solid #dce8f7', color: '#5a7599', borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Sora,sans-serif' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
