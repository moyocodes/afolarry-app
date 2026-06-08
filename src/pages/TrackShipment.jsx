import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Anchor, Globe, ExternalLink, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const S = { fontFamily: "'Sora',sans-serif" };

const DEFAULT_TRACKERS = [
  {
    id: "afolaray",
    name: "Afolaray Nigeria Limited",
    desc: "Track your AFL shipment in real time.",
    short: "AFL",
    accent: "#1565c0",
    hint: "Open the dedicated AFL tracker and enter your shipment ID to see the latest timeline.",
    internalPath: "/public-track",
    ctaLabel: "Open AFL Tracker",
    sortOrder: 0,
  },
];

function normalizeTracker(raw, index) {
  const fallback =
    DEFAULT_TRACKERS.find(
      (item) =>
        item.id === raw.id || item.id === raw.slug || item.name === raw.name,
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
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
    accent: raw.accent || raw.color || fallback.accent || "#1565c0",
    hint:
      raw.hint ||
      fallback.hint ||
      "Open the attached tracking page to continue.",
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

export default function TrackShipment() {
  const navigate = useNavigate();
  const [trackers, setTrackers] = useState(DEFAULT_TRACKERS);
  const [loadingTrackers, setLoadingTrackers] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [vehicleSearch, setVehicleSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadTrackers = async () => {
      setLoadingTrackers(true);
      try {
        const snap = await getDocs(collection(db, "trackingPortals"));
        const trackerMap = new Map(
          DEFAULT_TRACKERS.map((tracker, index) => [
            tracker.id,
            normalizeTracker(tracker, index),
          ]),
        );

        snap.docs.forEach((doc, index) => {
          const tracker = normalizeTracker(
            { id: doc.id, ...doc.data() },
            index,
          );
          trackerMap.set(tracker.id, tracker);
        });

        const nextTrackers = Array.from(trackerMap.values())
          .filter((tracker) => tracker.enabled)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        if (mounted && nextTrackers.length > 0) {
          setTrackers(nextTrackers);
        }
      } catch {
        if (mounted) setTrackers(DEFAULT_TRACKERS);
      } finally {
        if (mounted) setLoadingTrackers(false);
      }
    };

    loadTrackers();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadVehicles = async () => {
      setLoadingVehicles(true);
      try {
        const snap = await getDocs(collection(db, "vehicles"));
        const next = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (mounted) setVehicles(next);
      } catch (err) {
        if (mounted) setVehicles([]);
      } finally {
        if (mounted) setLoadingVehicles(false);
      }
    };
    loadVehicles();
    return () => {
      mounted = false;
    };
  }, []);

  const openTracker = (tracker) => {
    if (!tracker) return;
    if (tracker.internalPath) {
      navigate(tracker.internalPath);
      return;
    }
    if (!tracker.url) return;
    if (tracker.openInNewTab) {
      window.open(tracker.url, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.assign(tracker.url);
  };

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Track Shipment"
        title="Track Your Shipment"
        description="Choose a shipping line and jump straight into its tracking page."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80&auto=format&fit=crop"
        maxWidth="980px"
      >
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            to="/public-track"
            style={{
              fontSize: "14px",
              color: "#fff",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "12px 22px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              backdropFilter: "blur(8px)",
            }}
          >
            Open AFL Tracker
          </Link>
          <Link
            to="/solutions"
            style={{
              fontSize: "14px",
              color: "#1565c0",
              background: "#fff",
              padding: "12px 22px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Explore Solutions
          </Link>
        </div>
      </PageHeader>

      <section style={{ padding: "4rem 1.5rem", background: "#fff" }}>
        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "2rem",
          }}
        >
          {/* Left: trackers (main) */}
          <div>
            {/* Section header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#1565c0",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.6rem",
                }}
              >
                Select a tracker
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 800,
                  color: "#0d1b2e",
                  lineHeight: 1.15,
                  marginBottom: "0.6rem",
                }}
              >
                Where is your shipment?
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#5a7599",
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                Click a carrier below to open its tracking portal directly.
              </p>
            </div>

            {/* Tracker cards */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {trackers.map((tracker, i) => (
                <motion.button
                  key={tracker.id}
                  type="button"
                  onClick={() => openTracker(tracker)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 28px rgba(21,101,192,0.13)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "#fff",
                    border: "1.5px solid #e9f0f9",
                    borderRadius: "18px",
                    padding: "1.1rem 1.2rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(21,101,192,0.05)",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {/* Accent badge */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: tracker.accent,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 800,
                      flexShrink: 0,
                      boxShadow: `0 4px 16px ${tracker.accent}44`,
                    }}
                  >
                    {tracker.short}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 800,
                          color: "#0d1b2e",
                        }}
                      >
                        {tracker.name}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: tracker.accent,
                          flexShrink: 0,
                        }}
                      >
                        {tracker.internalPath ? (
                          <Anchor size={11} />
                        ) : (
                          <Globe size={11} />
                        )}
                        {tracker.internalPath ? "AFL Page" : "External"}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#5a7599",
                        fontWeight: 300,
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {tracker.desc}
                    </p>
                  </div>

                  {/* CTA arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      flexShrink: 0,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: tracker.accent,
                    }}
                  >
                    {tracker.internalPath ? null : <ExternalLink size={13} />}
                    <ArrowRight size={16} />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Delivered Vehicles sidebar */}
          <aside
            style={{
              background: "#fff",
              border: "1px solid #e9f0f9",
              borderRadius: 12,
              padding: 16,
              height: "fit-content",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#0d1b2e",
                marginBottom: 6,
              }}
            >
              Delivered Vehicles
            </h3>
            <p style={{ fontSize: 13, color: "#5a7599", margin: "0 0 12px 0" }}>
              Search vehicles from our public records (admin directory).
            </p>

            <input
              aria-label="Search delivered vehicles"
              value={vehicleSearch}
              onChange={(e) => setVehicleSearch(e.target.value)}
              placeholder="Search VIN, make, model, chassis..."
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e6eef9",
                marginBottom: 12,
              }}
            />

            <div style={{ maxHeight: 360, overflow: "auto" }}>
              {loadingVehicles ? (
                <p style={{ fontSize: 13, color: "#5a7599" }}>
                  Loading vehicles…
                </p>
              ) : (
                (() => {
                  const q = vehicleSearch.trim().toLowerCase();
                  const filtered = q
                    ? vehicles.filter((v) => {
                        const fields = [
                          v.chassisNo,
                          v.make,
                          v.company,
                          v.aNumber,
                          v.cNumber,
                          v.consigneeName,
                        ]
                          .filter(Boolean)
                          .join(" ")
                          .toLowerCase();
                        return fields.includes(q);
                      })
                    : vehicles;

                  if (!filtered.length) {
                    return (
                      <p style={{ fontSize: 13, color: "#5a7599" }}>
                        {q ? "No vehicles match" : "No vehicle records yet"}
                      </p>
                    );
                  }

                  return filtered.slice(0, 12).map((v) => (
                    <div
                      key={v.id}
                      style={{
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #f3f7fb",
                        marginBottom: 10,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <strong style={{ fontSize: 14, color: "#0d1b2e" }}>
                          {(v.make || "Unknown").toString()}
                        </strong>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#1565c0",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`/vehicle/${v.id}`)}
                        >
                          View details
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#5a7599" }}>
                        {v.chassisNo
                          ? `Chassis: ${v.chassisNo}`
                          : v.cNumber
                            ? `C-No: ${v.cNumber}`
                            : v.aNumber
                              ? `A-No: ${v.aNumber}`
                              : null}
                      </div>
                      <div style={{ fontSize: 12, color: "#7a93bb" }}>
                        {v.consigneeName || v.company || "—"}
                      </div>
                    </div>
                  ));
                })()
              )}
            </div>
          </aside>
        </div>

        {/* Help bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            maxWidth: "860px",
            margin: "2.5rem auto 0",
            padding: "1.75rem 2rem",
            background: "#0d1b2e",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "0.3rem",
              }}
            >
              Need help with your shipment?
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              {loadingTrackers
                ? "Loading the latest tracking destinations…"
                : "Our team is available Monday to Friday, 8 AM – 6 PM WAT."}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href="tel:+2347033576017"
              style={{
                fontSize: "13px",
                color: "#fff",
                background: "#1565c0",
                padding: "11px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Call Now
            </a>
            <a
              href="https://wa.me/2347033576017"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "13px",
                color: "#fff",
                background: "#25d366",
                padding: "11px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
