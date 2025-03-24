import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";
import logo from "../assets/images/logo.jpg";
import searchIcon from "../assets/images/searchicon.svg";
import cameraIcon from "../assets/images/camera-icon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const openCamera = () => {
    navigate('/camera'); // Navigate to CameraPage when clicking the camera icon
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {location.pathname === "/" && (
            <div className="search-container">
              <div className="search-bar">
                <input type="text" placeholder="Search..." className="search-input" />
                <img src={searchIcon} alt="Search" className="search-icon" />
                <img 
                  src={cameraIcon} 
                  alt="Camera" 
                  className="camera-icon" 
                  onClick={openCamera} 
                />
              </div>
            </div>
          )}

          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        </div>

        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
