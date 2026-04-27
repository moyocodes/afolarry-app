import { useState, useEffect, useRef } from "react";
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
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import PageHeader from "../components/PageHeader";
import {
  Search,
  X,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Upload,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const S = { fontFamily: "'Sora',sans-serif" };
const PER_PAGE = 8;

const fmt = (n) =>
  "₦" + Number(n).toLocaleString("en-NG", { minimumFractionDigits: 2 });

const BLANK_FORM = {
  name: "",
  type: "Used Nigeria",
  location: "Nigeria",
  price: "",
  status: "available",
  image: "",
  description: "",
};

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ car, onClose }) {
  const [fields, setFields] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    city: "",
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err' | string

  const set = (k, v) => setFields((p) => ({ ...p, [k]: v }));

  const send = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          car_name: car.name,
          car_price: fmt(car.price),
          car_type: car.type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      addDoc(collection(db, "orders"), {
        ...fields,
        car_name: car.name,
        car_price: fmt(car.price),
        car_type: car.type,
        status: "new",
        createdAt: Date.now(),
      }).catch(() => {});
      setStatus("ok");
      setTimeout(() => {
        setStatus(null);
        onClose();
      }, 3500);
    } catch (err) {
      setStatus(err.message || "err");
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const inp =
    "bg-white/10 border border-white/15 text-white placeholder:text-white/35 px-3.5 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] outline-none w-full focus:border-[#42a5f5] transition";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[rgba(13,27,46,0.82)] z-[900] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        className="bg-[#0d1b2e] rounded-[18px] border border-white/10 p-8 w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.1em] uppercase mb-1">
              Place Your Order
            </p>
            <p className="text-[15px] font-bold text-white">{car.name}</p>
            <p className="text-[13px] text-white/50 font-light">
              {fmt(car.price)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 rounded-lg w-9 h-9 flex items-center justify-center text-white hover:bg-white/20 transition shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={send} className="flex flex-col gap-3">
          {[
            {
              key: "from_name",
              label: "Full Name",
              type: "text",
              placeholder: "Your full name",
            },
            {
              key: "from_email",
              label: "Email Address",
              type: "email",
              placeholder: "your@email.com",
            },
            {
              key: "phone",
              label: "Phone Number",
              type: "tel",
              placeholder: "+234…",
            },
            {
              key: "city",
              label: "Preferred Delivery City",
              type: "text",
              placeholder: "e.g. Lagos, Abuja",
            },
          ].map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-white/40 tracking-[0.1em] uppercase">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                required
                value={fields[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                className={inp}
              />
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={status === "sending" || status === "ok"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-2 flex items-center justify-center gap-2 text-white border-none py-3 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition
              ${status === "ok" ? "bg-[#2e7d32]" : status && status !== "sending" ? "bg-[#c62828]" : "bg-[#1e88e5]"}
              ${status === "sending" || status === "ok" ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {status === "sending" ? (
              "Submitting…"
            ) : status === "ok" ? (
              <>
                <CheckCircle size={15} /> Order sent — check your email!
              </>
            ) : status ? (
              <>
                <AlertCircle size={15} /> {status}
              </>
            ) : (
              "Submit Order"
            )}
          </motion.button>

          {!status && (
            <p className="text-center text-[11px] text-white/30 font-light">
              A confirmation copy will be sent to your email.
            </p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Admin Drawer ─────────────────────────────────────────────────────────────
function AdminDrawer({ open, onClose, user, cars, onRefresh }) {
  const [form, setForm] = useState(BLANK_FORM);
  const [editId, setEditId] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);
  const [tab, setTab] = useState("list");

  const resetForm = () => {
    setForm(BLANK_FORM);
    setEditId(null);
    setImgFile(null);
    setImgPreview(null);
    setSaveErr(null);
  };

  const pickFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
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
        // Track upload progress to our API endpoint
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable)
            setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status === 200) resolve(data.url);
            else reject(new Error(data.error || "Upload failed"));
          } catch {
            reject(new Error("Invalid response from upload API"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error during upload"));
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
      const data = { ...form, price: Number(form.price), image: imageUrl };
      if (editId) {
        await updateDoc(doc(db, "cars", editId), data);
      } else {
        await addDoc(collection(db, "cars"), {
          ...data,
          createdAt: Date.now(),
        });
      }
      resetForm();
      setTab("list");
      onRefresh();
    } catch (err) {
      setSaveErr(err.message || "Save failed. Check Firebase rules.");
    } finally {
      setSaving(false);
      setUploadProgress(null);
    }
  };

  // ✅ Populates form AND switches to add tab
  const startEdit = (car) => {
    setForm({
      name: car.name,
      type: car.type,
      location: car.location,
      price: car.price,
      status: car.status,
      image: car.image || "",
      description: car.description || "",
    });
    setEditId(car.id);
    setImgFile(null);
    setImgPreview(car.image || null);
    setSaveErr(null);
    setTab("add");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    try {
      await deleteDoc(doc(db, "cars", id));
      onRefresh();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  const inp =
    "bg-white border border-[#dce8f7] text-[#0d1b2e] px-3 py-2.5 rounded-lg font-[Sora,sans-serif] text-[13px] outline-none w-full focus:border-[#1565c0] transition";
  const lbl = "text-[10px] font-bold text-[#5a7599] tracking-[0.1em] uppercase";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(13,27,46,0.45)] z-[800]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white z-[810] flex flex-col shadow-[-8px_0_40px_rgba(13,27,46,0.18)]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#dce8f7] flex items-center justify-between bg-[#0d1b2e] shrink-0">
              <div>
                <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.08em] uppercase">
                  Admin Panel
                </p>
                <p className="text-[13px] text-white/65 font-light">
                  {user?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => signOut(auth).then(onClose)}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border-none rounded-lg px-3 py-1.5 text-[12px] font-[Sora,sans-serif] cursor-pointer transition"
                >
                  <LogOut size={13} /> Sign out
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 border-none rounded-lg p-1.5 text-white flex cursor-pointer transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#dce8f7] shrink-0">
              {[
                { id: "list", label: `Cars (${cars.length})` },
                { id: "add", label: editId ? "Edit Car" : "Add Car" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    if (t.id === "list") resetForm();
                  }}
                  className={`flex-1 py-3 border-none text-[13px] font-[Sora,sans-serif] cursor-pointer transition
                    ${
                      tab === t.id
                        ? "bg-white border-b-2 border-[#1565c0] font-bold text-[#1565c0]"
                        : "bg-[#f7faff] border-b-2 border-transparent text-[#5a7599] hover:text-[#1565c0]"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* ── List tab ── */}
              {tab === "list" && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      resetForm();
                      setTab("add");
                    }}
                    className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-4 py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer transition mb-1"
                  >
                    <Plus size={15} /> Add New Car
                  </button>

                  {cars.length === 0 && (
                    <p className="text-[13px] text-[#5a7599] text-center py-8">
                      No cars yet.
                    </p>
                  )}

                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-[#f7faff] border border-[#dce8f7] rounded-xl p-4 flex gap-3 items-start"
                    >
                      {car.image && (
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-[70px] h-[52px] object-cover rounded-lg shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#0d1b2e] mb-0.5 truncate">
                          {car.name}
                        </p>
                        <p className="text-[12px] text-[#1565c0] font-semibold mb-1">
                          {fmt(car.price)}
                        </p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            car.status === "available"
                              ? "bg-[#e8f5e9] text-[#2e7d32]"
                              : car.status === "sold"
                                ? "bg-[#f5f5f5] text-[#616161]"
                                : "bg-[#fff3e0] text-[#e65100]"
                          }`}
                        >
                          {car.status === "available"
                            ? "Available"
                            : car.status === "sold"
                              ? "Sold"
                              : "Pre-Order"}
                        </span>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        {/* ✅ Fixed: startEdit populates form AND switches tab */}
                        <button
                          onClick={() => startEdit(car)}
                          className="bg-[#e3f2fd] hover:bg-[#bbdefb] border-none rounded-lg p-1.5 cursor-pointer text-[#1565c0] flex transition"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => remove(car.id)}
                          className="bg-[#ffebee] hover:bg-[#ffcdd2] border-none rounded-lg p-1.5 cursor-pointer text-[#c62828] flex transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Add / Edit tab ── */}
              {tab === "add" && (
                <form onSubmit={save} className="flex flex-col gap-3">
                  <h3 className="text-[15px] font-bold text-[#0d1b2e] mb-1">
                    {editId ? "Edit Car" : "Add New Car"}
                  </h3>

                  {[
                    {
                      key: "name",
                      label: "Car Name",
                      type: "text",
                      placeholder: "e.g. Toyota Camry (Used)",
                    },
                    {
                      key: "price",
                      label: "Price (₦)",
                      type: "number",
                      placeholder: "0",
                    },
                    {
                      key: "location",
                      label: "Location",
                      type: "text",
                      placeholder: "Nigeria ",
                    },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label className={lbl}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        required
                        onChange={(e) =>
                          setForm((p) => ({ ...p, [f.key]: e.target.value }))
                        }
                        className={inp}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1">
                    <label className={lbl}>Type</label>
                    <input
                      type="text"
                      value={form.type}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, type: e.target.value }))
                      }
                      placeholder="e.g. Used Nigeria, Tokunbo, New..."
                      className={inp}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
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

                  {/* Image */}
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
                    <p className="text-[11px] text-[#5a7599] text-center">
                      — or upload a file —
                    </p>
                    <label className="flex items-center justify-center gap-2 bg-[#f7faff] border-2 border-dashed border-[#c7d7f5] rounded-[9px] py-2.5 cursor-pointer text-[12px] text-[#5a7599] font-medium hover:border-[#1565c0] transition">
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
                          className="w-full h-[140px] object-cover rounded-[9px] border border-[#dce8f7] block"
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

                  <div className="flex flex-col gap-1">
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
                    <div className="text-[12px] text-[#c62828] bg-[#ffebee] px-3 py-2.5 rounded-lg leading-relaxed">
                      <strong>Error:</strong> {saveErr}
                    </div>
                  )}

                  <div className="flex gap-2 mt-1">
                    <button
                      type="submit"
                      disabled={saving}
                      className={`flex-[2] bg-[#1565c0] hover:bg-[#1255a8] text-white border-none py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-bold transition ${saving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {saving ? "Saving…" : editId ? "Update Car" : "Add Car"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setTab("list");
                      }}
                      className="flex-1 bg-[#f7faff] border border-[#dce8f7] text-[#5a7599] py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer hover:bg-[#eef4ff] transition"
                    >
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
  );
}

// ─── Cars Page ────────────────────────────────────────────────────────────────
export default function Cars() {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [orderCar, setOrderCar] = useState(null);
  const [adminOpen, setAdminOpen] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const load = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const snap = await getDocs(
        query(collection(db, "cars"), orderBy("createdAt", "desc")),
      );
      setCars(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const types = ["All", ...Array.from(new Set(cars.map((c) => c.type)))];

  const filtered = cars.filter((c) => {
    if (filterType !== "All" && c.type !== filterType) return false;
    if (minPrice && c.price < Number(minPrice)) return false;
    if (maxPrice && c.price > Number(maxPrice)) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const inp =
    "px-3 py-2.5 border border-[#dce8f7] rounded-[9px] font-[Sora,sans-serif] text-[13px] outline-none bg-white focus:border-[#1565c0] transition";

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Cars"
        title="Available Cars & Pre-Orders"
        description="Browse in-stock vehicles or place a pre-order for upcoming arrivals."
        image="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80&auto=format&fit=crop"
      />

      {/* ── Filters ── */}
      <div className="bg-[#f7faff] border-b border-[#dce8f7] px-6 sm:px-10 lg:px-12 py-4">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-3 items-end">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
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
              className={`${inp} pl-9 w-full`}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">
              Type
            </label>
            <input
              value={filterType}
              type="text"
              placeholder="Tokunbo, Used Nigeria…, Luxury"
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(1);
              }}
              className={`${inp} min-w-[130px]`}
            />
          </div>

          {/* Min price */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">
              Min ₦
            </label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              className={`${inp} w-[100px]`}
            />
          </div>

          {/* Max price */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">
              Max ₦
            </label>
            <input
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
              className={`${inp} w-[100px]`}
            />
          </div>

          {/* Clear */}
          {(search || filterType !== "All" || minPrice || maxPrice) && (
            <button
              onClick={() => {
                setSearch("");
                setFilterType("All");
                setMinPrice("");
                setMaxPrice("");
                setPage(1);
              }}
              className="flex items-center gap-1.5 bg-[#ffebee] hover:bg-[#ffcdd2] border-none text-[#c62828] px-3.5 py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[12px] font-semibold cursor-pointer transition"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-12 px-6 sm:px-10 lg:px-12 max-w-screen-xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#dce8f7] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(21,101,192,0.05)] animate-pulse"
              >
                <div className="aspect-[16/10] bg-[#e8f0fb]" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-4 bg-[#e8f0fb] rounded-md w-3/4" />
                  <div className="h-3 bg-[#e8f0fb] rounded-md w-1/2" />
                  <div className="h-3 bg-[#e8f0fb] rounded-md w-2/5" />
                  <div className="h-5 bg-[#e8f0fb] rounded-md w-1/3 mt-1" />
                  <div className="h-9 bg-[#e8f0fb] rounded-[9px] mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : fetchError ? (
          <div className="text-center py-20 px-4">
            <div className="text-5xl mb-4">📡</div>
            <p className="text-[18px] font-bold text-[#0d1b2e] mb-2">
              Could not load cars
            </p>
            <p className="text-[14px] text-[#5a7599] font-light max-w-[380px] mx-auto mb-6">
              Check your internet connection and try again.
            </p>
            <button
              onClick={load}
              className="bg-[#1565c0] hover:bg-[#1255a8] text-white border-none px-6 py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-bold cursor-pointer transition"
            >
              Retry
            </button>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="text-5xl mb-4">🚗</div>
            <p className="text-[18px] font-bold text-[#0d1b2e] mb-2">
              No vehicles listed yet
            </p>
            <p className="text-[14px] text-[#5a7599] font-light max-w-[380px] mx-auto">
              Check back soon — new stock and pre-orders will appear here once
              uploaded.
            </p>
          </div>
        ) : paginated.length === 0 ? (
          <p className="text-center py-16 text-[#5a7599] text-[14px]">
            No cars match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-[#dce8f7] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(21,101,192,0.05)] relative"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f7faff]">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover block hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5a7599] text-[12px]">
                      No image
                    </div>
                  )}
                  {/* Status badge */}
                  <div
                    className={`absolute top-2.5 left-2.5 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-[0.06em]
    ${
      car.status === "available"
        ? "bg-[#2e7d32]"
        : car.status === "sold"
          ? "bg-[#c62828]"
          : "bg-[#e65100]"
    }`}
                  >
                    {car.status === "available"
                      ? "Available Now"
                      : car.status === "sold"
                        ? "Sold"
                        : "Pre-Order"}
                  </div>
                  {/* ✅ Admin quick-edit: opens drawer and navigates to edit form */}
                  {user && (
                    <button
                      onClick={() => setAdminOpen(true)}
                      title="Open admin panel"
                      className="absolute top-2.5 right-2.5 bg-white/90 border-none rounded-lg p-1.5 cursor-pointer text-[#1565c0] flex hover:bg-white transition"
                    >
                      <Pencil size={13} />
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[14px] font-bold text-[#0d1b2e] mb-1">
                    {car.name}
                  </p>
                  <p className="text-[11px] text-[#5a7599] mb-0.5">
                    Type: {car.type}
                  </p>
                  <p className="text-[11px] text-[#5a7599] mb-3">
                    Location: {car.location}
                  </p>
                  {car.description && (
                    <p className="text-[11px] text-[#5a7599] font-light leading-relaxed mb-3 line-clamp-2">
                      {car.description}
                    </p>
                  )}
                  <p className="text-[17px] font-bold text-[#1565c0] mb-4">
                    {fmt(car.price)}
                  </p>
                  <motion.button
                    onClick={() => car.status !== "sold" && setOrderCar(car)}
                    disabled={car.status === "sold"}
                    className={`w-full border-none py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-bold transition
    ${
      car.status === "sold"
        ? "bg-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed"
        : "bg-[#1565c0] hover:bg-[#1255a8] text-white cursor-pointer"
    }`}
                  >
                    {car.status === "sold"
                      ? "Unavailable"
                      : "Pre-Order This Car"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex items-center border border-[#dce8f7] rounded-lg px-3.5 py-2 text-[#1565c0] transition
                ${page === 1 ? "bg-[#f7faff] opacity-40 cursor-not-allowed" : "bg-[#e3f2fd] hover:bg-[#bbdefb] cursor-pointer"}`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[13px] text-[#5a7599] font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex items-center border border-[#dce8f7] rounded-lg px-3.5 py-2 text-[#1565c0] transition
                ${page === totalPages ? "bg-[#f7faff] opacity-40 cursor-not-allowed" : "bg-[#e3f2fd] hover:bg-[#bbdefb] cursor-pointer"}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* ── Admin FAB (only when logged in) ── */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          onClick={() => setAdminOpen(true)}
          title="Admin panel"
          className="fixed bottom-[88px] right-5 z-[800] w-12 h-12 rounded-full bg-[#1565c0] text-white border-none cursor-pointer flex items-center justify-center shadow-[0_4px_20px_rgba(21,101,192,0.4)] hover:bg-[#1255a8] transition"
        >
          <ShieldCheck size={20} />
        </motion.button>
      )}

      <AnimatePresence>
        {orderCar && (
          <OrderModal car={orderCar} onClose={() => setOrderCar(null)} />
        )}
      </AnimatePresence>

      {user && (
        <AdminDrawer
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          user={user}
          cars={cars}
          onRefresh={load}
        />
      )}
    </div>
  );
}
