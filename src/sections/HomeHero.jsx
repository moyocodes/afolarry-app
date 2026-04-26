import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  Car,
  FileText,
  Shield,
  Package,
  Anchor,
  Globe,
  Truck,
  ClipboardList,
} from "lucide-react";

const words = ["Connecting", "You", "to", "Global", "Vehicle", "Markets"];

const heroPoster =
  "https://i.pinimg.com/1200x/f2/65/b7/f265b71d3e22c7f70ad1a410fbca9f0b.jpg";

const heroVideoSrc = "/animate-it.mp4";

const services = [
  { Icon: Car, label: "Vehicle Import" },
  { Icon: FileText, label: "Documentation" },
  { Icon: Shield, label: "Customs Clearance" },
  { Icon: Package, label: "Logistics" },
  { Icon: Anchor, label: "Sea Freight" },
  { Icon: Globe, label: "Global Shipping" },
  { Icon: Truck, label: "Inland Delivery" },
  { Icon: ClipboardList, label: "Export Paperwork" },
];

// Duplicate for seamless loop
const marqueeItems = [...services, ...services];

export default function HomeHero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden flex flex-col">
      {/* BG video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          preload="auto"
          src={heroVideoSrc}
          aria-hidden="true"
          className="w-full h-full object-cover block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,14,30,0.78)] via-[rgba(4,14,30,0.55)] to-[rgba(4,14,30,0.92)]" />

        {/* Glow */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[clamp(300px,70vw,700px)] h-[clamp(300px,70vw,700px)] rounded-full bg-[radial-gradient(circle,rgba(21,101,192,0.18)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-[clamp(1.2rem,4vw,3rem)] pt-[clamp(5rem,8vw,7rem)] pb-8 max-w-screen-xl mx-auto w-full">
        {/* Headline */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6 items-baseline">
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.1 + i * 0.1,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`font-[Sora,sans-serif] text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] ${
                ["Global", "Vehicle", "Markets"].includes(word)
                  ? "text-[#42a5f5]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="font-[Sora,sans-serif] text-[clamp(14px,1.8vw,17px)] text-white/60 leading-[1.85] max-w-[540px] font-light mb-9"
        >
          Your trusted partner for seamless vehicle import, customs clearance,
          and international logistics. Efficiency meets reliability.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-3 flex-wrap mb-2 w-full"
        >
          <Link to="/track" className="w-full max-w-[260px]">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-[#1565c0] text-white px-5 py-3.5 rounded-[10px] font-[Sora,sans-serif] text-sm font-bold cursor-pointer w-full"
            >
              Track Shipment <ArrowRight size={16} />
            </motion.div>
          </Link>
          <Link to="/#services" className="w-full max-w-[260px]">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/25 text-white px-5 py-3.5 rounded-[10px] font-[Sora,sans-serif] text-sm font-bold cursor-pointer w-full"
            >
              Explore Services <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* ── Marquee banner ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="relative z-10 w-full overflow-hidden py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[rgba(4,14,30,0.6)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[rgba(4,14,30,0.6)] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 bg-white/[0.07] border border-white/10 rounded-full px-5 py-2 shrink-0"
            >
              <s.Icon size={15} className="text-[#42a5f5] shrink-0" />
              <span className="text-[12px] font-[Sora,sans-serif] font-semibold text-white/80 whitespace-nowrap tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-[clamp(40px,8vh,120px)] left-1/2 -translate-x-1/2 z-20 text-white/30 cursor-pointer"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}