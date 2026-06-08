import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import PageHeader from "../components/PageHeader";

const S = { fontFamily: "'Sora',sans-serif" };

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        if (!snap.exists()) {
          setVehicle(null);
          setErr("Vehicle not found");
        } else {
          setVehicle({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        if (!mounted) return;
        setErr("Could not load vehicle");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (id) load();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Vehicles"
        title={
          vehicle
            ? `Vehicle — ${vehicle.make || vehicle.chassisNo || vehicle.id}`
            : "Vehicle details"
        }
        description="Public vehicle record"
        image="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1600&q=80&auto=format&fit=crop"
        maxWidth="980px"
      />

      <section style={{ padding: "3rem 1.5rem", background: "#fff" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              marginBottom: 18,
              fontWeight: 700,
              color: "#1565c0",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          {loading ? (
            <p style={{ color: "#5a7599" }}>Loading vehicle…</p>
          ) : err ? (
            <p style={{ color: "#d9534f" }}>{err}</p>
          ) : vehicle ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 18,
                border: "1px solid #eef6ff",
              }}
            >
              <h2 style={{ fontSize: 20, marginBottom: 8, color: "#0d1b2e" }}>
                {vehicle.make || "Vehicle Record"}
              </h2>
              <div style={{ fontSize: 14, color: "#5a7599", marginBottom: 12 }}>
                {vehicle.company || vehicle.consigneeName}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div>
                  <strong>Chassis No</strong>
                  <div style={{ color: "#5a7599" }}>
                    {vehicle.chassisNo || "—"}
                  </div>
                </div>
                <div>
                  <strong>A-Number</strong>
                  <div style={{ color: "#5a7599" }}>
                    {vehicle.aNumber || "—"}
                  </div>
                </div>
                <div>
                  <strong>C-Number</strong>
                  <div style={{ color: "#5a7599" }}>
                    {vehicle.cNumber || "—"}
                  </div>
                </div>
                <div>
                  <strong>Consignee</strong>
                  <div style={{ color: "#5a7599" }}>
                    {vehicle.consigneeName || "—"}
                  </div>
                </div>
              </div>

              {vehicle.duty ? (
                <div style={{ marginTop: 12 }}>
                  <strong>Duty</strong>
                  <div style={{ color: "#5a7599" }}>{vehicle.duty}</div>
                </div>
              ) : null}

              <div style={{ marginTop: 16 }}>
                <small style={{ color: "#9fb0d6" }}>
                  Record ID: {vehicle.id}
                </small>
              </div>
            </div>
          ) : (
            <p style={{ color: "#5a7599" }}>No vehicle data available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
