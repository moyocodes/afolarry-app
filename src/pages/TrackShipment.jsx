import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  Anchor,
  Globe,
  ExternalLink,
  ArrowRight,
  Phone,
  MessageCircle,
  Search,
  X,
  Truck,
  ChevronRight,
  MapPin,
  Clock,
  Ship,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import VehicleDetail from "./VehicleDetail";
import { toDisplayString, getVehicleEntries } from "../lib/utils";

/* ─── tokens ──────────────────────────────────────────────────── */
const NAVY = "#03112A";
const BLUE = "#1055CC";
const BLUE_MID = "#1A6BEF";
const BLUE_LIGHT = "#E8F0FE";
const BLUE_DIM = "#9DB8F2";
const SLATE = "#5A7299";
const BORDER = "#E4EBF5";
const WHITE = "#FFFFFF";
const GREEN = "#0D9E6E";
const AMBER = "#E58A00";
const SKY = "#0EA5E9";

/* ─── default trackers ────────────────────────────────────────── */
const DEFAULT_TRACKERS = [
  {
    id: "afolaray",
    name: "Afolaray Nigeria Limited",
    desc: "Track your AFL shipment in real time with full event timeline.",
    short: "AFL",
    accent: BLUE,
    hint: "Open the dedicated AFL tracker and enter your shipment ID.",
    internalPath: "/public-track",
    ctaLabel: "Open AFL Tracker",
    sortOrder: 0,
  },
];

function normalizeTracker(raw, index) {
  const fallback =
    DEFAULT_TRACKERS.find(
      (t) => t.id === raw.id || t.id === raw.slug || t.name === raw.name,
    ) || {};
  const id =
    raw.id ||
    raw.slug ||
    raw.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    `tracker-${index + 1}`;
  const parsedSortOrder = Number(raw.sortOrder);

  return {
    id,
    name: raw.name || fallback.name || "Tracking Portal",
    desc:
      raw.desc ||
      raw.description ||
      fallback.desc ||
      "Open the tracking page for this carrier.",
    short:
      raw.short ||
      fallback.short ||
      (raw.name || "TR")
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
    accent: raw.accent || raw.color || fallback.accent || BLUE,
    hint: raw.hint || fallback.hint || "Open the tracking page to continue.",
    url: raw.url || fallback.url || "",
    internalPath: raw.internalPath || raw.path || fallback.internalPath || "",
    ctaLabel:
      raw.ctaLabel ||
      fallback.ctaLabel ||
      (raw.internalPath || raw.path ? "Open Tracker" : "Open Tracking Portal"),
    sortOrder: Number.isFinite(parsedSortOrder)
      ? parsedSortOrder
      : (fallback.sortOrder ?? index),
    enabled: raw.enabled !== false,
    openInNewTab:
      typeof raw.openInNewTab === "boolean"
        ? raw.openInNewTab
        : !(raw.internalPath || raw.path || fallback.internalPath),
  };
}

/* ─── status helpers ──────────────────────────────────────────── */
function statusMeta(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("deliv")) return { color: GREEN, label: "Delivered" };
  if (s.includes("trans")) return { color: SKY, label: "In Transit" };
  return { color: AMBER, label: status || "Pending" };
}

/* ═══════════════════════════════════════════════════════════════ */
export default function TrackShipment() {
  const navigate = useNavigate();
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [trackers, setTrackers] = useState(DEFAULT_TRACKERS);
  const [loadingTrackers, setLoadingTrackers] = useState(true);
  const [vehicleQuery, setVehicleQuery] = useState("");
  const [vehicleResults, setVehicleResults] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [vehicleSearched, setVehicleSearched] = useState(false);
  const [hoveredTracker, setHoveredTracker] = useState(null);

  /* load trackers */
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingTrackers(true);
      try {
        const snap = await getDocs(collection(db, "trackingPortals"));
        const map = new Map(
          DEFAULT_TRACKERS.map((t, i) => [t.id, normalizeTracker(t, i)]),
        );
        snap.docs.forEach((doc, i) => {
          const t = normalizeTracker({ id: doc.id, ...doc.data() }, i);
          map.set(t.id, t);
        });
        const next = Array.from(map.values())
          .filter((t) => t.enabled)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        if (mounted && next.length) setTrackers(next);
      } catch {
        if (mounted) setTrackers(DEFAULT_TRACKERS);
      } finally {
        if (mounted) setLoadingTrackers(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  /* look up a vehicle by chassis no, A-number, or C-number — never fetches the full collection */
  const searchVehicles = async (raw) => {
    const term = raw.trim();
    if (!term) return;
    setLoadingVehicles(true);
    setVehicleSearched(true);
    try {
      const variants = [...new Set([term, term.toUpperCase()])];
      // "chassisNo" is queried for legacy records that still store it as a flat
      // scalar; "chassisNumbers" is the flattened array new multi-vehicle
      // records store, matched via array-contains.
      const equalityFields = ["chassisNo", "aNumber", "cNumber"];
      const snaps = await Promise.all([
        ...equalityFields.flatMap((field) =>
          variants.map((value) =>
            getDocs(query(collection(db, "vehicles"), where(field, "==", value))),
          ),
        ),
        ...variants.map((value) =>
          getDocs(query(collection(db, "vehicles"), where("chassisNumbers", "array-contains", value))),
        ),
      ]);
      const byId = new Map();
      snaps.forEach((snap) =>
        snap.docs.forEach((d) => byId.set(d.id, { id: d.id, ...d.data() })),
      );
      setVehicleResults(Array.from(byId.values()));
    } catch {
      setVehicleResults([]);
    } finally {
      setLoadingVehicles(false);
    }
  };

  const handleVehicleSearch = (e) => {
    e.preventDefault();
    searchVehicles(vehicleQuery);
  };

  const clearVehicleSearch = () => {
    setVehicleQuery("");
    setVehicleResults([]);
    setVehicleSearched(false);
  };

  const openTracker = (tracker) => {
    if (!tracker) return;
    if (tracker.internalPath) { navigate(tracker.internalPath); return; }
    if (!tracker.url) return;
    if (tracker.openInNewTab) {
      window.open(tracker.url, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(tracker.url);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Sora', sans-serif", background: "#F4F7FC", minHeight: "100vh" }}>

      {/* ── PAGE HEADER ── */}
      <PageHeader
        eyebrow="Track Shipment"
        title="Track Your Shipment"
        description="Choose a shipping line and jump straight into its tracking page."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80&auto=format&fit=crop"
        maxWidth="1140px"
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/public-track" style={styles.heroBtnPrimary}>Open AFL Tracker</Link>
          <Link to="/solutions" style={styles.heroBtnSecondary}>Explore Solutions</Link>
        </div>
      </PageHeader>

      {/* ── MAIN BODY ── */}
      <section style={{ padding: "3rem 1.5rem 5rem", maxWidth: 1140, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: "1.75rem", alignItems: "start" }}>

          {/* ─ LEFT: TRACKERS ─ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <p style={styles.eyebrow}>Select a carrier</p>
                <h2 style={styles.sectionTitle}>Where is your shipment?</h2>
                <p style={styles.sectionSub}>
                  Click a carrier below to open its tracking portal instantly.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {trackers.map((tracker, i) => {
                  const isHovered = hoveredTracker === tracker.id;
                  const isInternal = !!tracker.internalPath;
                  return (
                    <motion.button
                      key={tracker.id}
                      type="button"
                      onClick={() => openTracker(tracker)}
                      onHoverStart={() => setHoveredTracker(tracker.id)}
                      onHoverEnd={() => setHoveredTracker(null)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.985 }}
                      style={{
                        ...styles.trackerCard,
                        border: isHovered
                          ? `1.5px solid ${tracker.accent}55`
                          : `1.5px solid ${BORDER}`,
                        boxShadow: isHovered
                          ? `0 8px 32px ${tracker.accent}18`
                          : "0 2px 10px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* icon badge — Ship for internal AFL, Globe for external */}
                      <motion.div
                        animate={{ scale: isHovered ? 1.06 : 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          ...styles.trackerBadge,
                          background: tracker.accent,
                          boxShadow: `0 6px 20px ${tracker.accent}40`,
                        }}
                      >
                        {isInternal
                          ? <Ship size={22} strokeWidth={1.8} color={WHITE} />
                          : <Globe size={22} strokeWidth={1.8} color={WHITE} />
                        }
                      </motion.div>

                      {/* info */}
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={styles.trackerName}>{tracker.name}</span>
                          <span style={{
                            ...styles.trackerPill,
                            background: isHovered ? `${tracker.accent}15` : BLUE_LIGHT,
                            color: isHovered ? tracker.accent : BLUE,
                          }}>
                            {isInternal ? <Anchor size={10} /> : <Globe size={10} />}
                            {isInternal ? "AFL Page" : "External"}
                          </span>
                        </div>
                        <p style={styles.trackerDesc}>{tracker.desc}</p>
                      </div>

                      {/* arrow */}
                      <motion.div
                        animate={{ x: isHovered ? 3 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "flex", alignItems: "center", gap: 4, color: isHovered ? tracker.accent : SLATE, flexShrink: 0 }}
                      >
                        {!isInternal && <ExternalLink size={12} />}
                        <ArrowRight size={17} />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={styles.hintRow}
              >
                <MapPin size={13} strokeWidth={2} style={{ color: BLUE, flexShrink: 0, marginTop: 1 }} />
                <span>
                  {loadingTrackers
                    ? "Loading carrier destinations…"
                    : "More carriers added regularly. Contact us if yours isn't listed."}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ─ RIGHT: VEHICLES ─ */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={styles.sidebar}
          >
            <div style={styles.sidebarHeader}>
              <div style={styles.sidebarIconWrap}>
                <Truck size={16} strokeWidth={2} color={WHITE} />
              </div>
              <div>
                <h3 style={styles.sidebarTitle}>Vehicle Lookup</h3>
                <p style={styles.sidebarSub}>
                  {vehicleSearched && !loadingVehicles
                    ? `${vehicleResults.length} vehicle${vehicleResults.length !== 1 ? "s" : ""} found`
                    : "Look up your vehicle by its own reference"}
                </p>
              </div>
            </div>

            <div style={styles.sidebarDivider} />

            {/* search */}
            <form onSubmit={handleVehicleSearch} style={styles.searchRow}>
              <div style={styles.searchWrap}>
                <Search size={14} color={SLATE} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  aria-label="Search by chassis no, A-number, or C-number"
                  value={vehicleQuery}
                  onChange={(e) => setVehicleQuery(e.target.value)}
                  placeholder="Chassis No, A-Number, or C-Number"
                  style={styles.searchInput}
                />
              </div>
              {vehicleQuery && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearVehicleSearch}
                  style={styles.clearBtn}
                  title="Clear"
                >
                  <X size={14} />
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loadingVehicles || !vehicleQuery.trim()}
                style={{
                  ...styles.searchBtn,
                  cursor: loadingVehicles || !vehicleQuery.trim() ? "not-allowed" : "pointer",
                  opacity: loadingVehicles || !vehicleQuery.trim() ? 0.55 : 1,
                }}
              >
                {loadingVehicles ? "…" : "Search"}
              </motion.button>
            </form>

            {/* vehicle list */}
            <div style={styles.vehicleList}>
              {loadingVehicles ? (
                <div style={styles.loadingWrap}>
                  {[...Array(2)].map((_, i) => (
                    <div key={i} style={{ ...styles.skeletonCard, animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
              ) : !vehicleSearched ? (
                <div style={styles.emptyState}>
                  <Truck size={28} color={BLUE_DIM} strokeWidth={1.5} />
                  <p style={{ color: SLATE, fontSize: 13, marginTop: 8, textAlign: "center" }}>
                    Enter your chassis number, A-Number, or C-Number to view your vehicle.
                  </p>
                </div>
              ) : vehicleResults.length === 0 ? (
                <div style={styles.emptyState}>
                  <Truck size={28} color={BLUE_DIM} strokeWidth={1.5} />
                  <p style={{ color: SLATE, fontSize: 13, marginTop: 8, textAlign: "center" }}>
                    No vehicle matches "{vehicleQuery.trim()}"
                  </p>
                </div>
              ) : (
                vehicleResults.map((v, i) => {
                  const { color: stColor, label: stLabel } = statusMeta(v.status);
                  const entries = getVehicleEntries(v);
                  const primary = entries[0];
                  const makeLabel = [primary?.make || "Unknown", entries.length > 1 ? `+${entries.length - 1} more` : null]
                    .filter(Boolean)
                    .join(" ");
                  const chassisLabel = entries
                    .map((e) => toDisplayString(e.chassisNo))
                    .filter((s) => s !== "—")
                    .join(" | ") || "—";
                  return (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={styles.vehicleCard}
                      whileHover={{ backgroundColor: BLUE_LIGHT }}
                    >
                      {/* thumb — image if available, Truck icon fallback */}
                      <div style={styles.vehicleThumb}>
                        {v.image ? (
                          <img
                            src={v.image}
                            alt={primary?.make || "vehicle"}
                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                          />
                        ) : (
                          <Truck size={20} strokeWidth={1.6} color={BLUE} />
                        )}
                      </div>

                      {/* info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6 }}>
                          <span style={styles.vehicleMake}>{makeLabel}</span>
                          <span
                            style={styles.vehicleViewBtn}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedVehicleId(v.id)}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedVehicleId(v.id)}
                          >
                            View <ChevronRight size={11} strokeWidth={2.5} style={{ verticalAlign: -1 }} />
                          </span>
                        </div>
                        <p style={styles.vehicleChassis}>{chassisLabel}</p>
                        <p style={styles.vehicleConsignee}>{v.company || "—"}</p>
                      </div>

                      {/* status dot */}
                      <div style={{ ...styles.statusDot, background: stColor }} title={stLabel} />
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.aside>
        </div>

        {/* ─ HELP BAR ─ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={styles.helpBar}
        >
          <div style={styles.helpBarGlow} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
              <Clock size={15} color={BLUE_DIM} strokeWidth={1.5} />
              <p style={styles.helpTitle}>Need help with your shipment?</p>
            </div>
            <p style={styles.helpSub}>
              {loadingTrackers
                ? "Loading tracking destinations…"
                : "Our team is available Monday – Friday, 8 AM – 6 PM WAT."}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <motion.a
              href="tel:+2347033576017"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={styles.callBtn}
            >
              <Phone size={14} strokeWidth={2} /> Call Now
            </motion.a>
            <motion.a
              href="https://wa.me/2347033576017"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={styles.waBtn}
            >
              <MessageCircle size={14} strokeWidth={2} /> WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ─ VEHICLE DETAIL DRAWER ─ */}
      <AnimatePresence>
        {selectedVehicleId && (
          <VehicleDetail
            id={selectedVehicleId}
            onClose={() => setSelectedVehicleId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── styles ──────────────────────────────────────────────────── */
const styles = {
  heroBtnPrimary: {
    fontSize: 14, fontWeight: 700, color: WHITE,
    background: "rgba(255,255,255,0.18)",
    border: "1px solid rgba(255,255,255,0.35)",
    padding: "12px 24px", borderRadius: 12, textDecoration: "none",
    backdropFilter: "blur(10px)",
  },
  heroBtnSecondary: {
    fontSize: 14, fontWeight: 800, color: NAVY,
    background: WHITE, padding: "12px 24px",
    borderRadius: 12, textDecoration: "none",
  },
  eyebrow: {
    fontSize: 11, fontWeight: 700, color: BLUE,
    letterSpacing: "0.13em", textTransform: "uppercase",
    marginBottom: "0.5rem",
  },
  sectionTitle: {
    fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)", fontWeight: 800,
    color: NAVY, lineHeight: 1.15, marginBottom: "0.5rem",
  },
  sectionSub: {
    fontSize: 15, color: SLATE, fontWeight: 300, lineHeight: 1.8,
  },
  trackerCard: {
    width: "100%", textAlign: "left",
    background: WHITE, borderRadius: 20,
    padding: "1.05rem 1.1rem", cursor: "pointer",
    transition: "border 0.2s, box-shadow 0.2s",
    display: "flex", alignItems: "center", gap: "1rem",
  },
  trackerBadge: {
    width: 54, height: 54, borderRadius: 15,
    display: "flex", alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  trackerName: {
    fontSize: 15, fontWeight: 800, color: NAVY,
  },
  trackerPill: {
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", padding: "3px 9px",
    borderRadius: 999, transition: "background 0.2s, color 0.2s",
    flexShrink: 0,
  },
  trackerDesc: {
    fontSize: 13, color: SLATE, fontWeight: 300,
    lineHeight: 1.55, margin: 0,
  },
  hintRow: {
    display: "flex", alignItems: "flex-start", gap: 8, marginTop: "1.25rem",
    fontSize: 12, color: SLATE, lineHeight: 1.6, padding: "0 4px",
  },
  sidebar: {
    background: WHITE, border: `1px solid ${BORDER}`,
    borderRadius: 20, padding: "1.25rem",
    height: "fit-content",
    boxShadow: "0 8px 36px rgba(16,85,204,0.07)",
    position: "sticky", top: "1.5rem",
  },
  sidebarHeader: {
    display: "flex", alignItems: "center", gap: 12, marginBottom: 0,
  },
  sidebarIconWrap: {
    width: 38, height: 38, borderRadius: 11,
    background: BLUE, display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  sidebarTitle: {
    fontSize: 15, fontWeight: 800, color: NAVY, margin: 0,
  },
  sidebarSub: {
    fontSize: 11, color: SLATE, margin: 0,
  },
  sidebarDivider: {
    height: 1, background: BORDER, margin: "1rem 0 0.75rem",
  },
  searchRow: {
    display: "flex", gap: 8, marginBottom: "0.5rem",
  },
  searchWrap: {
    flex: 1, position: "relative",
  },
  searchInput: {
    width: "100%", padding: "9px 10px 9px 34px",
    border: `1px solid ${BORDER}`, borderRadius: 12,
    fontSize: 13, color: NAVY, background: "#F8FAFE",
    outline: "none", fontFamily: "inherit",
  },
  clearBtn: {
    padding: "0 12px", borderRadius: 12,
    border: `1px solid ${BORDER}`, background: WHITE,
    color: SLATE, cursor: "pointer", display: "flex",
    alignItems: "center",
  },
  searchBtn: {
    padding: "0 16px", borderRadius: 12, border: "none",
    background: BLUE, color: WHITE, fontSize: 13, fontWeight: 700,
    fontFamily: "inherit", flexShrink: 0,
  },
  vehicleList: {
    maxHeight: 560, overflowY: "auto", paddingRight: 2,
  },
  vehicleCard: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 8px", borderRadius: 12,
    cursor: "pointer", transition: "background 0.15s",
    marginBottom: 2,
  },
  vehicleThumb: {
    width: 52, height: 42, borderRadius: 10,
    background: BLUE_LIGHT, flexShrink: 0,
    display: "flex", alignItems: "center",
    justifyContent: "center", overflow: "hidden",
  },
  vehicleMake: {
    fontSize: 13, fontWeight: 700, color: NAVY,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  vehicleChassis: {
    fontSize: 11, color: SLATE, marginTop: 2, fontFamily: "monospace",
  },
  vehicleConsignee: {
    fontSize: 11, color: SLATE, marginTop: 2,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  vehicleViewBtn: {
    fontSize: 11, fontWeight: 700, color: BLUE,
    cursor: "pointer", flexShrink: 0, display: "flex",
    alignItems: "center", gap: 1, whiteSpace: "nowrap",
  },
  statusDot: {
    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
  },
  loadingWrap: { display: "flex", flexDirection: "column", gap: 8 },
  skeletonCard: {
    height: 58, borderRadius: 12,
    background: "linear-gradient(90deg, #EFF3FB 25%, #E4EBF5 50%, #EFF3FB 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  },
  emptyState: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "2rem 0",
  },
  helpBar: {
    marginTop: "2rem", background: NAVY,
    borderRadius: 20, padding: "1.75rem 2rem",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap", gap: "1rem",
    position: "relative", overflow: "hidden",
  },
  helpBarGlow: {
    position: "absolute", top: -60, right: -60,
    width: 220, height: 220, borderRadius: "50%",
    background: `${BLUE_MID}22`, pointerEvents: "none",
  },
  helpTitle: {
    fontSize: 16, fontWeight: 800, color: WHITE, margin: 0,
  },
  helpSub: {
    fontSize: 13, color: "rgba(255,255,255,0.45)",
    fontWeight: 300, lineHeight: 1.6,
  },
  callBtn: {
    fontSize: 13, fontWeight: 700, color: WHITE,
    background: BLUE_MID, padding: "11px 20px",
    borderRadius: 12, textDecoration: "none",
    display: "flex", alignItems: "center", gap: 7,
  },
  waBtn: {
    fontSize: 13, fontWeight: 700, color: WHITE,
    background: "#0D9E6E", padding: "11px 20px",
    borderRadius: 12, textDecoration: "none",
    display: "flex", alignItems: "center", gap: 7,
  },
};