import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScreenCTA from "./components/ScreenCTA";

import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import Schedules from "./pages/Schedules";
import Cars from "./pages/Cars";
import TrackShipment from "./pages/TrackShipment";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import MailDashboard from "./pages/MailDashboard";
import AdminShield from "./pages/AdminShield";
import AdminDashboard from "./pages/AdminDashboard";
import PublicTrack from "./pages/PublicTrack";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ShipmentsAdmin from "./pages/ShipmentsAdmin";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} /> */}
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScreenCTA />
    </>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/mail"))      return <MailDashboard token={pathname.split('/')[2] || null} />;
  if (pathname.startsWith("/shield"))    return <AdminShield />;
  if (pathname.startsWith("/admin"))     return <AdminDashboard />;
  if (pathname.startsWith("/shipments")) return <ShipmentsAdmin />;
  if (pathname.startsWith("/public-track")) return <PublicTrack />;
  return <Layout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
