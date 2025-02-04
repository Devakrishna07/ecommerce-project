import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Import Home page
import Login from "./pages/login"; // Import Login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home page as the default route */}
        <Route path="/login" element={<Login />} /> {/* Login page route */}
      </Routes>
    </Router>
  );
}

export default App;


