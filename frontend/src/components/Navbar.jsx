import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";
import logo from "../assets/images/logo.jpg"; 
import searchIcon from "../assets/images/search-icon.svg";
import cameraIcon from "../assets/images/camera-icon.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Navbar Links with Search Icon (Left of Home) */}
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {location.pathname === "/" && (
            <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
              {!isSearchOpen ? (
                <img
                  src={searchIcon}
                  alt="Search"
                  className="search-icon"
                  onClick={() => setIsSearchOpen(true)}
                />
              ) : (
                <div className="search-bar">
                  <input type="text" placeholder="Search..." autoFocus />
                  {/* Camera Icon inside the Input */}
                  <img src={cameraIcon} alt="Camera" className="camera-icon" />
                  {/* Close (X) Button Inside the Input */}
                  <button className="close-search" onClick={() => setIsSearchOpen(false)}>✖</button>
                </div>
              )}
            </div>
          )}

          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
