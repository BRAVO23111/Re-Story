import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick =() =>{
    navigate('/login')
  }
  return (
    <header className="absolute w-full z-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    
        <div className="text-2xl font-bold text-white tracking-wide">ReStory</div>
        <nav className="flex flex-col md:flex-row md:items-center gap-6">
          <ul className="flex flex-col md:flex-row md:items-center gap-6">
            <li>
              <Link to="/" className="text-white hover:text-blue-300 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/sell" className="text-white hover:text-blue-300 transition-colors">
                Sell
              </Link>
            </li>
            <li>
              <Link to="/buy" className="text-white hover:text-blue-300 transition-colors">
                Buy
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-300 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-blue-300 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
          <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center gap-2">
            Start Selling
            <span className="text-lg">→</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;