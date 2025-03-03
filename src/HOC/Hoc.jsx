import React, { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context.jsx/cartContext";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() { 
  const { currentCart } = useCart();
  const userId = localStorage.getItem("userId");

  const [Logged, setlogged] = useState(false);//undakkiyath login logout
  useEffect(() => {
    if (userId) {
      setlogged(true);
     //          toast.success(" Logged")      
    }
  },[userId]);

  return (
    <nav className="  p-4 shadow-lg fixed top-0 w-full bg-white
    ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide">Walk N Buy</h1>
        <ol className="flex space-x-6 text-lg  text-blue-600">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-200 transition">
              Shop
            </Link>
          </li>
          <li>
              <Link to="/cart" className="hover:text-gray-200 transition">
                Cart
              </Link>
            </li>
          <li>
            <Link to="/order" className="hover:text-gray-200 transition">
              Orders
            </Link>
          </li>
        </ol>

        {/* Auth Links */}
        <ul className="flex space-x-4">
          <li className="relative">
            <Link
              to="/cart"
              className="relative flex items-center justify-center p-2 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              <ShoppingCart size={24} />
              {currentCart.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-amber-700 text-white text-xs rounded-full px-2">
                  {currentCart.length}
                </span>
              )}
            </Link>
          </li>


 {/* logiin out   */}
          {!Logged && (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-yellow-500 transition"
              >
                Login
              </Link>
            </li>
          )} 
          {Logged && (
            <li onClick={() => localStorage.clear()}>
              {/* setlogged(false); */}
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-yellow-500 transition"
             >
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
