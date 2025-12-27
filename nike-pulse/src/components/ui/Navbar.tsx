'use client';
import { useState, useEffect } from 'react';
import { getCartCount } from "@/lib/cart";
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCount(getCartCount());
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-lg font-black text-black drop-shadow-sm">NP</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent hidden sm:inline">
              Nike<span className="text-red-400">Pulse</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#shop" className="text-white hover:text-red-400 font-medium transition-all duration-300 hover:scale-105">Products</a>
            <a href="#about" className="text-white hover:text-red-400 font-medium transition-all duration-300 hover:scale-105">About</a>
            <a href="#contact" className="text-white hover:text-red-400 font-medium transition-all duration-300 hover:scale-105">Contact</a>
          </div>

          {/* Cart with Badge */}
          <Link href="/cart" className="relative group">
            <div className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-2 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105">
              Cart
            </div>
            {isClient && count > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-red-500 animate-pulse z-10">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
