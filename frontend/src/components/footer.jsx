import React from "react";
import "../styles/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Men's Wear</h2>
          <p>Style that defines you.</p>
        </div>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Men's Wear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
