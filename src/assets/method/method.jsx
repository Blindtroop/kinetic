import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

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


const STEPS = [
  { w: "Push.", t: "Pattern before load. Every session begins with controlled range and clean mechanics, building a stronger movement pattern before intensity takes over.", dir: -1 },
  { w: "Build.", t: "Progressive overload, written down. Record the work, measure the increase, and build from what came before. If it is not logged, it did not happen", dir: 1 },
  { w: "Adapt.", t: "Coaches adjust volume and intensity weekly based on performance, recovery, and workload, keeping the program responsive to what your body and numbers are telling us.", dir: -1 },
  { w: "Repeat.", t: "Discipline is a schedule. Follow the program whether motivation is high or low. Consistency turns repeated work into measurable progress.", dir: 1 },
];

const STATS = [
  [24, "Athletes max per session"],
  [5, "Coaches on ground"],
  [7, "Days open"],
  [100, "% Tailored Training"],
];


function MethodRow({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], s.dir < 0 ? ["0vw", "-62vw"] : ["-62vw", "0vw"]);
  return (
    <div ref={ref} className="relative overflow-hidden border-t border-[#0A0A0A]">
      <motion.div style={{ ...D, x }} className="flex w-max gap-[3vw] whitespace-nowrap py-[1.5vw] font-black uppercase leading-[0.8] text-[27vw] md:text-[19vw]">
        {[0, 1, 2, 3].map((k) => (
          <span key={k} style={k % 2 ? outline(INK, 2) : { color: INK }}>{s.w}</span>
        ))}
      </motion.div>
      <span
  style={M}
  className="absolute left-6 top-4 z-10 flex h-70 w-50 items-center justify-center bg-[#0A0A0A] px-2 py-1 text-center text-[26px] uppercase tracking-[0.2em] text-[#B7FF00] md:left-10"
>
  Step 0{i + 1}
</span>
      <p
  style={B}
  className="absolute w-120 h-30 left-1/2 top-1/2 z-10  -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A] p-3 text-center flex items-center justify-center text-[16px] font-extrabold leading-snug text-[#B7FF00]"
>
  {s.t}
</p>
    </div>
  );
}

function Method() {
  return (
    <section id="method" className="overflow-hidden bg-[#E8E6DE] text-[#0A0A0A] md:pt-24">
      <div className="px-6 md:px-10">
        <SectionHead n={3} label="The KINETIC Method" dark />
        <Reveal from="left" className="mb-20 mt-16 md:mb-28">
          <h2 style={D} className="font-black uppercase leading-[0.82] text-[18vw] md:text-[9vw]">
          <span className="">No shortcuts.</span>
          </h2>
        </Reveal>
      </div>

      {STEPS.map((s, i) => <MethodRow key={s.w} s={s} i={i} />)}

      <div className="grid grid-cols-2 border-t border-[#0A0A0A] md:grid-cols-4">
        {STATS.map(([n, label], i) => (
          <div key={label} className={`border-[#0A0A0A] px-6 py-8 md:px-10 md:py-12 ${i < 3 ? "md:border-r" : ""} ${i % 2 === 0 ? "border-r md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
            <div style={D} className="font-black leading-[0.8] text-[22vw] md:text-[8vw]">
              <Count to={n} pad={n === 100 ? 3 : 2} />
            </div>
            <Label className="mt-4 block">{label}</Label>
          </div>
        ))}
      </div>
    </section>
  );
}


function KineticMethod() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <Method />
    </main>
  );
}

export default KineticMethod;