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
  const loc = useLocation();
  const navigate = useNavigate();

  const isActive = (link) => {
    if (link.sectionId)
      return loc.pathname === "/" && loc.hash === `#${link.sectionId}`;
    return loc.pathname === link.to;
  };

  const handleNavClick = (e, link) => {
    setOpen(false);

    if (!link.sectionId) return;

    e.preventDefault();

    if (loc.pathname === "/") {
      document
        .getElementById(link.sectionId)
        ?.scrollIntoView({ behavior: "smooth" });

      navigate(
        { pathname: "/", hash: `#${link.sectionId}` },
        { replace: true }
      );
      return;
    }

    navigate({ pathname: "/", hash: `#${link.sectionId}` });
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs px-4 sm:px-6 py-2 flex justify-between items-center">
        {/* Mobile: icon only | Desktop: full text */}
        <a
          href="tel:+2347033576017"
          className="flex items-center gap-2 hover:text-blue-200 transition"
        >
          <Phone size={14} className="shrink-0" />
          <span className="hidden sm:inline">Call or WhatsApp:</span>
          <span className="font-bold hidden sm:inline">+234 703 357 6017</span>
          <span className="font-bold sm:hidden">+234 703 357 6017</span>
        </a>

        {/* Mobile: initials badge | Desktop: full name */}
        <div className="flex items-center gap-1.5">
         
          <span className="hidden sm:inline font-semibold tracking-widest text-[10px]">
            AFOLARAY NIGERIA LIMITED
          </span>
        </div>
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white text-blue-700 border-b border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between px-6 h-[68px]">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src="/logo.png" className="h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={(e) => handleNavClick(e, l)}
                className={`text-sm px-3 py-1.5 rounded-md transition ${
                  isActive(l)
                    ? "text-blue-700 bg-blue-100 font-semibold"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" className="border-blue-400 text-blue-700">
              Get a Quote
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              Track Shipment
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-1 text-blue-700"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-200 bg-white"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={(e) => handleNavClick(e, l)}
                    className={`p-2.5 rounded-md text-sm transition ${
                      isActive(l)
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}

                <div className="flex gap-2 mt-3">
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                    Get a Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-400 text-blue-700"
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