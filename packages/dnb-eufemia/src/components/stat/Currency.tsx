import React from 'react'
import Amount, { AmountProps } from './Amount'

export type CurrencyProps = Omit<AmountProps, 'percent'> & {
  percent?: never
}

function Currency(props: CurrencyProps) {
  return <Amount {...props} currency />
}

Currency._supportsSpacingProps = true

export default Currency
