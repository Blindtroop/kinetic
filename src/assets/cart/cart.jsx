import { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

// ─── Checkout steps ────────────────────────────────────────────────────────────
// "cart"     → item list + totals
// "checkout" → phone number input
// "pending"  → waiting for STK push confirmation
// "success"  → order placed
// "error"    → something went wrong

export default function CartModal({ isOpen, onClose, items, onRemove, onUpdateQty }) {
  const [step, setStep] = useState("cart");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Reset to cart view whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("cart");
      setPhone("");
      setPhoneError("");
      setErrorMsg("");
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  // ── Phone validation ───────────────────────────────────────────────────────
  function validatePhone(raw) {
    const digits = raw.replace(/\D/g, "");
    // Accept 07XXXXXXXX or 2547XXXXXXXX
    if (/^07\d{8}$/.test(digits)) return "254" + digits.slice(1);
    if (/^2547\d{8}$/.test(digits)) return digits;
    return null;
  }

  // ── STK Push ──────────────────────────────────────────────────────────────
  async function handlePay() {
    const formatted = validatePhone(phone);
    if (!formatted) {
      setPhoneError("Enter a valid Safaricom number — 07XXXXXXXX");
      return;
    }
    setPhoneError("");
    setIsLoading(true);
    setStep("pending");

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formatted,
          amount: total,
          items: items.map((i) => ({
            name: i.name,
            size: i.size,
            qty: i.qty,
            price: i.price,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.ResponseCode === "0") {
        setStep("success");
      } else {
        setErrorMsg(data.errorMessage || "Payment request failed. Try again.");
        setStep("error");
      }
    } catch {
      setErrorMsg("Could not reach the payment server. Check your connection.");
      setStep("error");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Panel ── */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#111] border-l border-[#2a2a2a] flex flex-col"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a] shrink-0">
          <div>
            <p className="text-[11px] text-[#555] uppercase tracking-widest">
              {step === "cart" ? "Your bag" : step === "checkout" ? "Checkout" : step === "pending" ? "Processing" : step === "success" ? "Order placed" : "Payment failed"}
            </p>
            {step === "cart" && (
              <p className="text-[13px] font-semibold text-[#f0f0f0]">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] hover:text-[#f0f0f0] hover:border-[#444] flex items-center justify-center transition-colors"
            aria-label="Close bag"
          >
            <FaXmark size={13} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto">

          {/* CART STEP */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-8">
                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-2xl">
                    👟
                  </div>
                  <p className="text-[14px] font-semibold text-[#f0f0f0]">Your bag is empty</p>
                  <p className="text-[12px] text-[#555]">Add a pair to get started</p>
                  <button
                    onClick={onClose}
                    className="mt-2 text-[12px] font-semibold text-[#89E900] border border-[#89E900]/40 px-5 py-2 rounded-full hover:bg-[#89E900]/10 transition-colors"
                  >
                    Browse styles
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#1e1e1e]">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.size}`}
                      item={item}
                      onRemove={onRemove}
                      onUpdateQty={onUpdateQty}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* CHECKOUT STEP */}
          {step === "checkout" && (
            <div className="px-5 py-6 flex flex-col gap-5">
              {/* Order summary */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <p className="text-[11px] text-[#555] uppercase tracking-widest mb-3">Order summary</p>
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-[12px]">
                      <span className="text-[#999]">
                        {item.name}
                        <span className="text-[#555] ml-1">· Size {item.size} · ×{item.qty}</span>
                      </span>
                      <span className="text-[#f0f0f0] font-medium">
                        KES {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#2a2a2a] mt-3 pt-3 flex justify-between">
                  <span className="text-[12px] text-[#555]">Total</span>
                  <span className="text-[14px] font-bold text-[#89E900]">KES {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Phone input */}
              <div>
                <label className="block text-[11px] text-[#555] uppercase tracking-widest mb-2">
                  M-Pesa number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="07XXXXXXXX"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-[14px] text-[#f0f0f0] placeholder-[#444] focus:outline-none focus:border-[#89E900] transition-colors"
                />
                {phoneError && (
                  <p className="text-[11px] text-amber-400 mt-1.5">{phoneError}</p>
                )}
                <p className="text-[11px] text-[#444] mt-1.5">
                  You'll get a push notification to confirm the payment.
                </p>
              </div>
            </div>
          )}

          {/* PENDING STEP */}
          {step === "pending" && (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#89E900] border-t-transparent animate-spin" />
              <p className="text-[14px] font-semibold text-[#f0f0f0]">Check your phone</p>
              <p className="text-[12px] text-[#555] leading-relaxed">
                An M-Pesa prompt has been sent to <span className="text-[#999]">{phone}</span>. Enter your PIN to complete the payment.
              </p>
            </div>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#89E900]/10 border border-[#89E900]/30 flex items-center justify-center text-2xl">
                ✓
              </div>
              <p className="text-[14px] font-semibold text-[#f0f0f0]">Payment confirmed</p>
              <p className="text-[12px] text-[#555] leading-relaxed">
                Your order is placed. You'll receive an M-Pesa confirmation SMS shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-[12px] font-semibold bg-[#89E900] text-[#111] px-6 py-2.5 rounded-full hover:bg-[#a5ff1a] active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          )}

          {/* ERROR STEP */}
          {step === "error" && (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#2a1a1a] border border-[#3a2a2a] flex items-center justify-center text-2xl">
                ✕
              </div>
              <p className="text-[14px] font-semibold text-[#f0f0f0]">Payment failed</p>
              <p className="text-[12px] text-[#555] leading-relaxed">{errorMsg}</p>
              <button
                onClick={() => setStep("checkout")}
                className="mt-2 text-[12px] font-semibold border border-[#89E900] text-[#89E900] px-6 py-2.5 rounded-full hover:bg-[#89E900]/10 active:scale-95 transition-all"
              >
                Try again
              </button>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        {(step === "cart" || step === "checkout") && items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#2a2a2a] shrink-0 flex flex-col gap-3">

            {step === "cart" && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[#555]">Total</span>
                  <span className="text-[16px] font-bold text-[#89E900]">
                    KES {total.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-[#89E900] text-[#111] py-3 rounded-xl text-[13px] font-bold hover:bg-[#a5ff1a] active:scale-[0.98] transition-all"
                >
                  Proceed to checkout
                </button>
              </>
            )}

            {step === "checkout" && (
              <>
                <button
                  onClick={handlePay}
                  disabled={isLoading}
                  className="w-full bg-[#89E900] text-[#111] py-3 rounded-xl text-[13px] font-bold hover:bg-[#a5ff1a] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pay KES {total.toLocaleString()} via M-Pesa
                </button>
                <button
                  onClick={() => setStep("cart")}
                  className="w-full text-[12px] text-[#555] hover:text-[#999] transition-colors py-1"
                >
                  ← Back to bag
                </button>
              </>
            )}

          </div>
        )}
      </div>
    </>
  );
}

// ─── Cart item row ─────────────────────────────────────────────────────────────
function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <div className="flex gap-3 px-5 py-4">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#222]" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#f0f0f0] truncate">{item.name}</p>
        <p className="text-[11px] text-[#555] mt-0.5">Size {item.size}</p>

        {/* Qty stepper */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}
            className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] hover:text-[#f0f0f0] hover:border-[#444] text-[12px] flex items-center justify-center transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-[12px] font-semibold text-[#f0f0f0] w-4 text-center">
            {item.qty}
          </span>
          <button
            onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}
            className="w-6 h-6 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[#666] hover:text-[#f0f0f0] hover:border-[#444] text-[12px] flex items-center justify-center transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <span className="text-[13px] font-bold text-[#89E900]">
          KES {(item.price * item.qty).toLocaleString()}
        </span>
        <button
          onClick={() => onRemove(item.id, item.size)}
          className="text-[11px] text-[#444] hover:text-[#e55] transition-colors"
          aria-label={`Remove ${item.name}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
