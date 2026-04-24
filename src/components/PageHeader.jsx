import { motion } from "framer-motion";
import OceanBg from "./OceanBg";

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
  maxWidth = "1280px",
}) {
  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Ocean animated background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <OceanBg />
      </div>

      {/* Text-area gradient overlay (sky darkening for legibility) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(2,10,24,0.72) 0%, rgba(4,18,42,0.55) 38%, rgba(4,18,42,0.18) 60%, transparent 80%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Side vignette for text contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2,10,24,0.55) 0%, transparent 45%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="page-header-inner"
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth,
          width: "100%",
          margin: "0 auto",
          padding: "4rem 3rem 5rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#90caf9",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                fontFamily: "'Sora',sans-serif",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "2px",
                  background: "#42a5f5",
                  display: "inline-block",
                  borderRadius: "1px",
                }}
              />
              {eyebrow}
            </div>
          )}

          <h1
            style={{
              fontSize: "clamp(2rem,4vw,3.4rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.06,
              margin: "0 0 1rem",
              letterSpacing: "-0.025em",
              fontFamily: "'Sora',sans-serif",
              maxWidth: "680px",
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
          >
            {title}
          </h1>

          {description && (
            <p
              style={{
                fontSize: "clamp(13px,1.6vw,16px)",
                color: "rgba(255,255,255,0.74)",
                lineHeight: 1.82,
                fontWeight: 300,
                maxWidth: "540px",
                margin: 0,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
