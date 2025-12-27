'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { getCartCount } from "@/lib/cart";

export default function CartIcon() {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCount(getCartCount());
    
    // Listen for cart changes
    const handleStorage = () => setCount(getCartCount());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!isClient) {
    return (
      <Link href="/cart" className="relative p-2 group">
        <div className="w-6 h-6 bg-gray-800 rounded-lg" />
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative p-2 group">
      <svg className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 3h10l-1-3m0 0v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-6z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
          {count}
        </span>
      )}
    </Link>
  );
}
