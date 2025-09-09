import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import AtomicConverter from './pages/AtomicConverter'
import CGSConverter from './pages/CGSConverter'
import SIConverter from './pages/SIConverter'
import './App.css'

function App() {
  return (
    <Router basename="/unit-conversions-website">
      <div className="app">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/atomic" element={<AtomicConverter />} />
          <Route path="/cgs" element={<CGSConverter />} />
          <Route path="/si" element={<SIConverter />} />
        </Routes>

        <footer className="app-footer">
          <p>© 2025 Universal Physics Unit Converter. Supporting comprehensive unit conversions across multiple systems.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy</a>
          </div>
          <div className="ad-placeholder">
            {/* Ad space placeholder for monetization */}
            <div className="ad-banner">Advertisement Space</div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
