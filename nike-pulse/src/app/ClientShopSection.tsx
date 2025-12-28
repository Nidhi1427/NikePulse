'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import ProductCard from './ProductCard';
import CartModal from '@/components/CartModal';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

interface ClientShopSectionProps {
  initialProducts: Product[];
  id?: string; 
}

function ShopSectionContent({ initialProducts, id = "shop" }: ClientShopSectionProps) {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const { cart, cartCount } = useCart();
  const [toastMessage, setToastMessage] = useState('');  // ← TOAST STATE

  const toggleCartModal = () => setCartModalOpen(!cartModalOpen);

  // ← TOAST FUNCTION
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <>
      <section id={id} className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured Products
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our curated selection of high-quality products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {initialProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => showToast(`${product.name} added to cart!`)}  // ← PASS TOAST
              />
            ))}
          </div>

          {initialProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-xl text-gray-500">No products available</p>
            </div>
          )}
        </div>
      </section>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] animate-pulse border-2 border-green-400 transform translate-y-0 transition-all duration-300 max-w-sm">
          <span className="font-bold text-lg flex items-center">
            ✅ {toastMessage}
          </span>
        </div>
      )}

      <button
        onClick={toggleCartModal}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-black font-black rounded-full shadow-2xl flex items-center justify-center text-xl z-50 transition-all duration-200 hover:scale-110 drop-shadow-2xl"
        aria-label="View cart"
      >
        🛒 <span className="text-black font-black text-lg ml-1 drop-shadow-md">{cartCount}</span>
      </button>

      <CartModal isOpen={cartModalOpen} onClose={toggleCartModal} />
    </>
  );
}

export default function ClientShopSection({ initialProducts, id }: ClientShopSectionProps) {
  return <ShopSectionContent initialProducts={initialProducts} id={id} />;
}
