import Image from 'next/image'

const products = [
  { name: 'Air Max Pulse', price: '$199', img: '/air-max.jpg' },
  { name: 'Vapor Elite', price: '$159', img: '/vapor.jpg' },
  { name: 'Pro Speed', price: '$129', img: '/pro-speed.jpg' },
  { name: 'React Run', price: '$179', img: '/react-run.jpg' },
  { name: 'Force 1', price: '$99', img: '/force1.jpg' },
  { name: 'Metcon 9', price: '$149', img: '/metcon.jpg' },
  { name: 'Pegasus Trail', price: '$139', img: '/pegasus.jpg' },
  { name: 'Dunk High', price: '$119', img: '/dunk.jpg' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white pt-16">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center px-4">
        <div className="w-48 h-48 mb-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-4xl font-bold text-black">NP</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
          NikePulse
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl text-center mb-12">
          Engineered for champions. Redefined for tomorrow.
        </p>
        <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105">
          Shop Now
        </button>
      </section>
      
      {/* Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="products">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Featured Gear
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={i} className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700">
              <Image 
                src={product.img} 
                width={300} 
                height={200} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold mb-2 text-white">{product.name}</h3>
              <p className="text-2xl font-bold text-red-500 mb-4">{product.price}</p>
              <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold transition-all duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
