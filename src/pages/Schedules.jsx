import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import PageHeader from "../components/PageHeader";

const S = { fontFamily: "'Sora',sans-serif" };
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export default function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedules = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(collection(db, "schedules"), orderBy("createdAt", "desc")),
        );
        const records = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSchedules(records.filter((item) => item.enabled !== false));
      } catch {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    loadSchedules();
  }, []);
  return (
    <div style={S}>
      <PageHeader
        eyebrow="Schedules"
        title=" Carrier schedule portals."
        description="Use the carrier schedule pages below. This page only lists the schedule sources you provided."
        image="https://images.unsplash.com/photo-1565891741441-64926e441838?w=1600&q=80&auto=format&fit=crop"
      />

      <section style={{ padding: "4rem 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {loading ? (
            <div className="text-center py-16 text-[#5a7599] text-[13px]">
              Loading …
            </div>
          ) : schedules.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#dce8f7]">
              <CalendarDays size={36} className="mx-auto mb-3 text-[#dce8f7]" />
              <p className="text-[15px] font-bold text-[#0d1b2e]">
                No schedules available
              </p>
              <p className="text-[13px] text-[#5a7599]">
                Add schedule portal records in the admin dashboard to populate
                this page.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {schedules.map((carrier, i) => (
                <motion.a
                  key={carrier.name}
                  href={carrier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fade}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: "#fff",
                    border: "1px solid #dce8f7",
                    borderRadius: "18px",
                    padding: "1.6rem",
                    textDecoration: "none",
                    boxShadow: "0 10px 30px rgba(21,101,192,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: "#e3f2fd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1565c0",
                    }}
                  >
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0d1b2e",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {carrier.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#5a7599",
                        lineHeight: 1.7,
                      }}
                    >
                      {carrier.url}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#1565c0",
                      fontWeight: 700,
                    }}
                  >
                    Open schedule portal <ExternalLink size={14} />
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          <motion.div
            variants={fade}
            custom={schedules.length}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              marginTop: "2rem",
              background: "#e3f2fd",
              border: "1px solid #dce8f7",
              borderRadius: "14px",
              padding: "1.4rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0c447c",
                  marginBottom: "3px",
                }}
              >
                Need help after checking the carrier portal?
              </div>
              <div
                style={{ fontSize: "12px", color: "#5a7599", fontWeight: 300 }}
              >
                Contact our operations team for booking support and next-step
                guidance.
              </div>
            </div>
            <Link
              to="/#contact"
              style={{
                fontSize: "13px",
                color: "#fff",
                background: "#1565c0",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
