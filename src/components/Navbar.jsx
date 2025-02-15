import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", name: "Home" },
    { path: "/resources_requests", name: "Network" },
    { path: "/social_media", name: "Threats" },
    { path: "/explore", name: "Explore" },
    { path: "/safety-tips", name: "Safety Tips" }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg fixed w-full z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-white text-2xl font-bold">
              <span className="text-blue-400">DMS</span> Portal
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/plan"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md"
            >
              #GetReady
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-xl">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/plan"
                className="block text-center bg-blue-500 text-white px-6 py-2 rounded-full mx-4 my-2"
                onClick={() => setIsOpen(false)}
              >
                #GetReady
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;