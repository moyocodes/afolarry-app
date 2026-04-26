import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Car,
  FileText,
  Shield,
  Package,
} from "lucide-react";

const words = ["Connecting", "You", "to", "Global", "Vehicle", "Markets"];

const heroPoster =
  "https://i.pinimg.com/1200x/f2/65/b7/f265b71d3e22c7f70ad1a410fbca9f0b.jpg";

const heroVideoSrc = "/animate-it.mp4";

const services = [
  { Icon: Car, title: "Vehicle Import" },
  { Icon: FileText, title: "Documentation" },
  { Icon: Shield, title: "Customs Clearance" },
  { Icon: Package, title: "Logistics" },
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

        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(300px, 70vw, 700px)",
            height: "clamp(300px, 70vw, 700px)",
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
          padding: "clamp(5rem, 8vw, 7rem) clamp(1.2rem, 4vw, 3rem) 2rem",
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
            rowGap: "8px",
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
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 800,
                color: ["Global", "Vehicle", "Markets"].includes(word)
                  ? "#42a5f5"
                  : "#fff",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
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
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{
            fontFamily: "'Sora',sans-serif",
            fontSize: "clamp(14px,1.8vw,17px)",
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.85,
            maxWidth: "min(540px, 100%)",
            fontWeight: 300,
            marginBottom: "2.4rem",
          }}
        >
          Your trusted partner for seamless vehicle import, customs clearance,
          and international logistics. Efficiency meets reliability.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "2rem",
            width: "100%",
          }}
        >
          <Link to="/track" style={{ width: "100%", maxWidth: "260px" }}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "#1565c0",
                color: "#fff",
                padding: "14px 20px",
                borderRadius: "10px",
                fontFamily: "'Sora',sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "none",
                width: "100%",
              }}
            >
              Track Shipment <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Services Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.65 }}
          style={{
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "600px",
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "12px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                minWidth: "80px",
              }}
            >
              <service.Icon size={20} color="rgba(255,255,255,0.8)" />
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: "clamp(40px, 8vh, 120px)",
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
