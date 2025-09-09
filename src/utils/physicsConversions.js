// Physics Unit Conversion Utilities
// Converting between SI units and Atomic units

// Physical constants (atomic units)
export const ATOMIC_CONSTANTS = {
  // Bohr radius (a₀) in meters
  BOHR_RADIUS: 5.29177210903e-11,
  
  // Hartree energy (Eh) in Joules
  HARTREE_ENERGY: 4.3597447222071e-18,
  
  // Electron mass (mₑ) in kg
  ELECTRON_MASS: 9.1093837015e-31,
  
  // Atomic time unit (ℏ/Eh) in seconds
  ATOMIC_TIME: 2.4188843265857e-17,
  
  // Elementary charge (e) in Coulombs
  ELEMENTARY_CHARGE: 1.602176634e-19,
  
  // Atomic velocity (Bohr radius / atomic time) in m/s
  ATOMIC_VELOCITY: 2.18769126364e6,
  
  // Atomic electric field (Eh/(e×a₀)) in V/m
  ATOMIC_ELECTRIC_FIELD: 5.14220674763e11,
  
  // Atomic magnetic field in Tesla
  ATOMIC_MAGNETIC_FIELD: 2.35051756758e5
};

// Conversion functions: SI to Atomic Units
export const siToAtomic = {
  // Length: meters to Bohr radii
  length: (meters) => meters / ATOMIC_CONSTANTS.BOHR_RADIUS,
  
  // Energy: Joules to Hartree
  energy: (joules) => joules / ATOMIC_CONSTANTS.HARTREE_ENERGY,
  
  // Mass: kg to electron masses
  mass: (kg) => kg / ATOMIC_CONSTANTS.ELECTRON_MASS,
  
  // Time: seconds to atomic time units
  time: (seconds) => seconds / ATOMIC_CONSTANTS.ATOMIC_TIME,
  
  // Velocity: m/s to atomic velocity units
  velocity: (mPerSec) => mPerSec / ATOMIC_CONSTANTS.ATOMIC_VELOCITY,
  
  // Electric field: V/m to atomic electric field units
  electricField: (vPerMeter) => vPerMeter / ATOMIC_CONSTANTS.ATOMIC_ELECTRIC_FIELD,
  
  // Magnetic field: Tesla to atomic magnetic field units
  magneticField: (tesla) => tesla / ATOMIC_CONSTANTS.ATOMIC_MAGNETIC_FIELD,
  
  // Force: Newton to atomic force units (Eh/a₀)
  force: (newton) => newton / (ATOMIC_CONSTANTS.HARTREE_ENERGY / ATOMIC_CONSTANTS.BOHR_RADIUS),
  
  // Pressure: Pascal to atomic pressure units
  pressure: (pascal) => pascal / (ATOMIC_CONSTANTS.HARTREE_ENERGY / Math.pow(ATOMIC_CONSTANTS.BOHR_RADIUS, 3)),
  
  // Frequency: Hz to atomic frequency units
  frequency: (hz) => hz * ATOMIC_CONSTANTS.ATOMIC_TIME
};

// Conversion functions: Atomic Units to SI
export const atomicToSi = {
  // Length: Bohr radii to meters
  length: (bohrRadii) => bohrRadii * ATOMIC_CONSTANTS.BOHR_RADIUS,
  
  // Energy: Hartree to Joules
  energy: (hartree) => hartree * ATOMIC_CONSTANTS.HARTREE_ENERGY,
  
  // Mass: electron masses to kg
  mass: (electronMasses) => electronMasses * ATOMIC_CONSTANTS.ELECTRON_MASS,
  
  // Time: atomic time units to seconds
  time: (atomicTime) => atomicTime * ATOMIC_CONSTANTS.ATOMIC_TIME,
  
  // Velocity: atomic velocity units to m/s
  velocity: (atomicVel) => atomicVel * ATOMIC_CONSTANTS.ATOMIC_VELOCITY,
  
  // Electric field: atomic electric field units to V/m
  electricField: (atomicEField) => atomicEField * ATOMIC_CONSTANTS.ATOMIC_ELECTRIC_FIELD,
  
  // Magnetic field: atomic magnetic field units to Tesla
  magneticField: (atomicBField) => atomicBField * ATOMIC_CONSTANTS.ATOMIC_MAGNETIC_FIELD,
  
  // Force: atomic force units to Newton
  force: (atomicForce) => atomicForce * (ATOMIC_CONSTANTS.HARTREE_ENERGY / ATOMIC_CONSTANTS.BOHR_RADIUS),
  
  // Pressure: atomic pressure units to Pascal
  pressure: (atomicPressure) => atomicPressure * (ATOMIC_CONSTANTS.HARTREE_ENERGY / Math.pow(ATOMIC_CONSTANTS.BOHR_RADIUS, 3)),
  
  // Frequency: atomic frequency units to Hz
  frequency: (atomicFreq) => atomicFreq / ATOMIC_CONSTANTS.ATOMIC_TIME
};

// Unit definitions for display
export const UNITS = {
  length: {
    si: { symbol: 'm', name: 'meters' },
    atomic: { symbol: 'a₀', name: 'Bohr radii' }
  },
  energy: {
    si: { symbol: 'J', name: 'Joules' },
    atomic: { symbol: 'Eh', name: 'Hartree' }
  },
  mass: {
    si: { symbol: 'kg', name: 'kilograms' },
    atomic: { symbol: 'mₑ', name: 'electron masses' }
  },
  time: {
    si: { symbol: 's', name: 'seconds' },
    atomic: { symbol: 'ℏ/Eh', name: 'atomic time units' }
  },
  velocity: {
    si: { symbol: 'm/s', name: 'meters per second' },
    atomic: { symbol: 'a₀Eh/ℏ', name: 'atomic velocity units' }
  },
  electricField: {
    si: { symbol: 'V/m', name: 'volts per meter' },
    atomic: { symbol: 'Eh/(e·a₀)', name: 'atomic electric field units' }
  },
  magneticField: {
    si: { symbol: 'T', name: 'Tesla' },
    atomic: { symbol: 'ℏ/(e·a₀²)', name: 'atomic magnetic field units' }
  },
  force: {
    si: { symbol: 'N', name: 'Newton' },
    atomic: { symbol: 'Eh/a₀', name: 'atomic force units' }
  },
  pressure: {
    si: { symbol: 'Pa', name: 'Pascal' },
    atomic: { symbol: 'Eh/a₀³', name: 'atomic pressure units' }
  },
  frequency: {
    si: { symbol: 'Hz', name: 'Hertz' },
    atomic: { symbol: 'Eh/ℏ', name: 'atomic frequency units' }
  }
};

// Format numbers for display
export const formatNumber = (num) => {
  if (Math.abs(num) < 1e-15) return '0';
  if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-3) {
    return num.toExponential(6);
  }
  return num.toPrecision(8);
};
