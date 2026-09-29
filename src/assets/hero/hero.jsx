import { motion } from "motion/react";


export default function Hero() {
   const handleClick = () => {
    document.getElementById("arrivals")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="px-6 py-16 md:py-8 bg-[#222222] min-h-screen md:min-h-0 md:h-[85vh] flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-2 w-full max-w-6xl mx-auto">

        {/* Text */}
        <div className="flex flex-col items-start text-left max-w-xl w-full">
          <h1 className="text-2xl font-medium mb-2">
            <span className="text-[#89E900] font-sans text-4xl md:text-5xl">
              Wear it,
            </span>
            <br />
            <span className="text-white font-sans text-4xl md:text-5xl">
              your way.
            </span>
          </h1>

          <p className="font-medium mb-6 text-white/80 leading-relaxed text-sm md:text-base max-w-sm md:max-w-none sm:justify-center">
            Discover footwear designed for every part of your day — from
            fast-paced mornings to laid-back evenings. Clean silhouettes,
            premium comfort, and timeless style come together to help you move
            confidently in every step.
          </p>

          <button 
          onClick={handleClick}
          className="bg-[#89E900] text-[#222222] px-6 py-2.5 rounded-2xl font-medium text-sm hover:scale-105 transition">
            Start your journey here
          </button>
        </div>

        {/* Image + shape */}
        <div className="relative flex items-center justify-center py-6 w-full md:w-auto">
          {/* Skew shape */}
          <div className="absolute w-40 h-52 md:w-80 md:h-96 bg-[#89E900] opacity-80 -skew-y-12 rotate-12 shadow-2xl" />

          {/* Shoe image */}
          <div className="relative z-10 flex items-end justify-center py-6">
            <motion.img
              src="https://i.postimg.cc/3xG4CNCF/erasebg-transformed.png"
              alt="product"
              className="sm:w-150 sm:h-150 md:w-690 md:h-690 object-contain relative z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}