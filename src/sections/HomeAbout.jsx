import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fade = (dir = 0) => ({
  hidden: { opacity: 0, x: dir * 40, y: dir === 0 ? 30 : 0 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
});

const stats = [

  { num: "8,500+", label: "Vehicles Delivered" },
  { num: "100%", label: "Client Satisfaction" },
];

export default function HomeAbout() {
  return (
    <section
      id="about"
      style={{
        padding: "7rem clamp(1.2rem, 4vw, 3rem)",
        background: "#fff",
        scrollMarginTop: "96px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Text column */}
        <motion.div
          className="about-text-column"
          variants={fade(-1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: "#42a5f5",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            Who We Are
          </div>
          <h2
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
              fontWeight: 800,
              color: "#0d1b2e",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: "1.4rem",
            }}
          >
            About Afolaray
            <br />
            Nigeria Limited
          </h2>
          <p
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "15px",
              color: "#5a7599",
              lineHeight: 1.9,
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            Afolaray Nigeria Limited is a premier vehicle import company
            dedicated to simplifying the global vehicle trade. With over a
            decade of experience, we have established ourselves as a trusted
            partner for individuals and dealerships looking to move vehicles
            across borders.
          </p>
          <p
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "15px",
              color: "#5a7599",
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            Our mission is to provide transparent, efficient, and secure
            logistics solutions — from procurement and customs clearance to
            final delivery — ensuring complete peace of mind for our clients.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              // gap: "4rem",
              marginTop: "2rem",
              paddingTop: "2rem",
              paddingBottom: "0.5rem",
              borderTop: "1px solid #dce8f7",
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: s.num === "100%" ? "2.5rem" : "2rem",
                    fontWeight: 800,
                    color: s.num === "100%" ? "#1565c0" : "#0d1b2e",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "12px",
                    color: s.num === "100%" ? "#1565c0" : "#5a7599",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <Link
              to="/#services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1565c0",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                fontFamily: "'Sora',sans-serif",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Explore Services
            </Link>
            <Link
              to="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f0f7ff",
                color: "#1565c0",
                border: "1px solid #dce8f7",
                padding: "12px 22px",
                borderRadius: "10px",
                textDecoration: "none",
                fontFamily: "'Sora',sans-serif",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>

        {/* Image column */}
        <motion.div
          className="about-image-column"
          variants={fade(1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            position: "relative",
            paddingBottom: "28px",
            paddingLeft: "24px",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/3",
              boxShadow: "0 30px 80px rgba(21,101,192,0.16)",
            }}
          >
            <img
              src="https://afolary-limited-5d4i.vercel.app/assets/Afolary-image-DbVIOQKx.jpg"
              alt="Afolaray Nigeria Limited operations"
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
                bottom: 28,
                left: 24,
                right: 0,
                padding: "1.2rem 1.5rem",
                background:
                  "linear-gradient(to top, rgba(4,14,30,0.72) 0%, transparent 100%)",
                borderRadius: "0 0 20px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.65)",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                }}
              >
                Afolaray Nigeria Limited · Lagos operations
              </div>
            </div>
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              background: "#1565c0",
              color: "#fff",
              borderRadius: "14px",
              padding: "1.2rem 1.4rem",
              boxShadow: "0 16px 40px rgba(21,101,192,0.35)",
            }}
          >
            <div
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "2rem",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              12+
            </div>
            <div
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "11px",
                fontWeight: 400,
                opacity: 0.85,
                marginTop: "3px",
                lineHeight: 1.4,
              }}
            >
              Years of
              <br />
              experience
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
