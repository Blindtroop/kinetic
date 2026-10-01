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


const PROGRAMS = [
  {
    code: "P/01",
    name: "Build",
    weeks: 8,
    sessions: "3",
    load: "Moderate",
    from: "left",
    mt: "md:mt-0",
    body: "Learn the patterns. Squat, hinge, push, pull, carry. Technique before load."
  },
  {
    code: "P/02",
    name: "Condition",
    weeks: 12,
    sessions: "4",
    load: "High",
    from: "up",
    mt: "md:mt-28",
    body: "Build your engine through intervals, carries, sleds and repeatable work."
  },
  {
    code: "P/03",
    name: "Perform",
    weeks: 16,
    sessions: "5",
    load: "Maximal",
    from: "right",
    mt: "md:mt-56",
    body: "Progressive strength and power for people ready to push their limits."
  },
];


function Programs() {
  return (
    <section id="programs" className="bg-[#181818] px-6 pb-32 pt-28 md:px-10 md:pb-72 md:pt-44">
      <SectionHead n={2} label="Programs" />
      <div className="mt-16 md:flex md:justify-end">
        <Reveal from="right">
          <h2 style={D} className="font-black uppercase leading-[0.42] text-[#E8E6DE] text-[18vw] md:text-right md:text-[8.5vw]">
           <span className="block">
            Load Up.
            </span> <br />
            <span className="text-[#B7FF00] block md:mr-[8vw]">
              Lock In.
              </span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-y-20 md:mt-24 md:grid-cols-3 md:items-start">
        {PROGRAMS.map((p, i) => (
          <Reveal key={p.code} from={p.from} delay={i * 0.08} className={p.mt}>
            <article className="border-l border-[#E8E6DE]/20 pl-6 pr-4">
              <Rule delay={0.1} />
              <div className="mt-4 flex justify-between ">
                <Label className="text-[#B7FF00]">{p.code}</Label>
                <Label className="text-[#777B78]">{p.load} load</Label>
              </div>
              <h3 style={D} className="mt-10 font-black uppercase leading-[0.85] text-[#E8E6DE] text-[17vw] md:text-[5vw]">{p.name}</h3>
              <div className="mt-8 flex items-end gap-3  hover:scale-105 transition-transform duration-300">
                <span style={{ ...D, ...outline(BONE, 2) }} className="font-black leading-[0.75] text-[34vw] md:text-[11vw]">
                  <Count to={p.weeks} />
                </span>
                <Label className="mb-2 text-[#E8E6DE]">Weeks</Label>
              </div>
              <div style={M} className="mt-8 border-t border-[#E8E6DE]/20 text-[12px] uppercase tracking-[0.14em] ">
                <div className="flex justify-between border-b border-[#E8E6DE]/20 py-2"><span className="text-[#777B78]">Sessions / wk</span><span>{p.sessions}</span></div>
                <div className="flex justify-between border-b border-[#E8E6DE]/20 py-2"><span className="text-[#777B78]">Load</span><span>{p.load}</span></div>
              </div>
              <p style={B} className="mt-6 max-w-xs text-sm leading-relaxed text-[#E8E6DE]/75">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


function KineticPrograms() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Programs />
    </main>
  );
}

export default KineticPrograms;