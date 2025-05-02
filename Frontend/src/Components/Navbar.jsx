import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const handleLogout = () => {
    localStorage.removeItem("UserData"); // Remove user data
    localStorage.removeItem("cartProductIds"); // Remove user data
    navigate("/"); // Redirect to login page
    window.location.reload(); // Refresh the page
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/home"} className="text-2xl font-bold text-indigo-600">
              CromaX
            </Link>
          </div>
          {/* Search Bar */}
          <div className="w-full max-w-md mx-6 hidden md:block">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-indigo-600 font-medium text-sm hidden md:inline"
            >
              Logout
            </button>
            <Link
              to={"/checkout"}
              className="text-gray-700 hover:text-indigo-600 relative"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
              </svg>
            </Link>
          </div>
        </div>
        {/* Bottom Categories */}
        <div className="hidden md:flex justify-center space-x-8 py-2 border-t border-gray-200 text-sm text-gray-700">
          <Link to={"/mobile"} className="hover:text-indigo-600">
            Mobiles
          </Link>
          <a href="#" className="hover:text-indigo-600">
            Laptops
          </a>
          <a href="#" className="hover:text-indigo-600">
            TVs
          </a>
          <a href="#" className="hover:text-indigo-600">
            Appliances
          </a>
          <a href="#" className="hover:text-indigo-600">
            Accessories
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
