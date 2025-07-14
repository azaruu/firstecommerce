import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* Brand Name */}
        <div className="flex justify-center md:justify-start">
          <h1 className="text-2xl font-extrabold tracking-wide text-white hover:text-blue-400 transition">
            Kicks Vibe
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 text-sm">
          <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
          <Link to="/orders" className="hover:text-blue-400 transition duration-300">Orders</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <Facebook className="w-5 h-5 hover:text-blue-500 transition-colors duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <Instagram className="w-5 h-5 hover:text-pink-500 transition-colors duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <Twitter className="w-5 h-5 hover:text-cyan-400 transition-colors duration-300" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8"></div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Kicks Vibe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
