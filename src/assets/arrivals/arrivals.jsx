import { useState, useEffect } from "react";
import ProductCard from "../card/card";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Arrivals({ onAddToBag }) {
  const products = [
    {
      image: "https://i.postimg.cc/1znDS08W/Adobe-Express-file-(1).png",
      title: "adidas Samba OG 'White/Black",
      description:
        "An absolute icon of street culture, this classic silhouette pairs a crisp white leather upper with a signature grey suede T-toe and a timeless gum rubber outsole. Its low-profile design and contrasting black three-stripes deliver an effortless, retro-inspired look that outlasts any trend",
      price: "Ksh 34,000",
      priceNumber: 34000,

    },
    {
      image: "https://i.postimg.cc/WzNMBhQv/Untitled.png",
      title: "adidas NMD_R1 'Core Black/Solar Orange",
      description:
        "Blending heritage running style with a sleek tech aesthetic, this silhouette features a breathable knit upper paired with an energy-returning BOOST midsole for ultimate all-day comfort.",
      price: "Ksh 34,000",
      priceNumber: 34000,
    },
    {
      image: "https://i.postimg.cc/4427fLcb/Untitled-(1).png",
      title: "Air Jordan 1 Mid 'Quilted Maroon",
      description:
        "Steeped in hardwood heritage, this elevated mid-top silhouette combines deep maroon overlays with unique, quilted red textile underlays for a rich texture contrast.",
      price: "Ksh 34,000",
      priceNumber: 34000,
    },
    {
      image: "https://i.postimg.cc/KctGV0Nb/Untitled-(2).png",
      title: "Nike Dunk Low 'Arizona State",
      description:
        "Channeling retro college hoops energy, this iconic low-top pairs a rich maroon leather base with vibrant gold overlays for a striking, high-contrast look.",
      price: "Ksh 34,000",
      priceNumber: 34000,
    },
    {
      image: "https://i.postimg.cc/4x6pxvZb/Untitled-(3).png",
      title: "Nike Court Vision Low 'White/Pink-Light Blue'",
      description:
        "Bringing a fresh, pastel energy to a classic hoops silhouette, this low-top features a crisp white upper accented by soft pink overlays and a light blue heel counter.",
      price: "Ksh 34,000",
      priceNumber: 34000,
    },
    {
      image: "https://i.postimg.cc/VkJL7mZR/Untitled-(4).png",
      title: "Crocs Classic Clog 'Black'",
      description:
        "The ultimate icon of irreverent comfort, this lightweight clog features a water-friendly, molded design with signature ventilation ports for maximum breathability.",
      price: "Ksh 34,000",
      priceNumber: 34000,
    },
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = isMobile ? 1 : 2;
  const cardWidth = 100 / visibleCards;

  const next = () => {
    if (index < products.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section id='arrivals' className="w-full flex flex-col items-center py-16 px-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-10 font-sans text-center">
        OUR BEST SELLERS
      </h1>

      <div className="relative w-full max-w-6xl overflow-hidden">
        {/* LEFT BUTTON */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 md:p-3 rounded-full disabled:opacity-30"
        >
          <FaArrowLeft />
        </button>

        {/* TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * cardWidth}%)`,
          }}
        >
          {products.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-4"
              style={{ width: `${cardWidth}%` }}
            >
              <ProductCard
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                onAdd={() =>
                  onAddToBag?.(
                    {
                      id: `arrivals-${i}`,
                      name: item.title,
                      price: item.priceNumber,
                      images: [item.image],
                    },
                    "One Size",
                  )
                }
              />
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={next}
          disabled={index >= products.length - visibleCards}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-2 md:p-3 rounded-full disabled:opacity-30"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
