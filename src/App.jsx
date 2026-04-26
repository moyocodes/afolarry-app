import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScreenCTA from "./components/ScreenCTA";

import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import HowItWorks from "./pages/HowItWorks";
import Solutions from "./pages/Solutions";
import Schedules from "./pages/Schedules";
import Cars from "./pages/Cars";
import TrackShipment from "./pages/TrackShipment";
import ContactPage from "./pages/ContactPage";
import MailDashboard from "./pages/MailDashboard";

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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <ScreenCTA />
    </>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/mail")) return <MailDashboard />;
  return <Layout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
