import React from 'react'
import { AmountBase, type AmountProps } from './Amount'

export type CurrencyProps = Omit<AmountProps, 'percent'> & {
  percent?: never
}

function Currency(props: CurrencyProps) {
  return <AmountBase {...props} currency />
}

Currency._supportsSpacingProps = true

export default Currency
