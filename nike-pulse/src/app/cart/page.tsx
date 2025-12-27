'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import {
  getCartItems,
  getCartTotal,
  updateCartQuantity,
  removeFromCart,
  type CartItem,
} from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loaded = getCartItems();
    setItems(loaded);
    setTotal(getCartTotal());
  }, []);

  const refreshCart = () => {
    setItems(getCartItems());
    setTotal(getCartTotal());
  };

  const handleQtyChange = (id: string, qty: number) => {
    updateCartQuantity(id, qty);
    refreshCart();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    refreshCart();
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white pt-24 flex items-center justify-center">
          <p className="text-2xl text-gray-300">Your cart is empty.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white pt-24">
        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-8 bg-gray-900/60 rounded-3xl border border-gray-700/60"
              >
                {/* IMAGE FROM CART ITEM */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover bg-gray-800"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-xl font-semibold text-red-400">
                      {item.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-gray-800 rounded-xl">
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-xl"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQtyChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-xl"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="bg-gray-900/60 rounded-3xl border border-gray-700/60 p-8 h-fit">
            <h2 className="text-2xl font-black mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal ({items.length} items)</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
              <div className="flex justify-between text-lg text-gray-400">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-2xl font-black mb-6">
              <span>Total</span>
              <span>
                {total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-red-500/40 transition-all duration-300 mb-4">
              Proceed to Checkout →
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}
