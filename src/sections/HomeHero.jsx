import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";

const words = ["Connecting", "You", "to", "Global", "Vehicle", "Markets"];
const heroPoster =
  "https://i.pinimg.com/1200x/f2/65/b7/f265b71d3e22c7f70ad1a410fbca9f0b.jpg";
const heroVideoSrc = "/animate-it.mp4";
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(
          to >= 1000
            ? Math.round(v).toLocaleString()
            : Math.round(v).toString(),
        );
      },
    });
    return ctrl.stop;
  }, [inView, to, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 8500, suffix: "+", label: "Vehicles Delivered" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export default function HomeHero() {
  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        minHeight: "78vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* BG video */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          preload="auto"
          src={heroVideoSrc}
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(4,14,30,0.78) 0%, rgba(4,14,30,0.55) 50%, rgba(4,14,30,0.92) 100%)",
          }}
        />
        {/* subtle blue glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(21,101,192,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "7rem 3rem 2rem",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 14px",
            marginBottom: "1.6rem",
            alignItems: "baseline",
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                fontWeight: 800,
                color: ["Global", "Vehicle", "Markets"].includes(word)
                  ? "#42a5f5"
                  : "#fff",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                display: "inline-block",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: "'Sora',sans-serif",
            fontSize: "clamp(14px,1.8vw,17px)",
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.85,
            maxWidth: "540px",
            fontWeight: 300,
            marginBottom: "2.4rem",
          }}
        >
          Your trusted partner for seamless vehicle import, customs clearance,
          and international logistics. Efficiency meets reliability.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "1.6rem" }}
        >
          <Link to="/track">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#1565c0",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "10px",
                fontFamily: "'Sora',sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Track Shipment <ArrowRight size={16} />
            </motion.div>
          </Link>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "10px",
              fontFamily: "'Sora',sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            Our Services
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.65 }}
          className="hero-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "22px",
            overflow: "hidden",
            maxWidth: "760px",
            backdropFilter: "blur(18px)",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "1.2rem 1rem",
                background: "rgba(6,15,28,0.28)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.64)", marginTop: "8px", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.3)",
          cursor: "pointer",
        }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
