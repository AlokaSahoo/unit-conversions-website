// Enhanced Physics Unit Conversion Utilities
// Supporting multiple units within each physical quantity category

// Base conversion factors (everything converted to SI base units first, then to target)
export const CONVERSION_FACTORS = {
  length: {
    // All to meters
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    μm: 1e-6,
    nm: 1e-9,
    pm: 1e-12,
    fm: 1e-15,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144,
    mi: 1609.344,
    ly: 9.461e15, // light year
    au: 1.496e11, // astronomical unit
    pc: 3.086e16, // parsec
    'a₀': 5.29177210903e-11, // Bohr radius
    Å: 1e-10, // Angstrom
  },
  
  mass: {
    // All to kg
    kg: 1,
    g: 0.001,
    mg: 1e-6,
    μg: 1e-9,
    t: 1000, // metric ton
    lb: 0.453592,
    oz: 0.0283495,
    u: 1.66054e-27, // atomic mass unit
    'mₑ': 9.1093837015e-31, // electron mass
    'mₚ': 1.67262e-27, // proton mass
    'M☉': 1.989e30, // solar mass
  },
  
  time: {
    // All to seconds
    s: 1,
    ms: 0.001,
    μs: 1e-6,
    ns: 1e-9,
    ps: 1e-12,
    fs: 1e-15,
    min: 60,
    h: 3600,
    d: 86400,
    yr: 31557600, // year
    'ℏ/Eh': 2.4188843265857e-17, // atomic time unit
  },
  
  energy: {
    // All to Joules
    J: 1,
    kJ: 1000,
    MJ: 1e6,
    GJ: 1e9,
    eV: 1.602176634e-19,
    keV: 1.602176634e-16,
    MeV: 1.602176634e-13,
    GeV: 1.602176634e-10,
    cal: 4.184,
    kcal: 4184,
    Wh: 3600,
    kWh: 3.6e6,
    erg: 1e-7,
    'Eh': 4.3597447222071e-18, // Hartree
    Ry: 2.1798723611035e-18, // Rydberg
  },
  
  power: {
    // All to Watts
    W: 1,
    kW: 1000,
    MW: 1e6,
    GW: 1e9,
    hp: 745.7, // horsepower
    'cal/s': 4.184,
    'erg/s': 1e-7,
  },
  
  force: {
    // All to Newtons
    N: 1,
    kN: 1000,
    MN: 1e6,
    dyn: 1e-5,
    lbf: 4.44822,
    kgf: 9.80665,
    'Eh/a₀': 8.2387234983e-8, // atomic force unit
  },
  
  pressure: {
    // All to Pascals
    Pa: 1,
    kPa: 1000,
    MPa: 1e6,
    GPa: 1e9,
    bar: 1e5,
    mbar: 100,
    atm: 101325,
    mmHg: 133.322,
    Torr: 133.322,
    psi: 6894.76,
    'dyn/cm²': 0.1,
    'Eh/a₀³': 2.9421e13, // atomic pressure unit
  },
  
  velocity: {
    // All to m/s
    'm/s': 1,
    'km/s': 1000,
    'km/h': 0.277778,
    'mph': 0.44704,
    'ft/s': 0.3048,
    'cm/s': 0.01,
    c: 299792458, // speed of light
    'a₀Eh/ℏ': 2.18769126364e6, // atomic velocity
  },
  
  electricField: {
    // All to V/m
    'V/m': 1,
    'kV/m': 1000,
    'MV/m': 1e6,
    'V/cm': 100,
    'kV/cm': 1e5,
    'statV/cm': 29979.2458,
    'Eh/(e·a₀)': 5.14220674763e11, // atomic electric field
  },
  
  magneticField: {
    // All to Tesla
    T: 1,
    mT: 0.001,
    μT: 1e-6,
    nT: 1e-9,
    G: 1e-4, // Gauss
    kG: 0.1,
    Oe: 7.95775e-5, // Oersted (in vacuum)
    'ℏ/(e·a₀²)': 2.35051756758e5, // atomic magnetic field
  },
  
  frequency: {
    // All to Hz
    Hz: 1,
    kHz: 1000,
    MHz: 1e6,
    GHz: 1e9,
    THz: 1e12,
    'rad/s': 0.159155, // radians per second
    rpm: 0.0166667, // revolutions per minute
    'Eh/ℏ': 4.13413e16, // atomic frequency
  },
  
  temperature: {
    // All to Kelvin (special handling needed)
    K: { offset: 0, factor: 1 },
    '°C': { offset: 273.15, factor: 1 },
    '°F': { offset: 255.372, factor: 5/9 },
    '°R': { offset: 0, factor: 5/9 }, // Rankine
  }
};

// Unit categories and their display information
export const UNIT_CATEGORIES = {
  length: {
    name: 'Length',
    units: {
      m: { symbol: 'm', name: 'meters' },
      km: { symbol: 'km', name: 'kilometers' },
      cm: { symbol: 'cm', name: 'centimeters' },
      mm: { symbol: 'mm', name: 'millimeters' },
      μm: { symbol: 'μm', name: 'micrometers' },
      nm: { symbol: 'nm', name: 'nanometers' },
      pm: { symbol: 'pm', name: 'picometers' },
      fm: { symbol: 'fm', name: 'femtometers' },
      ft: { symbol: 'ft', name: 'feet' },
      in: { symbol: 'in', name: 'inches' },
      yd: { symbol: 'yd', name: 'yards' },
      mi: { symbol: 'mi', name: 'miles' },
      ly: { symbol: 'ly', name: 'light years' },
      au: { symbol: 'AU', name: 'astronomical units' },
      pc: { symbol: 'pc', name: 'parsecs' },
      'a₀': { symbol: 'a₀', name: 'Bohr radii' },
      Å: { symbol: 'Å', name: 'Angstroms' },
    }
  },
  
  mass: {
    name: 'Mass',
    units: {
      kg: { symbol: 'kg', name: 'kilograms' },
      g: { symbol: 'g', name: 'grams' },
      mg: { symbol: 'mg', name: 'milligrams' },
      μg: { symbol: 'μg', name: 'micrograms' },
      t: { symbol: 't', name: 'metric tons' },
      lb: { symbol: 'lb', name: 'pounds' },
      oz: { symbol: 'oz', name: 'ounces' },
      u: { symbol: 'u', name: 'atomic mass units' },
      'mₑ': { symbol: 'mₑ', name: 'electron masses' },
      'mₚ': { symbol: 'mₚ', name: 'proton masses' },
      'M☉': { symbol: 'M☉', name: 'solar masses' },
    }
  },
  
  time: {
    name: 'Time',
    units: {
      s: { symbol: 's', name: 'seconds' },
      ms: { symbol: 'ms', name: 'milliseconds' },
      μs: { symbol: 'μs', name: 'microseconds' },
      ns: { symbol: 'ns', name: 'nanoseconds' },
      ps: { symbol: 'ps', name: 'picoseconds' },
      fs: { symbol: 'fs', name: 'femtoseconds' },
      min: { symbol: 'min', name: 'minutes' },
      h: { symbol: 'h', name: 'hours' },
      d: { symbol: 'd', name: 'days' },
      yr: { symbol: 'yr', name: 'years' },
      'ℏ/Eh': { symbol: 'ℏ/Eh', name: 'atomic time units' },
    }
  },
  
  energy: {
    name: 'Energy',
    units: {
      J: { symbol: 'J', name: 'Joules' },
      kJ: { symbol: 'kJ', name: 'kilojoules' },
      MJ: { symbol: 'MJ', name: 'megajoules' },
      GJ: { symbol: 'GJ', name: 'gigajoules' },
      eV: { symbol: 'eV', name: 'electron volts' },
      keV: { symbol: 'keV', name: 'kilo electron volts' },
      MeV: { symbol: 'MeV', name: 'mega electron volts' },
      GeV: { symbol: 'GeV', name: 'giga electron volts' },
      cal: { symbol: 'cal', name: 'calories' },
      kcal: { symbol: 'kcal', name: 'kilocalories' },
      Wh: { symbol: 'Wh', name: 'watt hours' },
      kWh: { symbol: 'kWh', name: 'kilowatt hours' },
      erg: { symbol: 'erg', name: 'ergs' },
      'Eh': { symbol: 'Eh', name: 'Hartree' },
      Ry: { symbol: 'Ry', name: 'Rydberg' },
    }
  },
  
  power: {
    name: 'Power',
    units: {
      W: { symbol: 'W', name: 'Watts' },
      kW: { symbol: 'kW', name: 'kilowatts' },
      MW: { symbol: 'MW', name: 'megawatts' },
      GW: { symbol: 'GW', name: 'gigawatts' },
      hp: { symbol: 'hp', name: 'horsepower' },
      'cal/s': { symbol: 'cal/s', name: 'calories per second' },
      'erg/s': { symbol: 'erg/s', name: 'ergs per second' },
    }
  },
  
  force: {
    name: 'Force',
    units: {
      N: { symbol: 'N', name: 'Newtons' },
      kN: { symbol: 'kN', name: 'kilonewtons' },
      MN: { symbol: 'MN', name: 'meganewtons' },
      dyn: { symbol: 'dyn', name: 'dynes' },
      lbf: { symbol: 'lbf', name: 'pound-force' },
      kgf: { symbol: 'kgf', name: 'kilogram-force' },
      'Eh/a₀': { symbol: 'Eh/a₀', name: 'atomic force units' },
    }
  },
  
  pressure: {
    name: 'Pressure',
    units: {
      Pa: { symbol: 'Pa', name: 'Pascals' },
      kPa: { symbol: 'kPa', name: 'kilopascals' },
      MPa: { symbol: 'MPa', name: 'megapascals' },
      GPa: { symbol: 'GPa', name: 'gigapascals' },
      bar: { symbol: 'bar', name: 'bars' },
      mbar: { symbol: 'mbar', name: 'millibars' },
      atm: { symbol: 'atm', name: 'atmospheres' },
      mmHg: { symbol: 'mmHg', name: 'mmHg' },
      Torr: { symbol: 'Torr', name: 'Torr' },
      psi: { symbol: 'psi', name: 'psi' },
      'dyn/cm²': { symbol: 'dyn/cm²', name: 'dyne/cm²' },
      'Eh/a₀³': { symbol: 'Eh/a₀³', name: 'atomic pressure units' },
    }
  },
  
  velocity: {
    name: 'Velocity',
    units: {
      'm/s': { symbol: 'm/s', name: 'meters per second' },
      'km/s': { symbol: 'km/s', name: 'kilometers per second' },
      'km/h': { symbol: 'km/h', name: 'kilometers per hour' },
      'mph': { symbol: 'mph', name: 'miles per hour' },
      'ft/s': { symbol: 'ft/s', name: 'feet per second' },
      'cm/s': { symbol: 'cm/s', name: 'centimeters per second' },
      c: { symbol: 'c', name: 'speed of light' },
      'a₀Eh/ℏ': { symbol: 'a₀Eh/ℏ', name: 'atomic velocity units' },
    }
  },
  
  electricField: {
    name: 'Electric Field',
    units: {
      'V/m': { symbol: 'V/m', name: 'volts per meter' },
      'kV/m': { symbol: 'kV/m', name: 'kilovolts per meter' },
      'MV/m': { symbol: 'MV/m', name: 'megavolts per meter' },
      'V/cm': { symbol: 'V/cm', name: 'volts per centimeter' },
      'kV/cm': { symbol: 'kV/cm', name: 'kilovolts per centimeter' },
      'statV/cm': { symbol: 'statV/cm', name: 'statvolts per centimeter' },
      'Eh/(e·a₀)': { symbol: 'Eh/(e·a₀)', name: 'atomic electric field units' },
    }
  },
  
  magneticField: {
    name: 'Magnetic Field',
    units: {
      T: { symbol: 'T', name: 'Tesla' },
      mT: { symbol: 'mT', name: 'millitesla' },
      μT: { symbol: 'μT', name: 'microtesla' },
      nT: { symbol: 'nT', name: 'nanotesla' },
      G: { symbol: 'G', name: 'Gauss' },
      kG: { symbol: 'kG', name: 'kilogauss' },
      Oe: { symbol: 'Oe', name: 'Oersted' },
      'ℏ/(e·a₀²)': { symbol: 'ℏ/(e·a₀²)', name: 'atomic magnetic field units' },
    }
  },
  
  frequency: {
    name: 'Frequency',
    units: {
      Hz: { symbol: 'Hz', name: 'Hertz' },
      kHz: { symbol: 'kHz', name: 'kilohertz' },
      MHz: { symbol: 'MHz', name: 'megahertz' },
      GHz: { symbol: 'GHz', name: 'gigahertz' },
      THz: { symbol: 'THz', name: 'terahertz' },
      'rad/s': { symbol: 'rad/s', name: 'radians per second' },
      rpm: { symbol: 'rpm', name: 'revolutions per minute' },
      'Eh/ℏ': { symbol: 'Eh/ℏ', name: 'atomic frequency units' },
    }
  },
  
  temperature: {
    name: 'Temperature',
    units: {
      K: { symbol: 'K', name: 'Kelvin' },
      '°C': { symbol: '°C', name: 'Celsius' },
      '°F': { symbol: '°F', name: 'Fahrenheit' },
      '°R': { symbol: '°R', name: 'Rankine' },
    }
  }
};

// Conversion functions: CGS to Atomic Units
export const cgsToAtomic = {
  // Length: centimeters to Bohr radii
  length: (cm) => (cm / 100) / ATOMIC_CONSTANTS.BOHR_RADIUS,
  
  // Energy: ergs to Hartree
  energy: (ergs) => (ergs / 1e7) / ATOMIC_CONSTANTS.HARTREE_ENERGY,
  
  // Mass: grams to electron masses
  mass: (grams) => (grams / 1000) / ATOMIC_CONSTANTS.ELECTRON_MASS,
  
  // Time: seconds to atomic time units (same as SI)
  time: (seconds) => seconds / ATOMIC_CONSTANTS.ATOMIC_TIME,
  
  // Velocity: cm/s to atomic velocity units
  velocity: (cmPerSec) => (cmPerSec / 100) / ATOMIC_CONSTANTS.ATOMIC_VELOCITY,
  
  // Electric field: statV/cm to atomic electric field units
  electricField: (statVPerCm) => (statVPerCm * 29979.2458) / ATOMIC_CONSTANTS.ATOMIC_ELECTRIC_FIELD,
  
  // Magnetic field: Gauss to atomic magnetic field units
  magneticField: (gauss) => (gauss / 10000) / ATOMIC_CONSTANTS.ATOMIC_MAGNETIC_FIELD,
  
  // Force: dyne to atomic force units
  force: (dyne) => (dyne / 1e5) / (ATOMIC_CONSTANTS.HARTREE_ENERGY / ATOMIC_CONSTANTS.BOHR_RADIUS),
  
  // Pressure: dyne/cm² to atomic pressure units
  pressure: (dynePerCm2) => (dynePerCm2 / 10) / (ATOMIC_CONSTANTS.HARTREE_ENERGY / Math.pow(ATOMIC_CONSTANTS.BOHR_RADIUS, 3)),
  
  // Frequency: Hz to atomic frequency units (same as SI)
  frequency: (hz) => hz * ATOMIC_CONSTANTS.ATOMIC_TIME
};

// Conversion functions: Atomic Units to CGS
export const atomicToCgs = {
  // Length: Bohr radii to centimeters
  length: (bohrRadii) => (bohrRadii * ATOMIC_CONSTANTS.BOHR_RADIUS) * 100,
  
  // Energy: Hartree to ergs
  energy: (hartree) => (hartree * ATOMIC_CONSTANTS.HARTREE_ENERGY) * 1e7,
  
  // Mass: electron masses to grams
  mass: (electronMasses) => (electronMasses * ATOMIC_CONSTANTS.ELECTRON_MASS) * 1000,
  
  // Time: atomic time units to seconds (same as SI)
  time: (atomicTime) => atomicTime * ATOMIC_CONSTANTS.ATOMIC_TIME,
  
  // Velocity: atomic velocity units to cm/s
  velocity: (atomicVel) => (atomicVel * ATOMIC_CONSTANTS.ATOMIC_VELOCITY) * 100,
  
  // Electric field: atomic electric field units to statV/cm
  electricField: (atomicEField) => (atomicEField * ATOMIC_CONSTANTS.ATOMIC_ELECTRIC_FIELD) / 29979.2458,
  
  // Magnetic field: atomic magnetic field units to Gauss
  magneticField: (atomicBField) => (atomicBField * ATOMIC_CONSTANTS.ATOMIC_MAGNETIC_FIELD) * 10000,
  
  // Force: atomic force units to dyne
  force: (atomicForce) => (atomicForce * (ATOMIC_CONSTANTS.HARTREE_ENERGY / ATOMIC_CONSTANTS.BOHR_RADIUS)) * 1e5,
  
  // Pressure: atomic pressure units to dyne/cm²
  pressure: (atomicPressure) => (atomicPressure * (ATOMIC_CONSTANTS.HARTREE_ENERGY / Math.pow(ATOMIC_CONSTANTS.BOHR_RADIUS, 3))) * 10,
  
  // Frequency: atomic frequency units to Hz (same as SI)
  frequency: (atomicFreq) => atomicFreq / ATOMIC_CONSTANTS.ATOMIC_TIME
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

// Universal conversion function
export const convertUnits = (value, fromUnit, toUnit, category) => {
  if (fromUnit === toUnit) return value;
  
  const factors = CONVERSION_FACTORS[category];
  if (!factors || !factors[fromUnit] || !factors[toUnit]) {
    throw new Error(`Conversion not supported: ${fromUnit} to ${toUnit} in ${category}`);
  }
  
  // Special handling for temperature
  if (category === 'temperature') {
    const fromFactor = factors[fromUnit];
    const toFactor = factors[toUnit];
    
    // Convert to Kelvin first
    let kelvin;
    if (fromUnit === '°C') {
      kelvin = value + 273.15;
    } else if (fromUnit === '°F') {
      kelvin = (value + 459.67) * (5/9);
    } else if (fromUnit === '°R') {
      kelvin = value * (5/9);
    } else {
      kelvin = value; // Already Kelvin
    }
    
    // Convert from Kelvin to target
    if (toUnit === '°C') {
      return kelvin - 273.15;
    } else if (toUnit === '°F') {
      return kelvin * (9/5) - 459.67;
    } else if (toUnit === '°R') {
      return kelvin * (9/5);
    } else {
      return kelvin; // Target is Kelvin
    }
  }
  
  // Standard conversion: value * (fromFactor / toFactor)
  const fromFactor = factors[fromUnit];
  const toFactor = factors[toUnit];
  
  return value * (fromFactor / toFactor);
};

// Format numbers for display
export const formatNumber = (num) => {
  if (Math.abs(num) < 1e-15) return '0';
  if (Math.abs(num) >= 1e6 || Math.abs(num) < 1e-3) {
    return num.toExponential(6);
  }
  return num.toPrecision(10);
};

// Get available categories
export const getCategories = () => Object.keys(UNIT_CATEGORIES);

// Get units for a category
export const getUnitsForCategory = (category) => {
  return UNIT_CATEGORIES[category]?.units || {};
};
