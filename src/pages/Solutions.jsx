import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Ship, FileText, Package, Truck, Gavel } from "lucide-react";
import PageHeader from "../components/PageHeader";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

const cargoTypes = [
  {
    icon: <Ship size={22} />,
    title: "RoRo Shipments",
    body: "Cars, trucks, SUVs, buses, and rolling equipment moved safely via RoRo vessels.",
  },
  {
    icon: <Truck size={22} />,
    title: "High & Heavy",
    body: "Oversized machinery, construction equipment, and industrial units handled with care.",
  },
  {
    icon: <Package size={22} />,
    title: "Containerized Cargo",
    body: "Standard, high-cube, and specialty containers organized for efficient ocean transit.",
  },
  {
    icon: <FileText size={22} />,
    title: "General Cargo",
    body: "Mixed freight and boxed goods consolidated for reliable port-to-port delivery.",
  },
];

const destinations = [
  {
    flag: "🇺🇸",
    name: "North America",
    body: "Major U.S. and Canadian ports with frequent departures.",
  },
  {
    flag: "🌍",
    name: "West Africa",
    body: "Key coastal ports for fast clearance and local delivery coordination.",
  },
  {
    flag: "⚓",
    name: "Port-to-Port Focus",
    body: "We specialise in sea freight routing with consistent schedules and tracking.",
  },
];

const transportCards = [
  {
    title: "Sea Freight",
    bg: "bg-[#e3f2fd]",
    features: [
      "FCL and LCL shipments",
      "RoRo and break-bulk options",
      "Door-to-port or door-to-door",
    ],
    body: "Ideal when cost efficiency is essential and timelines are planned. We coordinate export documentation, port handling, and customs clearance for smooth ocean transit.",
  },
  {
    title: "Ocean Compliance",
    bg: "bg-[#f7faff]",
    features: [
      "Export documentation support",
      "Customs coordination",
      "Real-time tracking updates",
    ],
    body: "Our team handles shipping instructions, compliance checks, and vessel scheduling to keep cargo moving across North America and West Africa.",
  },
];

const auctionItems = [
  {
    title: "Transport from Auctions",
    body: "We pick up vehicles from auction yards and coordinate inland delivery to the nearest port for sea shipment.",
  },
  {
    title: "Bid & Buy Assistance",
    body: "Guidance on paperwork, title readiness, and export procedures so your purchase ships without delays.",
  },
];

export default function Solutions() {
  return (
    <div className="font-[Sora,sans-serif]">
      <PageHeader
        eyebrow="Solutions"
        title="Sea Freight Solutions Built for Vehicle Logistics"
        description="We move vehicles, machinery, and cargo by sea only. From planning and documentation to loading and port delivery, our team keeps every shipment on course."
        image="https://images.unsplash.com/photo-1565891741441-64926e441838?w=1600&q=80&auto=format&fit=crop"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/track"
            className="text-[13px] text-white bg-white/15 border border-white/30 px-5 py-2.5 rounded-[9px] font-semibold backdrop-blur-sm hover:bg-white/25 transition no-underline"
          >
            Track Shipment
          </Link>
          <Link
            to="/#contact"
            className="text-[13px] text-[#1565c0] bg-white px-5 py-2.5 rounded-[9px] font-bold hover:bg-blue-50 transition no-underline"
          >
            Request a Quote
          </Link>
        </div>
      </PageHeader>

      {/* ── Mode of Transport ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-screen-xl mx-auto">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.12em] uppercase mb-2">
            Mode of Transport
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0d1b2e] leading-tight mb-3">
            We operate exclusively by sea.
          </h2>
          <p className="text-sm text-[#5a7599] font-light leading-relaxed max-w-[560px]">
            Ideal when cost efficiency is essential and timelines are planned.
            We coordinate export documentation, port handling, and customs
            clearance for smooth ocean transit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {transportCards.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`${item.bg} border border-[#dce8f7] rounded-2xl p-8`}
            >
              <Ship size={28} className="text-[#1565c0] mb-4" />
              <h3 className="text-[17px] font-bold text-[#0d1b2e] mb-3">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#5a7599] font-light leading-[1.8] mb-5">
                {item.body}
              </p>
              <ul className="space-y-1.5">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-[13px] text-[#0c447c]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1565c0] shrink-0 inline-block" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Cargo Types ── */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#f7faff] border-y border-[#dce8f7]">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.12em] uppercase mb-2">
              Cargo Types We Handle
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0d1b2e]">
              Flexible sea freight solutions for vehicles, equipment, and
              general cargo.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cargoTypes.map((c, i) => (
              <motion.div
                key={c.title}
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white border border-[#dce8f7] rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-[10px] bg-[#e3f2fd] flex items-center justify-center text-[#1565c0] mb-4">
                  {c.icon}
                </div>
                <h4 className="text-[13px] font-bold text-[#0d1b2e] mb-2">
                  {c.title}
                </h4>
                <p className="text-[12px] text-[#5a7599] font-light leading-[1.7]">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Auction Services ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.12em] uppercase mb-2">
              Auction Services
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-[#0d1b2e] leading-tight mb-8">
              Support for auction vehicles from bid to vessel loading.
            </h2>
            <div className="flex flex-col gap-4">
              {auctionItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-[#f7faff] border border-[#dce8f7] rounded-xl p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel size={16} className="text-[#1565c0] shrink-0" />
                    <h4 className="text-[14px] font-bold text-[#0d1b2e]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#5a7599] font-light leading-[1.75]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(21,101,192,0.12)]">
              <img
                src="https://i.pinimg.com/webp80/1200x/08/19/bd/0819bd2a262765ebc497725b0721daea.webp"
                alt="Vehicle auction"
                className="w-full block aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#0d1b2e]">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[11px] font-bold text-[#42a5f5] tracking-[0.12em] uppercase mb-2">
              Destinations
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-bold text-white">
              Focused routes across North America and West Africa.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-6"
              >
                <div className="text-[28px] mb-3">{d.flag}</div>
                <h4 className="text-[14px] font-bold text-white mb-2">
                  {d.name}
                </h4>
                <p className="text-[12px] text-white/55 font-light leading-[1.7]">
                  {d.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/track"
              className="text-[13px] text-white bg-white/[0.12] border border-white/20 px-5 py-2.5 rounded-[9px] font-semibold hover:bg-white/20 transition no-underline"
            >
              Track Shipment
            </Link>
            <Link
              to="/contact"
              className="text-[13px] text-[#0d1b2e] bg-white px-5 py-2.5 rounded-[9px] font-bold hover:bg-blue-50 transition no-underline"
            >
              Speak to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}