import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Universal Converter', icon: '🔄' },
    { path: '/atomic', label: 'Atomic Units', icon: '⚛️' },
    { path: '/cgs', label: 'CGS Units', icon: '🧮' },
    { path: '/si', label: 'SI Units', icon: '📐' }
  ]

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🔬</span>
          <span className="brand-text">Physics Unit Converter</span>
        </Link>
        
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
