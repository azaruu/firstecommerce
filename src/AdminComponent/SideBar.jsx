import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-3 bg-red-900 text-white fixed top-4 left-4 rounded-lg z-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside className={`fixed md:relative w-64 bg-gradient-to-b from-red-900 to-gray-900 text-white min-h-screen p-6 shadow-2xl flex flex-col z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}> 
        <h2 className="text-3xl font-extrabold tracking-wide mb-6 text-center border-b pb-3">Admin Panel</h2>
        <ul className="space-y-3 flex flex-col flex-1">
          {[
            { name: "Dashboard", path: "/adminpage" },
            { name: "Manage Products", path: "/productmanage" },
            { name: "Manage Users", path: "/manageusers" },
            { name: "Manage Orders", path: "/manageorders" },
          ].map((item, index) => (
            <li 
              key={index} 
              className="cursor-pointer bg-opacity-20 hover:bg-opacity-50 bg-gray-800 p-3 rounded-xl text-lg transition-all duration-300 flex items-center justify-start px-6"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <button 
          className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-300 w-full text-lg shadow-lg"
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
