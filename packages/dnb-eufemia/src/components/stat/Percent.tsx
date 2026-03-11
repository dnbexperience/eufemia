import React from 'react'
import Amount, { AmountProps } from './Amount'

export type PercentProps = Omit<
  AmountProps,
  'currency' | 'currencyDisplay' | 'currencyPosition'
>

const Percent = React.forwardRef<HTMLElement, PercentProps>(
  (props, ref) => {
    return <Amount ref={ref} {...props} percent />
  }
)

// @ts-expect-error - Adding custom property to component for spacing detection
Percent._supportsSpacingProps = true

export default Percent
