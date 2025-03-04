import React, { useState } from "react";
import "../styles/login.css";  // Adjust the path if needed

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <div className="login-card">
        <div>
          <h2 className="login-header">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="input-field"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button type="submit" className="button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="switch-link"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
