import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ image, title, description, price, onAdd }) {
  return (
    <div className="bg-white p-4 md:p-6 flex flex-col text-left gap-4 w-full h-full">
      {/* Image */}
      <div className="w-full h-48 md:h-72 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Title */}
      <h1 className="text-base md:text-xl font-semibold text-[#222222] line-clamp-2">{title}</h1>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3">{description}</p>

      {/* Price */}
      <h1 className="text-base md:text-xl font-semibold text-[#222222]">{price}</h1>

      {/* Button */}
      <button
        onClick={onAdd}
        className="mt-auto bg-[#89E900] text-[#222] px-3 py-2.5 md:py-3 w-full rounded-2xl flex items-center justify-center gap-2 font-medium hover:scale-105 active:scale-95 transition shadow-md hover:shadow-lg text-sm md:text-base"
      >
        Add to Cart
        <FaShoppingCart className="text-[#222] text-lg" />
      </button>
    </div>
  );
}