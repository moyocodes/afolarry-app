import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About", sectionId: "about" },
  { to: "/#services", label: "Services", sectionId: "services" },
  { to: "/#how-it-works", label: "How It Works", sectionId: "how-it-works" },
  { to: "/#reviews", label: "Reviews", sectionId: "reviews" },
  { to: "/solutions", label: "Solutions" },
  { to: "/schedules", label: "Schedules" },
  { to: "/cars", label: "Cars" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (link) => {
    if (link.sectionId)
      return loc.pathname === "/" && loc.hash === `#${link.sectionId}`;
    return loc.pathname === link.to;
  };

  const handleNavClick = (e, link) => {
    if (!link.sectionId) return;

    e.preventDefault();
    setOpen(false);

    if (loc.pathname === "/") {
      document
        .getElementById(link.sectionId)
        ?.scrollIntoView({ behavior: "smooth" });

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
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>Call or WhatsApp:</span>
          <a href="tel:+2347033576017" className="font-bold">
            +234 703 357 6017
          </a>
        </div>
        <span className="font-semibold tracking-widest text-[10px]">
          AFOLARAY NIGERIA LIMITED
        </span>
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blue-700 text-white border-b border-blue-600 shadow-md"
            : "bg-white text-blue-700 border-b border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[58px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleNavClick(e, l)}
                className={`text-sm px-3 py-1 rounded-md transition ${
                  isActive(l)
                    ? scrolled
                      ? "text-white bg-white/20 font-semibold"
                      : "text-blue-700 bg-blue-100 font-semibold"
                    : scrolled
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="outline"
              className={
                scrolled
                  ? "border-white text-white hover:bg-white hover:text-blue-700"
                  : "border-blue-400 text-blue-700"
              }
            >
              Get a Quote
            </Button>

            <Button
              className={
                scrolled
                  ? "bg-white text-blue-700 hover:bg-gray-100"
                  : "bg-blue-700 hover:bg-blue-800"
              }
            >
              Track Shipment
            </Button>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden overflow-hidden border-t ${
                scrolled
                  ? "border-blue-600 bg-blue-700"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={(e) => handleNavClick(e, l)}
                    className={`p-2 rounded-md ${
                      isActive(l)
                        ? scrolled
                          ? "bg-white/20 text-white font-semibold"
                          : "bg-blue-100 text-blue-700 font-semibold"
                        : scrolled
                          ? "text-white/80 hover:bg-white/10"
                          : "text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}

                <div className="flex gap-2 mt-2">
                  <Button
                    className={
                      scrolled
                        ? "w-full bg-white text-blue-700 hover:bg-gray-100"
                        : "w-full"
                    }
                  >
                    Get a Quote
                  </Button>
                  <Button
                    variant="secondary"
                    className={
                      scrolled
                        ? "w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
                        : "w-full"
                    }
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
