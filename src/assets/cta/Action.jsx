import { motion } from "motion/react";
import {
  FaBriefcase,
  FaFolderOpen,
  FaSmile,
  FaStar,
} from "react-icons/fa";

const stats = [
  {
    value: "Free Delivery",
    label: "Orders over Ksh 3,000.",
    icon: FaBriefcase,
  },
  {
    value: "Easy returns",
    label: "30-day hassle-free returns",
    icon: FaFolderOpen,
  },
  {
    value: "Premium Quality",
    label: "Made For Nairobi Streets",
    icon: FaSmile,
  },
  {
    value: "2 Year Warranty",
    label: "Sole & Stitching Covered",
    icon: FaStar,
  },
];

export default function Action() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="relative bg-[#222222] z-10 p-4 border-t border-b border-black/50 w-full"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 rounded sm:px-10 grid grid-cols-2 sm:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className={[
                "flex flex-col items-center py-5 border-[#89E900] text-white/50",
                i === 0 ? "border-r" : "",
                i === 1 ? "border-r-0 sm:border-r" : "",
                i === 2 ? "border-r" : "",
              ]
                .join(" ")
                .trim()}
            >
              <div className="mb-3 p-3 rounded-full bg-[#89E900]/10">
                <Icon className="text-[#89E900] text-xl" />
              </div>

              <span className="text-[20px] font-bold text-[#89E900] leading-none mb-1">
                {s.value}
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 text-center">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}