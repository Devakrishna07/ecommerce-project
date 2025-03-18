import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import RelatedProducts from './pages/RelatedProduct';
import Footer from './components/footer';
import CartPage from './pages/cart';
import Payment from './pages/payment';
import CameraPage from './pages/CameraPage';
import Productpage from './pages/Productpage';

const App = () => {
  const location = useLocation();
  const hideFooterOnPages = ['/camera']; // Hide footer on the Camera page

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/relatedproduct' element={<RelatedProducts />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/productpage' element={<Productpage />} />
        <Route path='/camera' element={<CameraPage />} />
      </Routes>
      {!hideFooterOnPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
