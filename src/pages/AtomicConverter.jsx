import React from 'react'
import TargetSystemConverter from '../components/TargetSystemConverter'

const systemInfo = {
  name: 'Atomic',
  title: 'Convert to Atomic Units',
  description: 'Convert any physical quantity to atomic units - the natural units used in quantum mechanics and atomic physics.',
  details: 'Atomic units are a system of natural units which is especially convenient for calculations in atomic physics and quantum chemistry. In this system, fundamental constants like ℏ, me, e, and 4πε₀ are all set to 1.',
  examples: [
    'Bohr radius (a₀) ≈ 5.29 × 10⁻¹¹ m - unit of length',
    'Hartree (Eₕ) ≈ 4.36 × 10⁻¹⁸ J - unit of energy', 
    'Electron mass (mₑ) ≈ 9.11 × 10⁻³¹ kg - unit of mass',
    'Atomic time unit ≈ 2.42 × 10⁻¹⁷ s - unit of time',
    'Atomic electric field ≈ 5.14 × 10¹¹ V/m'
  ]
}

function AtomicConverter() {
  return <TargetSystemConverter targetSystem="atomic" systemInfo={systemInfo} />
}

export default AtomicConverter
