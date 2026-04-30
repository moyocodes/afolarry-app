import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Ship,
  Users,
  ShieldCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  Clock,
  Upload,
  Home,
  Search,
  Package,
  Globe,
  ToggleLeft,
  ToggleRight,
  UserCheck,
  UserX,
  Eye,
  MapPin,
  Mail,
  CreditCard,
  Calendar,
} from "lucide-react";

const S = { fontFamily: "'Sora',sans-serif" };
const PER = 8;
const timeAgo = (ts) => {
  if (!ts) return null;
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) return "just now";
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 604800) return `${Math.floor(sec / 86400)}d ago`;
  if (sec < 2592000) return `${Math.floor(sec / 604800)}w ago`;
  return fmtDate(d);
};
const fmt = (n) =>
  "₦" + Number(n).toLocaleString("en-NG", { minimumFractionDigits: 2 });
const fmtDate = (ts) =>
  ts
    ? new Date(ts).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
const fmtDateTime = (ts) => {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const inp =
  "w-full px-3 py-2.5 rounded-lg border border-[#dce8f7] bg-[#f8fbff] text-[#0d1b2e] font-[Sora,sans-serif] text-[13px] outline-none focus:border-[#1565c0] placeholder:text-[#9ab2cc] transition";
const lbl = "text-[10px] font-bold text-[#5a7599] tracking-[0.1em] uppercase";

// ── SHARED UPLOAD HELPER ───────────────────────────────────────────────────
function uploadFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (e) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          xhr.status === 200
            ? resolve(data.url)
            : reject(new Error(data.error || "Upload failed"));
        } catch {
          reject(new Error("Invalid response"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(JSON.stringify({ file: e.target.result, filename: file.name }));
    };
    reader.readAsDataURL(file);
  });
}

// ── Audit meta — attach to every save/update ──────────────────────────────
// Writes e.g. createdBy, createdByUid, createdAt or updatedBy, updatedAt
function auditMeta(currentUser, action = "updated") {
  return {
    [`${action}By`]: currentUser?.email || "unknown",
    [`${action}ByUid`]: currentUser?.uid || "",
    [`${action}At`]: serverTimestamp(),
  };
}

// ── Audit badge — small line shown on list cards ──────────────────────────
function AuditBadge({ record, isHardRestricted }) {
  // Show the most recent action
  const entry = record.updatedBy
    ? { label: "Updated by", who: record.updatedBy, ts: record.updatedAt }
    : record.createdBy
      ? { label: "Created by", who: record.createdBy, ts: record.createdAt }
      : null;
  if (!entry) return null;
  return (
    <>
      {!isHardRestricted && (
        <p className="text-[10px] text-[#9ab2cc] mt-1">
          {entry.label}:{" "}
          <span className="font-semibold text-[#5a7599]">{entry.who}</span>
          {entry.ts && <> · {fmtDateTime(entry.ts)}</>}
        </p>
      )}
    </>
  );
}

// ── Shared Pagination ──────────────────────────────────────────────────────
function Pagination({ page, total, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1)
    .filter(
      (n) => total <= 7 || n === 1 || n === total || Math.abs(n - page) <= 2,
    )
    .reduce((acc, n, idx, arr) => {
      if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…");
      acc.push(n);
      return acc;
    }, []);
  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`flex items-center gap-1 border border-[#dce8f7] rounded-lg px-3 py-2 text-[12px] font-semibold font-[Sora,sans-serif] transition ${page === 1 ? "bg-[#f7faff] text-[#b0c4de] cursor-not-allowed" : "bg-white text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
      >
        <ChevronLeft size={14} /> Prev
      </button>
      {pages.map((n, i) =>
        typeof n === "string" ? (
          <span
            key={i}
            className="px-2 py-2 text-[12px] text-[#5a7599] select-none"
          >
            …
          </span>
        ) : (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded-lg border text-[12px] font-semibold font-[Sora,sans-serif] transition ${page === n ? "bg-[#1565c0] border-[#1565c0] text-white cursor-default" : "bg-white border-[#dce8f7] text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
          >
            {n}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className={`flex items-center gap-1 border border-[#dce8f7] rounded-lg px-3 py-2 text-[12px] font-semibold font-[Sora,sans-serif] transition ${page === total ? "bg-[#f7faff] text-[#b0c4de] cursor-not-allowed" : "bg-white text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ── View Profile Modal ─────────────────────────────────────────────────────
function ViewProfileModal({ user: u, onClose }) {
  if (!u) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(6,14,26,0.82)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Sora',sans-serif",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 12, opacity: 0 }}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(135deg,#1565c0,#0d47a1)",
            height: 110,
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255,255,255,0.18)",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "#fff",
              display: "flex",
            }}
          >
            <X size={14} />
          </button>
          {/* Avatar overhangs banner */}
          <div
            style={{
              position: "absolute",
              bottom: -38,
              left: 24,
              width: 76,
              height: 76,
              borderRadius: "50%",
              border: "4px solid #fff",
              overflow: "hidden",
              background: "linear-gradient(135deg,#1565c0,#0d47a1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            }}
          >
            {u.profileImage ? (
              <img
                src={u.profileImage}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                {(u.name?.[0] || u.email?.[0] || "?").toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "52px 24px 28px" }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0d1b2e",
              margin: "0 0 6px",
            }}
          >
            {u.name || "No name set"}
          </h3>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: u.approved === false ? "#fff3e0" : "#e3f2fd",
                color: u.approved === false ? "#e65100" : "#1565c0",
                padding: "3px 10px",
                borderRadius: 999,
              }}
            >
              {u.approved === false
                ? "⏳ Pending Approval"
                : u.isAdmin !== false
                  ? "Full Access"
                  : "View Only"}
            </span>
            {u.idCard && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: "#e8f5e9",
                  color: "#2e7d32",
                  padding: "3px 10px",
                  borderRadius: 999,
                }}
              >
                ✓ ID Verified
              </span>
            )}
            {u.profileImage && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: "#f3e5f5",
                  color: "#6a1b9a",
                  padding: "3px 10px",
                  borderRadius: 999,
                }}
              >
                ✓ Photo
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { Icon: Mail, label: "Email", value: u.email },
              { Icon: MapPin, label: "Address", value: u.address },
              { Icon: CreditCard, label: "UID", value: u.uid, mono: true },
              {
                Icon: Calendar,
                label: "Created",
                value: fmtDateTime(u.createdAt),
              },
              {
                Icon: Calendar,
                label: "Last login",
                value: fmtDateTime(u.lastLogin),
              },
            ]
              .filter((r) => r.value && r.value !== "—")
              .map(({ Icon, label, value, mono }) => (
                <div
                  key={label}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "#f0f6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} color="#1565c0" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#9ab2cc",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        margin: "0 0 2px",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        color: "#0d1b2e",
                        fontFamily: mono ? "monospace" : "inherit",
                        wordBreak: "break-all",
                        margin: 0,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            {u.idCard && (
              <a
                href={u.idCard}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f0f6ff",
                  border: "1px solid #dce8f7",
                  borderRadius: 10,
                  padding: "10px 14px",
                  textDecoration: "none",
                  color: "#1565c0",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                <CreditCard size={14} /> View ID Card
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Profile Preview Strip ─────────────────────────────────────────────────
function ProfilePreview({ userData, user, onEditProfile }) {
  if (!user) return null;
  const name = userData?.name || user.email;
  const avatar = userData?.profileImage;

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8f0fb",
        padding: "10px 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #dce8f7",
          background: "linear-gradient(135deg,#1565c0,#0d47a1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
            {(name[0] || "?").toUpperCase()}
          </span>
        )}
      </div>
      {/* Name + badges */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#0d1b2e",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </p>
        <div
          style={{ display: "flex", gap: 5, marginTop: 3, flexWrap: "wrap" }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              background: "#e3f2fd",
              color: "#1565c0",
              padding: "1px 8px",
              borderRadius: 999,
            }}
          >
            {userData?.isAdmin !== false ? "Full Access" : "View Only"}
          </span>
          {userData?.idCard && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#e8f5e9",
                color: "#2e7d32",
                padding: "1px 8px",
                borderRadius: 999,
              }}
            >
              ✓ ID Verified
            </span>
          )}
          {userData?.approved === false && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#fff3e0",
                color: "#e65100",
                padding: "1px 8px",
                borderRadius: 999,
              }}
            >
              ⏳ Pending
            </span>
          )}
        </div>
      </div>
      {/* Edit profile CTA */}
      <button
        onClick={onEditProfile}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "#f0f6ff",
          border: "1px solid #dce8f7",
          borderRadius: 9,
          padding: "7px 14px",
          color: "#1565c0",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "Sora,sans-serif",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <Pencil size={12} /> Edit Profile
      </button>
    </div>
  );
}

// ── CARS SECTION ───────────────────────────────────────────────────────────
const BLANK_CAR = {
  name: "",
  type: "Luxury/Supercars",
  location: "Nigeria",
  price: "",
  status: "preorder",
  image: "",
  description: "",
  preorderEnds: "",
};

function CarsSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_CAR);
  const [editId, setEditId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "cars"), orderBy("createdAt", "desc")),
      );
      setCars(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(BLANK_CAR);
    setEditId(null);
    setImgFile(null);
    setImgPreview(null);
    setSaveErr(null);
  };
  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    setImgPreview(URL.createObjectURL(f));
    setForm((p) => ({ ...p, image: "" }));
  };

  const uploadImage = () =>
    new Promise((resolve, reject) => {
      if (!imgFile) return resolve(form.image);
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.onload = (e) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable)
            setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => {
          try {
            const d = JSON.parse(xhr.responseText);
            xhr.status === 200
              ? resolve(d.url)
              : reject(new Error(d.error || "Upload failed"));
          } catch {
            reject(new Error("Invalid response"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(
          JSON.stringify({ file: e.target.result, filename: imgFile.name }),
        );
      };
      reader.readAsDataURL(imgFile);
    });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    setUploadProgress(null);
    try {
      const imageUrl = await uploadImage();
      const base = {
        ...form,
        price: Number(form.price),
        image: imageUrl,
        preorderEnds: form.preorderEnds
          ? new Date(form.preorderEnds).getTime()
          : null,
      };
      if (editId) {
        await updateDoc(doc(db, "cars", editId), {
          ...base,
          ...auditMeta(currentUser, "updated"),
        });
      } else {
        await addDoc(collection(db, "cars"), {
          ...base,
          createdAt: Date.now(),
          ...auditMeta(currentUser, "created"),
        });
      }
      resetForm();
      setView("list");
      load();
    } catch (err) {
      setSaveErr(err.message || "Save failed");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  const startEdit = (car) => {
    setForm({
      name: car.name,
      type: car.type,
      location: car.location,
      price: car.price,
      status: car.status,
      image: car.image || "",
      description: car.description || "",
      preorderEnds: car.preorderEnds
        ? new Date(car.preorderEnds).toISOString().slice(0, 16)
        : "",
    });
    setEditId(car.id);
    setImgFile(null);
    setImgPreview(car.image || null);
    setSaveErr(null);
    setView("form");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    await deleteDoc(doc(db, "cars", id)).catch(() => {});
    load();
  };

  const filtered = cars.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const paged = filtered.slice((page - 1) * PER, page * PER);

  if (view === "form")
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => {
              resetForm();
              setView("list");
            }}
            className="flex items-center gap-1.5 bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg px-3 py-2 text-[#1565c0] text-[12px] font-semibold cursor-pointer transition"
          >
            <ChevronLeft size={14} /> Back to Cars
          </button>
          <h2 className="text-[18px] font-bold text-[#0d1b2e]">
            {editId ? "Edit Car" : "Add New Car"}
          </h2>
        </div>
        <form
          onSubmit={save}
          className="max-w-2xl bg-white border border-[#dce8f7] rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                key: "name",
                label: "Car Name",
                type: "text",
                placeholder: "e.g. Toyota Camry (Used)",
                req: true,
              },
              {
                key: "price",
                label: "Price (₦)",
                type: "number",
                placeholder: "0",
                req: true,
              },
              {
                key: "location",
                label: "Location",
                type: "text",
                placeholder: "Nigeria",
                req: true,
              },
              {
                key: "type",
                label: "Type",
                type: "text",
                placeholder: "Tokunbo, Used Nigeria, Luxury…",
                req: false,
              },
            ].map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <label className={lbl}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  required={f.req}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                  className={inp}
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                className={inp}
              >
                <option value="available">Available Now</option>
                <option value="preorder">Pre-Order</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Pre-order Ends (optional)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="datetime-local"
                  value={form.preorderEnds}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, preorderEnds: e.target.value }))
                  }
                  className={`${inp} flex-1`}
                />
                {form.preorderEnds && (
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, preorderEnds: "" }))}
                    className="bg-[#ffebee] border-none rounded-lg p-2 cursor-pointer text-[#c62828] flex shrink-0"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={lbl}>Image</label>
            <input
              type="text"
              placeholder="Paste image URL (optional)"
              value={form.image}
              onChange={(e) => {
                setForm((p) => ({ ...p, image: e.target.value }));
                setImgFile(null);
                setImgPreview(e.target.value || null);
              }}
              className={inp}
            />
            <label className="flex items-center justify-center gap-2 bg-[#f7faff] border-2 border-dashed border-[#c7d7f5] rounded-lg py-2.5 cursor-pointer text-[12px] text-[#5a7599] font-medium hover:border-[#1565c0] transition">
              <Upload size={14} className="text-[#1565c0]" />
              {imgFile ? imgFile.name : "Click to upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={pickFile}
              />
            </label>
            {imgPreview && (
              <div className="relative">
                <img
                  src={imgPreview}
                  alt="preview"
                  className="w-full h-[140px] object-cover rounded-lg border border-[#dce8f7]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImgFile(null);
                    setImgPreview(null);
                    setForm((p) => ({ ...p, image: "" }));
                  }}
                  className="absolute top-1.5 right-1.5 bg-black/55 border-none rounded-md p-1 cursor-pointer text-white flex"
                >
                  <X size={13} />
                </button>
              </div>
            )}
            {uploadProgress !== null && (
              <div className="bg-[#e3f2fd] rounded-md overflow-hidden h-1.5">
                <div
                  className="h-full bg-[#1565c0] transition-[width]"
                  style={{ width: uploadProgress + "%" }}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={lbl}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              className={`${inp} resize-y`}
            />
          </div>
          {saveErr && (
            <div className="text-[12px] text-[#c62828] bg-[#ffebee] px-3 py-2.5 rounded-lg">
              {saveErr}
            </div>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`flex-[2] bg-[#1565c0] hover:bg-[#1255a8] text-white border-none py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold transition ${saving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {saving ? "Saving…" : editId ? "Update Car" : "Add Car"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setView("list");
              }}
              className="flex-1 bg-[#f7faff] border border-[#dce8f7] text-[#5a7599] py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer hover:bg-[#eef4ff] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#0d1b2e]">Cars</h2>
          <p className="text-[13px] text-[#5a7599] font-light">
            {cars.length} vehicle{cars.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7599] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search cars…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={`${inp} pl-9 min-w-[180px]`}
            />
          </div>
          {!readOnly && (
            <button
              onClick={() => {
                resetForm();
                setView("form");
              }}
              className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-4 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            >
              <Plus size={15} /> Add Car
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12 text-[#5a7599] text-[13px]">
          Loading…
        </div>
      ) : paged.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
          <Car size={36} className="mx-auto mb-3 text-[#dce8f7]" />
          <p className="text-[15px] font-bold text-[#0d1b2e] mb-1">
            {search ? "No cars match your search" : "No cars yet"}
          </p>
          <p className="text-[13px] text-[#5a7599]">
            Click "Add Car" to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paged.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-[#dce8f7] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(21,101,192,0.05)]"
            >
              <div className="aspect-[16/9] bg-[#f7faff] overflow-hidden relative">
                {car.image ? (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#5a7599] text-[12px]">
                    No image
                  </div>
                )}
                <span
                  className={`absolute top-2 left-2 text-[9px] font-bold px-2.5 py-0.5 rounded-full text-white ${car.status === "available" ? "bg-[#2e7d32]" : car.status === "sold" ? "bg-[#c62828]" : "bg-[#e65100]"}`}
                >
                  {car.status === "available"
                    ? "Available"
                    : car.status === "sold"
                      ? "Sold"
                      : "Pre-Order"}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[14px] font-bold text-[#0d1b2e] mb-0.5 truncate">
                  {car.name}
                </p>
                <p className="text-[13px] font-bold text-[#1565c0] mb-1">
                  {fmt(car.price)}
                </p>
                <p className="text-[11px] text-[#5a7599] mb-0.5">
                  {car.type} · {car.location}
                </p>
                <AuditBadge record={car} isHardRestricted={isHardRestricted} />
                {!readOnly && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(car)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg py-2 text-[#1565c0] text-[12px] font-semibold cursor-pointer transition"
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    {!isHardRestricted && (
                      <button
                        onClick={() => remove(car.id)}
                        className="flex items-center justify-center bg-[#ffebee] hover:bg-[#ffcdd2] border-none rounded-lg px-3 py-2 text-[#c62828] cursor-pointer transition"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        page={page}
        total={totalPages}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

// ── SHIPMENTS SECTION ──────────────────────────────────────────────────────
const DEFAULT_MILESTONES = [
  "Booking Confirmed",
  "Cargo Collected",
  "Departed Origin Port",
  "In Transit",
  "Arrived Destination Port",
  "Customs Clearance",
  "Delivered",
];
const STATUSES = [
  "Pending",
  "Booking Confirmed",
  "In Transit",
  "Departed",
  "Arrived",
  "Customs Clearance",
  "Delivered",
];
const BLANK_SHIP = {
  shipmentId: "",
  status: "Pending",
  customerName: "",
  customerEmail: "",
  recipientEmail: "",
  origin: "",
  destination: "",
  carrier: "",
  vessel: "",
  vin: "",
  carMake: "",
  eta: "",
  notes: "",
  milestones: DEFAULT_MILESTONES.map((label) => ({
    label,
    done: false,
    date: "",
  })),
};

function ShipmentsSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_SHIP);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);
  const [sendEmail, setSendEmail] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewingShipment, setViewingShipment] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "shipments"), orderBy("createdAt", "desc")),
      );
      setShipments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(BLANK_SHIP);
    setEditId(null);
    setSaveErr(null);
    setSendEmail(true);
  };

  const startEdit = (s) => {
    setForm({
      shipmentId: s.shipmentId || "",
      status: s.status || "Pending",
      customerName: s.customerName || "",
      customerEmail: s.customerEmail || "",
      recipientEmail: s.recipientEmail || "",
      origin: s.origin || "",
      destination: s.destination || "",
      carrier: s.carrier || "",
      vessel: s.vessel || "",
      vin: s.vin || "",
      carMake: s.carMake || "",
      eta: s.eta ? new Date(s.eta).toISOString().slice(0, 10) : "",
      notes: s.notes || "",
      milestones:
        Array.isArray(s.milestones) && s.milestones.length
          ? s.milestones.map((m) => ({
              label: m.label,
              done: !!m.done,
              date: m.date ? new Date(m.date).toISOString().slice(0, 10) : "",
            }))
          : BLANK_SHIP.milestones,
    });
    setEditId(s.id);
    setSaveErr(null);
    setView("form");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    try {
      const data = {
        ...form,
        shipmentId: form.shipmentId.trim().toUpperCase(),
        eta: form.eta ? new Date(form.eta).getTime() : null,
        milestones: form.milestones.map((m) => ({
          label: m.label,
          done: m.done,
          date: m.date ? new Date(m.date).getTime() : null,
        })),
      };
      if (editId) {
        await updateDoc(doc(db, "shipments", editId), {
          ...data,
          ...auditMeta(currentUser, "updated"),
        });
      } else {
        await addDoc(collection(db, "shipments"), {
          ...data,
          createdAt: Date.now(),
          ...auditMeta(currentUser, "created"),
        });
      }
      if (sendEmail)
        fetch("/api/shipment-notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, isUpdate: !!editId }),
        }).catch(() => {});
      resetForm();
      setView("list");
      load();
    } catch (err) {
      setSaveErr(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this shipment?")) return;
    await deleteDoc(doc(db, "shipments", id)).catch(() => {});
    load();
  };

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setMilestone = (i, key, val) =>
    setForm((p) => ({
      ...p,
      milestones: p.milestones.map((m, idx) =>
        idx === i ? { ...m, [key]: val } : m,
      ),
    }));
  const filtered = shipments.filter(
    (s) =>
      !search ||
      s.shipmentId?.toLowerCase().includes(search.toLowerCase()) ||
      s.customerName?.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const paged = filtered.slice((page - 1) * PER, page * PER);

  if (view === "form")
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => {
              resetForm();
              setView("list");
            }}
            className="flex items-center gap-1.5 bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg px-3 py-2 text-[#1565c0] text-[12px] font-semibold cursor-pointer transition"
          >
            <ChevronLeft size={14} /> Back to Shipments
          </button>
          <h2 className="text-[18px] font-bold text-[#0d1b2e]">
            {editId ? "Edit Shipment" : "Add Shipment"}
          </h2>
        </div>
        <form onSubmit={save} className="max-w-3xl flex flex-col gap-5">
          <div className="bg-white border border-[#dce8f7] rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-[11px] font-bold text-[#1565c0] tracking-[0.1em] uppercase">
              Shipment Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  key: "shipmentId",
                  label: "Shipment ID",
                  placeholder: "AFL-22801",
                  req: true,
                },
                {
                  key: "customerName",
                  label: "Customer Name",
                  placeholder: "John Doe",
                },
                {
                  key: "customerEmail",
                  label: "Customer Email",
                  placeholder: "john@example.com",
                  type: "email",
                },
                {
                  key: "recipientEmail",
                  label: "Recipient Email",
                  placeholder: "recipient@example.com",
                  type: "email",
                },
                {
                  key: "origin",
                  label: "Origin",
                  placeholder: "Rotterdam, Netherlands",
                },
                {
                  key: "destination",
                  label: "Destination",
                  placeholder: "Apapa Port, Lagos",
                },
                { key: "carrier", label: "Carrier", placeholder: "MSC" },
                { key: "vessel", label: "Vessel", placeholder: "MSC OSCAR" },
                {
                  key: "carMake",
                  label: "Car Make / Model",
                  placeholder: "Toyota Camry 2021",
                },
                {
                  key: "vin",
                  label: "VIN (Vehicle ID No.)",
                  placeholder: "1HGCM82633A004352",
                },
              ].map((f) => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className={lbl}>{f.label}</label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    required={!!f.req}
                    onChange={(e) => setField(f.key, e.target.value)}
                    className={inp}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className={lbl}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  className={inp}
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={lbl}>ETA (optional)</label>
                <input
                  type="date"
                  value={form.eta}
                  onChange={(e) => setField("eta", e.target.value)}
                  className={inp}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Notes (optional)</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="Any additional info for the customer…"
                className={`${inp} resize-y`}
              />
            </div>
          </div>
          <div className="bg-white border border-[#dce8f7] rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-[11px] font-bold text-[#1565c0] tracking-[0.1em] uppercase mb-1">
              Timeline / Milestones
            </p>
            {form.milestones.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${m.done ? "bg-[#f0f7ff] border-[#bbdefb]" : "bg-[#f7faff] border-[#dce8f7]"}`}
              >
                <button
                  type="button"
                  onClick={() => setMilestone(i, "done", !m.done)}
                  style={{
                    background: m.done ? "#1565c0" : "#fff",
                    border: `2px solid ${m.done ? "#1565c0" : "#dce8f7"}`,
                    borderRadius: "50%",
                    width: 22,
                    height: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {m.done ? (
                    <CheckCircle size={13} color="#fff" />
                  ) : (
                    <Clock size={11} color="#9ab2cc" />
                  )}
                </button>
                <span
                  className={`flex-1 text-[13px] ${m.done ? "font-semibold text-[#0d1b2e]" : "text-[#5a7599]"}`}
                >
                  {m.label}
                </span>
                <input
                  type="date"
                  value={m.date}
                  onChange={(e) => setMilestone(i, "date", e.target.value)}
                  className="text-[12px] text-[#5a7599] border border-[#dce8f7] rounded-lg px-2 py-1 font-[Sora,sans-serif] outline-none bg-white focus:border-[#1565c0]"
                />
              </div>
            ))}
          </div>
          <div
            onClick={() => setSendEmail((p) => !p)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer select-none transition ${sendEmail ? "bg-[#e3f2fd] border-[#bbdefb]" : "bg-[#f7faff] border-[#dce8f7]"}`}
          >
            <div
              style={{
                width: 36,
                height: 20,
                borderRadius: 999,
                background: sendEmail ? "#1565c0" : "#dce8f7",
                position: "relative",
                flexShrink: 0,
                transition: "background 0.18s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: sendEmail ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  transition: "left 0.18s",
                }}
              />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0d1b2e]">
                Send email notification
              </p>
              <p className="text-[11px] text-[#5a7599]">
                {sendEmail
                  ? "Will notify customer & recipient"
                  : "No email will be sent"}
              </p>
            </div>
          </div>
          {saveErr && (
            <div className="bg-[#ffebee] border border-[#ffcdd2] rounded-xl p-3 text-[13px] text-[#c62828]">
              {saveErr}
            </div>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`flex-[2] flex items-center justify-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none py-3 rounded-xl font-[Sora,sans-serif] text-[13px] font-bold transition ${saving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <Save size={15} />{" "}
              {saving ? "Saving…" : editId ? "Update Shipment" : "Add Shipment"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setView("list");
              }}
              className="flex-1 bg-[#f7faff] border border-[#dce8f7] text-[#5a7599] py-3 rounded-xl font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer hover:bg-[#eef4ff] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#0d1b2e]">Shipments</h2>
          <p className="text-[13px] text-[#5a7599] font-light">
            {shipments.length} record{shipments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7599] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search shipments…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={`${inp} pl-9 min-w-[180px]`}
            />
          </div>
          {!readOnly && (
            <button
              onClick={() => {
                resetForm();
                setView("form");
              }}
              className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-4 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            >
              <Plus size={15} /> Add Shipment
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12 text-[#5a7599] text-[13px]">
          Loading…
        </div>
      ) : paged.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
          <Ship size={36} className="mx-auto mb-3 text-[#dce8f7]" />
          <p className="text-[15px] font-bold text-[#0d1b2e] mb-1">
            {search ? "No shipments match" : "No shipments yet"}
          </p>
          <p className="text-[13px] text-[#5a7599]">
            Click "Add Shipment" to create the first one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {viewingShipment && (
              <ViewShipmentDrawer
                shipment={viewingShipment}
                onClose={() => setViewingShipment(null)}
              />
            )}
          </AnimatePresence>
          {paged.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-[#dce8f7] rounded-2xl p-4 flex items-center gap-4 flex-wrap"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0d1b2e] flex items-center justify-center shrink-0">
                <Ship size={16} color="#42a5f5" />
              </div>
              <div className="flex-1 min-w-[120px]">
                <p className="text-[14px] font-bold text-[#0d1b2e]">
                  {s.shipmentId}
                </p>
                <p className="text-[12px] text-[#5a7599]">
                  {s.origin || "—"} → {s.destination || "—"}
                  {s.customerName ? ` · ${s.customerName}` : ""}
                </p>
                {(s.carMake || s.vin) && (
                  <p className="text-[11px] text-[#9ab2cc] mt-0.5">
                    {s.carMake}
                    {s.carMake && s.vin ? " · " : ""}
                    {s.vin}
                  </p>
                )}
                <AuditBadge record={s} isHardRestricted={isHardRestricted} />
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[11px] font-bold bg-[#e3f2fd] text-[#1565c0] px-2.5 py-0.5 rounded-full">
                  {s.status}
                </span>
                {s.eta && (
                  <span className="text-[11px] text-[#9ab2cc]">
                    ETA {fmtDate(s.eta)}
                  </span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {/* View — always visible */}
                <button
                  onClick={() => setViewingShipment(s)}
                  className="bg-[#f0f6ff] border border-[#dce8f7] rounded-lg p-2 cursor-pointer text-[#1565c0] flex transition hover:bg-[#e3f2fd]"
                >
                  <Eye size={14} />
                </button>
                {!readOnly && (
                  <>
                    <button
                      onClick={() => startEdit(s)}
                      className="bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg p-2 cursor-pointer text-[#1565c0] flex transition"
                    >
                      <Pencil size={14} />
                    </button>
                    {!isHardRestricted && (
                      <button
                        onClick={() => remove(s.id)}
                        className="bg-[#ffebee] hover:bg-[#ffcdd2] border-none rounded-lg p-2 cursor-pointer text-[#c62828] flex transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}
// ── View Shipment Drawer ───────────────────────────────────────────────────
function ViewShipmentDrawer({ shipment: s, onClose }) {
  if (!s) return null;
  const doneMilestones = (s.milestones || []).filter((m) => m.done).length;
  const totalMilestones = (s.milestones || []).length;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(6,14,26,0.6)",
          backdropFilter: "blur(6px)",
          cursor: "pointer",
        }}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderLeft: "1px solid #dce8f7",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Sora',sans-serif",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.12)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{ background: "#0d1b2e", padding: "20px 24px", flexShrink: 0 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#42a5f5",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                Shipment Details
              </p>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#fff",
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.shipmentId}
              </h2>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    background: "#1565c0",
                    color: "#fff",
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  {s.status}
                </span>
                <AuditBadge record={s} isHardRestricted={isHardRestricted} />
                {s.eta && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.7)",
                      padding: "3px 10px",
                      borderRadius: 999,
                    }}
                  >
                    ETA {fmtDate(s.eta)}
                  </span>
                )}
                {totalMilestones > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      background: "rgba(66,165,245,0.2)",
                      color: "#42a5f5",
                      padding: "3px 10px",
                      borderRadius: 999,
                    }}
                  >
                    {doneMilestones}/{totalMilestones} milestones
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                color: "#fff",
                display: "flex",
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Route */}
          <div
            style={{
              background: "#f7faff",
              border: "1px solid #dce8f7",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9ab2cc",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 10px",
              }}
            >
              Route
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "#9ab2cc",
                    fontWeight: 600,
                    margin: "0 0 2px",
                  }}
                >
                  ORIGIN
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0d1b2e",
                    margin: 0,
                  }}
                >
                  {s.origin || "—"}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Ship size={16} color="#1565c0" />
                <div style={{ width: 40, height: 1, background: "#dce8f7" }} />
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "#9ab2cc",
                    fontWeight: 600,
                    margin: "0 0 2px",
                  }}
                >
                  DESTINATION
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0d1b2e",
                    margin: 0,
                  }}
                >
                  {s.destination || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Customer info */}
          {(s.customerName || s.customerEmail || s.recipientEmail) && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ab2cc",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 10px",
                }}
              >
                Customer
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {s.customerName && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "#f0f6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Users size={12} color="#1565c0" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          color: "#9ab2cc",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        Name
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#0d1b2e",
                          margin: 0,
                        }}
                      >
                        {s.customerName}
                      </p>
                    </div>
                  </div>
                )}
                {s.customerEmail && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "#f0f6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={12} color="#1565c0" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          color: "#9ab2cc",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        Customer Email
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1565c0",
                          margin: 0,
                        }}
                      >
                        {s.customerEmail}
                      </p>
                    </div>
                  </div>
                )}
                {s.recipientEmail && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "#f0f6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={12} color="#5a7599" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 10,
                          color: "#9ab2cc",
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        Recipient Email
                      </p>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1565c0",
                          margin: 0,
                        }}
                      >
                        {s.recipientEmail}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cargo & vessel */}
          {(s.carrier || s.vessel || s.carMake || s.vin) && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ab2cc",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 10px",
                }}
              >
                Cargo & Vessel
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  { label: "Carrier", value: s.carrier },
                  { label: "Vessel", value: s.vessel },
                  { label: "Car Make / Model", value: s.carMake },
                  { label: "VIN", value: s.vin, mono: true },
                ]
                  .filter((r) => r.value)
                  .map(({ label, value, mono }) => (
                    <div
                      key={label}
                      style={{
                        background: "#f7faff",
                        border: "1px solid #dce8f7",
                        borderRadius: 10,
                        padding: "10px 12px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10,
                          color: "#9ab2cc",
                          fontWeight: 600,
                          margin: "0 0 3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#0d1b2e",
                          margin: 0,
                          fontFamily: mono ? "monospace" : "inherit",
                          wordBreak: "break-all",
                        }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {s.notes && (
            <div
              style={{
                background: "#fffde7",
                border: "1px solid #ffe082",
                borderRadius: 12,
                padding: "12px 16px",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ab2cc",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 6px",
                }}
              >
                Notes
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#0d1b2e",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {s.notes}
              </p>
            </div>
          )}

          {/* Milestones */}
          {s.milestones?.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#9ab2cc",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 10px",
                }}
              >
                Timeline
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {s.milestones.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Line + dot */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flexShrink: 0,
                        paddingTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: m.done ? "#1565c0" : "#f0f6ff",
                          border: `2px solid ${m.done ? "#1565c0" : "#dce8f7"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {m.done ? (
                          <CheckCircle size={11} color="#fff" />
                        ) : (
                          <Clock size={10} color="#9ab2cc" />
                        )}
                      </div>
                      {i < s.milestones.length - 1 && (
                        <div
                          style={{
                            width: 2,
                            height: 22,
                            background: m.done ? "#bbdefb" : "#eef4ff",
                            marginTop: 2,
                          }}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <div style={{ paddingBottom: 16, flex: 1 }}>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: m.done ? 700 : 400,
                          color: m.done ? "#0d1b2e" : "#9ab2cc",
                          margin: "0 0 2px",
                        }}
                      >
                        {m.label}
                      </p>
                      {m.date && (
                        <p
                          style={{ fontSize: 10, color: "#9ab2cc", margin: 0 }}
                        >
                          {fmtDate(m.date)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AuditBadge record={s} isHardRestricted={isHardRestricted} />
        </div>
      </motion.div>
    </>
  );
}
// ── USERS SECTION ──────────────────────────────────────────────────────────
// ── USERS SECTION ──────────────────────────────────────────────────────────
function UsersSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewingUser, setViewingUser] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "adminUsers"));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const toggleAdmin = async (id, current) => {
    const next = !current;
    await updateDoc(doc(db, "adminUsers", id), { isAdmin: next }).catch(
      () => {},
    );
    setUsers((p) => p.map((u) => (u.id === id ? { ...u, isAdmin: next } : u)));
  };

  const setApproval = async (id, approved) => {
    await updateDoc(doc(db, "adminUsers", id), { approved }).catch(() => {});
    setUsers((p) => p.map((u) => (u.id === id ? { ...u, approved } : u)));
    // If an admin revokes their OWN access, sign them out immediately
    if (!approved && currentUser?.uid === id) {
      await signOut(auth).catch(() => {});
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this user record?")) return;
    await deleteDoc(doc(db, "adminUsers", id)).catch(() => {});
    load();
  };

  const filtered = users.filter(
    (u) =>
      !search ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER));
  const paged = filtered.slice((page - 1) * PER, page * PER);
  const pendingCount = users.filter((u) => u.approved === false).length;

  // Column header style
  const th = {
    fontSize: 10,
    fontWeight: 700,
    color: "#9ab2cc",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "10px 14px",
    background: "#f7faff",
    borderBottom: "1px solid #dce8f7",
    whiteSpace: "nowrap",
  };
  const td = {
    padding: "12px 14px",
    borderBottom: "1px solid #eef4ff",
    verticalAlign: "middle",
  };

  return (
    <div>
      <AnimatePresence>
        {viewingUser && (
          <ViewProfileModal
            user={viewingUser}
            onClose={() => setViewingUser(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#0d1b2e]">Admin Users</h2>
          <p className="text-[13px] text-[#5a7599] font-light">
            {users.length} user{users.length !== 1 ? "s" : ""}
            {pendingCount > 0 && (
              <span className="ml-2 bg-[#e65100] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </p>
        </div>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7599] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`${inp} pl-9 min-w-[220px]`}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#5a7599] text-[13px]">
          Loading…
        </div>
      ) : paged.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
          <Users size={36} className="mx-auto mb-3 text-[#dce8f7]" />
          <p className="text-[15px] font-bold text-[#0d1b2e] mb-1">
            {search ? "No users match" : "No users yet"}
          </p>
          <p className="text-[13px] text-[#5a7599]">
            Users appear here after signing in at /shield.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            border: "1px solid #dce8f7",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Scrollable table wrapper */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'Sora',sans-serif",
                minWidth: 780,
              }}
            >
              <thead>
                <tr>
                  <th style={{ ...th, borderRadius: "16px 0 0 0" }}>User</th>
                  <th style={th}>Email</th>
                  <th style={th}>Status</th>
                  <th style={th}>Last Login</th>
                  <th style={th}>Created</th>
                  <th
                    style={{
                      ...th,
                      borderRadius: "0 16px 0 0",
                      textAlign: "right",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.map((u, idx) => (
                  <tr
                    key={u.id}
                    style={{
                      background:
                        u.approved === false
                          ? "#fffde7"
                          : idx % 2 === 0
                            ? "#fff"
                            : "#fafcff",
                    }}
                  >
                    {/* User — avatar + name + uid */}
                    <td style={td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#0d1b2e",
                              margin: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {u.name || (
                              <span
                                style={{ color: "#9ab2cc", fontWeight: 400 }}
                              >
                                No name
                              </span>
                            )}
                          </p>
                          {u.address && (
                            <p
                              style={{
                                fontSize: 11,
                                color: "#9ab2cc",
                                margin: "1px 0 0",
                                whiteSpace: "nowrap",
                                maxWidth: 160,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {u.address}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email — always visible, copyable */}
                    <td style={td}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Mail
                          size={12}
                          color="#5a7599"
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: "#1565c0",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {u.email || "—"}
                        </span>
                      </div>
                      {u.idCard && (
                        <a
                          href={u.idCard}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            marginTop: 4,
                            fontSize: 10,
                            color: "#2e7d32",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          <CreditCard size={10} /> View ID
                        </a>
                      )}
                    </td>

                    {/* Status badges */}
                    <td style={td}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 999,
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            background:
                              u.approved === false ? "#fff3e0" : "#e8f5e9",
                            color: u.approved === false ? "#e65100" : "#2e7d32",
                          }}
                        >
                          {u.approved === false ? "⏳ Pending" : "✓ Approved"}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 999,
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            background:
                              u.isAdmin !== false ? "#e3f2fd" : "#f5f5f5",
                            color: u.isAdmin !== false ? "#1565c0" : "#9e9e9e",
                          }}
                        >
                          {u.isAdmin !== false ? "Full Access" : "View Only"}
                        </span>
                        {!u.idCard && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              padding: "3px 8px",
                              borderRadius: 999,
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              background: "#ffebee",
                              color: "#c62828",
                            }}
                          >
                            ⚠ No ID
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Last Login — countdown + full date */}
                    <td style={td}>
                      {u.lastLogin ? (
                        <div>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#0d1b2e",
                              background: "#f0f6ff",
                              border: "1px solid #dce8f7",
                              borderRadius: 8,
                              padding: "3px 9px",
                            }}
                          >
                            <Clock size={11} color="#1565c0" />
                            {timeAgo(u.lastLogin)}
                          </span>
                          <p
                            style={{
                              fontSize: 10,
                              color: "#9ab2cc",
                              margin: "4px 0 0",
                            }}
                          >
                            {fmtDateTime(u.lastLogin)}
                          </p>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, color: "#c7d7f5" }}>
                          Never
                        </span>
                      )}
                    </td>

                    {/* Created — countdown + full date */}
                    <td style={td}>
                      {u.createdAt ? (
                        <div>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#0d1b2e",
                              background: "#f7f0ff",
                              border: "1px solid #e8d5f5",
                              borderRadius: 8,
                              padding: "3px 9px",
                            }}
                          >
                            <Calendar size={11} color="#7b1fa2" />
                            {timeAgo(u.createdAt)}
                          </span>
                          <p
                            style={{
                              fontSize: 10,
                              color: "#9ab2cc",
                              margin: "4px 0 0",
                            }}
                          >
                            {fmtDateTime(u.createdAt)}
                          </p>
                        </div>
                      ) : (
                        <span style={{ fontSize: 11, color: "#c7d7f5" }}>
                          —
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td style={{ ...td, textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={() => setViewingUser(u)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            background: "#f0f6ff",
                            border: "1px solid #dce8f7",
                            borderRadius: 8,
                            padding: "5px 10px",
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#1565c0",
                          }}
                        >
                          <Eye size={12} /> View
                        </button>
                        {!readOnly && (
                          <>
                            {u.approved === false ? (
                              <button
                                onClick={() => setApproval(u.id, true)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  background: "#e8f5e9",
                                  border: "1px solid #a5d6a7",
                                  borderRadius: 8,
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: "#2e7d32",
                                }}
                              >
                                <UserCheck size={12} /> Approve
                              </button>
                            ) : (
                              <button
                                onClick={() => setApproval(u.id, false)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  background: "#fff3e0",
                                  border: "1px solid #ffcc80",
                                  borderRadius: 8,
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: "#e65100",
                                }}
                              >
                                <UserX size={12} /> Revoke
                              </button>
                            )}
                            <button
                              onClick={() =>
                                toggleAdmin(u.id, u.isAdmin !== false)
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                background:
                                  u.isAdmin !== false ? "#f5f5f5" : "#e3f2fd",
                                border: `1px solid ${u.isAdmin !== false ? "#e0e0e0" : "#bbdefb"}`,
                                borderRadius: 8,
                                padding: "5px 10px",
                                cursor: "pointer",
                                fontSize: 11,
                                fontWeight: 700,
                                color:
                                  u.isAdmin !== false ? "#9e9e9e" : "#1565c0",
                              }}
                            >
                              {u.isAdmin !== false ? (
                                <ToggleRight size={12} />
                              ) : (
                                <ToggleLeft size={12} />
                              )}
                              {u.isAdmin !== false ? "View Only" : "Full Access"}
                            </button>
                            <button
                              onClick={() => remove(u.id)}
                              style={{
                                background: "#ffebee",
                                border: "none",
                                borderRadius: 8,
                                padding: "6px 8px",
                                cursor: "pointer",
                                color: "#c62828",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}

// ── PROFILE COMPLETION MODAL ───────────────────────────────────────────────
// ── PROFILE DRAWER ─────────────────────────────────────────────────────────
function ProfileModal({ uid, email, existingData, onComplete, onClose }) {
  const isEditing = !!existingData?.idCard;

  const [name, setName] = useState(existingData?.name || "");
  const [address, setAddress] = useState(existingData?.address || "");
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(
    existingData?.profileImage || null,
  );
  const [idFile, setIdFile] = useState(null);
  const [idFileName, setIdFileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const pickProfile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setProfileFile(f);
    setProfilePreview(URL.createObjectURL(f));
  };
  const pickId = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setIdFile(f);
    setIdFileName(f.name);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isEditing && !idFile) {
      setErr("ID card is required to continue.");
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const [profileUrl, idUrl] = await Promise.all([
        profileFile ? uploadFile(profileFile) : Promise.resolve(null),
        idFile ? uploadFile(idFile) : Promise.resolve(null),
      ]);
      const updates = {
        name,
        address,
        profileComplete: true,
        updatedAt: serverTimestamp(),
      };
      if (idUrl) updates.idCard = idUrl;
      else if (existingData?.idCard) updates.idCard = existingData.idCard;
      if (profileUrl) updates.profileImage = profileUrl;
      await setDoc(doc(db, "adminUsers", uid), updates, { merge: true });
      onComplete(updates);
    } catch (ex) {
      setErr(ex.message || "Upload failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose || undefined}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(6,14,26,0.6)",
          backdropFilter: "blur(6px)",
          cursor: onClose ? "pointer" : "default",
        }}
      />
      {/* Drawer slides in from right */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          width: "100%",
          maxWidth: 440,
          background: "#0d1b2e",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Sora',sans-serif",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1565c0,#0d47a1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck size={17} color="#fff" strokeWidth={1.5} />
            </div>
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#42a5f5",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {isEditing ? "Edit Profile" : "Account Setup"}
              </p>
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#fff",
                  margin: 0,
                }}
              >
                {isEditing ? "Update Your Profile" : "Complete Your Profile"}
              </h2>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Email display */}
        <div
          style={{
            padding: "12px 24px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0 0 2px",
            }}
          >
            Signed in as
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#42a5f5",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {email}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            padding: "24px",
            flex: 1,
          }}
        >
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <label style={{ cursor: "pointer", flexShrink: 0 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: profilePreview
                    ? "transparent"
                    : "rgba(255,255,255,0.07)",
                  border: "2px dashed rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Upload size={20} color="rgba(255,255,255,0.3)" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={pickProfile}
              />
            </label>
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 3,
                }}
              >
                Profile Photo
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                Optional — click to {profilePreview ? "change" : "upload"}
              </p>
              {profilePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setProfileFile(null);
                    setProfilePreview(null);
                  }}
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    color: "#ef9a9a",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          {/* Name & Address */}
          {[
            {
              label: "Full Name",
              value: name,
              set: setName,
              placeholder: "John Doe",
              req: true,
            },
            {
              label: "Address",
              value: address,
              set: setAddress,
              placeholder: "12 Lagos Street, Nigeria",
              req: false,
            },
          ].map((f) => (
            <div key={f.label}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 7,
                }}
              >
                {f.label}
                {!f.req && (
                  <span
                    style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400 }}
                  >
                    {" "}
                    (optional)
                  </span>
                )}
              </label>
              <input
                type="text"
                value={f.value}
                required={f.req}
                placeholder={f.placeholder}
                onChange={(e) => f.set(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  padding: "11px 14px",
                  color: "#fff",
                  fontFamily: "Sora,sans-serif",
                  fontSize: 13,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#42a5f5")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                }
              />
            </div>
          ))}

          {/* ID card */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 7,
              }}
            >
              ID Card{" "}
              {!isEditing && <span style={{ color: "#ef5350" }}>*</span>}
              {isEditing && existingData?.idCard && (
                <a
                  href={existingData.idCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 10,
                    color: "#42a5f5",
                    fontWeight: 600,
                    textTransform: "none",
                    letterSpacing: 0,
                    marginLeft: 6,
                  }}
                >
                  View current ↗
                </a>
              )}
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: idFile
                  ? "rgba(21,101,192,0.15)"
                  : "rgba(255,255,255,0.05)",
                border: `1.5px dashed ${idFile ? "#42a5f5" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 12,
                padding: "13px 16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Upload
                size={16}
                color={idFile ? "#42a5f5" : "rgba(255,255,255,0.3)"}
              />
              <span
                style={{
                  fontSize: 12,
                  color: idFile ? "#42a5f5" : "rgba(255,255,255,0.35)",
                  fontWeight: idFile ? 600 : 400,
                }}
              >
                {idFileName ||
                  (isEditing
                    ? "Upload new ID to replace current"
                    : "National ID, Passport, or Driver's License")}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={pickId}
              />
            </label>
          </div>

          {err && (
            <div
              style={{
                background: "rgba(198,40,40,0.15)",
                border: "1px solid rgba(198,40,40,0.3)",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
                color: "#ef9a9a",
              }}
            >
              {err}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 2,
                background: saving
                  ? "rgba(21,101,192,0.5)"
                  : "linear-gradient(135deg,#1565c0,#0d47a1)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "13px 24px",
                fontSize: 13,
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "Sora,sans-serif",
                transition: "all 0.2s",
              }}
            >
              {saving
                ? "Saving…"
                : isEditing
                  ? "Save Changes"
                  : "Save & Continue"}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "13px 16px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  fontFamily: "Sora,sans-serif",
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {!isEditing && (
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.25)",
                textAlign: "center",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              ID verification is required before accessing the dashboard.
            </p>
          )}
        </form>
      </motion.div>
    </>
  );
}

// ── TRACKERS SECTION ───────────────────────────────────────────────────────
const BLANK_TRACKER = {
  name: "",
  short: "",
  accent: "#1565c0",
  url: "",
  enabled: true,
};

function TrackersSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [trackers, setTrackers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_TRACKER);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "trackingPortals"));
      setTrackers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setTrackers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(BLANK_TRACKER);
    setEditId(null);
    setSaveErr(null);
  };
  const startEdit = (t) => {
    setForm({
      name: t.name || "",
      short: t.short || "",
      accent: t.accent || "#1565c0",
      url: t.url || "",
      enabled: t.enabled !== false,
    });
    setEditId(t.id);
    setSaveErr(null);
    setView("form");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    try {
      if (editId)
        await updateDoc(doc(db, "trackingPortals", editId), {
          ...form,
          ...auditMeta(currentUser, "updated"),
        });
      else
        await addDoc(collection(db, "trackingPortals"), {
          ...form,
          ...auditMeta(currentUser, "created"),
        });
      resetForm();
      setView("list");
      load();
    } catch (err) {
      setSaveErr(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this tracker?")) return;
    await deleteDoc(doc(db, "trackingPortals", id)).catch(() => {});
    load();
  };

  const toggleEnabled = async (t) => {
    await updateDoc(doc(db, "trackingPortals", t.id), {
      enabled: !t.enabled,
      ...auditMeta(currentUser, "updated"),
    }).catch(() => {});
    setTrackers((p) =>
      p.map((x) => (x.id === t.id ? { ...x, enabled: !x.enabled } : x)),
    );
  };

  if (view === "form")
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => {
              resetForm();
              setView("list");
            }}
            className="flex items-center gap-1.5 bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg px-3 py-2 text-[#1565c0] text-[12px] font-semibold cursor-pointer transition"
          >
            <ChevronLeft size={14} /> Back to Trackers
          </button>
          <h2 className="text-[18px] font-bold text-[#0d1b2e]">
            {editId ? "Edit Tracker" : "Add Tracker"}
          </h2>
        </div>
        <form
          onSubmit={save}
          className="max-w-xl bg-white border border-[#dce8f7] rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className={lbl}>Name</label>
              <input
                type="text"
                placeholder="Sallaum Lines"
                value={form.name}
                required
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className={inp}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Short (2–3 chars)</label>
              <input
                type="text"
                placeholder="SL"
                value={form.short}
                required
                maxLength={3}
                onChange={(e) =>
                  setForm((p) => ({ ...p, short: e.target.value }))
                }
                className={inp}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Accent Color</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={form.accent}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, accent: e.target.value }))
                  }
                  className="h-[42px] w-12 rounded-lg border border-[#dce8f7] bg-white cursor-pointer p-1 shrink-0"
                />
                <input
                  type="text"
                  value={form.accent}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, accent: e.target.value }))
                  }
                  className={`${inp} flex-1`}
                  placeholder="#1565c0"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className={lbl}>Tracking URL</label>
              <input
                type="url"
                placeholder="https://carrier.com/track"
                value={form.url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, url: e.target.value }))
                }
                className={inp}
              />
            </div>
          </div>
          <div
            onClick={() => setForm((p) => ({ ...p, enabled: !p.enabled }))}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer select-none transition ${form.enabled ? "bg-[#e3f2fd] border-[#bbdefb]" : "bg-[#f7faff] border-[#dce8f7]"}`}
          >
            <div
              style={{
                width: 36,
                height: 20,
                borderRadius: 999,
                background: form.enabled ? "#1565c0" : "#dce8f7",
                position: "relative",
                flexShrink: 0,
                transition: "background 0.18s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: form.enabled ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  transition: "left 0.18s",
                }}
              />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0d1b2e]">Enabled</p>
              <p className="text-[11px] text-[#5a7599]">
                {form.enabled
                  ? "Visible on the tracking page"
                  : "Hidden from public view"}
              </p>
            </div>
          </div>
          {saveErr && (
            <div className="bg-[#ffebee] border border-[#ffcdd2] rounded-xl p-3 text-[13px] text-[#c62828]">
              {saveErr}
            </div>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`flex-[2] bg-[#1565c0] hover:bg-[#1255a8] text-white border-none py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold transition ${saving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {saving ? "Saving…" : editId ? "Update Tracker" : "Add Tracker"}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setView("list");
              }}
              className="flex-1 bg-[#f7faff] border border-[#dce8f7] text-[#5a7599] py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer hover:bg-[#eef4ff] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#0d1b2e]">
            Tracking Portals
          </h2>
          <p className="text-[13px] text-[#5a7599] font-light">
            {trackers.length} portal{trackers.length !== 1 ? "s" : ""} · shown
            on /track
          </p>
        </div>
        {!readOnly && (
          <button
            onClick={() => {
              resetForm();
              setView("form");
            }}
            className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-4 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
          >
            <Plus size={15} /> Add Tracker
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#5a7599] text-[13px]">
          Loading…
        </div>
      ) : trackers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
          <Globe size={36} className="mx-auto mb-3 text-[#dce8f7]" />
          <p className="text-[15px] font-bold text-[#0d1b2e] mb-1">
            No custom trackers yet
          </p>
          <p className="text-[13px] text-[#5a7599]">
            Built-in defaults are always shown. Add one here to customise or
            extend them.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {trackers.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-[#dce8f7] rounded-2xl p-4 flex items-center gap-4 flex-wrap"
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: t.accent || "#1565c0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {t.short || "?"}
              </div>
              <div className="flex-1 min-w-[140px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[14px] font-bold text-[#0d1b2e]">
                    {t.name}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.enabled ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#f5f5f5] text-[#9e9e9e]"}`}
                  >
                    {t.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <p className="text-[12px] text-[#5a7599] mt-0.5 truncate max-w-[320px]">
                  {t.internalPath
                    ? `Internal: ${t.internalPath}`
                    : t.url || "—"}
                </p>
                <AuditBadge record={t} isHardRestricted={isHardRestricted} />
              </div>
              {!readOnly && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleEnabled(t)}
                    className="bg-[#f7faff] hover:bg-[#e3f2fd] border border-[#dce8f7] rounded-lg p-2 cursor-pointer text-[#1565c0] flex transition"
                    title={t.enabled ? "Disable" : "Enable"}
                  >
                    {t.enabled ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} color="#9ab2cc" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(t)}
                    className="bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg p-2 cursor-pointer text-[#1565c0] flex transition"
                  >
                    <Pencil size={14} />
                  </button>
                  {!isHardRestricted && (
                    <button
                      onClick={() => remove(t.id)}
                      className="bg-[#ffebee] hover:bg-[#ffcdd2] border-none rounded-lg p-2 cursor-pointer text-[#c62828] flex transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────────────────
const TABS = [
  { id: "cars", label: "Cars", Icon: Car },
  { id: "shipments", label: "Shipments", Icon: Ship },
  { id: "users", label: "Users", Icon: Users },
  { id: "trackers", label: "Trackers", Icon: Globe },
];

export default function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tab, setTab] = useState(() => {
    if (typeof window === "undefined") return "cars";
    const saved = window.localStorage.getItem("adminTab");
    return TABS.some((item) => item.id === saved) ? saved : "cars";
  });
  const handleSetTab = (id) => {
    setTab(id);
    window.localStorage.setItem("adminTab", id);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u === null) {
        navigate("/shield", { replace: true });
        return;
      }
      setUser(u);
      try {
        const snap = await getDoc(doc(db, "adminUsers", u.uid));
        const data = snap.exists() ? snap.data() : {};
        setCurrentUserData(data);
        if (!data.idCard) setShowProfileModal(true);
      } catch {
        setShowProfileModal(true);
      }
    });
    return unsub;
  }, []);

  const isReadOnly = currentUserData?.isAdmin === false;
  const allowedAdminEmail = "afolaraylimited@gmail.com";
  const isHardRestricted =
    user?.email?.toLowerCase() !== allowedAdminEmail && !!allowedAdminEmail;
  const isViewOnly = isReadOnly;
  const visibleTabs = TABS.filter(
    (tabItem) => !(isHardRestricted && tabItem.id === "users"),
  );

  useEffect(() => {
    if (tab === "users" && isHardRestricted) {
      setTab("cars");
    }
  }, [tab, isHardRestricted]);

  if (user === undefined)
    return (
      <div
        style={{
          ...S,
          minHeight: "100dvh",
          background: "#060e1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid rgba(255,255,255,0.15)",
            borderTopColor: "#42a5f5",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );

  return (
    <div
      style={{
        ...S,
        minHeight: "100dvh",
        background: "#f0f4fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Profile setup modal */}
      {showProfileModal && user && (
        <AnimatePresence>
          <ProfileModal
            uid={user.uid}
            email={user.email}
            existingData={currentUserData}
            onClose={
              currentUserData?.idCard ? () => setShowProfileModal(false) : null
            }
            onComplete={(updates) => {
              setCurrentUserData((p) => ({ ...p, ...updates }));
              setShowProfileModal(false);
            }}
          />
        </AnimatePresence>
      )}

      {/* Top bar */}
      <header
        style={{
          background: "#0d1b2e",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          flexShrink: 0,
          boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "#1565c0",
              border: "none",
              borderRadius: 10,
              padding: "8px 16px",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "Sora,sans-serif",
              boxShadow: "0 2px 12px rgba(21,101,192,0.4)",
            }}
          >
            <Home size={15} /> Home
          </motion.button>
          <div
            style={{
              width: 1,
              height: 28,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={16} color="#42a5f5" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
              Admin Dashboard
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user?.email}
          </span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => signOut(auth).then(() => navigate("/shield"))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9,
              padding: "7px 12px",
              color: "rgba(255,255,255,0.65)",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Sora,sans-serif",
            }}
          >
            <LogOut size={13} /> Sign out
          </motion.button>
        </div>
      </header>

      {/* ✅ Profile preview strip — avatar + name + badges + edit button */}
      <ProfilePreview
        userData={currentUserData}
        user={user}
        onEditProfile={() => setShowProfileModal(true)}
      />

      {/* Tab nav */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #dce8f7",
          padding: "0 1.5rem",
          display: "flex",
          gap: 0,
          flexShrink: 0,
        }}
      >
        {visibleTabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => handleSetTab(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "14px 20px",
              border: "none",
              borderBottom:
                tab === id ? "2px solid #1565c0" : "2px solid transparent",
              background: "transparent",
              color: tab === id ? "#1565c0" : "#5a7599",
              fontSize: 13,
              fontWeight: tab === id ? 700 : 500,
              cursor: "pointer",
              fontFamily: "Sora,sans-serif",
              transition: "all 0.15s",
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "2rem 1.5rem",
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            {tab === "cars" && (
              <CarsSection
                readOnly={isViewOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
              />
            )}
            {tab === "shipments" && (
              <ShipmentsSection
                readOnly={isViewOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
              />
            )}
            {tab === "users" && !isHardRestricted && (
              <UsersSection
                readOnly={isReadOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
              />
            )}
            {tab === "trackers" && (
              <TrackersSection
                readOnly={isViewOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
