import React from 'react'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import RelatedProducts from './pages/RelatedProduct'
import Footer from './components/footer'
import CartPage from './pages/cart'
import PaymentPage from './pages/payment'
import Payment from './pages/payment'
import { LogIn } from 'lucide-react'
import LoginAndSignup from "./pages/LoginAndSignup"


const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      
     
        <Route path='/' element={<Homepage />}/>
        <Route path='/relatedproduct' element={<RelatedProducts />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/login' element={<LoginAndSignup/>} />
        
    </Routes>

    <Footer />
    </div>
  )
}

export default App
