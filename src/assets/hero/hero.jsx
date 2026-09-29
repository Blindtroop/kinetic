import { motion } from "motion/react";


export default function Hero() {
   const handleClick = () => {
    document.getElementById("arrivals")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="px-6 py-16 md:py-8 bg-[#EFEBE1] min-h-screen md:min-h-0 md:h-[70vh] flex items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-2 w-full max-w-6xl mx-auto">

        {/* Text */}
        <div className="flex flex-col items-start text-left max-w-xl w-full">
          <h1 style={{ fontFamily: "'Fraunces', serif" }} className="">
            <span className="text-[#16140F] text-7xl ">
             MOVE
            </span>
            <br />
            <span className="text-[#16140F] text-7xl ">
             WITH
            </span>
             <br />
              <span className="inline-block bg-[#C74724] text-transparent text-7xl font-bold px-1 [-webkit-text-stroke:1px_white]">
              INTENT
            </span>
          </h1>

          <p className="font-medium mt-8 text-[#16140F]/80 leading-relaxed text-sm md:text-base max-w-sm md:max-w-none sm:justify-center">
            Strength, conditioning and coaching 
            built around one goal — your next personal best.
          </p>


        </div>

        {/* Image + shape */}
        <div className="relative flex items-center justify-center py-6 w-full md:w-auto">

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