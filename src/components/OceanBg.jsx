import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Deterministic star positions
const STARS = Array.from({ length: 48 }, (_, i) => ({
  x: ((i * 97 + 13) % 100).toFixed(1),
  y: ((i * 53 + 7) % 50).toFixed(1),
  r: (0.3 + (i % 4) * 0.28).toFixed(2),
  opacity: (0.18 + (i % 6) * 0.1).toFixed(2),
}));

// Seamlessly-tileable wave paths (start y = end y for each)
const WAVE_PATHS = {
  deep:  "M0,60 C240,32 480,88 720,60 C960,32 1200,88 1440,60 L1440,120 L0,120 Z",
  mid:   "M0,60 C240,14 480,106 720,60 C960,14 1200,106 1440,60 L1440,120 L0,120 Z",
  near:  "M0,55 C200,5  400,105 600,55 C800,5  1000,105 1200,55 C1300,22 1440,78 1440,55 L1440,120 L0,120 Z",
  fore:  "M0,50 C180,8  360,92  540,50 C720,8  900,92  1080,50 C1260,8 1440,92 1440,50 L1440,120 L0,120 Z",
};

function WaveStrip({ path, fill, opacity = 1, duration, bottom, height = 120, dir = 1 }) {
  const shouldReduce = useReducedMotion();
  const from = dir > 0 ? "0%" : "-50%";
  const to   = dir > 0 ? "-50%" : "0%";
  return (
    <div style={{ position: "absolute", bottom, left: 0, right: 0, height, overflow: "hidden" }}>
      <motion.div
        style={{ display: "flex", position: "absolute", bottom: 0, left: 0 }}
        animate={shouldReduce ? {} : { x: [from, to] }}
        transition={{ duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      >
        {[0, 1].map(k => (
          <svg key={k} viewBox="0 0 1440 120" preserveAspectRatio="none"
            style={{ display: "block", width: "100vw", height, flexShrink: 0 }}
            fill={fill} fillOpacity={opacity}>
            <path d={path} />
          </svg>
        ))}
      </motion.div>
    </div>
  );
}

// Container ship SVG — stern (bridge+funnel) on LEFT, bow on RIGHT (sailing L→R)
function ContainerShip() {
  const row1 = [
    { x: 165, c: "#c9184a" }, { x: 218, c: "#1565c0" }, { x: 271, c: "#264653" },
    { x: 324, c: "#e76f51" }, { x: 377, c: "#e9c46a" }, { x: 430, c: "#2a9d8f" },
    { x: 483, c: "#c9184a" }, { x: 536, c: "#1e6091" }, { x: 589, c: "#264653" },
  ];
  const row2 = [
    { x: 165, c: "#2a9d8f" }, { x: 218, c: "#e9c46a" }, { x: 271, c: "#c9184a" },
    { x: 324, c: "#1565c0" }, { x: 377, c: "#e76f51" }, { x: 430, c: "#264653" },
    { x: 483, c: "#e9c46a" }, { x: 536, c: "#2a9d8f" }, { x: 589, c: "#e76f51" },
  ];

  return (
    <svg viewBox="0 0 720 148" width="720" height="148" fill="none" aria-hidden="true">
      {/* ── Hull body ── */}
      <path d="M30,94 L695,94 L712,112 L712,126 L672,130 L30,130 L8,126 L8,112 Z" fill="#1a2744"/>
      {/* Freeboard rail */}
      <rect x="28" y="87" width="670" height="7" rx="1" fill="#243565"/>
      {/* Boot-topping (white) */}
      <rect x="10" y="112" width="700" height="8" fill="#d5e8f4"/>
      {/* Waterline stripe (red) */}
      <rect x="10" y="120" width="700" height="6" fill="#c9184a"/>

      {/* ── Bridge / superstructure (LEFT / stern) ── */}
      <rect x="30" y="32" width="112" height="62" rx="3" fill="#1d2d4a"/>
      <rect x="34" y="36" width="102" height="55" rx="2" fill="#243565"/>
      {/* Wheelhouse windows */}
      {[42, 67, 92, 116].map(wx => (
        <rect key={wx} x={wx} y={45} width={18} height={13} rx="2" fill="#90caf9" opacity={wx === 116 ? 0.4 : 0.82}/>
      ))}
      {[42, 67, 92].map(wx => (
        <rect key={`w2-${wx}`} x={wx} y={65} width={18} height={11} rx="2" fill="#90caf9" opacity={0.38}/>
      ))}

      {/* ── Funnel (above bridge) ── */}
      <rect x="66" y="12" width="28" height="24" rx="4" fill="#c9184a"/>
      <rect x="71" y="9"  width="18" height="5"  rx="2" fill="#96000e"/>
      <rect x="65" y="34" width="30" height="3"  rx="1" fill="#1a2744"/>

      {/* ── Radar mast above bridge ── */}
      <line x1="90" y1="5" x2="90" y2="34" stroke="#243565" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="76" y1="12" x2="104" y2="22" stroke="#243565" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="90" cy="5" r="2" fill="#42a5f5" opacity="0.7"/>

      {/* ── Containers row 1 (lower) ── */}
      {row1.map(({ x, c }) => (
        <rect key={`r1-${x}`} x={x} y={54} width={48} height={34} rx={2} fill={c} opacity={0.93}/>
      ))}
      {/* ── Containers row 2 (upper) ── */}
      {row2.map(({ x, c }) => (
        <rect key={`r2-${x}`} x={x} y={20} width={48} height={34} rx={2} fill={c} opacity={0.88}/>
      ))}
      {/* Inter-container shadow line */}
      <rect x="163" y="52" width={9*53-2} height="2" fill="rgba(0,0,0,0.25)"/>

      {/* ── Forward mast (bow area, RIGHT) ── */}
      <line x1="658" y1="18" x2="658" y2="57" stroke="#243565" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="642" y1="26" x2="674" y2="36" stroke="#243565" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="658" cy="18" r="1.8" fill="#ffee58" opacity="0.9"/>

      {/* ── Bow wave (RIGHT side) ── */}
      <path d="M694,130 Q712,118 726,128" stroke="rgba(255,255,255,0.7)" strokeWidth="3"   fill="none" strokeLinecap="round"/>
      <path d="M688,132 Q714,122 730,130" stroke="rgba(255,255,255,0.42)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M682,134 Q716,126 736,133" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* ── Stern wake (LEFT side) ── */}
      <path d="M22,130 Q6,124 -8,130" stroke="rgba(255,255,255,0.38)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M26,133 Q4,128 -14,133" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function OceanBg({ children }) {
  const shouldReduce = useReducedMotion();
  const [vpw, setVpw] = useState(1440);

  useEffect(() => {
    setVpw(window.innerWidth);
    const fn = () => setVpw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const shipFrom = -740;
  const shipTo   = vpw + 250;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

      {/* ── Sky-to-ocean gradient ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #020c1f 0%, #04162e 12%, #072344 26%, #0b2f5a 40%, #0e3d72 52%, #104b8a 62%, #1357a0 74%, #1565c0 88%, #1976d2 100%)",
      }}/>

      {/* ── Horizon atmospheric glow ── */}
      <div style={{
        position: "absolute", bottom: "36%", left: "50%",
        transform: "translateX(-50%)",
        width: "95%", height: "140px",
        background: "radial-gradient(ellipse at center, rgba(29,160,255,0.28) 0%, rgba(21,101,192,0.14) 40%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* ── Moon glow ── */}
      <div style={{
        position: "absolute", top: "7%", right: "11%",
        width: "70px", height: "70px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 45%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      {/* ── Stars ── */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "55%", pointerEvents: "none" }}>
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" fillOpacity={s.opacity}
            style={{ animation: `starTwinkle ${1.8 + (i % 6) * 0.5}s ease-in-out ${(i * 0.4 % 4).toFixed(1)}s infinite` }}
          />
        ))}
      </svg>

      {/* ── Wave layer 1 — deep, slow ── */}
      <WaveStrip path={WAVE_PATHS.deep} fill="#062240" opacity={0.92} duration={26} bottom="42%" height={100}/>

      {/* ── Wave layer 2 — mid ── */}
      <WaveStrip path={WAVE_PATHS.mid} fill="#083060" opacity={0.9} duration={19} bottom="31%" height={112} dir={-1}/>

      {/* ── Container ship sailing L → R ── */}
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", bottom: "33%", zIndex: 4, transformOrigin: "center bottom" }}
        animate={shouldReduce ? {} : {
          x: [shipFrom, shipTo],
          y: [0, -4, 0, -4, 0],
        }}
        transition={{
          x: { duration: 58, repeat: Infinity, repeatType: "loop", ease: "linear" },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ContainerShip />
      </motion.div>

      {/* ── Wave layer 3 — nearer ── */}
      <WaveStrip path={WAVE_PATHS.near} fill="#0a4080" opacity={0.95} duration={14} bottom="19%" height={124}/>

      {/* ── Wave layer 4 — foreground ── */}
      <WaveStrip path={WAVE_PATHS.fore} fill="#0d4e98" duration={10} bottom="7%" height={132}/>

      {/* ── Ocean fill ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "9%", background: "#0d4e98" }}/>

      {/* ── Foam accent line ── */}
      <div style={{
        position: "absolute", bottom: "20%", left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 15%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.18) 85%, transparent 100%)",
        pointerEvents: "none",
      }}/>

      {/* ── Content slot ── */}
      {children && (
        <div style={{ position: "relative", zIndex: 10, height: "100%" }}>{children}</div>
      )}
    </div>
  );
}
