import React from "react";
import "../styles/RelatedProducts.css";

const products = [
  { id: 1, name: "Casual T-Shirt", price: "$25", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Leather Jacket", price: "$99", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Running Shoes", price: "$79", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Slim Fit Jeans", price: "$45", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Formal Shirt", price: "$35", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Wrist Watch", price: "$120", image: "https://via.placeholder.com/150" },
];

const RelatedProducts = () => {
  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="buy-now">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
