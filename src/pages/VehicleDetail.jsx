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

  const close = () => {
    if (typeof propOnClose === "function") return propOnClose();
    if (window.history.length > 1) navigate(-1);
    else navigate("/track");
  };

  // resolve tracker accent for company badge
  const tracker = vehicle
    ? trackers.find((t) => t.name === vehicle.company)
    : null;
  const accentColor = tracker?.accent || "#1565c0";
  const sc = vehicle?.status ? statusColor(vehicle.status) : null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={close} style={styles.backdrop} />

      {/* Drawer */}
      <aside role="dialog" aria-label="Vehicle details" style={styles.drawer}>

        {/* ── Banner ─────────────────────────────────────────────────────────── */}
        <div style={styles.banner}>
          {/* Close */}
          <button onClick={close} aria-label="Close" style={styles.closeBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {vehicle?.image && (
            <div style={styles.heroImgWrap}>
              <img
                src={vehicle.image}
                alt={vehicle.make || "vehicle"}
                style={styles.heroImg}
              />
            </div>
          )}

          {/* Eyebrow */}
          <p style={styles.eyebrow}>Vehicle Record</p>

          {/* Primary title: Make / Model */}
          <h2 style={styles.bannerTitle}>
            {loading ? "Loading…" : vehicle?.make || "Unknown vehicle"}
          </h2>

          {/* Subtitle row: consignee + date */}
          {vehicle && (
            <div style={styles.bannerMeta}>
              {vehicle.consigneeName && (
                <span style={styles.metaChip}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ marginRight: 4, flexShrink: 0 }}>
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {vehicle.consigneeName}
                </span>
              )}
              {vehicle.date && (
                <span style={styles.metaChip}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ marginRight: 4, flexShrink: 0 }}>
                    <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 1v4M11 1v4M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {vehicle.date}
                </span>
              )}
            </div>
          )}

          {/* Company + status badges */}
          {vehicle && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {vehicle.company && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: `${accentColor}22`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                    letterSpacing: "0.03em",
                  }}
                >
                  {tracker?.short || vehicle.company}
                </span>
              )}
              {sc && vehicle.status && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: sc.bg,
                    color: sc.color,
                    border: `1px solid ${sc.border}`,
                  }}
                >
                  {vehicle.status}
                </span>
              )}
            </div>
          )}
        </div>

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

              {/* ─ Vehicle ─ */}
              <SectionHeading label="Vehicle" />
              <div style={styles.twoCol}>
                <Field label="Make / Model" value={vehicle.make} />
                <Field label="Date" value={vehicle.date} />
              </div>

              <Divider />

              {/* ─ Reference Numbers ─ */}
              <SectionHeading label="Reference Numbers" />
              <div style={styles.twoCol}>
                <Field label="A-Number" value={vehicle.aNumber} accent />
                <Field label="C-Number" value={vehicle.cNumber} accent />
              </div>

              <Divider />

              {/* ─ Chassis ─ */}
              <SectionHeading label="Chassis Details" />
              <Field label="Chassis No(s)" value={toDisplayString(vehicle.chassisNo)} mono />

              <Divider />

              {/* ─ Duty ─ */}
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

              {/* ─ Consignee ─ */}
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

  // banner
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
  heroImgWrap: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    border: "1.5px solid rgba(255,255,255,0.2)",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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

  // body
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

  // fields
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

  // states
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