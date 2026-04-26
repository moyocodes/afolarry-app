import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";

const fade = (i = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  },
});

const reviews = [
  {
    name: "Fatima Aliyu",
    role: "Private Buyer · Abuja",
    rating: 5,
    text: "I was nervous about buying a pre-order car, but the team walked me through every step. My Toyota Camry arrived in perfect condition and ahead of schedule.",
  },
  {
    name: "Adebayo Olusegun",
    role: "Fleet Manager · Port Harcourt",
    rating: 5,
    text: "We have sourced over 20 vehicles through Afolaray for our fleet. Transparent pricing, reliable tracking, and consistently professional service.",
  },
];

const contactItems = [
  {
    Icon: MapPin,
    label: "Head Office",
    val: "11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria",
  },
  {
    Icon: Phone,
    label: "Phone",
    val: "+234 703 357 6017",
    href: "tel:+2347033576017",
  },
  {
    Icon: Mail,
    label: "Email",
    val: "Afolaraynigerialimited@gmail.com",
    href: "mailto:Afolaraynigerialimited@gmail.com",
  },
];

export default function HomeContact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);
  const reviewUrl = "https://maps.app.goo.gl/YNQDgaeAs6stD2gU7";
  const mapUrl = "https://maps.google.com/?cid=9330721875799411647";

  const send = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const fd = new FormData(formRef.current);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: fd.get("from_name"),
          phone: fd.get("phone"),
          from_email: fd.get("from_email"),
          service: fd.get("service"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      formRef.current.reset();
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("err");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  const inp = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "9px",
    outline: "none",
    fontFamily: "'Sora',sans-serif",
    fontSize: "13px",
    fontWeight: 300,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{
        borderTop: "1px solid #dce8f7",
        scrollMarginTop: "96px",
      }}
    >
      {/* ── Map + Reviews side by side ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          // gap: '1.5rem',
          alignItems: "stretch",
          marginBottom: "4rem",
        }}
      >
        {/* Map */}
        <motion.div
          variants={fade(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #dce8f7",
            minHeight: "340px",
            boxShadow: "0 4px 18px rgba(21,101,192,0.06)",
          }}
        >
          <iframe
            title="Afolaray Nigeria Limited location"
            src="https://maps.google.com/maps?cid=9330721875799411647&output=embed&hl=en&gl=NG"
            width="100%"
            height="100%"
            style={{
              border: "none",
              display: "block",
              filter: "grayscale(15%) contrast(0.92)",
              minHeight: "340px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              right: "14px",
              bottom: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.96)",
              color: "#0d1b2e",
              border: "1px solid rgba(220,232,247,0.95)",
              padding: "10px 14px",
              borderRadius: "999px",
              fontFamily: "'Sora',sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(13,27,46,0.14)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.5 12.23c0-.82-.07-1.61-.2-2.37H12v4.48h5.9a5.04 5.04 0 0 1-2.19 3.31v2.75h3.54c2.08-1.92 3.27-4.74 3.27-8.17Z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.75c-.98.66-2.23 1.05-3.74 1.05-2.88 0-5.31-1.95-6.18-4.56H2.17v2.84A10.99 10.99 0 0 0 12 23Z"
                fill="#34A853"
              />
              <path
                d="M5.82 14.08A6.6 6.6 0 0 1 5.48 12c0-.72.12-1.42.34-2.08V7.08H2.17A11.01 11.01 0 0 0 1 12c0 1.77.42 3.45 1.17 4.92l3.65-2.84Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.36c1.62 0 3.07.56 4.21 1.65l3.16-3.16A10.94 10.94 0 0 0 12 1 11 11 0 0 0 2.17 7.08l3.65 2.84C6.69 7.31 9.12 5.36 12 5.36Z"
                fill="#EA4335"
              />
            </svg>
            Open in Google Maps
          </a>
        </motion.div>
      </div>

      {/* ── Contact form (video bg) ── */}
      <motion.div
        variants={fade(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        style={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          src="/animate-it.mp4"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
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
              "linear-gradient(135deg, rgba(13,27,46,0.94) 0%, rgba(21,101,192,0.84) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "clamp(2rem,5vw,3.5rem)",
          }}
        >
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#90caf9",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Get In Touch
            </div>
            <h2
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Send Us a Message
            </h2>
            <p
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "460px",
                marginTop: "0.6rem",
              }}
            >
              Reach our team for tracking help, booking guidance, or a fresh
              shipping quote.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%,300px),1fr))",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Contact info */}
            <div>
              {contactItems.map(({ Icon, label, val, href }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    marginBottom: i < contactItems.length - 1 ? "1.5rem" : 0,
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} color="#90caf9" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Sora',sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#90caf9",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          fontFamily: "'Sora',sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 400,
                          lineHeight: 1.6,
                          textDecoration: "none",
                        }}
                      >
                        {val}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontFamily: "'Sora',sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        {val}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 300,
                    marginBottom: "0.8rem",
                  }}
                >
                  Had a great experience? Let others know.
                </p>
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "9px 16px",
                    borderRadius: "9px",
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.5 12.23c0-.82-.07-1.61-.2-2.37H12v4.48h5.9a5.04 5.04 0 0 1-2.19 3.31v2.75h3.54c2.08-1.92 3.27-4.74 3.27-8.17Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.75c-.98.66-2.23 1.05-3.74 1.05-2.88 0-5.31-1.95-6.18-4.56H2.17v2.84A10.99 10.99 0 0 0 12 23Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.82 14.08A6.6 6.6 0 0 1 5.48 12c0-.72.12-1.42.34-2.08V7.08H2.17A11.01 11.01 0 0 0 1 12c0 1.77.42 3.45 1.17 4.92l3.65-2.84Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.36c1.62 0 3.07.56 4.21 1.65l3.16-3.16A10.94 10.94 0 0 0 12 1 11 11 0 0 0 2.17 7.08l3.65 2.84C6.69 7.31 9.12 5.36 12 5.36Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Leave a Google Review
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={send}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <input
                name="from_name"
                type="text"
                placeholder="Your Name"
                required
                style={inp}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone / WhatsApp"
                required
                style={inp}
              />
              <input
                name="from_email"
                type="email"
                placeholder="Your Email"
                required
                style={inp}
              />
              <select name="service" required style={inp}>
                <option value="Ocean Freight (FCL)">Ocean Freight (FCL)</option>
                <option value="Ocean Freight (LCL)">Ocean Freight (LCL)</option>
                <option value="Customs Clearance">Customs Clearance</option>
                <option value="Import Documentation">
                  Import Documentation
                </option>
                <option value="Warehousing">Warehousing</option>
                <option value="Vehicle Import">Vehicle Import</option>
                <option value="Full Logistics Package">
                  Full Logistics Package
                </option>
              </select>
              <textarea
                name="message"
                rows={5}
                placeholder="Message"
                required
                style={{ ...inp, resize: "none" }}
              />
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: "0.2rem",
                  background:
                    status === "ok"
                      ? "#2e7d32"
                      : status === "err"
                        ? "#c62828"
                        : "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "13px 28px",
                  borderRadius: "9px",
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  alignSelf: "flex-start",
                  backdropFilter: "blur(8px)",
                }}
              >
                {status === "sending" ? (
                  "Sending…"
                ) : status === "ok" ? (
                  <>
                    <CheckCircle size={14} /> Message sent!
                  </>
                ) : status === "err" ? (
                  <>
                    <AlertCircle size={14} /> Failed — retry
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
