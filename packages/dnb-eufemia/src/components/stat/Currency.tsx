import React from 'react'
import Amount, { AmountProps } from './Amount'

export type CurrencyProps = Omit<AmountProps, 'percent'> & {
  percent?: never
}

const Currency = React.forwardRef<HTMLElement, CurrencyProps>(
  (props, ref) => {
    return <Amount ref={ref} {...props} currency />
  }
)

// @ts-expect-error - Adding custom property to component for spacing detection
Currency._supportsSpacingProps = true

export default Currency
