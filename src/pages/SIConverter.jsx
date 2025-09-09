import React from 'react'
import TargetSystemConverter from '../components/TargetSystemConverter'

const systemInfo = {
  name: 'SI',
  title: 'Convert to SI Units',
  description: 'Convert any physical quantity to SI (International System of Units) - the modern metric system used worldwide.',
  details: 'The International System of Units (SI) is the modern form of the metric system and is the most widely used system of measurement. It comprises a coherent system of units built on seven base units: meter, kilogram, second, ampere, kelvin, mole, and candela.',
  examples: [
    'Meter (m) - unit of length',
    'Kilogram (kg) - unit of mass',
    'Second (s) - unit of time',
    'Newton (N) - unit of force (kg⋅m⋅s⁻²)',
    'Joule (J) - unit of energy (kg⋅m²⋅s⁻²)',
    'Pascal (Pa) - unit of pressure (kg⋅m⁻¹⋅s⁻²)',
    'Tesla (T) - unit of magnetic field (kg⋅s⁻²⋅A⁻¹)'
  ]
}

function SIConverter() {
  return <TargetSystemConverter targetSystem="si" systemInfo={systemInfo} />
}

export default SIConverter
