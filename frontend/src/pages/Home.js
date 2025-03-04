import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="https://assets.myntassets.com/assets/images/logo.png" alt="Myntra Logo" />
        </div>
        <div className="login-btn-container">
          {/* Using Link component to navigate to /login */}
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </header>

      {/* Banner Section */}
      <section className="banner">
        <img
          src="https://assets.myntassets.com/assets/images/home-banner.jpg"
          alt="Myntra Banner"
          className="banner-image"
        />
      </section>

      {/* Product Section */}
      <section className="products">
        <h2>Top Products</h2>
        <div className="product-list">
          <div className="product-item">
            <img
              src="https://assets.myntassets.com/assets/images/product1.jpg"
              alt="Fashion Item"
              className="product-image"
            />
            <p>Casual Shirt</p>
            <span>₹1,299</span>
          </div>
          <div className="product-item">
            <img
              src="https://assets.myntassets.com/assets/images/product2.jpg"
              alt="Fashion Item"
              className="product-image"
            />
            <p>Blue Jeans</p>
            <span>₹1,499</span>
          </div>
          <div className="product-item">
            <img
              src="https://assets.myntassets.com/assets/images/product3.jpg"
              alt="Fashion Item"
              className="product-image"
            />
            <p>Sneakers</p>
            <span>₹2,999</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Myntra</p>
      </footer>
    </div>
  );
}



