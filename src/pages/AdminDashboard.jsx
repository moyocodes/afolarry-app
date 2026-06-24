import React, { useState, useEffect, useRef } from "react";
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
  Truck,
  ExternalLink,
  CalendarDays,
  Download,
} from "lucide-react";
import { toDisplayString, formatNaira } from "../lib/utils";

// ── SHARED CONSTANTS ────────────────────────────────────────────────────────
const S = { fontFamily: "'Sora',sans-serif" };
const PER = 10; // rows per page across all sections

// ── SHARED HELPERS ──────────────────────────────────────────────────────────
const fmtDateTime = (ts) => {
  if (!ts) return "—";
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const timeAgo = (ts) => {
  if (!ts) return "just now";
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};
const fmtDate = (str) => {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d)
    ? str
    : d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};
const fmt = (v) => (v ? `₦${Number(v).toLocaleString()}` : "—");
const downloadCSV = (filename, rows) => {
  if (!rows.length) return;
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const headers = Object.keys(rows[0]);
  const csv = [headers, ...rows.map((r) => headers.map((h) => esc(r[h])))]
    .map((r) => r.join(","))
    .join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

const isImageUrl = (url) =>
  /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?|$)/i.test(url || "");

const downloadIdCard = async (url) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = url.split("/").pop() || "id-card";
    a.click();
    URL.revokeObjectURL(a.href);
  } catch {
    window.open(url, "_blank");
  }
};

const auditMeta = (user, action) => ({
  [`${action}By`]: user?.email || user?.uid || "unknown",
  [`${action}At`]: serverTimestamp(),
});

// ── SHARED TAILWIND CLASS STRINGS ───────────────────────────────────────────
const inp =
  "w-full rounded-xl border border-[#dce8f7] px-3 py-2.5 text-[13px] text-[#0d1b2e] outline-none focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/10 bg-white";
const lbl =
  "block text-[10px] font-bold text-[#9ab2cc] uppercase tracking-widest mb-1.5";

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Pagination({ page, total, onChange }) {
  if (total <= 1) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 24,
      }}
    >
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        style={{
          padding: "6px 8px",
          borderRadius: 8,
          border: "1px solid #dce8f7",
          background: "#fff",
          color: "#5a7599",
          cursor: page === 1 ? "not-allowed" : "pointer",
          opacity: page === 1 ? 0.4 : 1,
          display: "flex",
        }}
      >
        <ChevronLeft size={14} />
      </button>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#0d1b2e",
          minWidth: 60,
          textAlign: "center",
        }}
      >
        {page} / {total}
      </span>
      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        style={{
          padding: "6px 8px",
          borderRadius: 8,
          border: "1px solid #dce8f7",
          background: "#fff",
          color: "#5a7599",
          cursor: page === total ? "not-allowed" : "pointer",
          opacity: page === total ? 0.4 : 1,
          display: "flex",
        }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function AuditBadge({ record, isHardRestricted }) {
  const who = record?.updatedBy || record?.createdBy;
  const when = record?.updatedAt || record?.createdAt;
  if (!who && !when) return null;
  const label = record?.updatedBy ? "Updated" : "Created";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        fontSize: 10,
        color: "#9ab2cc",
        fontFamily: "'Sora',sans-serif",
      }}
    >
      <Clock size={10} color="#c7d7f5" />
      {label} {!isHardRestricted && who ? `by ${who}` : ""}
      {when ? ` · ${timeAgo(when)}` : ""}
    </div>
  );
}

// ── VIEW PROFILE MODAL ─────────────────────────────────────────────────────
function ViewProfileModal({ user: u, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
              {u.approved === false ? "⏳ Pending" : "✓ Approved"}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background:
                  u.role === "admin"
                    ? "#e3f2fd"
                    : u.role === "operations"
                      ? "#f3e5f5"
                      : "#f5f5f5",
                color:
                  u.role === "admin"
                    ? "#1565c0"
                    : u.role === "operations"
                      ? "#7b1fa2"
                      : "#9e9e9e",
                padding: "3px 10px",
                borderRadius: 999,
              }}
            >
              {ROLE_LABELS[u.role] || "Viewer"}
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
            {u.allowedTabs && u.allowedTabs.length > 0 && (
              <div
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
                  <Globe size={13} color="#1565c0" />
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
                    Allowed tabs
                  </p>
                  <p style={{ fontSize: 13, color: "#0d1b2e", margin: 0 }}>
                    {u.allowedTabs.join(", ")}
                  </p>
                </div>
              </div>
            )}
            {u.idCard && (
              isImageUrl(u.idCard) ? (
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
              ) : (
                <button
                  onClick={() => downloadIdCard(u.idCard)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#f0f6ff",
                    border: "1px solid #dce8f7",
                    borderRadius: 10,
                    padding: "10px 14px",
                    color: "#1565c0",
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 4,
                    cursor: "pointer",
                    fontFamily: "'Sora',sans-serif",
                  }}
                >
                  <CreditCard size={14} /> Download ID Card
                </button>
              )
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
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
  images: [],
  description: "",
  preorderEnds: "",
};

function CarsSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_CAR);
  const [editId, setEditId] = useState(null);
  const [imgPreviews, setImgPreviews] = useState([]); // [{url, file|null}]
  const [urlInput, setUrlInput] = useState("");
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
    setImgPreviews([]);
    setUrlInput("");
    setSaveErr(null);
  };

  const pickFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImgPreviews((p) => [
      ...p,
      ...files.map((f) => ({ url: URL.createObjectURL(f), file: f })),
    ]);
    e.target.value = "";
  };

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setImgPreviews((p) => [...p, { url: trimmed, file: null }]);
    setUrlInput("");
  };

  const removePreview = (i) =>
    setImgPreviews((p) => p.filter((_, idx) => idx !== i));

  const uploadOneFile = (file, onProgress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "afolaray/cars");
      xhr.open("POST", "/api/upload");
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable && onProgress)
          onProgress(Math.round((ev.loaded / ev.total) * 100));
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
      xhr.send(form);
    });

  const uploadAllImages = async () => {
    const results = [];
    const filePreviews = imgPreviews.filter((p) => p.file);
    for (let i = 0; i < imgPreviews.length; i++) {
      const p = imgPreviews[i];
      if (p.file) {
        const fileIdx = filePreviews.indexOf(p);
        const url = await uploadOneFile(p.file, (pct) =>
          setUploadProgress(
            Math.round(((fileIdx + pct / 100) / filePreviews.length) * 100),
          ),
        );
        results.push(url);
      } else {
        results.push(p.url);
      }
    }
    return results;
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    setUploadProgress(null);
    try {
      const allUrls = await uploadAllImages();
      const base = {
        ...form,
        price: Number(form.price),
        images: allUrls,
        image: allUrls[0] || "",
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
      images: car.images || [],
      description: car.description || "",
      preorderEnds: car.preorderEnds
        ? new Date(car.preorderEnds).toISOString().slice(0, 16)
        : "",
    });
    setEditId(car.id);
    const existingUrls = car.images?.length
      ? car.images
      : car.image
        ? [car.image]
        : [];
    setImgPreviews(existingUrls.map((url) => ({ url, file: null })));
    setUrlInput("");
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
          <h2 className="text-[18px] font-bold text-[#0d1b2e] flex-1">
            {editId ? "Edit Car" : "Add New Car"}
          </h2>
          {editId && (
            <button
              onClick={() => {
                resetForm();
                setView("list");
              }}
              className="flex items-center justify-center bg-[#ffebee] hover:bg-[#ffcdd2] border-none rounded-lg p-2 cursor-pointer text-[#c62828] transition"
              title="Discard changes"
            >
              <X size={15} />
            </button>
          )}
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
            <label className={lbl}>
              Images{" "}
              <span className="text-[#5a7599] font-normal">
                ({imgPreviews.length} added — first is main)
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL…"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addUrl();
                  }
                }}
                className={`${inp} flex-1`}
              />
              <button
                type="button"
                onClick={addUrl}
                className="bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg px-3 text-[#1565c0] text-[12px] font-semibold cursor-pointer transition"
              >
                Add
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 bg-[#f7faff] border-2 border-dashed border-[#c7d7f5] rounded-lg py-2.5 cursor-pointer text-[12px] text-[#5a7599] font-medium hover:border-[#1565c0] transition">
              <Upload size={14} className="text-[#1565c0]" />
              Click to upload images (multiple allowed)
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={pickFiles}
              />
            </label>
            {imgPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {imgPreviews.map((item, i) => (
                  <div key={i} className="relative aspect-square">
                    <img
                      src={item.url}
                      alt=""
                      className="w-full h-full object-cover rounded-lg border border-[#dce8f7]"
                    />
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-[#1565c0] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Main
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute top-1 right-1 bg-black/55 border-none rounded-md p-0.5 cursor-pointer text-white flex"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
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
          <button
            onClick={() =>
              downloadCSV(
                "cars.csv",
                filtered.map((c) => ({
                  Name: c.name,
                  Type: c.type,
                  Location: c.location,
                  Price: c.price,
                  Status: c.status,
                  Description: c.description,
                })),
              )
            }
            className="flex items-center gap-2 bg-[#f0f6ff] hover:bg-[#dce8f7] border border-[#dce8f7] text-[#1565c0] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            title="Download CSV"
          >
            <Download size={15} /> CSV
          </button>
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
                {car.images?.length > 1 && (
                  <span className="absolute top-2 right-2 bg-black/50 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {car.images.length} photos
                  </span>
                )}
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
          <button
            onClick={() =>
              downloadCSV(
                "shipments.csv",
                filtered.map((s) => ({
                  "Shipment ID": s.shipmentId,
                  Status: s.status,
                  "Customer Name": s.customerName,
                  "Customer Email": s.customerEmail,
                  "Recipient Email": s.recipientEmail,
                  Origin: s.origin,
                  Destination: s.destination,
                  Carrier: s.carrier,
                  Vessel: s.vessel,
                  VIN: s.vin,
                  "Car Make": s.carMake,
                  ETA: s.eta ? fmtDate(s.eta) : "",
                  Notes: s.notes,
                })),
              )
            }
            className="flex items-center gap-2 bg-[#f0f6ff] hover:bg-[#dce8f7] border border-[#dce8f7] text-[#1565c0] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            title="Download CSV"
          >
            <Download size={15} /> CSV
          </button>
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
// ── ROLE / TAB CONSTANTS (shared by ManageAccessModal + AdminDashboard) ────
const TABS = [
  { id: "cars", label: "Cars", Icon: Car },
  { id: "shipments", label: "Shipments", Icon: Ship },
  { id: "vehicles", label: "Vehicles", Icon: Truck },
  { id: "schedules", label: "Schedules", Icon: Calendar },
  { id: "users", label: "Users", Icon: Users },
  { id: "trackers", label: "Trackers", Icon: Globe },
];
const ROLE_TABS = {
  admin: ["cars", "shipments", "vehicles", "schedules", "users", "trackers"],
  operations: ["cars", "shipments", "vehicles", "schedules", "trackers"],
  viewer: ["cars", "shipments", "vehicles", "schedules", "trackers"],
};
const ROLE_LABELS = {
  admin: "Administrator",
  operations: "Operations",
  viewer: "Viewer",
};

// ── MANAGE ACCESS MODAL ─────────────────────────────────────────────────────
function ManageAccessModal({ user, onClose, onSave, protectedEmails = [] }) {
  const isProtected = protectedEmails.includes(user.email?.toLowerCase());
  const currentRole =
    user.role || (user.isAdmin === false ? "viewer" : "admin");
  const [role, setRole] = useState(currentRole);
  const [selectedTabs, setSelectedTabs] = useState(
    user.allowedTabs || ROLE_TABS[currentRole] || ROLE_TABS.viewer,
  );
  const [saving, setSaving] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setSelectedTabs(ROLE_TABS[newRole]);
  };

  const toggleTab = (tabId) => {
    setSelectedTabs((prev) =>
      prev.includes(tabId) ? prev.filter((t) => t !== tabId) : [...prev, tabId],
    );
  };

  const handleSave = async () => {
    if (saving || isProtected) return;
    setSaving(true);
    await onSave(user.id, role, selectedTabs);
    setSaving(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(6,14,26,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          width: "100%",
          maxWidth: 440,
          fontFamily: "'Sora',sans-serif",
          boxShadow: "0 8px 40px rgba(13,27,46,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0d1b2e",
                margin: 0,
              }}
            >
              Manage Access
            </p>
            <p style={{ fontSize: 12, color: "#5a7599", margin: "2px 0 0" }}>
              {user.name || user.email || "Unknown user"}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ab2cc",
              padding: 2,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#9ab2cc",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
              margin: "0 0 10px",
            }}
          >
            Role
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <button
                key={value}
                onClick={() => !isProtected && handleRoleChange(value)}
                disabled={isProtected}
                style={{
                  flex: 1,
                  padding: "8px 6px",
                  borderRadius: 10,
                  border: `1.5px solid ${role === value ? "#1565c0" : "#dce8f7"}`,
                  background: role === value ? "#e3f2fd" : "#f7faff",
                  color: role === value ? "#1565c0" : "#5a7599",
                  fontSize: 11,
                  fontWeight: role === value ? 700 : 500,
                  cursor: isProtected ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                  fontFamily: "'Sora',sans-serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "#9ab2cc", margin: "8px 0 0" }}>
            Selecting a role resets tab access to the role defaults — you can
            still adjust individual tabs below.
          </p>
        </div>

        {/* Tab checkboxes */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#9ab2cc",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            Accessible Tabs
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {TABS.map(({ id, label }) => {
              const checked = selectedTabs.includes(id);
              return (
                <label
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: `1px solid ${checked ? "#bbdefb" : "#dce8f7"}`,
                    background: checked ? "#f0f6ff" : "#fafcff",
                    cursor: isProtected ? "not-allowed" : "pointer",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => !isProtected && toggleTab(id)}
                    disabled={isProtected}
                    style={{ accentColor: "#1565c0", width: 14, height: 14 }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: checked ? 600 : 400,
                      color: checked ? "#0d1b2e" : "#5a7599",
                    }}
                  >
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 10,
              border: "1px solid #dce8f7",
              background: "#f7faff",
              color: "#5a7599",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || isProtected}
            style={{
              padding: "8px 20px",
              borderRadius: 10,
              border: "none",
              background: isProtected ? "#e0e0e0" : "#1565c0",
              color: isProtected ? "#9e9e9e" : "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: saving || isProtected ? "not-allowed" : "pointer",
              fontFamily: "'Sora',sans-serif",
            }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── USERS SECTION ──────────────────────────────────────────────────────────
function UsersSection({
  readOnly = false,
  currentUser,
  isHardRestricted,
  hiddenEmails = [],
  protectedEmails = [],
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewingUser, setViewingUser] = useState(null);
  const [managingUser, setManagingUser] = useState(null);
  const [notice, setNotice] = useState(null);

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

  const updateUserAccess = async (id, role, allowedTabs) => {
    const isAdmin = role !== "viewer";
    await updateDoc(doc(db, "adminUsers", id), {
      role,
      allowedTabs,
      isAdmin,
    }).catch(() => {});
    setUsers((p) =>
      p.map((u) => (u.id === id ? { ...u, role, allowedTabs, isAdmin } : u)),
    );
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
    if (!window.confirm("Permanently delete this user? This cannot be undone."))
      return;
    // Optimistically remove from UI
    setUsers((prev) => prev.filter((u) => u.id !== id));
    let authDeleted = false;
    try {
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: id }),
      });
      if (res.ok) {
        const json = await res.json();
        authDeleted = json.authDeleted === true;
      } else {
        throw new Error("API error");
      }
    } catch {
      // API unavailable — fall back to client-side Firestore delete only
      await deleteDoc(doc(db, "adminUsers", id)).catch(() => {});
    }
    setNotice(authDeleted ? "full" : "partial");
  };

  const filtered = users.filter((u) => {
    if (hiddenEmails.includes(u.email?.toLowerCase())) return false;
    if (!search) return true;
    return (
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase())
    );
  });
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
      <AnimatePresence>
        {managingUser && (
          <ManageAccessModal
            user={managingUser}
            onClose={() => setManagingUser(null)}
            onSave={updateUserAccess}
            protectedEmails={protectedEmails}
          />
        )}
      </AnimatePresence>

      {/* Deletion notice */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              marginBottom: 16,
              background: notice === "full" ? "#e8f5e9" : "#fff8e1",
              border: `1px solid ${notice === "full" ? "#a5d6a7" : "#ffe082"}`,
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <div style={{ flex: 1 }}>
              {notice === "full" ? (
                <>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#2e7d32",
                      fontFamily: "Sora,sans-serif",
                    }}
                  >
                    User deleted successfully.
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 12,
                      color: "#388e3c",
                      fontFamily: "Sora,sans-serif",
                    }}
                  >
                    Their account and access have been fully removed from
                    Firebase.
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#e65100",
                      fontFamily: "Sora,sans-serif",
                    }}
                  >
                    User removed from the dashboard.
                  </p>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 12,
                      color: "#bf360c",
                      fontFamily: "Sora,sans-serif",
                    }}
                  >
                    Their Firebase Authentication account may still be active.
                    Please contact the developer to complete the deletion, or
                    advise the staff member to reset their password immediately.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setNotice(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 2,
                color: "#999",
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
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
        <div className="flex items-center gap-3 flex-wrap">
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
          <button
            onClick={() =>
              downloadCSV(
                "users.csv",
                filtered.map((u) => ({
                  Name: u.name,
                  Email: u.email,
                  Role: u.role,
                  Approved: u.approved === false ? "Pending" : "Approved",
                  UID: u.uid,
                  "Created At": fmtDateTime(u.createdAt),
                  "Last Login": fmtDateTime(u.lastLogin),
                })),
              )
            }
            className="flex items-center gap-2 bg-[#f0f6ff] hover:bg-[#dce8f7] border border-[#dce8f7] text-[#1565c0] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            title="Download CSV"
          >
            <Download size={15} /> CSV
          </button>
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
                        isImageUrl(u.idCard) ? (
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
                        ) : (
                          <button
                            onClick={() => downloadIdCard(u.idCard)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              marginTop: 4,
                              fontSize: 10,
                              color: "#2e7d32",
                              fontWeight: 700,
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              fontFamily: "'Sora',sans-serif",
                            }}
                          >
                            <CreditCard size={10} /> Download ID
                          </button>
                        )
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
                              u.role === "admin"
                                ? "#e3f2fd"
                                : u.role === "operations"
                                  ? "#f3e5f5"
                                  : "#f5f5f5",
                            color:
                              u.role === "admin"
                                ? "#1565c0"
                                : u.role === "operations"
                                  ? "#7b1fa2"
                                  : "#9e9e9e",
                          }}
                        >
                          {ROLE_LABELS[u.role] || "Viewer"}
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
                          <Eye size={12} /> View User
                        </button>
                        {!readOnly &&
                          (() => {
                            const isProtected =
                              u.id === currentUser?.uid ||
                              protectedEmails.includes(u.email?.toLowerCase());
                            return (
                              <>
                                {u.approved === false ? (
                                  <button
                                    onClick={() =>
                                      !isProtected && setApproval(u.id, true)
                                    }
                                    disabled={isProtected}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 5,
                                      background: isProtected
                                        ? "#f5f5f5"
                                        : "#e8f5e9",
                                      border: `1px solid ${isProtected ? "#e0e0e0" : "#a5d6a7"}`,
                                      borderRadius: 8,
                                      padding: "5px 10px",
                                      cursor: isProtected
                                        ? "not-allowed"
                                        : "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      color: isProtected
                                        ? "#bdbdbd"
                                        : "#2e7d32",
                                      opacity: isProtected ? 0.6 : 1,
                                    }}
                                    title={
                                      isProtected
                                        ? "Cannot modify a super-admin"
                                        : undefined
                                    }
                                  >
                                    <UserCheck size={12} /> Approve
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      !isProtected && setApproval(u.id, false)
                                    }
                                    disabled={isProtected}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 5,
                                      background: isProtected
                                        ? "#f5f5f5"
                                        : "#fff3e0",
                                      border: `1px solid ${isProtected ? "#e0e0e0" : "#ffcc80"}`,
                                      borderRadius: 8,
                                      padding: "5px 10px",
                                      cursor: isProtected
                                        ? "not-allowed"
                                        : "pointer",
                                      fontSize: 11,
                                      fontWeight: 700,
                                      color: isProtected
                                        ? "#bdbdbd"
                                        : "#e65100",
                                      opacity: isProtected ? 0.6 : 1,
                                    }}
                                    title={
                                      isProtected
                                        ? "Cannot modify a super-admin"
                                        : undefined
                                    }
                                  >
                                    <UserX size={12} /> Revoke
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    !isProtected && setManagingUser(u)
                                  }
                                  disabled={isProtected}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    background: isProtected
                                      ? "#f5f5f5"
                                      : "#f3e5f5",
                                    border: `1px solid ${isProtected ? "#e0e0e0" : "#e1bee7"}`,
                                    borderRadius: 8,
                                    padding: "5px 10px",
                                    cursor: isProtected
                                      ? "not-allowed"
                                      : "pointer",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: isProtected ? "#bdbdbd" : "#7b1fa2",
                                    opacity: isProtected ? 0.6 : 1,
                                  }}
                                  title={
                                    isProtected
                                      ? "Cannot modify a super-admin"
                                      : "Manage role and tab access"
                                  }
                                >
                                  <ShieldCheck size={12} />
                                  Manage Access
                                </button>
                                <button
                                  onClick={() => !isProtected && remove(u.id)}
                                  disabled={isProtected}
                                  style={{
                                    background: isProtected
                                      ? "#f5f5f5"
                                      : "#ffebee",
                                    border: "none",
                                    borderRadius: 8,
                                    padding: "6px 8px",
                                    cursor: isProtected
                                      ? "not-allowed"
                                      : "pointer",
                                    color: isProtected ? "#bdbdbd" : "#c62828",
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: isProtected ? 0.6 : 1,
                                  }}
                                  title={
                                    isProtected
                                      ? "Cannot remove a super-admin"
                                      : undefined
                                  }
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            );
                          })()}
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
  const [editEmail, setEditEmail] = useState(email || "");
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

  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "afolaray/profiles");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || "Upload failed");
    return d.url;
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
        email: editEmail.trim().toLowerCase(),
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
        </div>

        {/* Email — editable */}
        <div
          style={{
            padding: "12px 24px",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
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
            Email Address
          </label>
          <input
            type="email"
            value={editEmail}
            required
            placeholder="you@example.com"
            onChange={(e) => setEditEmail(e.target.value)}
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
                isImageUrl(existingData.idCard) ? (
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
                ) : (
                  <button
                    onClick={() => downloadIdCard(existingData.idCard)}
                    style={{
                      fontSize: 10,
                      color: "#42a5f5",
                      fontWeight: 600,
                      textTransform: "none",
                      letterSpacing: 0,
                      marginLeft: 6,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    Download current ↓
                  </button>
                )
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

const BLANK_SCHEDULE = {
  name: "",
  url: "",
  note: "",
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
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              downloadCSV(
                "trackers.csv",
                trackers.map((t) => ({
                  Name: t.name,
                  "Short Name": t.short,
                  URL: t.url,
                  Enabled: t.enabled ? "Yes" : "No",
                })),
              )
            }
            className="flex items-center gap-2 bg-[#f0f6ff] hover:bg-[#dce8f7] border border-[#dce8f7] text-[#1565c0] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            title="Download CSV"
          >
            <Download size={15} /> CSV
          </button>
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

// ── SCHEDULES SECTION ─────────────────────────────────────────────────────
function ScheduleSection({ readOnly = false, currentUser, isHardRestricted }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_SCHEDULE);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "schedules"), orderBy("createdAt", "desc")),
      );
      setSchedules(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(BLANK_SCHEDULE);
    setEditId(null);
    setSaveErr(null);
  };

  const startEdit = (item) => {
    setForm({
      name: item.name || "",
      url: item.url || "",
      note: item.note || "",
      enabled: item.enabled !== false,
    });
    setEditId(item.id);
    setSaveErr(null);
    setView("form");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    try {
      if (editId) {
        await updateDoc(doc(db, "schedules", editId), {
          ...form,
          ...auditMeta(currentUser, "updated"),
        });
      } else {
        await addDoc(collection(db, "schedules"), {
          ...form,
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
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;
    await deleteDoc(doc(db, "schedules", id)).catch(() => {});
    load();
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
            <ChevronLeft size={14} /> Back to Schedules
          </button>
          <h2 className="text-[18px] font-bold text-[#0d1b2e]">
            {editId ? "Edit Schedule" : "Add Schedule"}
          </h2>
          {editId &&
            (() => {
              const current = schedules.find((x) => x.id === editId);
              return current ? (
                <div style={{ marginLeft: 12 }}>
                  <AuditBadge
                    record={current}
                    isHardRestricted={isHardRestricted}
                  />
                </div>
              ) : null;
            })()}
        </div>
        <form className="max-w-3xl flex flex-col gap-5" onSubmit={save}>
          <div className="bg-white border border-[#dce8f7] rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-[11px] font-bold text-[#1565c0] tracking-[0.1em] uppercase">
              Schedule Portal Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className={lbl}>Name</label>
                <input
                  type="text"
                  placeholder="Maritime Carrier Schedule"
                  value={form.name}
                  required
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className={inp}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className={lbl}>Schedule URL</label>
                <input
                  type="url"
                  placeholder="https://carrier.com/schedule"
                  value={form.url}
                  required
                  onChange={(e) =>
                    setForm((p) => ({ ...p, url: e.target.value }))
                  }
                  className={inp}
                />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className={lbl}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Add a short label or notes for this schedule portal."
                  value={form.note}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, note: e.target.value }))
                  }
                  className={`${inp} resize-y`}
                />
              </div>
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
                  ? "Visible on the schedules page"
                  : "Hidden from public schedule listings"}
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
              {saving ? "Saving…" : editId ? "Update Schedule" : "Add Schedule"}
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
          <h2 className="text-[20px] font-bold text-[#0d1b2e]">Schedules</h2>
          <p className="text-[13px] text-[#5a7599] font-light">
            {schedules.length} record{schedules.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              downloadCSV(
                "schedules.csv",
                schedules.map((s) => ({
                  Name: s.name,
                  URL: s.url,
                  Note: s.note,
                  Enabled: s.enabled ? "Yes" : "No",
                })),
              )
            }
            className="flex items-center gap-2 bg-[#f0f6ff] hover:bg-[#dce8f7] border border-[#dce8f7] text-[#1565c0] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            title="Download CSV"
          >
            <Download size={15} /> CSV
          </button>
          {!readOnly && (
            <button
              onClick={() => {
                resetForm();
                setView("form");
              }}
              className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-4 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            >
              <Plus size={15} /> Add Schedule
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12 text-[#5a7599] text-[13px]">
          Loading…
        </div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
          <CalendarDays size={36} className="mx-auto mb-3 text-[#dce8f7]" />
          <p className="text-[15px] font-bold text-[#0d1b2e]">
            No schedules yet
          </p>
          <p className="text-[13px] text-[#5a7599]">
            Add a schedule portal to make it visible on the public schedules
            page.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#dce8f7] rounded-2xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-[#0d1b2e]">
                  {item.name}
                </p>
                <p className="text-[12px] text-[#5a7599] mt-1">
                  {item.note || item.url}
                </p>
                <div style={{ marginTop: 8 }}>
                  <AuditBadge
                    record={item}
                    isHardRestricted={isHardRestricted}
                  />
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1565c0] text-[13px] font-semibold mt-2"
                >
                  Open schedule portal <ExternalLink size={14} />
                </a>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold bg-[#e3f2fd] text-[#1565c0] px-2.5 py-0.5 rounded-full">
                  {item.enabled !== false ? "Enabled" : "Disabled"}
                </span>
                {!readOnly && (
                  <>
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg p-2 cursor-pointer text-[#1565c0] flex transition"
                    >
                      <Pencil size={14} />
                    </button>
                    {!isHardRestricted && (
                      <button
                        onClick={() => remove(item.id)}
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
    </div>
  );
}

// ── VIEW VEHICLE MODAL ──────────────────────────────────────────────────────
function VehicleRowDrawer({ v, trackers = [], colSpan, onClose, onEdit }) {
  const tracker = trackers.find((t) => t.name === v.company);
  const accent = tracker?.accent || "#1565c0";

  const Field = ({ label, value, mono }) =>
    value ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#9ab2cc", textTransform: "uppercase", letterSpacing: "0.09em" }}>
          {label}
        </span>
        <span style={{ fontSize: 13, color: "#0d1b2e", fontFamily: mono ? "monospace" : "'Sora',sans-serif", lineHeight: 1.55, wordBreak: "break-word" }}>
          {value}
        </span>
      </div>
    ) : null;

  return (
    <tr>
      <td colSpan={colSpan} style={{ padding: 0, borderBottom: "2px solid #1565c0" }}>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            background: "#f5f9ff",
            borderLeft: "4px solid #1565c0",
            padding: "20px 24px",
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {/* Drawer header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Truck size={18} style={{ color: accent }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0d1b2e", lineHeight: 1.2 }}>
                  {v.make || v.consigneeName || "Vehicle Record"}
                </p>
                {v.company && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: accent, background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 999, padding: "2px 10px", display: "inline-block", marginTop: 4 }}>
                    {tracker?.short || v.company}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              {onEdit && (
                <button
                  onClick={() => onEdit(v)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", border: "1px solid #dce8f7", borderRadius: 9, background: "#fff", color: "#1565c0", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}
                >
                  <Pencil size={12} /> Edit
                </button>
              )}
              <button
                onClick={onClose}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "1px solid #dce8f7", borderRadius: 8, background: "#fff", color: "#9ab2cc", cursor: "pointer" }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Fields grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px 24px" }}>
            <Field label="Consignee" value={v.consigneeName} />
            <Field label="Date" value={v.date} />
            <Field label="A Number" value={v.aNumber} mono />
            <Field label="C Number" value={v.cNumber} mono />
            <Field label="Make / Model" value={v.make} />
            <Field label="Duty" value={v.dutyFee ? formatNaira(v.dutyFee) : null} mono />
            <Field label="Shipping Company" value={v.company} />
          </div>

          {/* Chassis — full width below if present */}
          {toDisplayString(v.chassisNo) !== "—" && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e8f0fb" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#9ab2cc", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 6 }}>
                Chassis No(s)
              </span>
              <span style={{ fontSize: 13, fontFamily: "monospace", color: "#0d1b2e", lineHeight: 1.7, wordBreak: "break-word" }}>
                {toDisplayString(v.chassisNo)}
              </span>
            </div>
          )}

          {(v.note || v.notes) && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #e8f0fb" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#9ab2cc", textTransform: "uppercase", letterSpacing: "0.09em", display: "block", marginBottom: 6 }}>Notes</span>
              <span style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, wordBreak: "break-word" }}>{v.note || v.notes}</span>
            </div>
          )}
        </motion.div>
      </td>
    </tr>
  );
}

// ── VEHICLES SECTION ────────────────────────────────────────────────────────
const BLANK_VEHICLE = {
  date: "",
  aNumber: "",
  cNumber: "",
  consigneeName: "",
  chassisNo: "",
  dutyFee: "",
  make: "",
  company: "",
  nextItemId: "",
};

function VehiclesSection({
  readOnly = false,
  currentUser,
  isHardRestricted,
  trackers = [],
}) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(BLANK_VEHICLE);
  const [editId, setEditId] = useState(null);
  const [chassisInputs, setChassisInputs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, "vehicles"), orderBy("createdAt", "desc")),
      );
      setVehicles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setForm(BLANK_VEHICLE);
    setEditId(null);
    setSaveErr(null);
    setChassisInputs([]);
  };

  const startEdit = (v) => {
    setForm({
      date: v.date || "",
      aNumber: v.aNumber || "",
      cNumber: v.cNumber || "",
      consigneeName: v.consigneeName || "",
      chassisNo: v.chassisNo || "",
      dutyFee: v.dutyFee || "",
      make: v.make || "",
      company: v.company || "PIML",
      nextItemId: v.nextItemId || "",
    });
    setEditId(v.id);
    setView("form");
    const raw = v.chassisNo || "";
    const parts = raw.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
    setChassisInputs(parts.length ? parts : []);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveErr(null);
    try {
      const chassisString = (chassisInputs || [])
        .map((s) => (s || "").toString().trim())
        .filter(Boolean)
        .join(", ");

      const payload = {
        ...form,
        chassisNo: chassisString,
        nextItemId: form.nextItemId || "",
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(doc(db, "vehicles", editId), payload);
        setVehicles((p) =>
          p.map((v) => (v.id === editId ? { ...v, ...payload } : v)),
        );
      } else {
        payload.createdAt = serverTimestamp();
        const ref = await addDoc(collection(db, "vehicles"), payload);
        setVehicles((p) => [{ id: ref.id, ...payload }, ...p]);
      }
      resetForm();
      setView("list");
    } catch (err) {
      setSaveErr("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this vehicle record? This cannot be undone."))
      return;
    setVehicles((p) => p.filter((v) => v.id !== id));
    await deleteDoc(doc(db, "vehicles", id)).catch(() => {});
  };

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchSuggestions = (() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const seen = new Set();
    const results = [];
    for (const v of vehicles) {
      const candidates = [
        v.consigneeName && { label: v.consigneeName, tag: "Consignee" },
        v.make && { label: v.make, tag: "Make" },
        v.aNumber && { label: v.aNumber, tag: "A-No" },
        v.cNumber && { label: v.cNumber, tag: "C-No" },
        v.company && { label: v.company, tag: "Company" },
        v.date && { label: v.date, tag: "Date" },
        ...(toDisplayString(v.chassisNo) !== "—"
          ? toDisplayString(v.chassisNo)
              .split(", ")
              .map((c) => ({ label: c, tag: "Chassis" }))
          : []),
      ].filter(Boolean);
      for (const c of candidates) {
        const key = c.tag + "::" + c.label;
        if (!seen.has(key) && c.label.toLowerCase().includes(q)) {
          seen.add(key);
          results.push(c);
          if (results.length >= 10) return results;
        }
      }
    }
    return results;
  })();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const getRecordDate = (v) => {
    if (v.date) { const d = new Date(v.date); if (!isNaN(d)) return d; }
    if (v.createdAt?.toDate) return v.createdAt.toDate();
    if (v.createdAt?.seconds) return new Date(v.createdAt.seconds * 1000);
    return null;
  };

  const isOldRecord = (v) => {
    const d = getRecordDate(v);
    return d ? d < sixMonthsAgo : false;
  };

  const filtered = vehicles.filter(
    (v) =>
      !search ||
      [
        v.consigneeName,
        v.make,
        toDisplayString(v.chassisNo),
        v.aNumber,
        v.cNumber,
        v.company,
        v.dutyFee,
        v.date,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    const da = getRecordDate(a);
    const db_ = getRecordDate(b);
    if (!da && !db_) return 0;
    if (!da) return 1;
    if (!db_) return -1;
    return sortOrder === "newest" ? db_ - da : da - db_;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paged = sorted.slice((page - 1) * perPage, page * perPage);

  const TH = {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    padding: "11px 14px",
    background: "#0d1b2e",
    borderBottom: "none",
    whiteSpace: "nowrap",
    textAlign: "left",
  };
  const TD = {
    padding: "12px 14px",
    borderBottom: "1px solid #f0f4fa",
    verticalAlign: "middle",
    fontSize: 13,
    color: "#1e2d3d",
    background: "transparent",
  };

  // ── FORM VIEW ──
  if (view === "form") {
    const formSection = (title) => (
      <div style={{
        fontSize: 10, fontWeight: 800, textTransform: "uppercase",
        letterSpacing: "0.1em", color: "#9ab2cc", marginBottom: 12, marginTop: 4,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>{title}</span>
        <span style={{ flex: 1, height: 1, background: "#eef4ff" }} />
      </div>
    );
    const editIdx = editId ? vehicles.findIndex((x) => x.id === editId) : -1;
    return (
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => { resetForm(); setView("list"); }}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#5a7599", fontSize: 13, fontWeight: 700, fontFamily: "Sora,sans-serif", padding: "6px 10px", borderRadius: 8, transition: "background 0.15s" }}
            className="hover:bg-[#eef4ff]"
          >
            <ChevronLeft size={15} /> Back
          </button>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0d1b2e", lineHeight: 1.2 }}>
              {editId ? "Edit Vehicle Record" : "New Vehicle Record"}
            </h2>
            {editId && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ab2cc" }}>Record {editIdx + 1} of {vehicles.length}</p>}
          </div>
          {editId && (() => {
            const cur = vehicles.find((x) => x.id === editId);
            return cur ? <AuditBadge record={cur} isHardRestricted={isHardRestricted} /> : null;
          })()}
          {editId && (
            <div style={{ display: "flex", gap: 6 }}>
              <button type="button" onClick={() => { if (editIdx > 0) startEdit(vehicles[editIdx - 1]); }}
                disabled={editIdx <= 0}
                style={{ padding: "6px 14px", border: "1px solid #dce8f7", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#5a7599", fontFamily: "Sora,sans-serif", opacity: editIdx <= 0 ? 0.4 : 1 }}>
                ← Prev
              </button>
              <button type="button" onClick={() => { if (editIdx < vehicles.length - 1) startEdit(vehicles[editIdx + 1]); }}
                disabled={editIdx >= vehicles.length - 1}
                style={{ padding: "6px 14px", border: "1px solid #dce8f7", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#5a7599", fontFamily: "Sora,sans-serif", opacity: editIdx >= vehicles.length - 1 ? 0.4 : 1 }}>
                Next →
              </button>
            </div>
          )}
        </div>

        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Reference section */}
          <div style={{ background: "#fff", border: "1px solid #e8f0fb", borderRadius: 16, padding: "22px 24px" }}>
            {formSection("Reference")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <label className={lbl}>Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className={lbl}>A Number</label>
                <input type="text" placeholder="e.g. 118452" value={form.aNumber} onChange={(e) => setForm((p) => ({ ...p, aNumber: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className={lbl}>C Number</label>
                <input type="text" placeholder="e.g. 115599" value={form.cNumber} onChange={(e) => setForm((p) => ({ ...p, cNumber: e.target.value }))} className={inp} />
              </div>
            </div>
          </div>

          {/* Consignee section */}
          <div style={{ background: "#fff", border: "1px solid #e8f0fb", borderRadius: 16, padding: "22px 24px" }}>
            {formSection("Consignee")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label className={lbl}>Consignee Name</label>
                <input type="text" placeholder="e.g. T LAW NIG ENT" value={form.consigneeName} required onChange={(e) => setForm((p) => ({ ...p, consigneeName: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className={lbl}>Shipping Company</label>
                <select value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className={inp}>
                  <option value="">— Select company —</option>
                  {trackers.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}{t.short ? ` (${t.short})` : ""}</option>
                  ))}
                </select>
                {trackers.length === 0 && (
                  <p style={{ fontSize: 11, color: "#e65100", marginTop: 4 }}>No trackers found — add shipping companies in the Trackers tab first.</p>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle section */}
          <div style={{ background: "#fff", border: "1px solid #e8f0fb", borderRadius: 16, padding: "22px 24px" }}>
            {formSection("Vehicle")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label className={lbl}>Make / Model</label>
                <input type="text" placeholder="e.g. Used Toyota Camry" value={form.make} onChange={(e) => setForm((p) => ({ ...p, make: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className={lbl}>Duty (₦)</label>
                <input type="number" placeholder="e.g. 1500000" value={form.dutyFee} onChange={(e) => setForm((p) => ({ ...p, dutyFee: e.target.value }))} className={inp} min="0" />
              </div>
            </div>
            <div>
              <label className={lbl}>Chassis No(s)</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(chassisInputs.length ? chassisInputs : [""]).map((c, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder={`Chassis ${idx + 1}`}
                      value={c}
                      onChange={(e) => setChassisInputs((prev) => prev.map((p, i) => (i === idx ? e.target.value : p)))}
                      className={inp}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => setChassisInputs((prev) => prev.filter((_, i) => i !== idx))}
                      style={{ padding: "6px 12px", border: "1px solid #fecdd3", borderRadius: 8, background: "#fff", cursor: "pointer", color: "#e11d48", fontSize: 12, fontFamily: "Sora,sans-serif", fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setChassisInputs((prev) => [...prev, ""])}
                  style={{ alignSelf: "flex-start", padding: "7px 16px", border: "1px dashed #b0c8f5", borderRadius: 8, background: "#f0f6ff", cursor: "pointer", color: "#1565c0", fontSize: 12, fontFamily: "Sora,sans-serif", fontWeight: 700 }}
                >
                  + Add chassis
                </button>
              </div>
            </div>
          </div>

          {saveErr && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "10px 16px", color: "#c62828", fontSize: 13 }}>{saveErr}</div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "#1565c0", color: "#fff", border: "none", borderRadius: 12, padding: "11px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Sora,sans-serif", opacity: saving ? 0.7 : 1 }}
            >
              <Save size={14} />
              {saving ? "Saving…" : editId ? "Update Record" : "Save Record"}
            </button>
            <button
              type="button"
              onClick={() => { resetForm(); setView("list"); }}
              style={{ padding: "11px 20px", border: "1px solid #dce8f7", borderRadius: 12, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#5a7599", fontFamily: "Sora,sans-serif" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── LIST VIEW ──
  const perPageOptions = (() => {
    const base = [10, 20, 25, 50, 100];
    const total = vehicles.length;
    if (total > 100) {
      let n = 150;
      while (n <= total) { base.push(n); n += 50; }
      if (base[base.length - 1] < total) base.push(total);
    }
    return base;
  })();

  const rangeStart = sorted.length === 0 ? 0 : (page - 1) * perPage + 1;
  const rangeEnd = Math.min(page * perPage, sorted.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Page header ── */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, marginBottom: 20,
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0d1b2e", letterSpacing: "-0.01em" }}>
            Vehicle Records
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9ab2cc", fontWeight: 500 }}>
            {vehicles.length} record{vehicles.length !== 1 ? "s" : ""} in database
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* Search */}
          <div className="relative" ref={searchRef} style={{ flex: 1, minWidth: 300 }}>
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ab2cc] pointer-events-none" />
            <input
              type="text"
              placeholder="Search consignee, make, chassis, A-No…"
              value={search}
              autoComplete="off"
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => { setSearch(e.target.value); setPage(1); setSearchOpen(true); }}
              onKeyDown={(e) => { if (e.key === "Escape" || e.key === "Enter") setSearchOpen(false); }}
              style={{
                width: "100%", paddingLeft: 38, paddingRight: search ? 32 : 14, paddingTop: 10, paddingBottom: 10,
                border: "1px solid #dce8f7", borderRadius: 12, fontSize: 13, color: "#0d1b2e",
                fontFamily: "Sora,sans-serif", outline: "none", background: "#fff",
                boxSizing: "border-box",
              }}
              className="focus:border-[#1565c0]"
            />
            {search && (
              <button type="button" onClick={() => { setSearch(""); setPage(1); setSearchOpen(false); }}
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ab2cc", display: "flex", padding: 0 }}>
                <X size={13} />
              </button>
            )}
            {searchOpen && searchSuggestions.length > 0 && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: "100%",
                background: "#fff", border: "1px solid #dce8f7", borderRadius: 12,
                boxShadow: "0 8px 32px rgba(21,101,192,0.13)", zIndex: 200, overflow: "hidden",
              }}>
                {searchSuggestions.map((s, i) => (
                  <button key={i} type="button"
                    onMouseDown={(e) => { e.preventDefault(); setSearch(s.label); setPage(1); setSearchOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "9px 14px", border: "none",
                      borderBottom: i < searchSuggestions.length - 1 ? "1px solid #f0f4fc" : "none",
                      background: "transparent", cursor: "pointer", textAlign: "left", fontFamily: "Sora,sans-serif",
                    }}
                    className="hover:bg-[#f0f6ff]"
                  >
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", background: "#1565c0", padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap", flexShrink: 0 }}>
                      {s.tag}
                    </span>
                    <span style={{ fontSize: 13, color: "#0d1b2e", fontWeight: 500 }}>{s.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CSV */}
          <button
            onClick={() => downloadCSV("vehicles.csv", sorted.map((v) => ({
              Date: v.date, "A-Number": v.aNumber, "C-Number": v.cNumber,
              Consignee: v.consigneeName, "Chassis No": toDisplayString(v.chassisNo),
              Duty: formatNaira(v.dutyFee), Make: v.make, Company: v.company,
            })))}
            title="Download CSV"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 16px", border: "1px solid #dce8f7", borderRadius: 12, background: "#fff", color: "#5a7599", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Sora,sans-serif", whiteSpace: "nowrap" }}
            className="hover:bg-[#f0f6ff] hover:text-[#1565c0] transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>

          {/* Add */}
          {!readOnly && (
            <button
              onClick={() => { resetForm(); setView("form"); }}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", border: "none", borderRadius: 12, background: "#1565c0", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Sora,sans-serif", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(21,101,192,0.25)" }}
              className="hover:bg-[#0d47a1] transition-colors"
            >
              <Plus size={14} /> New Record
            </button>
          )}
        </div>
      </div>

      {/* ── Table card ── */}
      <div style={{ background: "#fff", border: "1px solid #e8f0fb", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(21,101,192,0.06)" }}>

        {/* Toolbar inside card */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 18px", borderBottom: "1px solid #f0f4fa", gap: 12, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", border: "1px solid #dce8f7", borderRadius: 8, overflow: "hidden", marginRight: 4 }}>
              {["newest", "oldest"].map((order) => (
                <button
                  key={order}
                  onClick={() => { setSortOrder(order); setPage(1); }}
                  style={{
                    padding: "5px 12px", border: "none", cursor: "pointer",
                    fontSize: 11, fontWeight: 700, fontFamily: "Sora,sans-serif",
                    background: sortOrder === order ? "#1565c0" : "#f7faff",
                    color: sortOrder === order ? "#fff" : "#5a7599",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {order === "newest" ? "Newest" : "Oldest"}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#9ab2cc", fontWeight: 500 }}>Show</span>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              style={{ border: "1px solid #dce8f7", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#0d1b2e", fontFamily: "Sora,sans-serif", background: "#f7faff", cursor: "pointer", outline: "none" }}
            >
              {perPageOptions.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <span style={{ fontSize: 12, color: "#9ab2cc", fontWeight: 500 }}>rows</span>
          </div>
          <span style={{ fontSize: 12, color: "#9ab2cc" }}>
            {sorted.length === 0
              ? "No results"
              : `Showing ${rangeStart}–${rangeEnd} of ${sorted.length}`}
            {search && sorted.length !== vehicles.length && ` (filtered from ${vehicles.length})`}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ab2cc", fontSize: 13 }}>Loading records…</div>
        ) : paged.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Truck size={40} style={{ margin: "0 auto 12px", color: "#dce8f7" }} />
            <p style={{ fontWeight: 700, color: "#0d1b2e", fontSize: 15, margin: "0 0 4px" }}>
              {search ? "No records match your search" : "No vehicle records yet"}
            </p>
            {!readOnly && !search && (
              <p style={{ color: "#9ab2cc", fontSize: 13, margin: 0 }}>Click "New Record" to add the first entry.</p>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {[
                    { label: "#",          w: 44  },
                    { label: "Date",       w: 110 },
                    { label: "A-No",       w: 90  },
                    { label: "C-No",       w: 90  },
                    { label: "Consignee",  w: null },
                    { label: "Chassis No", w: 160 },
                    { label: "Duty",       w: 130 },
                    { label: "Make",       w: 140 },
                    { label: "Company",    w: 110 },
                    { label: "Actions",    w: 130 },
                  ].map(({ label, w }) => (
                    <th key={label} style={{ ...TH, width: w || undefined, minWidth: w || undefined }}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {paged.map((v, idx) => {
                  const tracker = trackers.find((t) => t.name === v.company);
                  const accent = tracker?.accent || "#1565c0";
                  const rowNum = rangeStart + idx;
                  const isOpen = viewingVehicle?.id === v.id;
                  const COL_COUNT = 10;
                  return (
                    <React.Fragment key={v.id}>
                      <tr
                        onClick={() => setViewingVehicle(isOpen ? null : v)}
                        style={{
                          borderLeft: isOpen ? "4px solid #1565c0" : "4px solid transparent",
                          background: isOpen ? "#eef4ff" : "transparent",
                          transition: "background 0.12s, border-color 0.12s",
                          cursor: "pointer",
                        }}
                        className="hover:bg-[#f5f8ff]"
                      >
                        <td style={{ ...TD, color: "#c7d7f5", textAlign: "center", fontWeight: 600, fontSize: 11 }}>{rowNum}</td>
                        <td style={{ ...TD }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            <span style={{ fontSize: 12, color: "#5a7599" }}>{v.date || <span style={{ color: "#dce8f7" }}>—</span>}</span>
                            {isOldRecord(v) ? (
                              <span style={{ display: "inline-flex", alignSelf: "flex-start", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", borderRadius: 4, padding: "1px 6px" }}>Old</span>
                            ) : (
                              <span style={{ display: "inline-flex", alignSelf: "flex-start", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 4, padding: "1px 6px" }}>New</span>
                            )}
                          </div>
                        </td>
                        <td style={{ ...TD }}>
                          {v.aNumber
                            ? <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#1565c0", background: "#e8f0ff", borderRadius: 5, padding: "2px 6px", fontSize: 12 }}>{v.aNumber}</span>
                            : <span style={{ color: "#dce8f7" }}>—</span>}
                        </td>
                        <td style={{ ...TD }}>
                          {v.cNumber
                            ? <span style={{ fontFamily: "monospace", color: "#5a7599", background: "#f4f7fc", borderRadius: 5, padding: "2px 6px", fontSize: 12 }}>{v.cNumber}</span>
                            : <span style={{ color: "#dce8f7" }}>—</span>}
                        </td>
                        <td style={{ ...TD, fontWeight: 600 }}>
                          {v.consigneeName || <span style={{ color: "#dce8f7", fontWeight: 400 }}>—</span>}
                        </td>
                        <td style={{ ...TD, fontFamily: "monospace", fontSize: 12, color: "#475569" }}>
                          {toDisplayString(v.chassisNo)}
                        </td>
                        <td style={{ ...TD }}>
                          {v.dutyFee
                            ? <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, padding: "3px 8px", fontSize: 12, whiteSpace: "nowrap" }}>{formatNaira(v.dutyFee)}</span>
                            : <span style={{ color: "#dce8f7" }}>—</span>}
                        </td>
                        <td style={{ ...TD }}>
                          {v.make || <span style={{ color: "#dce8f7" }}>—</span>}
                        </td>
                        <td style={{ ...TD }}>
                          {v.company ? (
                            <span style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, border: `1px solid ${accent}33`, background: `${accent}15`, color: accent, whiteSpace: "nowrap" }}>
                              {tracker?.short || v.company}
                            </span>
                          ) : <span style={{ color: "#dce8f7" }}>—</span>}
                        </td>
                        <td style={{ ...TD, whiteSpace: "nowrap" }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setViewingVehicle(isOpen ? null : v); }}
                              title={isOpen ? "Close" : "View details"}
                              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, border: "none", borderRadius: 8, background: isOpen ? "#1565c0" : "#e3f2fd", color: isOpen ? "#fff" : "#1565c0", cursor: "pointer" }}
                              className="transition-colors"
                            >
                              {isOpen ? <X size={13} /> : <Eye size={13} />}
                            </button>
                            {!readOnly && (
                              <>
                                <button onClick={() => startEdit(v)} title="Edit"
                                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, border: "1px solid #dce8f7", borderRadius: 8, background: "#f7faff", color: "#1565c0", cursor: "pointer" }}
                                  className="hover:bg-[#dce8f7] transition-colors">
                                  <Pencil size={13} />
                                </button>
                                {!isHardRestricted && (
                                  <button onClick={() => remove(v.id)} title="Delete"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, border: "none", borderRadius: 8, background: "#fff0f0", color: "#c62828", cursor: "pointer" }}
                                    className="hover:bg-[#ffcdd2] transition-colors">
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <VehicleRowDrawer
                          v={v}
                          trackers={trackers}
                          colSpan={COL_COUNT}
                          onClose={() => setViewingVehicle(null)}
                          onEdit={!readOnly ? (rec) => { setViewingVehicle(null); startEdit(rec); } : null}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: 16 }}>
        <Pagination
          page={page}
          total={totalPages}
          onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        />
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [user, setUser] = useState(undefined);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "trackingPortals"))
      .then((snap) =>
        setTrackers(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      )
      .catch(() => {});
  }, []);
  const [tab, setTab] = useState(() => {
    if (typeof window === "undefined") return "cars";
    const saved = window.localStorage.getItem("adminTab");
    return TABS.some((item) => item.id === saved) ? saved : "cars";
  });
  const handleSetTab = (id) => {
    setTab(id);
    window.localStorage.setItem("adminTab", id);
  };
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
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
        // Backfill any Auth fields missing from Firestore
        const missing = {};
        if (!data.email && u.email) missing.email = u.email;
        if (!data.uid) missing.uid = u.uid;
        const role = data.role || (data.isAdmin === false ? "viewer" : "admin");
        const roleTabs = ROLE_TABS[role] || ROLE_TABS.viewer;
        // Use stored tabs exactly — admin set them deliberately. Fall back to role defaults only if none stored.
        const allowedTabs = data.allowedTabs?.length
          ? data.allowedTabs
          : roleTabs;
        if (!data.role || !data.allowedTabs?.length) {
          Object.assign(missing, { role, allowedTabs });
        }
        if (Object.keys(missing).length) {
          await setDoc(doc(db, "adminUsers", u.uid), missing, {
            merge: true,
          }).catch(() => {});
          Object.assign(data, missing);
        }
        setCurrentUserData(data);
        if (!data.idCard) setShowProfileModal(true);
      } catch {
        setShowProfileModal(true);
      }
    });
    return unsub;
  }, []);

  const isReadOnly = currentUserData?.isAdmin === false;
  const isHardRestricted = currentUserData?.role !== "admin";
  const HIDDEN_USER_EMAILS = ["moyosorejames@gmail.com"];
  const isViewOnly = isReadOnly;
  const allowedTabs =
    currentUserData?.allowedTabs ||
    ROLE_TABS[currentUserData?.role] ||
    ROLE_TABS.viewer;
  const visibleTabs = TABS.filter((tabItem) =>
    allowedTabs.includes(tabItem.id),
  );

  useEffect(() => {
    if (user === undefined || visibleTabs.length === 0) return;
    if (!visibleTabs.some((item) => item.id === tab)) {
      handleSetTab(visibleTabs[0]?.id || "cars");
    }
  }, [tab, user, visibleTabs]);

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
            onClose={() => setShowProfileModal(false)}
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
          flexShrink: 0,
        }}
      >
        {isMobile ? (
          <div style={{ padding: "10px 16px" }}>
            <select
              value={tab}
              onChange={(e) => handleSetTab(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #dce8f7",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                color: "#1565c0",
                background: "#f0f6ff",
                fontFamily: "Sora,sans-serif",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {visibleTabs.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 0,
              overflowX: "auto",
              padding: "0 1.5rem",
              scrollbarWidth: "none",
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
                  padding: "14px 18px",
                  border: "none",
                  borderBottom: tab === id ? "2px solid #1565c0" : "2px solid transparent",
                  background: "transparent",
                  color: tab === id ? "#1565c0" : "#5a7599",
                  fontSize: 13,
                  fontWeight: tab === id ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "Sora,sans-serif",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "1.5rem 1.25rem",
          maxWidth: tab === "vehicles" ? "100%" : 1100,
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
            {tab === "vehicles" && (
              <VehiclesSection
                readOnly={isViewOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
                trackers={trackers}
              />
            )}
            {tab === "schedules" && (
              <ScheduleSection
                readOnly={isViewOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
              />
            )}
            {tab === "users" && (
              <UsersSection
                readOnly={isReadOnly}
                currentUser={user}
                isHardRestricted={isHardRestricted}
                hiddenEmails={HIDDEN_USER_EMAILS}
                protectedEmails={[]}
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
