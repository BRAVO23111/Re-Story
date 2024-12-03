import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBook, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername("");
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="text-blue-500 text-2xl" />
            <span className="text-white text-xl font-bold">ReStory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/buy" className="text-gray-300 hover:text-white transition-colors">
                  Browse Books
                </Link>
                <Link 
                  to="/sell"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sell Books
                </Link>
                
                {/* User Menu with Hover */}
                <div className="relative group">
                  <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
                    <FaUserCircle className="text-2xl" />
                    <span>{username}</span>
                  </div>
                  {/* Logout on Hover */}
                  <div className="absolute right-0 mt-1 py-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Combined Login/Register Button with Hover
              <div className="relative group">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <FaUserCircle className="text-xl" />
                  <span>Join Now!</span>
                </button>
                <div className="absolute right-0 mt-1 py-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/buy"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Books
                </Link>
                <Link
                  to="/sell"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell Books
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300"
                >
                  Logout ({username})
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;