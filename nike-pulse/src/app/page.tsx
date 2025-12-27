import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "./ProductCard";
import Navbar from "@/components/ui/Navbar";
import ScrollToShopButton from "@/components/ScrollToShopButton";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  console.log("🚀 PAGE LOADING - Vercel Server...");
  const snap = await getDocs(collection(db, "products"));
  const products = snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
  console.log("🔥 Firestore: Found", products.length, "products");
  return products;
}

export default async function Home() {
  const products = await getProducts();
  console.log("✅ Firestore: Loaded", products.length, "products");
  console.log("🎉 SERVER PRODUCTS COUNT:", products.length);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white overflow-x-hidden pt-20">
        {/* Hero */}
        <section className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <Image
            src="/nikepulselogo.png"
            alt="NikePulse"
            width={120}
            height={120}
            className="w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-2xl mb-8 md:mb-12 hover:scale-105 transition-transform duration-300"
            priority
          />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-center mb-6 md:mb-8 bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Nike<span className="text-red-400">Pulse</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 max-w-3xl text-center mb-8 md:mb-12 font-light leading-relaxed">
            Engineered for champions. Redefined for tomorrow.™
          </p>
          <ScrollToShopButton />
        </section>

        {/* Products */}
        <section className="py-24 px-4 max-w-7xl mx-auto" id="shop">
          <div className="text-center mb-20">
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs uppercase tracking-widest text-red-400">
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                AI-Engineered
              </span>
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                Next.js 16
              </span>
              <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                Firestore Live
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Featured Drops
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Limited edition. Engineered performance. Just Do It. Better.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-3xl font-bold text-gray-400 mb-4">
                No products yet
              </h3>
              <p className="text-gray-500">
                Add test product "air-force-1" in Firestore → products collection
              </p>
            </div>
          )}
        </section>

        {/* About */}
        <section className="py-24 px-4 bg-gradient-to-b from-gray-900/50 to-black/70" id="about">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
                About NikePulse
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                NikePulse is a concept sneaker storefront built with Next.js App Router and Firebase Firestore.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Server-side rendered products, real-time cart, and immersive UI - production ready.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-2">Tech Stack</h3>
                <p className="text-gray-300">Next.js 16 • Tailwind CSS • Firebase Firestore • TypeScript</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-2">Performance</h3>
                <p className="text-gray-300">SSR • Optimized images • Smooth animations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
