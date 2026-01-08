import React from 'react'
import { CURRENCY } from '../../../../shared/defaults'
import type { Props as NumberValueProps } from '../Number';
import NumberValue from '../Number'
import type { CurrencyISO } from '../../constants/currencies'

export type Props = NumberValueProps & {
  /**
   * The currency of the component.
   */
  currency?: CurrencyISO | true
}

function Currency(props: Props) {
  const numberProps: Props = {
    ...props,
    currency: props.currency ?? CURRENCY,
  }

  return <NumberValue {...numberProps} />
}

Currency._supportsSpacingProps = true
export default Currency
