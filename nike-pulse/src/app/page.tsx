import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 text-white">
      {/* Hero ONLY */}
      <section className="relative h-screen flex flex-col justify-center items-center px-4">
        <Image
          src="/nikepulselogo.png"
          alt="NikePulse"
          width={120}
          height={120}
          className="w-32 h-32 md:w-48 md:h-48 rounded-3xl shadow-2xl mb-8"
        />
        <h1 className="text-5xl md:text-8xl font-black text-center bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
          Nike<span className="text-red-400">Pulse</span>
        </h1>
        <p className="text-xl md:text-3xl text-gray-200 max-w-3xl text-center">
          🔥 NIKEPULSE IS LIVE ON VERCEL! 🎉
        </p>
        <p className="text-lg text-green-400 mt-4">
          Hero loaded successfully! ClientShopSection was crashing.
        </p>
      </section>
    </div>
  );
}
