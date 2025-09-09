import React, { useState } from 'react';
import { siToAtomic, atomicToSi, cgsToAtomic, atomicToCgs, UNITS, formatNumber } from '../utils/physicsConversions';
import './UnitConverter.css';

const UnitConverter = ({ quantity }) => {
  const [siValue, setSiValue] = useState('');
  const [cgsValue, setCgsValue] = useState('');
  const [atomicValue, setAtomicValue] = useState('');

  // Helper function to convert from atomic units to any system
  const fromAtomic = (atomicVal, targetSystem) => {
    if (targetSystem === 'si') return atomicToSi[quantity](atomicVal);
    if (targetSystem === 'cgs') return atomicToCgs[quantity](atomicVal);
    return atomicVal;
  };

  // Helper function to convert to atomic units from any system
  const toAtomic = (value, sourceSystem) => {
    if (sourceSystem === 'si') return siToAtomic[quantity](value);
    if (sourceSystem === 'cgs') return cgsToAtomic[quantity](value);
    return value;
  };

  const handleValueChange = (value, changedSystem) => {
    if (value && !isNaN(value)) {
      const atomicVal = toAtomic(parseFloat(value), changedSystem);
      
      // Update all other fields
      if (changedSystem !== 'si') {
        setSiValue(formatNumber(fromAtomic(atomicVal, 'si')));
      }
      if (changedSystem !== 'cgs') {
        setCgsValue(formatNumber(fromAtomic(atomicVal, 'cgs')));
      }
      if (changedSystem !== 'atomic') {
        setAtomicValue(formatNumber(atomicVal));
      }
    } else {
      // Clear all other fields if input is empty
      if (changedSystem !== 'si') setSiValue('');
      if (changedSystem !== 'cgs') setCgsValue('');
      if (changedSystem !== 'atomic') setAtomicValue('');
    }
  };

  const handleSiChange = (e) => {
    const value = e.target.value;
    setSiValue(value);
    handleValueChange(value, 'si');
  };

  const handleCgsChange = (e) => {
    const value = e.target.value;
    setCgsValue(value);
    handleValueChange(value, 'cgs');
  };

  const handleAtomicChange = (e) => {
    const value = e.target.value;
    setAtomicValue(value);
    handleValueChange(value, 'atomic');
  };

  const clearValues = () => {
    setSiValue('');
    setCgsValue('');
    setAtomicValue('');
  };

  const siUnit = UNITS[quantity].si;
  const cgsUnit = UNITS[quantity].cgs;
  const atomicUnit = UNITS[quantity].atomic;

  return (
    <div className="unit-converter">
      <div className="converter-header">
        <h3>{quantity.charAt(0).toUpperCase() + quantity.slice(1)} Conversion</h3>
        <p>Convert between SI, CGS, and atomic units</p>
      </div>
      
      <div className="conversion-inputs-grid">
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

        <div className="input-group">
          <label htmlFor={`cgs-${quantity}`}>
            CGS Unit ({cgsUnit.symbol})
          </label>
          <input
            id={`cgs-${quantity}`}
            type="number"
            value={cgsValue}
            onChange={handleCgsChange}
            placeholder={`Enter value in ${cgsUnit.name}`}
            step="any"
          />
          <span className="unit-label">{cgsUnit.name}</span>
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

      <div className="converter-controls">
        <button onClick={clearValues} className="clear-button" title="Clear all">
          Clear All
        </button>
      </div>

      <div className="conversion-info">
        <div className="conversion-factors">
          <p><strong>Conversion factors:</strong></p>
          <p>1 {siUnit.symbol} = {formatNumber(1 / (atomicToSi[quantity](1)))} {atomicUnit.symbol}</p>
          <p>1 {cgsUnit.symbol} = {formatNumber(1 / (atomicToCgs[quantity](1)))} {atomicUnit.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
