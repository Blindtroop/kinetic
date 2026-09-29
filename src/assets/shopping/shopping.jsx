import { useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import shoes from "../../data/shoes.json";

// ─── Derived categories from JSON ─────────────────────────────────────────────
const CATEGORIES = ["All", ...new Set(shoes.map((s) => s.category))];

// ─── Stock helper ──────────────────────────────────────────────────────────────
function stockMeta(stock) {
  if (stock === "in") return { color: "bg-[#89E900]", label: "In stock" };
  if (stock === "low") return { color: "bg-amber-400", label: "Last few" };
  return { color: "bg-[#444]", label: "Sold out" };
}

// ─── Shoe Card ─────────────────────────────────────────────────────────────────
function ShoeCard({ shoe, onAdd }) {
  const allImages = shoe.images?.length
    ? shoe.images
    : shoe.imageUrl
    ? [shoe.imageUrl]
    : [];

  const [activeImage, setActiveImage] = useState(allImages[0] || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const thumbsRef = useRef(null);

  const { color, label } = stockMeta(shoe.stock);
  const isSoldOut = shoe.stock === "out";

  function handleAdd() {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1500);
      return;
    }
    onAdd(shoe, selectedSize);
    setSelectedSize("");
  }

  function handleSizePick(sz) {
    setSelectedSize((prev) => (prev === sz ? "" : sz));
    setSizeError(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#89E900] hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* ── Image area ── */}
      <div className="bg-[#222] p-2 sm:p-3 relative">
        <div className="h-36 sm:h-44 flex items-center justify-center overflow-hidden">
          {activeImage ? (
            <img
              key={activeImage}
              src={activeImage}
              alt={shoe.name}
              className="w-full h-full object-contain animate-fadeIn hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-8 bg-[#333] rounded-md" />
              <div className="w-10 h-3 bg-[#2a2a2a] rounded-sm" />
            </div>
          )}
        </div>

        {/* Badges */}
        {shoe.isNew && !isSoldOut && (
          <span className="absolute top-2 left-2 bg-[#89E900] text-[#111] text-[10px] font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {isSoldOut && (
          <span className="absolute top-2 left-2 bg-[#2a2a2a] text-[#666] text-[10px] font-bold px-2 py-1 rounded">
            SOLD OUT
          </span>
        )}
      </div>

      {/* ── Card info ── */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1">

        {/* Thumbnail strip — above title, only when multiple images */}
        {allImages.length > 1 && (
          <div
            ref={thumbsRef}
            className="flex gap-1.5 overflow-x-auto scroll-smooth mb-2.5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200
                  ${activeImage === img
                    ? "border-[#89E900] scale-105 brightness-110"
                    : "border-transparent hover:border-[#444]"
                  }`}
                aria-label={`View image ${i + 1}`}
              >
                <img
                  src={img}
                  alt={`${shoe.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Name + sub */}
        <p className="text-[15px] font-semibold text-[#f0f0f0] leading-tight">
          {shoe.name}
        </p>
        <p className="text-[11px] text-[#666] mt-0.5 mb-2.5">{shoe.sub}</p>

        {/* Stock indicator */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
          <span className="text-[11px] text-[#666]">{label}</span>
        </div>

        {/* Size picker */}
        <div className="flex flex-wrap gap-1 mb-3">
          {shoe.sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => handleSizePick(sz)}
              disabled={isSoldOut}
              className={`text-[10px] px-2 py-1 rounded border transition-all duration-150 font-medium
                ${selectedSize === sz
                  ? "border-[#89E900] text-[#89E900] bg-[#89E900]/10"
                  : "border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#ccc]"
                }
                disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Price + add button */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-[13px] sm:text-[15px] font-bold text-[#89E900]">
            KES {shoe.price.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            disabled={isSoldOut}
            className="shrink-0 bg-[#89E900] text-[#111] w-8 h-8 rounded-lg text-xl font-bold flex items-center justify-center hover:bg-[#a5ff1a] active:scale-95 transition-all disabled:bg-[#2a2a2a] disabled:text-[#555] disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Size hint / error */}
        <p className={`text-[10px] mt-1.5 h-3 transition-colors ${sizeError ? "text-amber-400" : "text-[#555]"}`}>
          {isSoldOut
            ? ""
            : sizeError
            ? "Pick a size first"
            : selectedSize
            ? `Size ${selectedSize} selected`
            : "Select a size"}
        </p>

      </div>
    </div>
  );
}

// ─── Shopping Page ─────────────────────────────────────────────────────────────
export default function Shopping({ bagCount = 0, onAddToBag, onOpenCart }) {
  const { gender } = useParams();
  const [searchParams] = useSearchParams();

  const [activeGender, setActiveGender] = useState(gender || "all");
  const [activeFilter, setActiveFilter] = useState(
    searchParams.get("category") || "All"
  );
  const [toast, setToast] = useState(null);

  const filtered = shoes
    .filter((s) =>
      activeGender === "all"
        ? true
        : s.gender === activeGender || s.gender === "unisex"
    )
    .filter((s) =>
      activeFilter === "All" ? true : s.category === activeFilter
    );

  function handleAdd(shoe, size) {
    onAddToBag?.(shoe, size);
    setToast(`${shoe.name} — Size ${size} added`);
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <div
      className="min-h-screen bg-[#111] text-[#f0f0f0]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-40 bg-[#111] border-b border-[#2a2a2a] px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-[#555] uppercase tracking-widest">Shop</p>
          <p className="text-[13px] font-semibold text-[#f0f0f0]">
            {filtered.length} style{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 sm:gap-2.5 border border-[#89E900] text-[#89E900] px-4 sm:px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-[#89E900]/10 transition-colors"
        >
          <FaBagShopping size={14} />
          Your Bag
          <span
            className={`bg-[#89E900] text-[#111] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-transform ${
              bagCount > 0 ? "scale-110" : ""
            }`}
          >
            {bagCount}
          </span>
        </button>
      </div>

      {/* ── Toast ── */}
      <div
        className={`fixed top-20 right-4 sm:right-6 max-w-[calc(100vw-2rem)] z-50 bg-[#1a2200] border border-[#89E900] text-[#89E900] text-[12px] font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 ${
          toast
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {toast}
      </div>

      {/* ── Filters ── */}
      <div className="px-4 sm:px-6 md:px-10 pt-6 pb-6 flex flex-col gap-4">

        {/* Gender */}
        <div>
          <p className="text-[11px] text-[#555] uppercase tracking-widest mb-2">
            Gender
          </p>
          <div className="flex gap-2">
            {["all", "mens", "womens"].map((g) => (
              <button
                key={g}
                onClick={() => setActiveGender(g)}
                className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-150 capitalize
                  ${activeGender === g
                    ? "bg-[#89E900] text-[#111] border-[#89E900]"
                    : "border-[#2a2a2a] text-[#666] hover:border-[#89E900] hover:text-[#89E900]"
                  }`}
              >
                {g === "all" ? "All" : g}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <p className="text-[11px] text-[#555] uppercase tracking-widest mb-2">
            Category
          </p>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-150
                  ${activeFilter === cat
                    ? "bg-[#89E900] text-[#111] border-[#89E900]"
                    : "border-[#2a2a2a] text-[#666] hover:border-[#89E900] hover:text-[#89E900]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ── Product grid ── */}
      <div className="px-4 sm:px-6 md:px-10 pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p className="text-[15px] font-semibold text-[#f0f0f0]">No styles found</p>
            <p className="text-[12px] text-[#555]">Try a different gender or category filter</p>
            <button
              onClick={() => { setActiveGender("all"); setActiveFilter("All"); }}
              className="mt-2 text-[12px] font-semibold text-[#89E900] border border-[#89E900]/40 px-5 py-2 rounded-full hover:bg-[#89E900]/10 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}