'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
          Nike<span className="text-red-400">Pulse</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#shop" className="text-lg font-semibold text-gray-300 hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="#about" className="text-lg font-semibold text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="#wishlist" className="text-lg font-semibold text-gray-300 hover:text-white transition-colors">
            Wishlist
          </Link>
          <Link href="#contact" className="text-lg font-semibold text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
        


          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 mt-2 py-4">
          <Link href="#shop" className="block py-2 px-4 text-lg font-semibold hover:bg-white/5 rounded-lg mx-2">Shop</Link>
          <Link href="#about" className="block py-2 px-4 text-lg font-semibold hover:bg-white/5 rounded-lg mx-2">About</Link>
          <Link href="#wishlist" className="block py-2 px-4 text-lg font-semibold hover:bg-white/5 rounded-lg mx-2">Wishlist</Link>
          <Link href="#contact" className="block py-2 px-4 text-lg font-semibold hover:bg-white/5 rounded-lg mx-2">Contact</Link>
        </div>
      )}
    </nav>
  );
}
