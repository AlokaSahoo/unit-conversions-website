import React, { useState, useEffect } from 'react';
import { convertUnits, formatNumber, UNIT_CATEGORIES } from '../utils/physicsConversions';
import { convertUnitsWithUncertainty, UncertaintyValue } from '../utils/uncertaintyCalculations';
import './UnitConverter.css';

const UnitConverter = ({ category }) => {
  const [inputValue, setInputValue] = useState('');
  const [inputUncertainty, setInputUncertainty] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');
  const [showUncertainty, setShowUncertainty] = useState(false);

  const categoryData = UNIT_CATEGORIES[category];
  const units = categoryData?.units || {};
  const unitKeys = Object.keys(units);

  // Set default units when category changes
  useEffect(() => {
    if (unitKeys.length >= 2) {
      setFromUnit(unitKeys[0]);
      setToUnit(unitKeys[1]);
    }
    setInputValue('');
    setResult('');
  }, [category]);

  // Perform conversion when input or units change
  useEffect(() => {
    if (inputValue && !isNaN(inputValue) && fromUnit && toUnit) {
      try {
        const numValue = parseFloat(inputValue);
        
        if (showUncertainty && inputUncertainty && !isNaN(inputUncertainty)) {
          const numUncertainty = parseFloat(inputUncertainty);
          const resultWithUncertainty = convertUnitsWithUncertainty(
            numValue, 
            numUncertainty,
            fromUnit, 
            toUnit, 
            category
          );
          
          if (resultWithUncertainty) {
            setResult(resultWithUncertainty.toString());
          } else {
            setResult('Conversion not available');
          }
        } else {
          // Standard conversion without uncertainty
          const converted = convertUnits(numValue, fromUnit, toUnit, category);
          setResult(formatNumber(converted));
        }
      } catch (error) {
        console.error('Conversion error:', error);
        setResult(`Error: ${error.message}`);
      }
    } else {
      setResult('');
    }
  }, [inputValue, inputUncertainty, fromUnit, toUnit, category, showUncertainty]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    // Optionally swap the values too
    if (result && !isNaN(result)) {
      setInputValue(result);
    }
  };

  const clearAll = () => {
    setInputValue('');
    setInputUncertainty('');
    setResult('');
  };

  const copyResult = () => {
    if (result && result !== 'Error') {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <div className="unit-converter">
      <div className="converter-header">
        <h3>{categoryData?.name || category} Conversion</h3>
        <p>Convert between different {categoryData?.name?.toLowerCase()} units</p>
      </div>
      
      <div className="conversion-container">
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
              <label htmlFor={`uncertainty-${category}`}>Uncertainty (±):</label>
              <input
                id={`uncertainty-${category}`}
                type="number"
                value={inputUncertainty}
                onChange={(e) => setInputUncertainty(e.target.value)}
                placeholder="Enter uncertainty"
                step="any"
                min="0"
              />
            </div>
          )}
        </div>

        <div className="conversion-row">
          <div className="input-section">
            <label htmlFor={`input-${category}`}>From:</label>
            <div className="input-with-unit">
              <input
                id={`input-${category}`}
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter value"
                step="any"
              />
              <select 
                value={fromUnit} 
                onChange={handleFromUnitChange}
                className="unit-select"
              >
                {unitKeys.map(unitKey => (
                  <option key={unitKey} value={unitKey}>
                    {units[unitKey].symbol} - {units[unitKey].name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="conversion-controls">
            <button onClick={swapUnits} className="swap-button" title="Swap units">
              ⇄
            </button>
          </div>

          <div className="result-section">
            <label htmlFor={`result-${category}`}>To:</label>
            <div className="input-with-unit">
              <input
                id={`result-${category}`}
                type="text"
                value={result}
                placeholder="Result"
                readOnly
                className="result-input"
              />
              <select 
                value={toUnit} 
                onChange={handleToUnitChange}
                className="unit-select"
              >
                {unitKeys.map(unitKey => (
                  <option key={unitKey} value={unitKey}>
                    {units[unitKey].symbol} - {units[unitKey].name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={clearAll} className="clear-button">
            Clear
          </button>
          <button onClick={copyResult} className="copy-button" disabled={!result || result === 'Error'}>
            Copy Result
          </button>
        </div>

        {inputValue && result && result !== 'Error' && (
          <div className="conversion-summary">
            <p>
              <strong>{inputValue} {units[fromUnit]?.symbol}</strong> = 
              <strong> {result} {units[toUnit]?.symbol}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="unit-info">
        <details>
          <summary>Available Units ({unitKeys.length})</summary>
          <div className="units-grid">
            {unitKeys.map(unitKey => (
              <div key={unitKey} className="unit-item">
                <span className="unit-symbol">{units[unitKey].symbol}</span>
                <span className="unit-name">{units[unitKey].name}</span>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default UnitConverter;
