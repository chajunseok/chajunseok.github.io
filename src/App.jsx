import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Profile/pages/Home'
import Projects from './components/Profile/pages/Projects'
import Contact from './components/Profile/pages/Contact'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
