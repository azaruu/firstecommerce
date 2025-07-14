
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../HOC/Footer';
import { ShoppingCart, Bot, Mic, Star, Truck } from 'lucide-react';
import Navbar from '../HOC/Hoc';

function Home() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Navbar/>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1e3a8a,_transparent_70%)]"></div>

        <div
          className={`z-10 text-center p-8 md:p-16 rounded-3xl shadow-2xl backdrop-blur-xl bg-white bg-opacity-10 border border-gray-200 border-opacity-10 transition-all duration-700 ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6 animate-pulse drop-shadow-2xl">
            👟 WalkNBuy | Shoe Mart
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto">
            Discover footwear curated by AI — Style, Comfort, and Technology Combined.let's Enjoy
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-900 to-purple-200 text-white font-bold rounded-full shadow-xl hover:from-purple-600 hover:to-blue-600 transform hover:scale-110 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              Shop Now
            </button>

            <button
              onClick={() => alert('AI Voice Assistant Coming Soon...')}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white font-bold rounded-full shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all duration-300"
            >
              <Mic className="w-5 h-5" />
              AI Voice Search
            </button>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION PREVIEW */}
      <section className="py-20 px-6 md:px-24 bg-black text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12">
          🧠 Smart Picks by AI
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'AI Sneaker Selection',
              desc: 'Your perfect sneaker chosen by intelligent algorithms.',
              image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/108127/01/dt05/fnd/IND/fmt/png/Badminton-Smash-Sprint-Unisex-Indoor-Sports-Shoes',
            },
            {
              title: 'Performance Matched for You',
              desc: 'AI suggests sports shoes based on your activity needs.',
              image: 'https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/53/53-best-running-shoes-15275001-960.jpg',
            },
            {
              title: 'Everyday AI Casuals',
              desc: 'Smart daily wear optimized for comfort and looks.',
              image: 'https://images.squarespace-cdn.com/content/v1/63f6daebd6676f7b4398743a/5377245d-68a6-403d-bd2c-130d1180ca8f/workout-gear-athletic-shoes.jpg',
         
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all hover:shadow-2xl border border-gray-700 backdrop-blur-md"
            >
              <img src={item.image} alt={item.title} className="w-full h-60 object-cover opacity-90 group-hover:opacity-100" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="text-purple-400 font-semibold hover:underline"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SHOP WITH AI */}
      <section className="py-20 px-6 md:px-24 bg-gradient-to-b from-gray-900 to-black text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-14">
          Why WalkNBuy is Future-Ready
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-white">
            <Bot className="w-14 h-14 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Personalized Picks</h3>
            <p className="text-gray-400 max-w-xs">Machine learning recommends shoes tailored to you.</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Star className="w-14 h-14 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Only Premium Brands</h3>
            <p className="text-gray-400 max-w-xs">Verified quality from world-leading shoe makers.</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <Truck className="w-14 h-14 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
            <p className="text-gray-400 max-w-xs">Get your products faster with AI-optimized shipping.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
