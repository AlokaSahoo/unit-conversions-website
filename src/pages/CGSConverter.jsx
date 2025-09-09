import React from 'react'
import TargetSystemConverter from '../components/TargetSystemConverter'

const systemInfo = {
  name: 'CGS',
  title: 'Convert to CGS Units',
  description: 'Convert any physical quantity to CGS (Centimeter-Gram-Second) units - the historical metric system widely used in physics.',
  details: 'The CGS system is a variant of the metric system based on the centimeter as the unit of length, the gram as the unit of mass, and the second as the unit of time. It was widely used in physics before being largely replaced by the SI system, but is still common in certain fields like electromagnetism and astrophysics.',
  examples: [
    'Centimeter (cm) - unit of length',
    'Gram (g) - unit of mass',
    'Dyne (dyn) - unit of force (g⋅cm⋅s⁻²)',
    'Erg (erg) - unit of energy (g⋅cm²⋅s⁻²)',
    'Gauss (G) - unit of magnetic field',
    'Statcoulomb - unit of electric charge in electrostatic CGS'
  ]
}

function CGSConverter() {
  return <TargetSystemConverter targetSystem="cgs" systemInfo={systemInfo} />
}

export default CGSConverter
