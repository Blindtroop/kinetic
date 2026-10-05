import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import ContactForm from "../contact/contact";

/* ───────────── tokens ───────────── */
const D = { fontFamily: "'Big Shoulders Display', 'Arial Narrow', Impact, sans-serif" };
const M = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const B = { fontFamily: "'Inter Tight', system-ui, sans-serif" };
// const LIME = "#B7FF00";
// const BONE = "#E8E6DE";
// const INK = "#0A0A0A";
const EASE = [0.76, 0, 0.24, 1]; // hard in, hard out. mechanical.
// const outline = (c = BONE, w = 2) => ({ WebkitTextStroke: `${w}px ${c}`, color: "transparent" });

function Line({ children, delay = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}


const Label = ({ children, className = "" }) => (
  <span style={M} className={`text-[11px] uppercase tracking-[0.2em] ${className}`}>
    {children}
  </span>
);

function Btn({
  children,
  href = "#",
  tone = "lime",
  className = "",
  onClick,
}) {
  const tones = {
    lime: "border-[#B7FF00] bg-[#B7FF00] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#B7FF00] hover:shadow-[6px_6px_0_#E8E6DE]",
    ink: "border-[#0A0A0A] bg-[#0A0A0A] text-[#B7FF00] hover:bg-[#B7FF00] hover:text-[#0A0A0A] hover:shadow-[6px_6px_0_#0A0A0A]",
  };

  return (
    <a
      href={href}
      onClick={onClick}
      style={M}
      className={`group inline-flex items-center gap-8 border px-6 py-4 text-[13px] font-medium uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,color] duration-100 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none ${tones[tone]} ${className}`}
    >
      {children}
      <span className="transition-transform duration-100 group-hover:translate-x-2">
        →
      </span>
    </a>
  );
}

function PlateArt({ className = "" }) {
  const streaks = [
    [100, 560, 5, 0.5], [150, 700, 12, 0.35], [205, 620, 3, 0.8], [260, 760, 18, 0.25],
    [330, 640, 4, 0.7], [395, 800, 26, 0.18], [455, 600, 3, 0.9], [520, 740, 14, 0.3],
    [585, 640, 5, 0.6], [640, 700, 10, 0.25], [690, 560, 3, 0.5],
  ];
  return (
    <svg viewBox="0 0 900 800" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="pl-lit" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#F6F4E" />
          <stop offset="0.4" stopColor="#8E8C86" />
          <stop offset="0.41" stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#242424" />
        </linearGradient>
        <filter id="pl-blur" x="-60%" y="-30%" width="220%" height="160%">
          <feGaussianBlur stdDeviation="48 0" />
        </filter>
        <filter id="pl-streak" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="22 0.6" />
        </filter>
        <filter id="pl-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id="pl-clip"><circle cx="540" cy="400" r="330" /></clipPath>
      </defs>
      <g filter="url(#pl-streak)">
        {streaks.map(([y, w, h, o], i) => (
          <rect key={i} x={380 - w} y={y} width={w} height={h} fill="#E8E6DE" opacity={o} />
        ))}
      </g>
      <circle cx="450" cy="400" r="330" fill="#E8E6DE" opacity="0.32" filter="url(#pl-blur)" />
      <circle cx="540" cy="400" r="330" fill="url(#pl-lit)" />
      <circle cx="540" cy="400" r="318" fill="none" stroke="#0A0A0A" strokeWidth="14" strokeDasharray="3 7" opacity="0.8" />
      {[285, 250, 210, 150].map((r) => (
        <g key={r}>
          <circle cx="540" cy="400" r={r} fill="none" stroke="#0A0A0A" strokeWidth="3" />
          <circle cx="540" cy="400" r={r - 4} fill="none" stroke="#E8E6DE" strokeWidth="1" opacity="0.28" />
        </g>
      ))}
      <text x="318" y="438" fontFamily="'Big Shoulders Display', sans-serif" fontWeight="900" fontSize="124" fill="#0A0A0A" letterSpacing="-2">20</text>
      <text x="326" y="468" fontFamily="'JetBrains Mono', monospace" fontSize="15" fill="#0A0A0A" letterSpacing="5">KG / 44 LB</text>
      <circle cx="540" cy="400" r="72" fill="#111" stroke="#E8E6DE" strokeWidth="2" />
      <circle cx="540" cy="400" r="24" fill="#0A0A0A" stroke="#E8E6DE" strokeWidth="2" />
      <g clipPath="url(#pl-clip)">
        <rect x="200" y="60" width="700" height="680" filter="url(#pl-grain)" opacity="0.5" style={{ mixBlendMode: "overlay" }} />
      </g>
    </svg>
  );
}


const NAV = [
  ["Training", "training"], ["Programs", "programs"], ["Method", "method"],
  ["Coaches", "coaches"], ["Membership", "membership"], ["Contact", "contact"],
];

function Nav() {
  return (
    <nav
      style={{ ...M, paddingTop: "calc(0.9rem + env(safe-area-inset-top, 0px))" }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#E8E6DE]/15 bg-[#0A0A0A]/95 px-6 pb-3 text-[20px] uppercase tracking-[0.2em] text-[#E8E6DE] md:px-10"
    >
      <a href="#top" style={D} className="text-3xl font-black leading-none tracking-normal">K/</a>
     <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
  {NAV.map(([label, id], i) => (
    <li key={id}>
      <a
        href={`#${id}`}
        className="group flex items-center gap-2 whitespace-nowrap"
      >
        <span className="text-[#777B78] transition-colors duration-100 group-hover:text-[#B7FF00]">
          0{i + 1}
        </span>

        <span className="w-0 overflow-hidden whitespace-nowrap transition-all duration-200 group-hover:w-auto">
          {label}
        </span>
      </a>
    </li>
  ))}
</ul>
      {/* <a href="#membership" className="border border-[#E8E6DE] px-3 py-2 transition-colors duration-100 hover:bg-[#E8E6DE] hover:text-[#0A0A0A]">
        Join →
      </a> */}
    </nav>
  );
}

function Hero() {
    const [contactOpen, setContactOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["0vw", "-30vw"]);
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const artRot = useTransform(scrollYProgress, [0, 1], [-8, 5]);

  return (
    <section id="top" ref={ref} className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-[#0A0A0A]">
      {/* technical lines + labels */}

      {/* artwork */}
      <motion.div
        initial={{ opacity: 0, x: 140 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        style={{ y: artY, rotate: artRot }}
        className="absolute -right-[26vw] top-[14vh] z-10 w-[110vw] contrast-125 md:-right-[14vw] md:top-[8vh] md:w-[64vw]"
      >
        <PlateArt className="h-auto w-full" />
      </motion.div>

      {/* headline + CTA */}
      <div className="absolute left-6 top-[140px] z-30 md:left-10 md:top-[150px]">
        <h2 style={D} className="font-black uppercase leading-[0.9] text-[#E8E6DE] text-[17vw] md:text-[8vw]">
          <Line delay={0.1}>MOVE</Line>
          <Line delay={0.2} className="md:ml-[6vw]">WITH</Line>
          <Line delay={0.3}>INTENT<span className="text-[#B7FF00]">.</span></Line>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.7 }}
          className="mt-8"
        >
          <Btn onClick={() => setContactOpen(true)}>Join</Btn>
        </motion.div>
      </div>

      {/* oversized, cropped wordmark */}
      <motion.h1
        initial={{ y: "35%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ ...D, x: wordX }}
        className="pointer-events-none absolute bottom-[-6.5vw] left-[-1.5vw] z-20 select-none whitespace-nowrap font-black uppercase leading-[0.78] text-[#E8E6DE] mix-blend-difference text-[25vw]"
      >
        Kinetic
      </motion.h1>

      <div className="absolute bottom-5 right-6 z-30 flex items-center gap-3 md:right-10">
        <span className="h-2 w-2 bg-[#B7FF00]" />
        <Label className="text-[#E8E6DE] mix-blend-difference">Scroll</Label>
      </div>
      {contactOpen && (
  <ContactForm onClose={() => setContactOpen(false)} />
)}
    </section>
  );
}


function KineticHero() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Nav />
      <Hero />
    </main>
  );
}

export default KineticHero;