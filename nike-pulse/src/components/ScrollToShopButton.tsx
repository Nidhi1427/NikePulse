'use client';

export default function ScrollToShopButton() {
  return (
    <button
      onClick={() => {
        document.getElementById("shop")?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
        console.log('Shop clicked!');
      }}
      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-12 py-6 rounded-3xl font-bold text-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-red-500/25 z-50 relative pointer-events-auto"
    >
      Shop Elite Gear →
    </button>
  );
}
