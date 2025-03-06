import { useState } from "react";
import "../styles/cart.css"; // Import the CSS file
import Payment from "./payment";

const CartPage = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Blue Shirt", price: 29.99, quantity: 1 },
    { id: 2, name: "White Trousers", price: 49.99, quantity: 1 },
  ]);

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <span className="cart-price">${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${getTotal()}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )}

      <Payment />
    </div>
  );
};

export default CartPage;
