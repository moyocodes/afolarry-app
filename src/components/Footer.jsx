import { Link } from "react-router-dom";
import { Anchor } from "lucide-react";

const quickLinks = [
  { to: "/", l: "Home" },
  { to: "/#services", l: "Services" },
  { to: "/#contact", l: "Contact" },
  { to: "/#about", l: "About" },
];

const navLinks = [
  { to: "/schedules", l: "Schedules" },
  { to: "/track", l: "Track Shipment" },
  { to: "/cars", l: "Cars" },
  { to: "/solutions", l: "Solutions" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f7faff",
        borderTop: "1px solid #dce8f7",
        padding: "4rem clamp(1.2rem, 4vw, 3rem) 2rem",
        fontFamily: "'Sora',sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint watermark logo */}
      <img
        src="/logo.png"
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-40px",
          right: "-40px",
          width: "380px",
          opacity: 0.06,
          filter: "grayscale(1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Subtle wave decoration */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120px",
          opacity: 0.035,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,0 L0,0 Z"
          fill="#1565c0"
        />
      </svg>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <img
                src="/logo.png"
                alt="Afolaray Nigeria Limited"
                style={{ height: "72px", width: "auto", display: "block" }}
              />
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#5a7599",
                lineHeight: 1.75,
                fontWeight: 300,
                maxWidth: "240px",
                marginBottom: "1rem",
              }}
            >
              Reliable sea freight and vehicle logistics across global markets —
              documentation, customs clearance, and end-to-end delivery.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Anchor size={12} color="#1565c0" />
              <span
                style={{
                  fontSize: "11px",
                  color: "#1565c0",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                Sea freight specialists
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#1565c0",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h5>
            {quickLinks.map((item) => (
              <Link
                key={item.l}
                to={item.to}
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#5a7599",
                  textDecoration: "none",
                  marginBottom: "0.55rem",
                  fontWeight: 300,
                }}
              >
                {item.l}
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <h5
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#1565c0",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </h5>
            {navLinks.map((item) => (
              <Link
                key={item.l}
                to={item.to}
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#5a7599",
                  textDecoration: "none",
                  marginBottom: "0.55rem",
                  fontWeight: 300,
                }}
              >
                {item.l}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#1565c0",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Contact
            </h5>
            <p
              style={{
                fontSize: "12px",
                color: "#5a7599",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "0.55rem",
              }}
            >
              11A Apapa-Oshodi Express Way,
              <br />
              Amuwo, Lagos Nigeria
            </p>
            <a
              href="tel:+2347033576017"
              style={{
                display: "block",
                fontSize: "12px",
                color: "#5a7599",
                textDecoration: "none",
                marginBottom: "0.35rem",
                fontWeight: 300,
              }}
            >
              +234 703 357 6017
            </a>
            <a
              href="mailto:contact@afolaray.com"
              style={{
                display: "block",
                fontSize: "12px",
                color: "#5a7599",
                textDecoration: "none",
                fontWeight: 300,
                wordBreak: "break-all",
              }}
            >
              contact@afolaray.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #dce8f7",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "11px", color: "#9ab2cc", fontWeight: 300 }}>
            © 2025 Afolaray Nigeria Limited · All rights reserved.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/terms"
              style={{
                fontSize: "11px",
                color: "#9ab2cc",
                fontWeight: 300,
                textDecoration: "none",
              }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to="/privacy"
              style={{
                fontSize: "11px",
                color: "#9ab2cc",
                fontWeight: 300,
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
