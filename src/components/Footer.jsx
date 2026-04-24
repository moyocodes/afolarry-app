import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="section-pad"
      style={{
        background: "linear-gradient(180deg, #0d1b2e 0%, #0a2040 100%)",
        borderTop: "1px solid rgba(21,101,192,0.22)",
        padding: "3rem",
        fontFamily: "'Sora',sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="responsive-footer-grid" style={{ marginBottom: "2rem" }}>

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.9rem" }}>
              <img
                src="/afolaraybg.png"
                alt="Afolaray Nigeria Limited"
                style={{ width: "52px", height: "52px", objectFit: "contain", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>AFOLARAY NIGERIA</div>
                <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>LIMITED</div>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontWeight: 300, maxWidth: "260px" }}>
              Reliable sea freight and vehicle logistics across global markets. We handle documentation, customs clearance, and end-to-end delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontSize: "10px", fontWeight: 700, color: "#90caf9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Quick Links
            </h5>
            {[
              { to: "/", l: "Home" },
              { to: "/#services", l: "Services" },
              { to: "/#contact", l: "Contact" },
              { to: "/#solutions", l: "Solutions" },
            ].map(item => (
              <Link
                key={item.l}
                to={item.to}
                style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.5rem", fontWeight: 300, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
              >
                {item.l}
              </Link>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <h5 style={{ fontSize: "10px", fontWeight: 700, color: "#90caf9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Navigation
            </h5>
            {[
              { to: "/schedules", l: "Schedules" },
              { to: "/track", l: "Track Shipment" },
              { to: "/cars", l: "Cars" },
              { to: "/#about", l: "About" },
            ].map(item => (
              <Link
                key={item.l}
                to={item.to}
                style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.5rem", fontWeight: 300 }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
              >
                {item.l}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize: "10px", fontWeight: 700, color: "#90caf9", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact
            </h5>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontWeight: 300, marginBottom: "0.5rem" }}>
              11A Apapa-Oshodi Express Way, Amuwo, Lagos Nigeria
            </p>
            <a
              href="tel:+2347033576017"
              style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", marginBottom: "0.3rem", fontWeight: 300 }}
            >
              +2347033576017
            </a>
            <a
              href="mailto:Afolaraynigerialimited@gmail.com"
              style={{ display: "block", fontSize: "12px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontWeight: 300 }}
            >
              Afolaraynigerialimited@gmail.com
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(21,101,192,0.2)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>
            © 2025 AFOLARAY NIGERIA LIMITED · Sea freight logistics only.
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>
            11A Apapa-Oshodi Expressway, Amuwo, Lagos · +234 703 357 6017
          </p>
        </div>
      </div>
    </footer>
  );
}
