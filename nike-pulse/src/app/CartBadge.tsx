'use client';
import { useState, useEffect } from 'react';
import { getCartCount } from "@/lib/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCount(getCartCount());
  }, []);

  if (!isClient || count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center text-white font-bold animate-pulse shadow-lg shadow-red-500/50">
      {count}
    </span>
  );
}
