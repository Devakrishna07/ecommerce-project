import React from 'react'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import RelatedProducts from './pages/RelatedProduct'
import Footer from './components/footer'

const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      
     
        <Route path='/' element={<Homepage />}/>
        <Route path='/relatedproduct' element={<RelatedProducts />} />
    </Routes>

    <Footer />
    </div>
  )
}

export default App
