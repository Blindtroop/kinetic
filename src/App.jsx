import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./assets/navbar/navbar";
import Hero from "./assets/hero/hero";
import Arrivals from "./assets/arrivals/arrivals";
import Flash from "./assets/flash/flash";
import Categories from "./assets/categories/categories";
import Action from "./assets/cta/Action";
import TrustedPartners from "./assets/partners/partners";
import Shopping from "./assets/shopping/shopping";
import CartModal from "./assets/cart/cart";
import ComingSoon from "./assets/404/404"
import Footer from "./assets/footer/footer";

import "./App.css";

function Home({ onAddToBag, onOpenCart, bagCount }) {
  return (
    <>
      {/* <ComingSoon /> */}
      <Navbar onOpenCart={onOpenCart} bagCount={bagCount} />
      <Hero />
      <Arrivals onAddToBag={onAddToBag} />
      <Flash onAddToBag={onAddToBag} onOpenCart={onOpenCart} />
      <Categories />
      <Action />
      <TrustedPartners />
      <Footer />
    </>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Add item
  function addToBag(shoe, size) {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === shoe.id && item.size === size,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === shoe.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: shoe.id,
          name: shoe.name,
          size,
          price: shoe.price,
          image: shoe.images?.[0] || shoe.imageUrl || "",
          qty: 1,
        },
      ];
    });
  }

  // Remove item
  function removeFromBag(id, size) {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  }

  // Update quantity
  function updateQty(id, size, qty) {
    if (qty < 1) {
      removeFromBag(id, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, qty } : item,
      ),
    );
  }

  const bagCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {/* <Navbar bagCount={bagCount} onOpenCart={() => setCartOpen(true)} /> */}

      <Routes>
        <Route
          path="/"
          element={
            <Home onAddToBag={addToBag} bagCount={bagCount} onOpenCart={() => setCartOpen(true)} />
          }
        />{" "}
        <Route
          path="/shop"
          element={
            <Shopping
              bagCount={bagCount}
              onAddToBag={addToBag}
              onOpenCart={() => setCartOpen(true)}
            />
          }
        />
        <Route
          path="/shop/:gender"
          element={
            <Shopping
              bagCount={bagCount}
              onAddToBag={addToBag}
              onOpenCart={() => setCartOpen(true)}
            />
          }
        />
      </Routes>

      <CartModal
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromBag}
        onUpdateQty={updateQty}
      />
    </>
  );
}
