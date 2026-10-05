import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
 
const D = { fontFamily: "'Big Shoulders Display', 'Arial Narrow', Impact, sans-serif" };
const M = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };
const B = { fontFamily: "'Inter Tight', system-ui, sans-serif" };
const EASE = [0.76, 0, 0.24, 1];
 
const LINKS = [
    ["Home", "#"],
  ["Instagram", "https://instagram.com"],
  ["X", "#"],
  ["FaceBook", "#"],
  ["Terms", "#"],
  ["Privacy", "#"],
];
 
function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10vw", "-1.5vw"]);
 
  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#0A0A0A] pt-10 md:">
      {/* lime rule draws in from the left */}
      <div className="px-6 md:px-10">
        <motion.div
          className="h-px w-full origin-left bg-[#B7FF00]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </div>
 
      {/* tagline, links, top */}
      <div
        style={M}
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 pt-6 text-[11px] uppercase tracking-[0.2em] md:px-10"
      >
        <span className="text-[#E8E6DE]">Move. Load. Adapt. Repeat.</span>
 
        <ul className="flex gap-6 text-[#777B78]">
          {LINKS.map(([label, href]) => (
            <li key={label}>
              <a href={href} className="transition-colors duration-100 hover:text-[#B7FF00]">
                {label}
              </a>
            </li>
          ))}
        </ul>
 
        <div className="flex items-center gap-6">
          <span className="text-[#777B78]">© Kinetic 2026</span>
          <a
            href="#top"
            className="border border-[#E8E6DE] px-3 py-2 text-[#E8E6DE] transition-colors duration-100 hover:bg-[#E8E6DE] hover:text-[#0A0A0A]"
          >
            ↑ Top
          </a>
        </div>
      </div>
 
      {/* oversized, cropped wordmark that slides in with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ ...D, x }}
        className="pointer-events-none -mb-[6.5vw] mt-6 select-none whitespace-nowrap text-[35vw] font-black uppercase leading-[0.78] text-[#4949472c]"
      >
        Kinetic
      </motion.div>
    </footer>
  );
}
 
function KineticFooter() {
  return (
    <main style={B} className="bg-[#0A0A0A] text-[#E8E6DE] antialiased selection:bg-[#B7FF00] selection:text-[#0A0A0A]">
      <div id="top" className="" />
      <Footer />
    </main>
  );
}
 
export default KineticFooter;
 
