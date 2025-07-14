import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, LogOut, LogIn, PackageSearch, Menu, UserCircle, Sun, Moon } from "lucide-react";
import { useCart } from "../Context.jsx/cartContext";
import toast from "react-hot-toast";

function Navbar() {
  const { currentCart } = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [logged, setLogged] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (userId) setLogged(true);
  }, [userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-white bg-opacity-30 border-b border-gray-300 shadow-md transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center py-4">
        <div
          className="flex items-center gap-2 text-3xl font-extrabold tracking-wide cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition"
          onClick={() => navigate("/")}
        >
          <PackageSearch size={28} /> WalkNBuy
        </div>

        <ul className="hidden md:flex space-x-8 text-lg text-gray-800 font-medium">
          <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
          <li><Link to="/shop" className="hover:text-blue-500 transition">Shop</Link></li>
          <li><Link to="/cart" className="hover:text-blue-500 transition">Cart</Link></li>
          <li><Link to="/orders" className="hover:text-blue-500 transition">Orders</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => toast("AI Suggestions Coming Soon...")}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow hover:scale-105 transition"
          >
            <Search size={18} /> AI Search
          </button>

          <div className="relative">
            <Link to="/cart" className="p-2 rounded-full  transition relative">
              <ShoppingCart size={24} />
              {currentCart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-ping">
                  {currentCart.length}
                </span>
              )}
            </Link>
          </div>

          {logged ? (
            <div className="flex items-center space-x-3">
              <UserCircle size={28} className="text-blue-600" />
              <button
                onClick={() => {
                  localStorage.clear();
                  setLogged(false);
                  toast.success("Logged out successfully");
                  navigate("/login");
                }}
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transition flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-yellow-500 hover:text-black transition flex items-center gap-2">
              <LogIn size={18} /> Login
            </Link>
          )}

          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="md:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <ul className="md:hidden bg-white dark:bg-gray-900 py-4 px-6 space-y-4 border-t border-gray-300">
          <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link></li>
          <li><Link to="/shop" onClick={() => setShowMobileMenu(false)}>Shop</Link></li>
          <li><Link to="/cart" onClick={() => setShowMobileMenu(false)}>Cart</Link></li>
          <li><Link to="/orders" onClick={() => setShowMobileMenu(false)}>Odrders</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
