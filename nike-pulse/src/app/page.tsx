import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard from "./ProductCard";
import Navbar from "@/components/ui/Navbar";
import ScrollToShopButton from "@/components/ScrollToShopButton";
import ClientShopSection from "./ClientShopSection";

type Product = {
  id: string;
  name: string;
  price: number;   // dollars
  image: string;   // url or /images/...
};

async function getProducts(): Promise<Product[]> {
  try {
    console.log("🔥 Firestore: Starting products query...");
    
    const snap = await getDocs(collection(db, "products"));
    
    console.log("🔥 Firestore: Found", snap.docs.length, "products");
    
    const products = snap.docs.map((doc) => {
      const data = doc.data() as Omit<Product, "id">;
      console.log("🔥 Product ID:", doc.id, "Data:", data.name);
      return {
        id: doc.id,
        ...data,
      };
    });
    
    console.log("✅ Firestore: Successfully loaded", products.length, "products");
    return products;
    
  } catch (error: any) {
    console.error("❌ FIRESTORE ERROR:", error.message);
    console.error("❌ Full error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

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
          <ScrollToShopButton />
        </section>

        {/* Products */}
        <ClientShopSection initialProducts={products} id="shop" />

        {/* About */}
        <section className="py-24 px-4 bg-gradient-to-b from-gray-900/50 to-black/70" id="about">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
                About NikePulse
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                NikePulse is a concept sneaker storefront built with Next.js and
                Firebase. It explores how a modern Nike shopping experience can
                feel—fast, immersive, and powered by real data.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Products and cart flows are backed by Firestore and client-side
                state, giving you a realistic e‑commerce experience in a sleek,
                experimental UI.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
                <p className="text-gray-300">
                  Next.js App Router, Tailwind CSS, and Firebase for scalable,
                  real‑time data.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold mb-2">Performance First</h3>
                <p className="text-gray-300">
                  Optimized layout, responsive design, and smooth transitions so
                  browsing sneakers feels as sharp as a race‑day stride.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist */}
        <section className="py-24 px-4 bg-gradient-to-b from-black/70 to-gray-950" id="wishlist">
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
                <p className="text-gray-300">Click heart on any product to save it to your wishlist.</p>
              </div>
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  📱
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Mobile Sync</h3>
                <p className="text-gray-300">Pick up where you left off from any device, anywhere.</p>
              </div>
              <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  ⏰
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Restock Alerts</h3>
                <p className="text-gray-300">Get notified when your wishlist heat returns in stock.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 px-4 bg-gradient-to-b from-gray-950 to-black" id="contact">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
              Let's Talk Sneakers
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Got ideas, feedback, or want to turn this concept into a full
              production store? Drop a message and keep the pulse going.
            </p>
            <div className="max-w-lg mx-auto space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-left">
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300 break-words">
                  <a href="mailto:hello@nikepulse.test">hello@nikepulse.test</a>
                </p>
              </div>
              <form className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <textarea
                  placeholder="Tell us you'd like to see next..."
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-red-500/40 transition-all duration-300"
                >
                  Send Message →
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
