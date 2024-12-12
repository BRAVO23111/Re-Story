import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBook, FaBars, FaTimes, FaUserCircle, FaHome, FaSearch, FaStore, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slices/authSlice";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Material UI Button
const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #3b82f6, #2563eb)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: '500',
  '&:hover': {
    background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
  },
}));

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
          {/* Left Section: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <FaBook className="text-blue-500 text-2xl" />
              <span className="text-white text-xl font-bold">ReStory</span>
            </Link>
          </div>

          {/* Navigation Links - Spread across with equal spacing */}
          <div className="hidden md:flex flex-1 items-center justify-evenly px-16">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/buy" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <FaSearch className="text-lg" />
                  <span>Browse</span>
                </Link>
                <Link to="/sell" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <FaStore className="text-lg" />
                  <span>Sell</span>
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <FaInfoCircle className="text-lg" />
              <span>About</span>
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
              <FaEnvelope className="text-lg" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Right Section: User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer">
                    <FaUserCircle className="text-2xl" />
                    <span>{username}</span>
                  </div>
                  <div className="absolute right-0 mt-8 py-2 w-32 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <StyledButton
                  onClick={() => navigate('/login')}
                  className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Selling
                </StyledButton>
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
            {isLoggedIn && (
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
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            ) : (
              <StyledButton
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
                fullWidth
                className="mt-2"
              >
                Start Selling
              </StyledButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
