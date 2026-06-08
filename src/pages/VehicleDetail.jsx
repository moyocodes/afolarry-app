import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toDisplayString } from "../lib/utils";

const drawerWidth = 500;

// ── helpers ──────────────────────────────────────────────────────────────────
const statusColor = (s = "") => {
  const l = s.toLowerCase();
  if (l.includes("deliv")) return { bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" };
  if (l.includes("trans")) return { bg: "#e0f2fe", color: "#0369a1", border: "#bae6fd" };
  return { bg: "#fef9c3", color: "#a16207", border: "#fde68a" };
};

const Field = ({ label, value, mono = false, accent = false }) =>
  value ? (
    <div>
      <p style={styles.fieldLabel}>{label}</p>
      <p
        style={{
          ...styles.fieldValue,
          fontFamily: mono ? "monospace" : "inherit",
          fontSize: mono ? 12 : 13,
          color: accent ? "#1565c0" : "#1e293b",
        }}
      >
        {value}
      </p>
    </div>
  ) : null;

const Divider = () => (
  <div style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }} />
);

// ── main component ────────────────────────────────────────────────────────────
export default function VehicleDetail({ id: propId, onClose: propOnClose, trackers = [] }) {
  const params = useParams();
  const navigate = useNavigate();
  const id = propId || params.id;

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const ref = doc(db, "vehicles", id);
        const snap = await getDoc(ref);
        if (!mounted) return;
        if (!snap.exists()) { setErr("Vehicle not found"); }
        else { setVehicle({ id: snap.id, ...snap.data() }); }
      } catch {
        if (mounted) setErr("Could not load vehicle");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (id) load();
    return () => { mounted = false; };
  }, [id]);

  // reset carousel index when vehicle changes
  useEffect(() => { setImgIdx(0); }, [vehicle?.id]);

  const close = () => {
    if (typeof propOnClose === "function") return propOnClose();
    if (window.history.length > 1) navigate(-1);
    else navigate("/track");
  };

  const tracker = vehicle ? trackers.find((t) => t.name === vehicle.company) : null;
  const accentColor = tracker?.accent || "#1565c0";
  const sc = vehicle?.status ? statusColor(vehicle.status) : null;

  const imgs = vehicle?.images?.length
    ? vehicle.images
    : vehicle?.image
    ? [vehicle.image]
    : [];

  const hasImages = imgs.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div onClick={close} style={styles.backdrop} />

      {/* Drawer */}
      <aside role="dialog" aria-label="Vehicle details" style={styles.drawer}>

        {/* ── Carousel ──────────────────────────────────────────────────────── */}
        {hasImages && (
          <div style={styles.carousel}>
            {/* sliding track */}
            <div
              style={{
                display: "flex",
                width: `${imgs.length * 100}%`,
                height: "100%",
                transform: `translateX(-${(imgIdx * 100) / imgs.length}%)`,
                transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {imgs.map((src, i) => (
                <div
                  key={i}
                  style={{
                    width: `${100 / imgs.length}%`,
                    flexShrink: 0,
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={src}
                    alt={`${vehicle?.make || "vehicle"} ${i + 1}`}
                    style={styles.carouselImg}
                  />
                </div>
              ))}
            </div>

            {/* gradient overlay at bottom */}
            <div style={styles.carouselGradient} />

            {/* Close button */}
            <button onClick={close} aria-label="Close" style={styles.carouselClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {imgs.length > 1 && (
              <>
                {/* Prev */}
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + imgs.length) % imgs.length)}
                  aria-label="Previous image"
                  style={styles.carouselArrow}
                >
                  ‹
                </button>
                {/* Next */}
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % imgs.length)}
                  aria-label="Next image"
                  style={{ ...styles.carouselArrow, left: "auto", right: 12 }}
                >
                  ›
                </button>
                {/* Dots */}
                <div style={styles.carouselDots}>
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      aria-label={`Go to image ${i + 1}`}
                      style={{
                        ...styles.carouselDot,
                        background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.4)",
                        transform: i === imgIdx ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
                {/* Counter */}
                <div style={styles.carouselCounter}>
                  {imgIdx + 1} / {imgs.length}
                </div>
              </>
            )}
          </div>
        )}

   

        {/* ── Body ───────────────────────────────────────────────────────────── */}
        <div style={styles.body}>
          {loading ? (
            <div style={styles.stateWrap}>
              <div style={styles.spinner} />
              <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 12 }}>Loading vehicle…</p>
            </div>
          ) : err ? (
            <div style={styles.stateWrap}>
              <span style={{ fontSize: 28 }}>⚠️</span>
              <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8 }}>{err}</p>
            </div>
          ) : vehicle ? (
            <div style={styles.grid}>

              <SectionHeading label="Vehicle" />
              <div style={styles.twoCol}>
                <Field label="Make / Model" value={vehicle.make} />
                <Field label="Date" value={vehicle.date} />
              </div>

              <Divider />

              <SectionHeading label="Reference Numbers" />
              <div style={styles.twoCol}>
                <Field label="A-Number" value={vehicle.aNumber} accent />
                <Field label="C-Number" value={vehicle.cNumber} accent />
              </div>

              <Divider />

              <SectionHeading label="Chassis Details" />
              <Field label="Chassis No(s)" value={toDisplayString(vehicle.chassisNo)} mono />

              <Divider />

              {toDisplayString(vehicle.duty) && (
                <>
                  <SectionHeading label="Duty" />
                  <div style={styles.dutyBox}>
                    <span style={styles.dutyIcon}>
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="1" width="12" height="14" rx="2" stroke="#16a34a" strokeWidth="1.5"/>
                        <path d="M5 5h6M5 8h6M5 11h4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <p style={styles.dutyValue}>{toDisplayString(vehicle.duty)}</p>
                  </div>
                  <Divider />
                </>
              )}

              <SectionHeading label="Consignee" />
              <div style={styles.twoCol}>
                <Field label="Name" value={vehicle.consigneeName} />
                <Field label="Shipping Company" value={vehicle.company} />
              </div>

              {vehicle.notes && (
                <>
                  <Divider />
                  <SectionHeading label="Notes" />
                  <p style={{ ...styles.fieldValue, color: "#475569", lineHeight: 1.6 }}>
                    {vehicle.notes}
                  </p>
                </>
              )}

            </div>
          ) : (
            <p style={{ color: "#94a3b8", fontSize: 13 }}>No data available.</p>
          )}
        </div>
      </aside>
    </>
  );
}

// ── sub-components ────────────────────────────────────────────────────────────
function SectionHeading({ label }) {
  return (
    <p style={{
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "#94a3b8",
      margin: "0 0 10px",
    }}>
      {label}
    </p>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(8, 19, 38, 0.5)",
    backdropFilter: "blur(2px)",
    zIndex: 900,
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    width: drawerWidth,
    maxWidth: "100%",
    background: "#fff",
    zIndex: 1000,
    boxShadow: "-2px 0 40px rgba(8,19,38,0.14)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Sora', 'Inter', sans-serif",
    overflowY: "auto",
  },

  // ── carousel ──
  carousel: {
    position: "relative",
    width: "100%",
    height: 220,
    overflow: "hidden",
    flexShrink: 0,
    background: "#0d1b2a",
  },
  carouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  carouselGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: "linear-gradient(to top, rgba(13,71,161,0.55), transparent)",
    pointerEvents: "none",
  },
  carouselClose: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "none",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backdropFilter: "blur(4px)",
  },
  carouselArrow: {
    position: "absolute",
    top: "50%",
    left: 12,
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.45)",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontSize: 22,
    lineHeight: 1,
    padding: "4px 10px",
    cursor: "pointer",
    zIndex: 10,
    backdropFilter: "blur(4px)",
    transition: "background 0.15s",
  },
  carouselDots: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
    zIndex: 10,
  },
  carouselDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, transform 0.2s",
  },
  carouselCounter: {
    position: "absolute",
    bottom: 10,
    right: 12,
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.8)",
    background: "rgba(0,0,0,0.35)",
    padding: "2px 8px",
    borderRadius: 999,
    backdropFilter: "blur(4px)",
    zIndex: 10,
  },

  // ── banner ──
  banner: {
    padding: "28px 28px 22px",
    background: "linear-gradient(160deg, #0d47a1 0%, #1565c0 55%, #1976d2 100%)",
    flexShrink: 0,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "none",
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    margin: "0 0 6px",
    fontSize: 10,
    fontWeight: 800,
    color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
  },
  bannerTitle: {
    margin: "0 0 10px",
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    paddingRight: 32,
  },
  bannerMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 6,
    padding: "4px 10px",
  },

  // ── body ──
  body: {
    flex: 1,
    padding: "22px 28px 32px",
    overflowY: "auto",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  dutyBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "10px 12px",
  },
  dutyIcon: {
    flexShrink: 0,
    marginTop: 1,
  },
  dutyValue: {
    margin: 0,
    fontFamily: "monospace",
    fontSize: 12,
    color: "#15803d",
    lineHeight: 1.6,
    wordBreak: "break-word",
  },

  // ── fields ──
  fieldLabel: {
    margin: "0 0 3px",
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  },
  fieldValue: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    color: "#1e293b",
    lineHeight: 1.5,
    wordBreak: "break-word",
  },

  // ── states ──
  stateWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  spinner: {
    width: 28,
    height: 28,
    border: "3px solid #e2e8f0",
    borderTopColor: "#1565c0",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};