// Deprecation of Number component
import React from 'react'
import NumberFormat from './number-format/NumberFormat'
export * from './number-format/NumberFormat'
export default function Number(...props) {
  console.warn('Please rename the Number component to => NumberFormat')
  return <NumberFormat {...props} />
}
