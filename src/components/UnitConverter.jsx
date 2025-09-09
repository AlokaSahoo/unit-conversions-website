import React, { useState } from 'react';
import { siToAtomic, atomicToSi, UNITS, formatNumber } from '../utils/physicsConversions';
import './UnitConverter.css';

const UnitConverter = ({ quantity }) => {
  const [siValue, setSiValue] = useState('');
  const [atomicValue, setAtomicValue] = useState('');
  const [direction, setDirection] = useState('siToAtomic'); // 'siToAtomic' or 'atomicToSi'

  const handleSiChange = (e) => {
    const value = e.target.value;
    setSiValue(value);
    
    if (value && !isNaN(value)) {
      let converted;
      if (direction === 'siToAtomic') {
        converted = siToAtomic[quantity](parseFloat(value));
      } else {
        converted = atomicToSi[quantity](parseFloat(value));
      }
      setAtomicValue(formatNumber(converted));
    } else {
      setAtomicValue('');
    }
  };

  const handleAtomicChange = (e) => {
    const value = e.target.value;
    setAtomicValue(value);
    
    if (value && !isNaN(value)) {
      let converted;
      if (direction === 'siToAtomic') {
        converted = atomicToSi[quantity](parseFloat(value));
      } else {
        converted = siToAtomic[quantity](parseFloat(value));
      }
      setSiValue(formatNumber(converted));
    } else {
      setSiValue('');
    }
  };

  const clearValues = () => {
    setSiValue('');
    setAtomicValue('');
  };

  const swap = () => {
    // Clear current values
    setSiValue('');
    setAtomicValue('');
    // Toggle the direction (this will swap the unit labels)
    setDirection(direction === 'siToAtomic' ? 'atomicToSi' : 'siToAtomic');
  };

  const siUnit = direction === 'siToAtomic' ? UNITS[quantity].si : UNITS[quantity].atomic;
  const atomicUnit = direction === 'siToAtomic' ? UNITS[quantity].atomic : UNITS[quantity].si;

  return (
    <div className="unit-converter">
      <div className="converter-header">
        <h3>{quantity.charAt(0).toUpperCase() + quantity.slice(1)} Conversion</h3>
        <p>Convert between SI units and atomic units</p>
      </div>
      
      <div className="conversion-inputs">
        <div className="input-group">
          <label htmlFor={`si-${quantity}`}>
            SI Unit ({siUnit.symbol})
          </label>
          <input
            id={`si-${quantity}`}
            type="number"
            value={siValue}
            onChange={handleSiChange}
            placeholder={`Enter value in ${siUnit.name}`}
            step="any"
          />
          <span className="unit-label">{siUnit.name}</span>
        </div>

        <div className="converter-controls">
          <button onClick={swap} className="swap-button" title="Swap units">
            ⇄
          </button>
          <button onClick={clearValues} className="clear-button" title="Clear all">
            Clear
          </button>
        </div>

        <div className="input-group">
          <label htmlFor={`atomic-${quantity}`}>
            Atomic Unit ({atomicUnit.symbol})
          </label>
          <input
            id={`atomic-${quantity}`}
            type="number"
            value={atomicValue}
            onChange={handleAtomicChange}
            placeholder={`Enter value in ${atomicUnit.name}`}
            step="any"
          />
          <span className="unit-label">{atomicUnit.name}</span>
        </div>
      </div>

      <div className="conversion-info">
        <p>
          <strong>Conversion factor:</strong> 1 {siUnit.symbol} = {
            direction === 'siToAtomic' 
              ? formatNumber(1 / (atomicToSi[quantity](1))) 
              : formatNumber(atomicToSi[quantity](1))
          } {atomicUnit.symbol}
        </p>
      </div>
    </div>
  );
};

export default UnitConverter;
