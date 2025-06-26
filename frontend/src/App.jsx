import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/works' element={<Works />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />

      </Routes>
    </div>
  )
}

export default App
