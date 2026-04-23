import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WaFab from './components/WaFab'
import ScreenCTA from './components/ScreenCTA'

import Home from './pages/Home'
import About from './pages/About'
import ServicesPage from './pages/ServicesPage'
import HowItWorks from './pages/HowItWorks'
import Solutions from './pages/Solutions'
import Schedules from './pages/Schedules'
import Cars from './pages/Cars'
import TrackShipment from './pages/TrackShipment'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
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
      <WaFab />
      <ScreenCTA />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
