import React from 'react';
import Navbar from '../HOC/Hoc';
import { useNavigate } from 'react-router-dom';
import Footer from '../HOC/Footer';

function Home() {
  const navigate=useNavigate()
  return (
    <div >
         
      <Navbar />
      
      <div className="flex flex-col place-items-center justify-center h-screen bg-cover text-amber-300" 
    style={{backgroundImage:"url('https://www.bestshoe99.in/wp-content/uploads/2021/09/Casual-shoes-brands-min-1536x909.jpg')"}}>
         <div className="text-center  p-20 rounded-2xl shadow-lg">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">🚀 Welcome to <span className="text-blue-600">WalkNBuy</span>!</h1>
    <p className="text-black text-lg" onClick={()=>navigate('/shop')}>Discover amazing products with just a click.</p>
  </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

