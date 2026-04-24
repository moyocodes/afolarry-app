import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BlueprintBg from "../components/BlueprintBg";

const steps = [
  { num: "1", title: "Consultation",  body: "We discuss your vehicle needs and shipping requirements." },
  { num: "2", title: "Procurement",   body: "We source or receive your vehicle and handle documentation." },
  { num: "3", title: "Shipping",      body: "Your vehicle is securely loaded and shipped with tracking." },
  { num: "4", title: "Delivery",      body: "Customs cleared and delivered to your doorstep." },
];

export default function HomeHowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = steps.map((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section
      id="how-it-works"
      style={{
        padding: "7rem 3rem",
        background: "#f0f7ff",
        borderTop: "1px solid rgba(21,101,192,0.1)",
        overflow: "hidden",
        scrollMarginTop: "96px",
        position: "relative",
      }}
    >
      {/* Blueprint ship drifts through this light section too */}
      <BlueprintBg />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: "11px", fontWeight: 700, color: "#1565c0", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            The process
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#0d1b2e", lineHeight: 1.05, letterSpacing: "-0.025em", margin: 0 }}>
            How It Works
          </h2>
        </motion.div>

        {/* Vertical steps */}
        <div style={{ position: "relative" }}>
          {/* Vertical progress line */}
          <div style={{ position: "absolute", left: "35px", top: "38px", bottom: "38px", width: "2px", background: "rgba(21,101,192,0.12)", zIndex: 0 }}>
            <motion.div
              style={{ width: "100%", background: "#1565c0", borderRadius: "1px", transformOrigin: "top" }}
              animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                ref={el => (stepRefs.current[i] = el)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "2rem",
                  padding: "2.5rem 0", position: "relative", zIndex: 1, cursor: "default",
                  borderBottom: i < steps.length - 1 ? "1px solid rgba(21,101,192,0.1)" : "none",
                }}
              >
                {/* Step circle */}
                <motion.div
                  animate={{
                    background: i <= active ? "#1565c0" : "#fff",
                    boxShadow: i === active ? "0 0 0 8px rgba(21,101,192,0.12)" : "0 0 0 0px transparent",
                    scale: i === active ? 1.12 : 1,
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: "72px", height: "72px", flexShrink: 0, borderRadius: "50%",
                    border: "2px solid", borderColor: i <= active ? "#1565c0" : "rgba(21,101,192,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <motion.span
                    animate={{ color: i <= active ? "#fff" : "#64748b" }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: "22px", fontWeight: 800 }}
                  >
                    {i < active ? "✓" : s.num}
                  </motion.span>
                </motion.div>

                {/* Text */}
                <motion.div
                  animate={{ opacity: i === active ? 1 : 0.45 }}
                  transition={{ duration: 0.35 }}
                  style={{ paddingTop: "14px", flex: 1 }}
                >
                  <motion.h3
                    animate={{ color: i === active ? "#1565c0" : "#0d1b2e" }}
                    style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 800, marginBottom: "0.5rem", letterSpacing: "-0.015em", transition: "color 0.3s" }}
                  >
                    {s.title}
                  </motion.h3>
                  <p style={{ fontFamily: "'Sora',sans-serif", fontSize: "15px", color: "#64748b", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                    {s.body}
                  </p>
                  <motion.div
                    animate={{ scaleX: i === active ? 1 : 0, opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ height: "3px", width: "48px", background: "#1565c0", borderRadius: "2px", marginTop: "1rem", transformOrigin: "left" }}
                  />
                </motion.div>

                {/* Step chip */}
                <motion.div
                  animate={{
                    background: i === active ? "#1565c0" : "#e3f2fd",
                    color: i === active ? "#fff" : "#64748b",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "'Sora',sans-serif", fontSize: "10px", fontWeight: 700, padding: "5px 12px", borderRadius: "20px", letterSpacing: "0.08em", textTransform: "uppercase", flexShrink: 0, marginTop: "18px" }}
                >
                  Step {s.num}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
