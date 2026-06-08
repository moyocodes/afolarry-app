import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  Search,
  X,
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

// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown({ endsAt }) {
  const calc = () => {
    const diff = endsAt - Date.now();
    if (diff <= 0) return null;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (!t) return null;

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="mb-3 bg-[#fff8f0] border border-[#ffe0b2] rounded-xl px-3 py-2.5">
      <p className="text-[9px] font-bold text-[#e65100] tracking-[0.1em] uppercase mb-1.5">
        Pre-order ends in
      </p>
      <div className="flex gap-2">
        {[
          { v: t.d, l: "Days" },
          { v: t.h, l: "Hrs" },
          { v: t.m, l: "Min" },
          { v: t.s, l: "Sec" },
        ].map(({ v, l }) => (
          <div key={l} className="flex-1 text-center bg-white rounded-lg py-1.5 border border-[#ffe0b2]">
            <p className="text-[15px] font-bold text-[#0d1b2e] leading-none">{pad(v)}</p>
            <p className="text-[9px] text-[#e65100] font-semibold mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ car, onClose }) {
  const [fields, setFields] = useState({
    from_name: "",
    from_email: "",
    phone: "",
    city: "",
  });
  const [status, setStatus] = useState(null);

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
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.1em] uppercase mb-1">
              Place Your Order
            </p>
            <p className="text-[15px] font-bold text-white">{car.name}</p>
            <p className="text-[13px] text-white/50 font-light">{fmt(car.price)}</p>
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
            { key: "from_name", label: "Full Name", type: "text", placeholder: "Your full name" },
            { key: "from_email", label: "Email Address", type: "email", placeholder: "your@email.com" },
            { key: "phone", label: "Phone Number", type: "tel", placeholder: "+234…" },
            { key: "city", label: "Preferred Delivery City", type: "text", placeholder: "e.g. Lagos, Abuja" },
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
              <><CheckCircle size={15} /> Order sent — check your email!</>
            ) : status ? (
              <><AlertCircle size={15} /> {status}</>
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

// ─── Cars Page ────────────────────────────────────────────────────────────────
function CarCard({ car, i, onOrder }) {
  const imgs = car.images?.length ? car.images : car.image ? [car.image] : [];
  const [idx, setIdx] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.06 }}
      whileHover={{ y: -5 }}
      className="bg-white border border-[#dce8f7] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(21,101,192,0.05)] relative"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f7faff]">
        {imgs.length > 0 ? (
          <img
            src={imgs[idx]}
            alt={car.name}
            className="w-full h-full object-cover block hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#5a7599] text-[12px]">
            No image
          </div>
        )}

        {/* Status badge */}
        <div className={`absolute top-2.5 left-2.5 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-[0.06em]
          ${car.status === "available" ? "bg-[#2e7d32]" : car.status === "sold" ? "bg-[#c62828]" : "bg-[#e65100]"}`}>
          {car.status === "available" ? "Available Now" : car.status === "sold" ? "Sold" : "Pre-Order"}
        </div>

        {/* Carousel controls */}
        {imgs.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((n) => (n - 1 + imgs.length) % imgs.length); }}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 border-none rounded-md text-white text-[18px] leading-none px-1.5 py-0.5 cursor-pointer transition z-10"
              aria-label="Previous image"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setIdx((n) => (n + 1) % imgs.length); }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/65 border-none rounded-md text-white text-[18px] leading-none px-1.5 py-0.5 cursor-pointer transition z-10"
              aria-label="Next image"
            >›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {imgs.map((_, n) => (
                <button
                  key={n}
                  onClick={(e) => { e.stopPropagation(); setIdx(n); }}
                  className="w-1.5 h-1.5 rounded-full border-none cursor-pointer p-0 transition"
                  style={{ background: n === idx ? "#fff" : "rgba(255,255,255,0.4)" }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-5">
        <p className="text-[14px] font-bold text-[#0d1b2e] mb-1">{car.name}</p>
        <p className="text-[11px] text-[#5a7599] mb-0.5">Type: {car.type}</p>
        <p className="text-[11px] text-[#5a7599] mb-3">Location: {car.location}</p>
        {car.description && (
          <p className="text-[11px] text-[#5a7599] font-light leading-relaxed mb-3 line-clamp-2">
            {car.description}
          </p>
        )}
        {car.preorderEnds && <Countdown endsAt={car.preorderEnds} />}
        <p className="text-[17px] font-bold text-[#1565c0] mb-4">{fmt(car.price)}</p>
        <motion.button
          onClick={() => car.status !== "sold" && onOrder(car)}
          disabled={car.status === "sold"}
          className={`w-full border-none py-2.5 rounded-[9px] font-[Sora,sans-serif] text-[13px] font-bold transition
            ${car.status === "sold"
              ? "bg-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed"
              : "bg-[#1565c0] hover:bg-[#1255a8] text-white cursor-pointer"}`}
        >
          {car.status === "sold" ? "Unavailable" : "Pre-Order This Car"}
        </motion.button>
      </div>
    </motion.div>
  );
}

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
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const load = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const snap = await getDocs(
        query(collection(db, "cars"), orderBy("createdAt", "desc"))
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

  const handleShieldClick = () => {
    if (user) {
      navigate("/admin");
    } else {
      navigate("/shield");
    }
  };

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
          <div className="relative flex-1 min-w-[160px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a7599] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search cars…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className={`${inp} pl-9 w-full`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">Type</label>
            <input
              value={filterType}
              type="text"
              placeholder="Tokunbo, Used Nigeria…, Luxury"
              onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
              className={`${inp} min-w-[130px]`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">Min ₦</label>
            <input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              className={`${inp} w-[100px]`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-[#5a7599] tracking-[0.1em] uppercase">Max ₦</label>
            <input
              type="number"
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              className={`${inp} w-[100px]`}
            />
          </div>

          {(search || filterType !== "All" || minPrice || maxPrice) && (
            <button
              onClick={() => { setSearch(""); setFilterType("All"); setMinPrice(""); setMaxPrice(""); setPage(1); }}
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
              <div key={i} className="bg-white border border-[#dce8f7] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(21,101,192,0.05)] animate-pulse">
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
            <p className="text-[18px] font-bold text-[#0d1b2e] mb-2">Could not load cars</p>
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
            <p className="text-[18px] font-bold text-[#0d1b2e] mb-2">No vehicles listed yet</p>
            <p className="text-[14px] text-[#5a7599] font-light max-w-[380px] mx-auto">
              Check back soon — new stock and pre-orders will appear here once uploaded.
            </p>
          </div>
        ) : paginated.length === 0 ? (
          <p className="text-center py-16 text-[#5a7599] text-[14px]">
            No cars match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map((car, i) => (
              <CarCard key={car.id} car={car} i={i} onOrder={setOrderCar} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex items-center gap-1 border border-[#dce8f7] rounded-lg px-3 py-2 text-[12px] font-semibold font-[Sora,sans-serif] transition
                ${page === 1 ? "bg-[#f7faff] text-[#b0c4de] cursor-not-allowed" : "bg-white text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) => {
                if (totalPages <= 7) return true;
                if (n === 1 || n === totalPages) return true;
                if (Math.abs(n - page) <= 2) return true;
                return false;
              })
              .reduce((acc, n, idx, arr) => {
                if (idx > 0 && n - arr[idx - 1] > 1) acc.push("…" + n);
                acc.push(n);
                return acc;
              }, [])
              .map((n, idx) =>
                typeof n === "string" ? (
                  <span key={n + idx} className="px-2 py-2 text-[12px] text-[#5a7599] select-none">…</span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-lg border text-[12px] font-semibold font-[Sora,sans-serif] transition
                      ${page === n ? "bg-[#1565c0] border-[#1565c0] text-white cursor-default" : "bg-white border-[#dce8f7] text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
                  >
                    {n}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex items-center gap-1 border border-[#dce8f7] rounded-lg px-3 py-2 text-[12px] font-semibold font-[Sora,sans-serif] transition
                ${page === totalPages ? "bg-[#f7faff] text-[#b0c4de] cursor-not-allowed" : "bg-white text-[#1565c0] hover:bg-[#e3f2fd] cursor-pointer"}`}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </section>

      {/* ── Shield FAB — always visible ── */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onClick={handleShieldClick}
        title={user ? "Admin dashboard" : "Admin login"}
        className={`fixed bottom-[88px] right-5 z-[800] w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center shadow-[0_4px_20px_rgba(21,101,192,0.4)] hover:scale-110 transition-transform
          ${user ? "bg-[#1565c0]" : "bg-[#0d1b2e]"}`}
      >
        <ShieldCheck size={20} color={user ? "#fff" : "#42a5f5"} />
      </motion.button>

      <AnimatePresence>
        {orderCar && (
          <OrderModal car={orderCar} onClose={() => setOrderCar(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
