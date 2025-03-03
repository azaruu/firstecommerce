import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 min-h-32 mt-10 flex flex-col justify-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand Name / Logo */}
        <div className="text-xl font-bold mb-4 md:mb-0">
          Kicks Vibe
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
          <Link to="/order" className="hover:text-blue-400 transition duration-300">Orders</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-blue-500 transition duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-pink-500 transition duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-balck-400 transition duration-300" />
          </a>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="text-center text-xs text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} Kicks Vibe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;