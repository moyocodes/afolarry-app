import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fade = (dir = 0) => ({
  hidden: { opacity: 0, x: dir * 40, y: dir === 0 ? 30 : 0 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
});

const stats = [
  { num: "8,500+", label: "Vehicles Delivered" },
  { num: "100%", label: "Client Satisfaction" },
];

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="bg-white py-16 px-4 md:px-8 md:py-28 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
        {/* TEXT */}
        <motion.div
          className="order-2 md:order-1"
          variants={fade(-1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-[10px] font-bold tracking-[0.15em] text-blue-400 uppercase mb-2">
            Who We Are
          </p>

          <h2 className="font-extrabold text-[1.8rem] md:text-[2.6rem] leading-tight tracking-tight text-[#0d1b2e] mb-5">
            About Afolaray
            <br />
            Nigeria Limited
          </h2>

          <p className="text-[14px] md:text-[15px] text-[#5a7599] leading-relaxed md:leading-loose mb-3">
            Afolaray Nigeria Limited is a premier vehicle import company
            dedicated to simplifying the global vehicle trade. With over a
            decade of experience, we have established ourselves as a trusted
            partner for individuals and dealerships looking to move vehicles
            across borders.
          </p>

          <p className="text-[14px] md:text-[15px] text-[#5a7599] leading-relaxed md:leading-loose">
            Our mission is to provide transparent, efficient, and secure
            logistics solutions — from procurement and customs clearance to
            final delivery — ensuring complete peace of mind for our clients.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-8 pt-6 border-t border-blue-100">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <div
                  className={`font-extrabold leading-none tracking-tight mb-1 
                  ${s.num === "100%" ? "text-blue-700 text-3xl md:text-[2.5rem]" : "text-[#0d1b2e] text-2xl md:text-[2rem]"}`}
                >
                  {s.num}
                </div>

                <p
                  className={`text-[11px] md:text-[12px] leading-snug font-medium
                  ${s.num === "100%" ? "text-blue-700" : "text-[#5a7599]"}`}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/#services"
              className="inline-flex items-center justify-center bg-blue-700 text-white px-5 py-3 rounded-lg text-[13px] font-bold"
            >
              Explore Services
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center justify-center bg-blue-50 text-blue-700 border border-blue-100 px-5 py-3 rounded-lg text-[13px] font-bold"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          className="order-1 md:order-2 relative pl-4 pb-6 md:pl-6 md:pb-8"
          variants={fade(1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_30px_80px_rgba(21,101,192,0.16)]"
          >
            <img
              src="https://afolary-limited-5d4i.vercel.app/assets/Afolary-image-DbVIOQKx.jpg"
              alt="Afolaray Nigeria Limited operations"
              className="w-full h-full object-cover"
            />

            {/* overlay */}
            <div className="absolute bottom-6 left-4 right-0 px-5 py-4 bg-gradient-to-t from-[rgba(4,14,30,0.72)] to-transparent rounded-b-2xl">
              <p className="text-[10px] md:text-[11px] text-white/70">
                Afolaray Nigeria Limited · Lagos operations
              </p>
            </div>
          </motion.div>

          {/* FLOATING CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="absolute bottom-0 left-0 bg-blue-700 text-white rounded-xl px-5 py-4 shadow-[0_16px_40px_rgba(21,101,192,0.35)]"
          >
            <div className="text-2xl md:text-[2rem] font-extrabold leading-none">
              12+
            </div>
            <p className="text-[10px] md:text-[11px] opacity-80 leading-snug mt-1">
              Years of
              <br />
              experience
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
