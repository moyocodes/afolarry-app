import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Faint blueprint-style ship outline
function BlueprintShip({ opacity = 0.12 }) {
  return (
    <svg
      viewBox="0 0 240 60"
      width="240"
      height="60"
      fill="none"
      stroke={`rgba(21,101,192,${opacity})`}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Hull */}
      <path d="M14,36 L224,36 L234,44 L234,52 L218,55 L14,55 L4,52 L4,44 Z" strokeWidth="1.2"/>

      {/* Boot-topping stripe */}
      <line x1="6" y1="46" x2="232" y2="46" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.6"/>

      {/* Bridge / superstructure */}
      <rect x="14" y="14" width="46" height="23" rx="1.5" strokeWidth="1"/>

      {/* Bridge windows row */}
      <rect x="20" y="19" width="8" height="5" rx="1" strokeWidth="0.7"/>
      <rect x="31" y="19" width="8" height="5" rx="1" strokeWidth="0.7"/>
      <rect x="42" y="19" width="8" height="5" rx="1" strokeWidth="0.7"/>

      {/* Funnel */}
      <rect x="28" y="4"  width="12" height="12" rx="2" strokeWidth="1"/>
      <line x1="34" y1="4" x2="34" y2="0" strokeWidth="0.8" strokeDasharray="2 2"/>

      {/* Communications mast */}
      <line x1="37" y1="0" x2="37" y2="15" strokeWidth="0.7"/>
      <line x1="30" y1="5" x2="44" y2="10" strokeWidth="0.6"/>

      {/* Container grid - row 1 (lower) */}
      {[72, 94, 116, 138, 160, 182].map(x => (
        <rect key={`c1-${x}`} x={x} y={22} width={18} height={14} rx="0.8" strokeWidth="0.8"/>
      ))}

      {/* Container grid - row 2 (upper) */}
      {[72, 94, 116, 138, 160, 182].map(x => (
        <rect key={`c2-${x}`} x={x} y={8} width={18} height={14} rx="0.8" strokeWidth="0.8"/>
      ))}

      {/* Forward mast (bow side, right) */}
      <line x1="212" y1="6" x2="212" y2="26" strokeWidth="0.7"/>
      <line x1="200" y1="12" x2="224" y2="18" strokeWidth="0.6"/>

      {/* Bow wave dots */}
      <path d="M222,55 Q232,46 242,53" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.8"/>
      <path d="M218,57 Q234,50 248,56" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.5"/>

      {/* Waterline indicator dashes */}
      <path d="M4,50 L234,50" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4"/>
    </svg>
  );
}

// The curved voyage path SVG (full-width background element)
function RoutePath() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      fill="none"
      aria-hidden="true"
    >
      {/* Primary route — dashed, very faint */}
      <path
        d="M-5,65 C5,55 15,30 30,42 C45,54 55,75 70,58 C85,41 92,22 105,38"
        stroke="rgba(21,101,192,0.07)"
        strokeWidth="0.6"
        strokeDasharray="2.5 5"
        style={{ animation: "routeFlow 6s linear infinite" }}
      />

      {/* Secondary route (echo / wake) */}
      <path
        d="M-5,68 C5,58 15,33 30,45 C45,57 55,78 70,61 C85,44 92,25 105,41"
        stroke="rgba(21,101,192,0.04)"
        strokeWidth="0.4"
        strokeDasharray="1.5 8"
        style={{ animation: "routeFlow 8s linear infinite reverse" }}
      />

      {/* Grid dots (navigation chart feel) */}
      {[20, 40, 60, 80].map(cx =>
        [25, 50, 75].map(cy => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.4" fill="rgba(21,101,192,0.06)"/>
        ))
      )}

      {/* Compass rose (bottom-right corner) */}
      <g transform="translate(92,88)" opacity="0.08">
        <circle cx="0" cy="0" r="5.5" stroke="rgba(21,101,192,1)" strokeWidth="0.4" fill="none"/>
        <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="rgba(21,101,192,1)" strokeWidth="0.3"/>
        <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="rgba(21,101,192,1)" strokeWidth="0.3"/>
        <text x="0" y="-6.5" textAnchor="middle" fontSize="2.2" fill="rgba(21,101,192,1)" fontWeight="bold">N</text>
      </g>
    </svg>
  );
}

// Route y-offsets (in px) for the ship as it follows the curved path
const SHIP_X = ["-260px", "calc(8vw)",  "calc(30vw)", "calc(52vw)", "calc(74vw)", "calc(100vw + 100px)"];
const SHIP_Y = [    0,        -55,           40,           -50,           20,               0        ];
const TIMES  = [    0,        0.18,          0.38,         0.60,          0.82,              1        ];

export default function BlueprintBg({ style }) {
  const shouldReduce = useReducedMotion();
  const [vpw, setVpw] = useState(1440);

  useEffect(() => {
    setVpw(window.innerWidth);
    const fn = () => setVpw(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    >
      {/* Faint voyage route lines */}
      <RoutePath />

      {/* Animated blueprint ship following the route */}
      <motion.div
        style={{
          position: "absolute",
          top: "55%",
          left: 0,
          transformOrigin: "center center",
        }}
        animate={shouldReduce ? {} : {
          x: SHIP_X,
          y: SHIP_Y,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times: TIMES,
        }}
      >
        <BlueprintShip opacity={0.1} />
      </motion.div>
    </div>
  );
}
