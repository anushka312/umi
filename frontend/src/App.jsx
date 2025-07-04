import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Games from './pages/Games'
import Donations from './pages/Donations'
import Projects from './pages/Projects'
import Project from './pages/Project'
import HelpSupport from './pages/HelpSupport'
import Fishies from './pages/Fishies';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/works' element={<Works />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/games' element={<Games />} />
        <Route path='/donations' element={<Donations />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/games/fishies" element={<Fishies />} />
      </Routes>
    </div>
  )
}

export default App
