import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        <Link to="/" className="text-2xl font-bold">
          Walletify
        </Link>

        <div className="space-x-6 hidden md:flex">
          
          <Link to="/about" className="hover:text-blue-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300">
            Contact
          </Link>
          <Link to="/features" className="hover:text-blue-300">
            Features
          </Link>
        </div>

       
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-3xl hover:text-blue-300" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-md text-gray-700 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
