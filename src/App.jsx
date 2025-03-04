import React from 'react'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      
     
        <Route path='/' element={<Homepage />}/>
      
    </Routes>
    </div>
  )
}

export default App
