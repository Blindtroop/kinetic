import { Link } from "react-router-dom";


export default function CardCategory({ image, title, category, link}) {
  return (
    <Link to={link} className="block w-full"> 
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden group border border-neutral-100 shadow-sm ">
      
      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
      />

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-[#222222] px-6 py-4 flex items-center justify-between transition-all duration-300">
       <div className="flex flex-col gap-0.5">
    <span className="text-[12px] font-medium tracking-[0.2em] text-white/50 uppercase font-sans">
      {category}
    </span>
    <h2 className="text-sm font-bold text-white uppercase font-sans transition-transform duration-300 group-hover:-translate-y-[1px]">
      {title}
    </h2>
    </div>
        <span className="text-white text-lg font-light opacity-0 -translate-x-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          →
        </span>

      </div>
    </div>
    </Link>
  );
  }