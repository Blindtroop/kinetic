import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";

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


const COACHES = [
  { id: "C/01", name: "Amara Odhiambo", role: "Strength / Olympic lifting", yrs: "11" },
  { id: "C/02", name: "Nick Mugera", role: "Conditioning / Endurance", yrs: "09" },
  { id: "C/03", name: "Lena teyeiyo", role: "Mobility / Rehab", yrs: "13" },
  { id: "C/04", name: "samuel wafula", role: "Skill / Gymnastics", yrs: "07" },
  { id: "C/05", name: "Ashley Wairimu", role: "Sprint / Plyometrics", yrs: "08" },
];


function Coaches() {
  return (
    <section id="coaches" className="bg-[#0A0A0A] pb-24 pt-28 md:pb-40 md:pt-44">
      <div className="px-6 md:px-10">
        <SectionHead n={4} label="Coaches" />
        <div className="mb-16 mt-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <Reveal from="left">
            <h2 style={D} className="font-black uppercase leading-[0.82] text-[#E8E6DE] text-[18vw] md:text-[9vw]">
              Meet <br/> Our coaches.
            </h2>
          </Reveal>
          <Reveal from="right">
          </Reveal>
        </div>
      </div>

      <div>
        {COACHES.map((c, i) => (
          <Reveal key={c.id} from={i % 2 ? "right" : "left"} delay={i * 0.04}>
            <div className={`group border-t border-[#E8E6DE]/20 transition-colors duration-100 hover:bg-[#B7FF00] hover:text-[#0A0A0A] ${i === COACHES.length - 1 ? "border-b" : ""}`}>
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 px-6 py-6 transition-[padding] duration-100 md:px-10 md:py-8 md:group-hover:pl-16">
                <Label className="col-span-2 text-[#777B78] group-hover:text-[#0A0A0A] md:col-span-1">{c.id}</Label>
                <span style={D} className="col-span-10 text-[13vw] font-black uppercase leading-[0.85] md:col-span-6 md:text-[6.5vw]">{c.name}</span>
                <Label className="col-span-8 col-start-3 text-[#777B78] group-hover:text-[#0A0A0A] md:col-span-3 md:col-start-auto">{c.role}</Label>
                <Label className="col-span-2 text-right text-[#E8E6DE] group-hover:text-[#0A0A0A] md:col-span-2">{c.yrs} yrs</Label>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


function KineticCoaches() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Coaches />
    </main>
  );
}

export default KineticCoaches;