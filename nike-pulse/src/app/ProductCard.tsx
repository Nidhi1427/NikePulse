'use client';
import Image from "next/image";
import { useCart } from '@/context/CartContext'; // Fixed path (plural 'contexts')

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Handle both external URLs and relative paths
  const imageSrc = product.image.startsWith('http') 
    ? product.image 
    : product.image.startsWith('/') 
      ? product.image 
      : `/${product.image}`;

  const handleAddToCart = () => {
    addToCart(product);
    onAddToCart?.(); // Trigger parent toast/feedback
  };

  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 relative z-10">
      <div className="relative overflow-hidden rounded-2xl mb-4 h-64">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          priority={false} // Avoid priority on grid items
        />
      </div>
      <h3 className="text-xl font-bold mb-3 line-clamp-2">{product.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-black text-red-400">
          ${product.price.toFixed(2)}
        </span>
        <button 
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 z-50 relative pointer-events-auto cursor-pointer min-w-[120px] flex items-center justify-center"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
