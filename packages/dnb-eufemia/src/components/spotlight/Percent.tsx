import React from 'react'
import Amount, { AmountProps } from './Amount'

export type PercentProps = Omit<
  AmountProps,
  'currency' | 'currencyDisplay' | 'currencyPosition'
>

function Percent(props: PercentProps) {
  return <Amount {...props} percent />
}

Percent._supportsSpacingProps = true

export default Percent
