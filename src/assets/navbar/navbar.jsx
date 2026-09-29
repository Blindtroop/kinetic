import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ bagCount = 0, onOpenCart }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop/mens", label: "Mens" },
    { to: "/shop/womens", label: "Women" },
    { to: "/shop", label: "Shop" },
  ];

  return (
    <>
      {/* ── Top bar — z-40 so drawer sits above it ── */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#222222]">
        <div className="relative flex justify-between items-center px-4 md:px-10 py-4">

          {/* Hamburger */}
          <button
            className="text-2xl cursor-pointer text-[#89E900] hover:opacity-70 transition-opacity"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          {/* Logo — centered, scaled down on mobile so it doesn't clash with buttons */}
          <NavLink to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1
              style={{ fontFamily: "Nevera" }}
              className="text-2xl md:text-4xl text-[#89E900] leading-none"
            >
              STRYDE
            </h1>
          </NavLink>

          {/* Bag button — icon only on mobile, full label on desktop */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 md:gap-3 bg-[#222222] border border-[#89E900] text-[#89E900] px-3 md:px-6 py-2 md:py-3 rounded-full transition-colors hover:bg-[#89E900]/10"
          >
            <FaBagShopping size={15} />
            <span className="hidden md:inline text-[13px] font-semibold">Your Bag</span>
            <span
              className={`bg-[#89E900] text-[#111] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-transform ${
                bagCount > 0 ? "scale-110" : ""
              }`}
            >
              {bagCount}
            </span>
          </button>

        </div>
      </nav>

      {/* ── Backdrop — z-50, above top bar ── */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Drawer — z-60, above backdrop ── */}
      <div
        className={`fixed top-0 left-0 z-60 h-full w-4/5 md:w-1/2 min-w-[260px] max-w-sm bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <h1 style={{ fontFamily: "Nevera" }} className="text-2xl text-[#89E900]">
            STRYDE
          </h1>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg bg-[#222] border border-[#2a2a2a] text-[#666] hover:text-[#f0f0f0] hover:border-[#444] flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-4 py-6 gap-1 flex-1">
          <p className="text-[10px] text-[#444] uppercase tracking-widest px-3 mb-2">
            Navigate
          </p>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#89E900]/10 text-[#89E900]"
                    : "text-[#888] hover:text-[#f0f0f0] hover:bg-[#222]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1 h-4 rounded-full transition-all ${
                      isActive ? "bg-[#89E900]" : "bg-transparent"
                    }`}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="px-4 py-5 border-t border-[#2a2a2a]">
          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2.5 w-full bg-[#89E900] text-[#111] py-3 rounded-xl text-[13px] font-bold hover:bg-[#a5ff1a] active:scale-[0.98] transition-all"
          >
            <FaBagShopping size={14} />
            Start Shopping
          </Link>
        </div>
      </div>
    </>
  );
}