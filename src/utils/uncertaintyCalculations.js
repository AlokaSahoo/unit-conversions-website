/**
 * Uncertainty propagation utilities for physics unit conversions
 * Implements proper error propagation for linear and nonlinear transformations
 */
import { CONVERSION_FACTORS } from './physicsConversions.js';

export class UncertaintyValue {
  constructor(value, uncertainty = 0) {
    this.value = parseFloat(value) || 0;
    this.uncertainty = Math.abs(parseFloat(uncertainty)) || 0;
  }

  // Convert to string with proper significant figures based on uncertainty
  toString(maxDigits = 6) {
    if (this.uncertainty === 0) {
      return this.formatValue(this.value, maxDigits);
    }

    // Determine significant figures from uncertainty
    const uncertaintyOrder = Math.floor(Math.log10(Math.abs(this.uncertainty)));
    const precision = Math.max(0, 2 - uncertaintyOrder); // Keep 1-2 significant figures in uncertainty
    
    const roundedValue = parseFloat(this.value.toFixed(precision));
    const roundedUncertainty = parseFloat(this.uncertainty.toFixed(precision));
    
    return `${this.formatValue(roundedValue, maxDigits)} ± ${this.formatValue(roundedUncertainty, maxDigits)}`;
  }

  // Format individual values with appropriate notation
  formatValue(num, maxDigits) {
    if (Math.abs(num) < 1e-15) return '0';
    if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-6) {
      return num.toExponential(Math.min(maxDigits - 1, 6));
    }
    return parseFloat(num.toPrecision(maxDigits)).toString();
  }

  // Multiply by a constant (linear transformation)
  // For f(x) = ax, uncertainty: σ_f = |a| * σ_x
  multiplyBy(factor) {
    return new UncertaintyValue(
      this.value * factor,
      this.uncertainty * Math.abs(factor)
    );
  }

  // Add a constant (translation)
  // For f(x) = x + c, uncertainty: σ_f = σ_x
  add(constant) {
    return new UncertaintyValue(
      this.value + constant,
      this.uncertainty
    );
  }

  // Subtract from constant
  // For f(x) = c - x, uncertainty: σ_f = σ_x
  subtractFrom(constant) {
    return new UncertaintyValue(
      constant - this.value,
      this.uncertainty
    );
  }

  // General linear transformation: f(x) = ax + b
  linearTransform(slope, intercept) {
    return new UncertaintyValue(
      slope * this.value + intercept,
      Math.abs(slope) * this.uncertainty
    );
  }

  // Relative uncertainty (coefficient of variation)
  getRelativeUncertainty() {
    return this.value !== 0 ? Math.abs(this.uncertainty / this.value) : 0;
  }

  // Check if two values agree within uncertainties
  agreesWith(other, nSigma = 2) {
    const difference = Math.abs(this.value - other.value);
    const combinedUncertainty = Math.sqrt(this.uncertainty**2 + other.uncertainty**2);
    return difference <= nSigma * combinedUncertainty;
  }
}

/**
 * Enhanced conversion function with uncertainty propagation
 */
export const convertUnitsWithUncertainty = (value, uncertainty, fromUnit, toUnit, category) => {
  const uncertaintyValue = new UncertaintyValue(value, uncertainty);
  
  if (fromUnit === toUnit) return uncertaintyValue;
  
  // Special handling for temperature conversions
  if (category === 'temperature') {
    return convertTemperatureWithUncertainty(uncertaintyValue, fromUnit, toUnit);
  }
  
  // Get conversion factors from the existing system
  const factors = CONVERSION_FACTORS[category];
  
  if (!factors || !factors[fromUnit] || !factors[toUnit]) {
    throw new Error(`Conversion not supported: ${fromUnit} to ${toUnit} in ${category}`);
  }
  
  // Standard linear conversion: value * (fromFactor / toFactor)
  const fromFactor = factors[fromUnit];
  const toFactor = factors[toUnit];
  
  // Handle special cases (like temperature offsets)
  if (typeof fromFactor === 'object' && fromFactor.offset !== undefined) {
    throw new Error('Complex conversions handled separately');
  }
  
  const conversionFactor = fromFactor / toFactor;
  return uncertaintyValue.multiplyBy(conversionFactor);
};

/**
 * Temperature conversions with proper uncertainty propagation
 */
function convertTemperatureWithUncertainty(uncertaintyValue, fromUnit, toUnit) {
  // Convert to Kelvin first
  let inKelvin;
  
  switch (fromUnit) {
    case 'K':
      inKelvin = uncertaintyValue;
      break;
    case '°C':
      inKelvin = uncertaintyValue.add(273.15);
      break;
    case '°F':
      // °F to K: (°F + 459.67) × 5/9
      inKelvin = uncertaintyValue.add(459.67).multiplyBy(5/9);
      break;
    case '°R':
      // °R to K: °R × 5/9
      inKelvin = uncertaintyValue.multiplyBy(5/9);
      break;
    case 'eV':
      // eV to K: eV × 11604.518
      inKelvin = uncertaintyValue.multiplyBy(11604.518);
      break;
    case 'Eh/kB':
      // Atomic temperature to K
      inKelvin = uncertaintyValue.multiplyBy(315775.02);
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }
  
  // Convert from Kelvin to target unit
  switch (toUnit) {
    case 'K':
      return inKelvin;
    case '°C':
      return inKelvin.add(-273.15);
    case '°F':
      // K to °F: K × 9/5 - 459.67
      return inKelvin.multiplyBy(9/5).add(-459.67);
    case '°R':
      // K to °R: K × 9/5
      return inKelvin.multiplyBy(9/5);
    case 'eV':
      // K to eV: K / 11604.518
      return inKelvin.multiplyBy(1/11604.518);
    case 'Eh/kB':
      // K to atomic temperature
      return inKelvin.multiplyBy(1/315775.02);
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
}

/**
 * Utility functions for uncertainty analysis
 */

// Calculate weighted average of multiple measurements
export function weightedAverage(values, uncertainties) {
  if (values.length !== uncertainties.length) {
    throw new Error('Values and uncertainties arrays must have the same length');
  }
  
  let weightedSum = 0;
  let weightSum = 0;
  
  for (let i = 0; i < values.length; i++) {
    const weight = 1 / (uncertainties[i] ** 2);
    weightedSum += values[i] * weight;
    weightSum += weight;
  }
  
  const weightedMean = weightedSum / weightSum;
  const combinedUncertainty = Math.sqrt(1 / weightSum);
  
  return new UncertaintyValue(weightedMean, combinedUncertainty);
}

// Chi-squared test for consistency of measurements
export function chiSquaredTest(values, uncertainties, expectedValue = null) {
  const mean = expectedValue || values.reduce((sum, val) => sum + val, 0) / values.length;
  
  let chiSquared = 0;
  for (let i = 0; i < values.length; i++) {
    chiSquared += Math.pow((values[i] - mean) / uncertainties[i], 2);
  }
  
  const degreesOfFreedom = expectedValue ? values.length : values.length - 1;
  const reducedChiSquared = chiSquared / degreesOfFreedom;
  
  return {
    chiSquared,
    degreesOfFreedom,
    reducedChiSquared,
    isConsistent: reducedChiSquared < 2.0 // Rule of thumb
  };
}

// Round to significant figures based on uncertainty
export function roundToSignificantFigures(value, uncertainty, maxSigFigs = 6) {
  if (uncertainty === 0) {
    return parseFloat(value.toPrecision(maxSigFigs));
  }
  
  const uncertaintyOrder = Math.floor(Math.log10(Math.abs(uncertainty)));
  const sigFigs = Math.max(1, Math.min(maxSigFigs, 1 - uncertaintyOrder));
  
  const factor = Math.pow(10, sigFigs - Math.floor(Math.log10(Math.abs(value))) - 1);
  return Math.round(value * factor) / factor;
}
