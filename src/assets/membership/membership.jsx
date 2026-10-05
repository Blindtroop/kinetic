import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

/* ───────────── tokens ───────────── */
const D = { fontFamily: "'Big Shoulders Display', 'Arial Narrow', Impact, sans-serif" };
const M = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const B = { fontFamily: "'Inter Tight', system-ui, sans-serif" };
// const LIME = "#B7FF00";
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


const Label = ({ children, className = "" }) => (
  <span style={M} className={`text-[11px] uppercase tracking-[0.2em] ${className}`}>
    {children}
  </span>
);

function Btn({ children, href = "#", tone = "lime", className = "" }) {
  const tones = {
    lime: "border-[#B7FF00] bg-[#B7FF00] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#B7FF00] hover:shadow-[6px_6px_0_#E8E6DE]",
    ink: "border-[#0A0A0A] bg-[#0A0A0A] text-[#B7FF00] hover:bg-[#B7FF00] hover:text-[#0A0A0A] hover:shadow-[6px_6px_0_#0A0A0A]",
  };
  return (
    <a
      href={href}
      style={M}
      className={`group inline-flex items-center gap-8 border px-6 py-4 text-[13px] font-medium uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color,color] duration-100 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none ${tones[tone]} ${className}`}
    >
      {children}
      <span className="transition-transform duration-100 group-hover:translate-x-2">→</span>
    </a>
  );
}


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


const TIERS = [
  { name: "Drop-in", price: "1,500", per: "/ session", feats: ["Any scheduled session", "Floor access", "No commitment"], hl: false },
  { name: "Standard", price: "12,000", per: "/ month", feats: ["Unlimited sessions", "Quarterly assessment", "Program of your choice"], hl: true },
  { name: "Resident", price: "22,000", per: "/ month", feats: ["Unlimited + open floor", "Individual programming", "Weekly coach check-in"], hl: false },
];


function Membership() {
  return (
    <section id="membership" className="bg-[#181818] overflow-x-hidden pb-28 pt-28 md:pb-14 md:pt-24">
      <div className="px-6 md:px-10">
        <SectionHead n={5} label="Membership" />
        <Reveal from="up" className="mb-16 mt-16 md:mb-24">
  <h2
    style={D}
    className="font-black uppercase leading-[0.82] text-[#E8E6DE] text-[12vw] md:text-[9vw]"
  >
    <span className="block">No contracts.</span>
    <span className="block ml-[8vw] md:ml-[12vw]">Cancel any</span>
    <span className="block ml-[16vw] md:ml-[24vw]">month.</span>
  </h2>
</Reveal>
      </div>

      <div>
        {TIERS.map((t, i) => (
          <Reveal key={t.name} from={i === 1 ? "up" : i === 0 ? "left" : "right"}>
            <div
              className={`group grid grid-cols-12 items-end gap-x-4 gap-y-6 border-t ${i === TIERS.length - 1 ? "border-b" : ""} px-6 py-8 transition-colors duration-100 md:px-10 md:py-10 hover:bg-[#E8E6DE] hover:text-[#0A0A0A] ${
                t.hl ? "border-[#B7FF00] bg-[#B7FF00] text-[#0A0A0A]" : "border-[#E8E6DE]/20 text-[#E8E6DE]"
              }`}
            >
              <div className="col-span-12 md:col-span-5">
                <Label className={t.hl ? "text-[#0A0A0A]" : "text-[#777B78] group-hover:text-[#0A0A0A]"}>
                  T/0{i + 1}{t.hl ? " — Most chosen" : ""}
                </Label>
                <div style={D} className="mt-2 text-[16vw] font-black uppercase leading-[0.82] md:text-[7vw]">{t.name}</div>
              </div>
              <ul style={M} className="col-span-7 space-y-1 text-[12px] uppercase tracking-[0.12em] md:col-span-4">
                {t.feats.map((f) => <li key={f}>+ {f}</li>)}
              </ul>
              <div className="col-span-5 text-right md:col-span-3">
                <Label className={t.hl ? "text-[#0A0A0A]" : "text-[#777B78] group-hover:text-[#0A0A0A]"}>KES</Label>
                <div style={D} className="text-[11vw] font-black leading-[0.85] md:text-[4.5vw]">{t.price}</div>
                <Label className={t.hl ? "text-[#0A0A0A]" : "text-[#777B78] group-hover:text-[#0A0A0A]"}>{t.per}</Label>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 px-6 md:px-10">
        <Btn href="#contact">Join Kinetic</Btn>
      </div>
    </section>
  );
}


function KineticMembership() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Membership />
    </main>
  );
}

export default KineticMembership;