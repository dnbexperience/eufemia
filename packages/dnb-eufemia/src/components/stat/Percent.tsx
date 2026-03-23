import React from 'react'
import { AmountBase, type AmountProps } from './Amount'

export type PercentProps = Omit<
  AmountProps,
  'currency' | 'currencyDisplay' | 'currencyPosition'
>

function Percent(props: PercentProps) {
  return <AmountBase {...props} percent />
}

Percent._supportsSpacingProps = true

export default Percent
