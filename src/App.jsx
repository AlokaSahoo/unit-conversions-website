import React, { useState } from 'react'
import UnitConverter from './components/UnitConverter'
import { UNITS } from './utils/physicsConversions'
import './App.css'

function App() {
  const [selectedQuantity, setSelectedQuantity] = useState('length')
  
  const quantities = Object.keys(UNITS)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Physics Unit Converter</h1>
        <p>Convert between SI units and atomic units for various physical quantities</p>
      </header>

      <main className="app-main">
        <div className="quantity-selector">
          <label htmlFor="quantity-select">Select Physical Quantity:</label>
          <select 
            id="quantity-select"
            value={selectedQuantity} 
            onChange={(e) => setSelectedQuantity(e.target.value)}
            className="quantity-dropdown"
          >
            {quantities.map(quantity => (
              <option key={quantity} value={quantity}>
                {quantity.charAt(0).toUpperCase() + quantity.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <UnitConverter quantity={selectedQuantity} />

        <div className="info-section">
          <h2>About Atomic Units</h2>
          <p>
            Atomic units are a system of natural units that are convenient for atomic physics and quantum chemistry. 
            In this system, several fundamental physical constants are set to unity, which simplifies many equations.
          </p>
          
          <div className="constants-grid">
            <div className="constant-card">
              <h3>Length</h3>
              <p>1 Bohr radius (a₀) = 5.29 × 10⁻¹¹ m</p>
            </div>
            <div className="constant-card">
              <h3>Energy</h3>
              <p>1 Hartree (Eh) = 4.36 × 10⁻¹⁸ J</p>
            </div>
            <div className="constant-card">
              <h3>Mass</h3>
              <p>1 electron mass (mₑ) = 9.11 × 10⁻³¹ kg</p>
            </div>
            <div className="constant-card">
              <h3>Time</h3>
              <p>1 atomic time (ℏ/Eh) = 2.42 × 10⁻¹⁷ s</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Physics Unit Converter. Built for educational and research purposes.</p>
        <div className="ad-placeholder">
          {/* Ad space placeholder for monetization */}
          <div className="ad-banner">Advertisement Space</div>
        </div>
      </footer>
    </div>
  )
}

export default App
