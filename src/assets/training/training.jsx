import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

/* ───────────── tokens ───────────── */
const D = { fontFamily: "'Big Shoulders Display', 'Arial Narrow', Impact, sans-serif" };
const M = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const B = { fontFamily: "'Inter Tight', system-ui, sans-serif" };
const LIME = "#B7FF00";
const BONE = "#E8E6DE";
const INK = "#0A0A0A";
const EASE = [0.76, 0, 0.24, 1]; // hard in, hard out. mechanical.
const outline = (c = BONE, w = 2) => ({ WebkitTextStroke: `${w}px ${c}`, color: "transparent" });


function Reveal({ children, from = "up", delay = 0, className = "" }) {
  const offset = { up: { y: 60 }, down: { y: -60 }, left: { x: -90 }, right: { x: 90 } }[from];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Rule({ className = "", color = "bg-[#B7FF00]", delay = 0 }) {
  return (
    <motion.div
      className={`h-px w-full origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  );
}

function Count({ to, pad = 2, duration = 1100 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(to * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return <span ref={ref}>{String(n).padStart(pad, "0")}</span>;
}

function Drift({ children, range = [40, -40], className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}


const Label = ({ children, className = "" }) => (
  <span style={M} className={`text-[11px] uppercase tracking-[0.2em] ${className}`}>
    {children}
  </span>
);

function SectionHead({ n, label, dark = false }) {
  return (
    <div>
      <div className="flex items-end gap-5 md:gap-8">
        <span
          style={{ ...D, ...(dark ? { color: INK } : outline(BONE, 2)) }}
          className="font-black leading-[0.75] text-[30vw] md:text-[15vw]"
        >
          <Count to={n} />
        </span>
        <Label className={`mb-1 md:mb-3 ${dark ? "text-[#0A0A0A]" : "text-[#E8E6DE]"}`}>/ {label}</Label>
      </div>
      <Rule className="mt-6" color={dark ? "bg-[#0A0A0A]" : "bg-[#B7FF00]"} />
    </div>
  );
}

function Fig({ n, caption, children, className = "" }) {
  return (
    <figure className={className}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#181818]">
        <div className="absolute inset-0 scale-[1.18]">{children}</div>
        
      </div>
      <figcaption style={M} className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-[#777B78]">
        <span>{caption}</span>
        <span>B/W</span>
      </figcaption>
    </figure>
  );
}

/* ───────────── artwork (monochrome, drawn in SVG so the page ships with no stock photos) ─────────────
   Swap any of these for a real high-contrast B/W photo: <img className="h-full w-full object-cover grayscale contrast-125" /> */

function ChalkArt() {
  return (
    <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <filter id="ch-cloud" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.02" numOctaves="5" seed="11" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.91  0 0 0 0 0.90  0 0 0 0 0.87  2.8 0 0 0 -1.05" />
        </filter>
        <filter id="ch-dust" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.035" numOctaves="4" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0 0.92  3.4 0 0 0 -1.7" />
        </filter>
        <linearGradient id="ch-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.42" stopColor="#8D8D8D" />
          <stop offset="0.5" stopColor="#0C0C0C" />
          <stop offset="1" stopColor="#4A4A4A" />
        </linearGradient>
        <pattern id="ch-knurl" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#0A0A0A" strokeWidth="1.4" opacity="0.55" />
        </pattern>
      </defs>
      <rect width="600" height="750" fill="#101010" />
      <rect width="600" height="750" filter="url(#ch-cloud)" />
      <rect x="-40" y="448" width="680" height="22" fill="url(#ch-bar)" />
      <rect x="-40" y="448" width="680" height="22" fill="url(#ch-knurl)" />
      <rect x="-40" y="440" width="60" height="38" fill="#0A0A0A" stroke="#E8E6DE" strokeWidth="1.5" />
      <rect width="600" height="750" filter="url(#ch-dust)" opacity="0.8" style={{ mixBlendMode: "screen" }} />
    </svg>
  );
}

const DISCIPLINES = [
  {
    id: "T/01",
    name: "Strength",
    note: "Build the kind of strength that carries more than just weight. Lift heavy, move well, get stronger."
  },
  {
    id: "T/02",
    name: "Conditioning",
    note: "Run it, push it, carry it. Built for pace and the demands of everyday life."
  },
  {
    id: "T/03",
    name: "Mobility",
    note: "Move better before you move harder. Build the range, control and freedom your body needs."
  },
  {
    id: "T/04",
    name: "Skill",
    note: "Sprint, jump, lift, repeat. Learn the movement, sharpen the technique, own the result."
  },
];

function Training() {
  return (
    <section id="training" className="relative overflow-hidden bg-[#0A0A0A] px-6 pb-32 pt-28 md:px-10 md:pb-48 md:pt-44">
      <SectionHead n={1} label="Training" />

      <h2 style={D} className="relative z-20 mt-16 font-black uppercase leading-[0.82] text-[#E8E6DE] mix-blend-difference text-[19vw] md:text-[10vw]">
        <Reveal from="left"><span className="block">Four disciplines.</span></Reveal>
        <Reveal from="right" delay={0.08}><span className="block md:ml-[22vw]">One standard.</span></Reveal>
      </h2>

      <div className="mt-12 grid gap-y-20 md:mt-0 md:grid-cols-12">
        <div className="md:col-span-7 md:pt-24">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.id} from={i % 2 ? "right" : "left"} delay={i * 0.05}>
              <div className={`group grid grid-cols-[3.5rem_1fr] items-baseline gap-x-2 border-t border-[#E8E6DE]/20 py-6 transition-transform duration-100 hover:translate-x-3 ${i === DISCIPLINES.length - 1 ? "border-b" : ""}`}>
                <Label className="text-[#777B78] group-hover:text-[#B7FF00]">{d.id}</Label>
                <span style={D} className="text-[15vw] font-black uppercase leading-[0.85] text-[#E8E6DE] transition-colors duration-100 group-hover:text-[#B7FF00] md:text-[5.5vw]">
                  {d.name}
                </span>
                <p style={B} className="col-start-2 mt-3 max-w-md text-sm leading-relaxed text-[#777B78]">{d.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative md:col-span-4 md:col-start-9 md:-mt-20">
          <Drift range={[50, -50]}>
  <div className="relative aspect-[4/5] overflow-hidden ">

    <img
      src="https://i.postimg.cc/tR59wJKv/edgar-chaparro-s-Hfo3WOg-GTU-unsplash.jpg"
      alt="Athlete training"
      className="absolute mt-26 inset-0 h-full w-full object-cover grayscale contrast-105 brightness-75 z-10"
    />

    <div className="absolute inset-0 bg-[#0A0A0A]/20" />

  </div>
</Drift>
  
          <Drift range={[-20, 60]} className="mt-10 w-2/3 md:-ml-28">
            {/* <Fig n="02" caption="Rope. Floor. Rhythm."><RopeArt /></Fig> */}
          </Drift>
        </div>
      </div>
    </section>
  );
}


function KineticTraining() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Training />
    </main>
  );
}

export default KineticTraining;