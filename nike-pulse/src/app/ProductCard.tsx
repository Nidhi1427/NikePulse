'use client';
import { addToCart } from '@/lib/cart';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="group bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:bg-gray-800/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500/50">
      <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video bg-gradient-to-br from-gray-800/50 to-transparent">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      <h3 className="text-2xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">
        {product.name}
      </h3>
      <p className="text-3xl font-black bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent mb-8">
        ₹{product.price.toLocaleString()}
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full px-8 py-4 rounded-2xl font-black text-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
            isAdding
              ? 'bg-emerald-600/80 cursor-not-allowed scale-95 animate-pulse'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/50 hover:scale-[1.02]'
          }`}
        >
          {isAdding ? 'Adding...' : '🛒 Add to Cart'}
        </button>
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-2xl font-black text-xl shadow-xl hover:shadow-red-500/50 hover:scale-[1.02] transition-all duration-300">
          🔔 Notify Me
        </button>
      </div>
    </div>
  );
}
