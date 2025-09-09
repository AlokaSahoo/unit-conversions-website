import React, { useState, useEffect, useMemo } from 'react'
import { getCategories, UNIT_CATEGORIES, convertUnits, formatNumber } from '../utils/physicsConversions'
import { convertUnitsWithUncertainty, UncertaintyValue } from '../utils/uncertaintyCalculations'
import { Link } from 'react-router-dom'

function TargetSystemConverter({ targetSystem, systemInfo }) {
  const [selectedCategory, setSelectedCategory] = useState('length')
  const [inputValue, setInputValue] = useState('1')
  const [inputUncertainty, setInputUncertainty] = useState('')
  const [showUncertainty, setShowUncertainty] = useState(false)
  const [fromUnit, setFromUnit] = useState('')
  const [conversions, setConversions] = useState([])
  
  const categories = getCategories()

  // Get target units for the selected system
  const getTargetUnits = (category) => {
    const categoryData = UNIT_CATEGORIES[category]
    if (!categoryData) return []
    
    const units = Object.entries(categoryData.units)
    
    switch (targetSystem) {
      case 'atomic':
        return units.filter(([key, unit]) => {
          // Check for atomic unit symbols and names
          const hasAtomicSymbol = key.includes('a₀') || key.includes('Eh') || key.includes('ℏ') || 
                                  key.includes('mₑ') || key.includes('mₚ') || key === 'u'
          const hasAtomicName = unit.name?.toLowerCase().includes('atomic') ||
                               unit.name?.toLowerCase().includes('bohr') ||
                               unit.name?.toLowerCase().includes('hartree') ||
                               unit.name?.toLowerCase().includes('electron')
          return hasAtomicSymbol || hasAtomicName
        })
      case 'cgs':
        return units.filter(([key, unit]) => {
          // Check for CGS units by key and name
          const isCGSKey = key === 'cm' || key === 'g' || key === 'dyn' || key === 'erg' || 
                          key === 'G' || key === 'statC' || key === 'statV'
          const isCGSName = unit.name?.toLowerCase().includes('dyne') ||
                           unit.name?.toLowerCase().includes('gauss') ||
                           (unit.name?.toLowerCase().includes('gram') && !key.includes('kg')) ||
                           unit.name?.toLowerCase().includes('centimeter')
          return isCGSKey || isCGSName
        })
      case 'si':
        return units.filter(([key, unit]) => {
          // Check for SI base and derived units
          const isSIKey = key === 'm' || key === 'kg' || key === 's' || key === 'A' || 
                         key === 'K' || key === 'mol' || key === 'cd' || key === 'N' || 
                         key === 'J' || key === 'Pa' || key === 'T' || key === 'V' || 
                         key === 'W' || key === 'C' || key === 'Hz'
          const isSIName = (unit.name?.toLowerCase().includes('meter') && !unit.name?.toLowerCase().includes('centimeter')) ||
                          unit.name?.toLowerCase().includes('kilogram') ||
                          unit.name?.toLowerCase().includes('newton') ||
                          unit.name?.toLowerCase().includes('joule') ||
                          unit.name?.toLowerCase().includes('pascal') ||
                          unit.name?.toLowerCase().includes('tesla') ||
                          unit.name?.toLowerCase().includes('watt') ||
                          unit.name?.toLowerCase().includes('volt') ||
                          unit.name?.toLowerCase().includes('ampere') ||
                          unit.name?.toLowerCase().includes('kelvin')
          return isSIKey || isSIName
        })
      default:
        return units
    }
  }

  // Get source units (all units except target system)
  const getSourceUnits = (category) => {
    const categoryData = UNIT_CATEGORIES[category]
    if (!categoryData) return []
    
    const allUnits = Object.entries(categoryData.units)
    const targetUnitKeys = getTargetUnits(category).map(([key]) => key)
    
    return allUnits.filter(([key]) => !targetUnitKeys.includes(key))
  }

  // Set default units when category changes
  useEffect(() => {
    const sourceUnits = getSourceUnits(selectedCategory)
    if (sourceUnits.length > 0) {
      setFromUnit(sourceUnits[0][0])
    } else {
      // If no source units available, clear the fromUnit
      setFromUnit('')
    }
  }, [selectedCategory]) // Remove targetSystem from dependencies

  // Calculate conversions whenever inputs change
  useEffect(() => {
    if (!inputValue || !fromUnit || isNaN(parseFloat(inputValue))) {
      setConversions([])
      return
    }

    const targetUnits = getTargetUnits(selectedCategory)
    if (targetUnits.length === 0) {
      setConversions([])
      return
    }

    const value = parseFloat(inputValue)
    
    try {
      if (showUncertainty && inputUncertainty && !isNaN(inputUncertainty)) {
        const numUncertainty = parseFloat(inputUncertainty)
        
        const newConversions = targetUnits.map(([unitKey, unitData]) => {
          const resultWithUncertainty = convertUnitsWithUncertainty(
            value, 
            numUncertainty,
            fromUnit, 
            unitKey, 
            selectedCategory
          )
          
          return {
            unit: unitKey,
            symbol: unitData.symbol,
            name: unitData.name,
            value: resultWithUncertainty?.value || 0,
            uncertainty: resultWithUncertainty?.uncertainty || 0,
            formatted: resultWithUncertainty ? 
              resultWithUncertainty.toString() :
              'N/A'
          }
        })
        
        setConversions(newConversions)
      } else {
        // Standard conversion without uncertainty
        const newConversions = targetUnits.map(([unitKey, unitData]) => {
          const convertedValue = convertUnits(value, fromUnit, unitKey, selectedCategory)
          return {
            unit: unitKey,
            symbol: unitData.symbol,
            name: unitData.name,
            value: convertedValue,
            formatted: formatNumber(convertedValue)
          }
        })
        
        setConversions(newConversions)
      }
    } catch (error) {
      console.error('Conversion error:', error)
      setConversions([{
        unit: 'error',
        symbol: '⚠️',
        name: 'Error',
        value: 0,
        formatted: `Error: ${error.message}`
      }])
    }
  }, [inputValue, inputUncertainty, fromUnit, selectedCategory, targetSystem, showUncertainty])

  // Memoize unit calculations to prevent unnecessary re-calculations
  const sourceUnits = useMemo(() => getSourceUnits(selectedCategory), [selectedCategory, targetSystem])
  const targetUnits = useMemo(() => getTargetUnits(selectedCategory), [selectedCategory, targetSystem])

  return (
    <div className="page-content">
      <header className="page-header">
        <nav className="breadcrumb">
          <Link to="/">← Back to Universal Converter</Link>
        </nav>
        <h1>{systemInfo.title}</h1>
        <p>{systemInfo.description}</p>
      </header>

      <main className="page-main">
        <div className="converter-section">
          <div className="input-section">
            <div className="category-selector">
              <label htmlFor="category-select">Physical Quantity:</label>
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

            <div className="conversion-input">
              <div className="input-group">
                <label htmlFor="value-input">Value:</label>
                <input
                  id="value-input"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="value-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="from-unit">From Unit:</label>
                <select
                  id="from-unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="unit-select"
                  disabled={sourceUnits.length === 0}
                >
                  {sourceUnits.length === 0 ? (
                    <option value="">No source units available</option>
                  ) : (
                    sourceUnits.map(([unitKey, unitData]) => (
                      <option key={unitKey} value={unitKey}>
                        {unitData.name} ({unitData.symbol})
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="uncertainty-controls">
              <label className="uncertainty-toggle">
                <input
                  type="checkbox"
                  checked={showUncertainty}
                  onChange={(e) => setShowUncertainty(e.target.checked)}
                />
                Include uncertainty/error propagation
              </label>
              
              {showUncertainty && (
                <div className="uncertainty-input">
                  <label htmlFor="uncertainty-input">Uncertainty (±):</label>
                  <input
                    id="uncertainty-input"
                    type="number"
                    value={inputUncertainty}
                    onChange={(e) => setInputUncertainty(e.target.value)}
                    placeholder="Enter uncertainty"
                    step="any"
                    min="0"
                    className="value-input"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="results-section">
            <h3>Converted to {systemInfo.name} Units:</h3>
            {conversions.length === 0 ? (
              <p className="no-results">
                {targetUnits.length === 0 
                  ? `No ${systemInfo.name} units available for ${UNIT_CATEGORIES[selectedCategory]?.name || 'this category'}`
                  : !fromUnit
                  ? `No source units available for ${UNIT_CATEGORIES[selectedCategory]?.name || 'this category'}`
                  : 'Enter a value to see conversions'
                }
              </p>
            ) : (
              <div className="conversions-grid">
                {conversions.map((conversion, index) => (
                  <div key={index} className="conversion-result">
                    <div className="result-value">{conversion.formatted}</div>
                    <div className="result-unit">
                      <strong>{conversion.symbol}</strong>
                      <span>{conversion.name}</span>
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText(conversion.formatted)}
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <div className="system-info">
            <h3>About {systemInfo.name} Units</h3>
            <p>{systemInfo.details}</p>
            
            {systemInfo.examples && (
              <div className="examples">
                <h4>Common Units:</h4>
                <ul>
                  {systemInfo.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="other-converters">
            <h3>Other Specialized Converters:</h3>
            <div className="converter-links">
              {targetSystem !== 'atomic' && (
                <Link to="/atomic" className="converter-link atomic">
                  <span className="icon">⚛️</span>
                  <div>
                    <strong>Atomic Units</strong>
                    <small>For quantum physics</small>
                  </div>
                </Link>
              )}
              {targetSystem !== 'cgs' && (
                <Link to="/cgs" className="converter-link cgs">
                  <span className="icon">🧮</span>
                  <div>
                    <strong>CGS Units</strong>
                    <small>Centimeter-Gram-Second</small>
                  </div>
                </Link>
              )}
              {targetSystem !== 'si' && (
                <Link to="/si" className="converter-link si">
                  <span className="icon">📐</span>
                  <div>
                    <strong>SI Units</strong>
                    <small>International System</small>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TargetSystemConverter
