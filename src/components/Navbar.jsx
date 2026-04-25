import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About", sectionId: "about" },
  { to: "/#services", label: "Services", sectionId: "services" },
  { to: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" },
  { to: "/solutions", label: "Solutions" },
  { to: "/schedules", label: "Schedules" },
  { to: "/cars", label: "Cars" },
  // { to: '/#contact', label: 'Contact', sectionId: 'contact' },
];

const quoteLink = {
  to: "/#contact",
  label: "Get a Quote",
  sectionId: "contact",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname, loc.hash]);

  const isActive = (link) => {
    if (link.sectionId)
      return loc.pathname === "/" && loc.hash === `#${link.sectionId}`;
    return link.to === "/"
      ? loc.pathname === "/" && !loc.hash
      : loc.pathname.startsWith(link.to);
  };

  const handleNavClick = (event, link) => {
    if (!link.sectionId) return;

    event.preventDefault();
    setOpen(false);

    if (loc.pathname === "/") {
      const el = document.getElementById(link.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate(
        { pathname: "/", hash: `#${link.sectionId}` },
        { replace: true },
      );
      return;
    }

    navigate({ pathname: "/", hash: `#${link.sectionId}` });
  };

  return (
    <>
      {/* Top announcement bar */}
      <div
        style={{
          background: "#1565c0",
          color: "#fff",
          fontSize: "12px",
          fontWeight: 500,
          padding: "7px 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "6px",
          fontFamily: "'Sora',sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Phone size={13} />
          <span>Call or WhatsApp us</span>
          <a
            href="tel:+2347033576017"
            style={{
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            +234 703 357 6017
          </a>
        </div>
        <span
          style={{
            fontWeight: 600,
            letterSpacing: "0.08em",
            fontSize: "11px",
            opacity: 0.9,
          }}
        >
          AFOLARAY NIGERIA LIMITED
        </span>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          fontFamily: "'Sora',sans-serif",
          background: "#fff",
          borderBottom: "1px solid #dce8f7",
          boxShadow: scrolled ? "0 2px 20px rgba(21,101,192,0.07)" : "none",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "58px",
          position: "sticky",
          top: 0,
          zIndex: 200,
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
     <img
  src="/logo.png"
  alt="Afolaray Nigeria Limited"
  style={{ height: "clamp(100px, 10vw, 100px)", width: "auto", display: "block" }}
/>       </Link>

        {/* Desktop links */}
        <div
          style={{ display: "flex", gap: "0.1rem", alignItems: "center" }}
          className="hidden lg:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: "12.5px",
                color: isActive(l) ? "#1565c0" : "#5a7599",
                fontWeight: isActive(l) ? 700 : 400,
                textDecoration: "none",
                padding: "6px 10px",
                borderRadius: "7px",
                background: isActive(l) ? "#e3f2fd" : "transparent",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
              }}
              onClick={(event) => handleNavClick(event, l)}
              onMouseEnter={(e) => {
                if (!isActive(l)) {
                  e.target.style.color = "#1565c0";
                  e.target.style.background = "#f0f7ff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(l)) {
                  e.target.style.color = "#5a7599";
                  e.target.style.background = "transparent";
                }
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
          className="hidden lg:flex"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={quoteLink.to}
              style={{
                fontSize: "12px",
                color: "#1565c0",
                background: "none",
                border: "1.5px solid #42a5f5",
                padding: "7px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "'Sora',sans-serif",
                fontWeight: 600,
              }}
              onClick={(event) => handleNavClick(event, quoteLink)}
            >
              Get a Quote
            </Link>
          </motion.div>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/track"
            style={{
              fontSize: "12px",
              color: "#fff",
              background: "#1565c0",
              padding: "8px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "'Sora',sans-serif",
              fontWeight: 600,
            }}
          >
            Track Shipment
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#0d1b2e",
            padding: "4px",
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                position: "absolute",
                top: "58px",
                left: 0,
                right: 0,
                background: "#fff",
                borderBottom: "1px solid #dce8f7",
                overflow: "hidden",
                zIndex: 300,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  padding: "1.2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    style={{
                      fontSize: "14px",
                      color: isActive(l) ? "#1565c0" : "#0d1b2e",
                      fontWeight: isActive(l) ? 700 : 500,
                      textDecoration: "none",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: isActive(l) ? "#e3f2fd" : "transparent",
                    }}
                    onClick={(event) => handleNavClick(event, l)}
                  >
                    {l.label}
                  </Link>
                ))}
                <div
                  style={{ display: "flex", gap: "8px", marginTop: "0.8rem" }}
                >
                  <Link
                    to={quoteLink.to}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#1565c0",
                      border: "1.5px solid #42a5f5",
                      padding: "10px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                    onClick={(event) => handleNavClick(event, quoteLink)}
                  >
                    Get a Quote
                  </Link>
                  <a
                    href="tel:+2347033576017"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#fff",
                      background: "#1565c0",
                      padding: "10px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
