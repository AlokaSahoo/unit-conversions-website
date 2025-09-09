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
        <p>Convert between SI, CGS, and atomic units for various physical quantities</p>
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
          <h2>About Unit Systems</h2>
          <p>
            This converter supports three major unit systems used in physics: SI (International System), 
            CGS (Centimeter-Gram-Second), and Atomic units. Atomic units are particularly convenient 
            for atomic physics and quantum chemistry calculations.
          </p>
          
          <div className="constants-grid">
            <div className="constant-card">
              <h3>Length</h3>
              <p>1 Bohr radius (a₀) = 5.29 × 10⁻¹¹ m = 5.29 × 10⁻⁹ cm</p>
            </div>
            <div className="constant-card">
              <h3>Energy</h3>
              <p>1 Hartree (Eh) = 4.36 × 10⁻¹⁸ J = 4.36 × 10⁻¹¹ erg</p>
            </div>
            <div className="constant-card">
              <h3>Mass</h3>
              <p>1 electron mass (mₑ) = 9.11 × 10⁻³¹ kg = 9.11 × 10⁻²⁸ g</p>
            </div>
            <div className="constant-card">
              <h3>Electric Field</h3>
              <p>SI: V/m | CGS: statV/cm | Atomic: Eh/(e·a₀)</p>
            </div>
            <div className="constant-card">
              <h3>Magnetic Field</h3>
              <p>SI: Tesla | CGS: Gauss | Atomic: ℏ/(e·a₀²)</p>
            </div>
            <div className="constant-card">
              <h3>Force</h3>
              <p>SI: Newton | CGS: dyne | Atomic: Eh/a₀</p>
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
