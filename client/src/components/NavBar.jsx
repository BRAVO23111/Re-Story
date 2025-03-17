import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBook, FaBars, FaTimes, FaUserCircle, FaHome, FaSearch, FaStore, FaInfoCircle, FaEnvelope, FaShoppingCart, FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slices/authSlice";
import { Button, Badge, Menu, MenuItem, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import api from "../config/config";

// Styled Material UI Button
const StyledButton = styled(Button)(() => ({
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

    const checkProfileStatus = async () => {
    const token = window.localStorage.getItem("token");
    const userId = window.localStorage.getItem("userId");
    
    if (token && userId) {
      try {
        await api.get(`/api/profile/${userId}`);
        setHasProfile(true);
      } catch (error) {
        if (error.response?.status === 404) {
          setHasProfile(false);
        } else if (error.response?.status === 401) {
          handleLogout();
        }
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const storedUsername = window.localStorage.getItem("username");
    
    if (token && storedUsername) {
      dispatch(login({ 
        username: storedUsername, 
        token 
      }));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkProfileStatus();
    } else {
      dispatch(logout());
      setHasProfile(false);
    }
  }, []); // Remove isLoggedIn from dependencies to prevent circular updates

  // Separate useEffect for profile status
  useEffect(() => {
    if (isLoggedIn) {
      checkProfileStatus();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    delete api.defaults.headers.common['Authorization'];
    dispatch(logout());
    setHasProfile(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 bg-opacity-30  fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <FaBook className="text-blue-500 text-2xl" />
              <span className="text-white text-xl font-bold">ReStory</span>
            </Link>
          </div>

          {/* Navigation Links - Modern look */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <FaHome className="text-lg" />
              <span className="font-medium">Home</span>
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/buy" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                  <FaSearch className="text-lg" />
                  <span className="font-medium">Browse</span>
                </Link>
                <Link to="/sell" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
                  <FaStore className="text-lg" />
                  <span className="font-medium">Sell</span>
                </Link>
              </>
            )}
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <FaInfoCircle className="text-lg" />
              <span className="font-medium">About</span>
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-1">
              <FaEnvelope className="text-lg" />
              <span className="font-medium">Contact</span>
            </Link>
          </div>

          {/* Right Section: Cart and User Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-300 relative">
              <Badge 
                badgeContent={cartItems.length} 
                color="error" 
                sx={{ 
                  '& .MuiBadge-badge': { 
                    fontSize: '0.7rem', 
                    height: '18px', 
                    minWidth: '18px' 
                  } 
                }}
              >
                <FaShoppingCart className="text-xl" />
              </Badge>
            </Link>
            <div className="relative group">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <div 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white cursor-pointer"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <FaUserCircle className="text-2xl" />
                    <span>{username}</span>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      sx: {
                        backgroundColor: 'white',
                        width: '200px',
                        mt: 1,
                      }
                    }}
                  >
                    {hasProfile ? (
                      <MenuItem onClick={() => {
                        navigate('/profile');
                        setAnchorEl(null);
                      }}>
                        <FaUserEdit className="mr-2" /> View Profile
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => {
                        navigate('/profile');
                        setAnchorEl(null);
                      }}>
                        <FaUserEdit className="mr-2" /> Create Profile
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem 
                      onClick={() => {
                        handleLogout();
                        setAnchorEl(null);
                      }}
                      sx={{ color: 'red' }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
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
                <Link
                  to="/cart"
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({cartItems.length})
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
