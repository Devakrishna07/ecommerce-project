import React from "react";
import "../styles/Productpage.css";

const Productpage = () => {
  const product = {
    name: "Elegant Evening Gown",
    price: 999,
    description: "A stunning evening gown perfect for special occasions.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Black"],
  };

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="price">Rs.{product.price}</p>
        <p className="description">{product.description}</p>

        <div className="options">
          <div className="sizes">
            <label>Size:</label>
            <select>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="colors">
            <label>Color:</label>
            <select>
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default Productpage;
