import { useState } from "react";
import "../styles/Homepage.css";
import RelatedProducts from "./RelatedProduct";

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Banner */}
      <div className="banner">Welcome to Our Store</div>

      {/* Categories */}
      <div className="categories">
        {['Shirts', 'Trousers', 'Jackets', 'Accessories'].map((category) => (
          <div key={category} className="category-item">{category}</div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {[1, 2, 3, 4].map((product) => (
            <div key={product} className="product-item">
              <div className="product-image">Image</div>
              <h3 className="product-name">Product {product}</h3>
              <p className="product-price">$49.99</p>
              <button className="buy-button">Buy Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta">Limited Offer! Get 20% off on your first order!</div>
      <RelatedProducts />
      {/* Footer */}
      <div className="footer">&copy; 2025 My E-Commerce. All Rights Reserved.</div>
    </div>
  );
}
