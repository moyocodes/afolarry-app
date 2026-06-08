import { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import WaFab from "../components/WaFab";
import PageHeader from "../components/PageHeader";

const S = { fontFamily: "'Sora',sans-serif" };
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const inp = {
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  padding: "10px 14px",
  borderRadius: "9px",
  fontFamily: "'Sora',sans-serif",
  fontSize: "13px",
  fontWeight: 300,
  outline: "none",
  width: "100%",
};

export default function ContactPage() {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'

  const send = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(formRef.current);
      const payload = {
        from_name: formData.get("from_name"),
        from_email: formData.get("from_email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        message: formData.get("message"),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      addDoc(collection(db, "enquiries"), {
        from_name: payload.from_name,
        from_email: payload.from_email,
        phone: payload.phone,
        service: payload.service,
        message: payload.message,
        status: "new",
        createdAt: Date.now(),
      }).catch(() => {});
      setStatus("ok");
      formRef.current.reset();
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus("err");
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div style={S}>
      <PageHeader
        eyebrow="Contact"
        title="Let's move your cargo."
        description="Fill in the form and we'll respond within two business hours, or call us directly."
        image="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&auto=format&fit=crop"
        maxWidth="900px"
      />

      {/* Body */}
      <section
        className="section-pad"
        style={{ padding: "5rem 3rem", background: "#0d1b2e" }}
      >
        <div
          className="responsive-contact-grid"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          {/* Left info */}
          <motion.div
            variants={fade}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
          >
            {[
              {
                icon: <MapPin size={16} color="#42a5f5" />,
                label: "Head Office",
                val: "11A Apapa-Oshodi Expressway\nAmuwo, Lagos, Nigeria",
              },
              {
                icon: <Phone size={16} color="#42a5f5" />,
                label: "Phone & WhatsApp",
                val: "+234 703 357 6017",
                href: "tel:+2347033576017",
              },
              {
                icon: <Mail size={16} color="#42a5f5" />,
                label: "Email",
                val: "contact@afolaray.com",
                href: "mailto:contact@afolaray.com",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#42a5f5",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "3px",
                    }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.65)",
                        fontWeight: 300,
                        textDecoration: "none",
                      }}
                    >
                      {item.val}
                    </a>
                  ) : (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.65)",
                        fontWeight: 300,
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.val}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div
              style={{
                padding: "1.2rem",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#42a5f5",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Office Hours
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                Mon – Fri · 8:00 AM – 6:00 PM WAT
                <br />
                WhatsApp available outside hours
              </div>
            </div>

            <a
              href="https://wa.me/2347033576017"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#25d366",
                padding: "12px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right form */}
          <motion.form
            ref={formRef}
            onSubmit={send}
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="responsive-form-grid">
              {[
                {
                  name: "from_name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "Your name",
                  full: false,
                },
                {
                  name: "phone",
                  label: "Phone / WhatsApp",
                  type: "tel",
                  placeholder: "+234...",
                  full: false,
                },
                {
                  name: "from_email",
                  label: "Email",
                  type: "email",
                  placeholder: "your@email.com",
                  full: true,
                },
              ].map((f) => (
                <div
                  key={f.name}
                  style={{
                    gridColumn: f.full ? "1/-1" : "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    style={inp}
                  />
                </div>
              ))}

              <div
                style={{
                  gridColumn: "1/-1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Service needed
                </label>
                <select name="service" style={{ ...inp }}>
                  <option>Ocean Freight (FCL)</option>
                  <option>Ocean Freight (LCL)</option>
                  <option>Customs Clearance</option>
                  <option>Import Documentation</option>
                  <option>Warehousing</option>
                  <option>Vehicle Import</option>
                  <option>Full Logistics Package</option>
                </select>
              </div>

              <div
                style={{
                  gridColumn: "1/-1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Cargo details &amp; route
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Cargo type, origin, destination, weight/volume..."
                  style={{ ...inp, resize: "none" }}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background:
                    status === "ok"
                      ? "#2e7d32"
                      : status === "err"
                        ? "#c62828"
                        : "#1e88e5",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "9px",
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 0.3s",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "ok"
                    ? "Sent! We'll be in touch."
                    : status === "err"
                      ? "Failed — try again"
                      : "Send enquiry →"}
              </motion.button>

              {status === "ok" && <CheckCircle size={18} color="#4caf50" />}
              {status === "err" && <AlertCircle size={18} color="#ef5350" />}
            </div>
          </motion.form>
        </div>
      </section>
      <WaFab />
    </div>
  );
}
