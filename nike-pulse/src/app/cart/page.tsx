'use client';
import { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateCartQuantity, type CartItem } from "@/lib/cart";
import Link from 'next/link';
import Navbar from "@/components/ui/Navbar";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCartItems(getCartItems());
    setLoading(false);
  }, []);

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateCartQuantity(id, newQuantity);
    setCartItems(getCartItems());
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {cartItems.length === 0 ? 'Nothing here yet. Start shopping!' : `${cartItems.length} items`}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800/50 rounded-2xl p-6 h-48" />
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13l-1.5 4.5M17 13l1.5 4.5M17 13l4-8M16 16a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <Link href="/#shop" className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-12 py-6 rounded-3xl text-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/25">
                Start Shopping →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="flex gap-6 p-6 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl hover:bg-gray-800/50 transition-all duration-300">
                      <div className="relative w-24 h-24 rounded-2xl shadow-xl bg-gray-800 flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-500 text-xs font-bold bg-gray-700">
                          🖼️
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-2 truncate">{item.name}</h3>
                        <p className="text-2xl font-black text-red-400 mb-6">₹{item.price.toLocaleString()}</p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                          <div className="flex items-center bg-gray-800 px-4 py-2 rounded-xl flex-shrink-0">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 font-bold text-lg min-w-[2.5rem] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => {
                              removeFromCart(item.id);
                              setCartItems(getCartItems());
                            }}
                            className="bg-red-500/90 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 flex-shrink-0 whitespace-nowrap shadow-lg hover:shadow-xl hover:shadow-red-500/25 w-full sm:w-auto"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:sticky lg:top-24 space-y-6">
                  <div className="bg-gradient-to-b from-gray-900/50 to-black/70 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8">
                    <h3 className="text-2xl font-black text-white mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-lg">
                        <span>Subtotal ({cartItems.length} items):</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg text-gray-400">
                        <span>Shipping:</span>
                        <span>FREE</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6">
                      <div className="flex justify-between text-3xl font-black text-white mb-6">
                        <span>Total:</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/25">
                        Proceed to Checkout →
                      </button>
                    </div>
                  </div>
                  
                  <Link 
                    href="/#shop" 
                    className="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 hover:scale-105"
                  >
                    Continue Shopping →
                  </Link>
                </div>
              </div>
            </>
            
          )}
        </div>
      </main>
    </>
  );
}
