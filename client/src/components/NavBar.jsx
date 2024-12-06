import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBook, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isLoggedIn, username } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const storedUsername = window.localStorage.getItem("username");
    
    if (token && storedUsername) {
      dispatch(login({ 
        username: storedUsername, 
        token 
      }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
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
            {isLoggedIn && ( // Show Browse and Sell links if logged in
              <>
                <Link 
                  to="/buy" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Browse
                </Link>
                <Link 
                  to="/sell" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sell
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
                <FaUserCircle className="text-2xl" />
                <span>{username || "Guest"}</span>
              </div>
              {/* Logout or Login on Hover */}
              {isLoggedIn ? (
                <div className="absolute right-0 mt-1 py-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="absolute right-0 mt-1 py-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
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
            {isLoggedIn && ( // Show Browse and Sell links if logged in
              <>
                <Link
                  to="/buy"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse
                </Link>
                <Link
                  to="/sell"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sell
                </Link>
              </>
            )}
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
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-green-400 hover:text-green-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
