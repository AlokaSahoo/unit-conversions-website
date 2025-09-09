import React, { useState } from 'react'
import UnitConverter from '../components/UnitConverter'
import { getCategories, UNIT_CATEGORIES } from '../utils/physicsConversions'
import { Link } from 'react-router-dom'

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('length')
  
  const categories = getCategories()

  return (
    <div className="page-content">
      <header className="page-header">
        <h1>Universal Physics Unit Converter</h1>
        <p>Convert between multiple units within different physical quantities - supports everything from nanometers to light years!</p>
        
        {/* Quick Links to Specialized Converters */}
        <div className="quick-links">
          <h3>Quick Access Converters:</h3>
          <div className="converter-links">
            <Link to="/atomic" className="converter-link atomic">
              <span className="icon">⚛️</span>
              <div>
                <strong>Convert to Atomic Units</strong>
                <small>For quantum physics and atomic calculations</small>
              </div>
            </Link>
            <Link to="/cgs" className="converter-link cgs">
              <span className="icon">🧮</span>
              <div>
                <strong>Convert to CGS Units</strong>
                <small>Centimeter-Gram-Second system</small>
              </div>
            </Link>
            <Link to="/si" className="converter-link si">
              <span className="icon">📐</span>
              <div>
                <strong>Convert to SI Units</strong>
                <small>International System of Units</small>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="category-selector">
          <label htmlFor="category-select">Select Physical Quantity:</label>
          <select 
            id="category-select"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {UNIT_CATEGORIES[category].name}
              </option>
            ))}
          </select>
        </div>

        <UnitConverter category={selectedCategory} />

        <div className="info-section">
          <h2>Comprehensive Unit Conversion</h2>
          <p>
            Our universal converter supports multiple units within each physical quantity category. 
            From scientific research units to everyday measurements, convert between any supported units instantly.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔬 Scientific Units</h3>
              <p>Atomic units, electron volts, Bohr radii, Hartree, and more specialized physics units</p>
            </div>
            <div className="feature-card">
              <h3>📏 Common Units</h3>
              <p>Meters, feet, inches, pounds, kilograms, and everyday measurement units</p>
            </div>
            <div className="feature-card">
              <h3>🌌 Astronomical Units</h3>
              <p>Light years, parsecs, astronomical units, solar masses for space calculations</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Engineering Units</h3>
              <p>Tesla, Gauss, Pascals, PSI, horsepower, and technical measurement units</p>
            </div>
            <div className="feature-card">
              <h3>🔥 Temperature</h3>
              <p>Celsius, Fahrenheit, Kelvin, and Rankine temperature scales</p>
            </div>
            <div className="feature-card">
              <h3>⚛️ Energy Units</h3>
              <p>Joules, calories, BTU, electron volts, and various energy measurements</p>
            </div>
          </div>

          <div className="categories-overview">
            <h3>Available Categories</h3>
            <div className="categories-list">
              {categories.map(category => {
                const categoryData = UNIT_CATEGORIES[category];
                const unitCount = Object.keys(categoryData.units).length;
                return (
                  <div key={category} className="category-item">
                    <strong>{categoryData.name}</strong>
                    <span>{unitCount} units available</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
