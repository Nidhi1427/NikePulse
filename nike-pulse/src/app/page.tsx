import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const products = [
    { id: "1", name: "Air Force 1", price: 12999, image: "/images/force1.jpg" },
    { id: "2", name: "Dunk Low", price: 11999, image: "/images/dunk.jpg" },
    { id: "3", name: "Jordan 1", price: 15999, image: "/images/air-max.jpg" },
    { id: "4", name: "Vaporfly", price: 21999, image: "/images/vapor.jpg" },
    { id: "5", name: "Metcon 9", price: 14999, image: "/images/metcon.jpg" },
    { id: "6", name: "Pegasus 41", price: 13999, image: "/images/pegasus.jpg" },
    { id: "7", name: "Pro Speed", price: 16999, image: "/images/pro-speed.jpg" },
    { id: "8", name: "React Run", price: 12999, image: "/images/react-run.jpg" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white overflow-x-hidden pt-20">
        {/* Hero */}
        <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-nike opacity-50" />
          <Image
            src="/nikepulselogo.png"
            alt="NikePulse"
            width={120}
            height={120}
            className="w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-2xl mb-8 md:mb-12 hover:scale-105 transition-transform"
            priority
          />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-center mb-6 md:mb-8 bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Nike<span className="text-red-400">Pulse</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 max-w-3xl text-center mb-8 md:mb-12 font-light leading-relaxed">
            Engineered for champions. Redefined for tomorrow.™
          </p>
          <Link
            href="#shop"
            scroll={false}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/25"
          >
            Shop Elite Gear →
          </Link>
        </section>

        {/* Products */}
        <section className="py-24 px-4 max-w-7xl mx-auto" id="shop">
          <div className="text-center mb-20">
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs uppercase tracking-widest text-red-400">
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                AI-Engineered
              </span>
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                Next.js 15
              </span>
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                Production Ready
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Featured Drops
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Limited edition. Engineered performance. Just Do It. Better.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Wishlist */}
        <section
          className="py-24 px-4 bg-gradient-to-b from-gray-900/50 to-black/70"
          id="wishlist"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Wishlist
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Save your favorites for later. Elite gear, elite access.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  💖
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Heart It</h3>
                <p className="text-gray-300">
                  Click heart on any product to save.
                </p>
              </div>
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  📱
                </div>
                <h3 className="text-3xl font-black text-white mb-4">
                  Mobile Sync
                </h3>
                <p className="text-gray-300">
                  Access across all devices instantly.
                </p>
              </div>
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  ⏰
                </div>
                <h3 className="text-3xl font-black text-white mb-4">
                  Restock Alerts
                </h3>
                <p className="text-gray-300">
                  Get notified when items return.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
