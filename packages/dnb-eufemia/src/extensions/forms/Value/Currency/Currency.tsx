import React from 'react'
import { CURRENCY } from '../../../../shared/defaults'
import type { ValueNumberProps as NumberValueProps } from '../Number'
import NumberValue from '../Number'
import type { CurrencyISO } from '../../constants/currencies'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueCurrencyProps = NumberValueProps & {
  /**
   * The currency of the component.
   */
  currency?: CurrencyISO | true
}

function Currency(props: ValueCurrencyProps) {
  const numberProps: ValueCurrencyProps = {
    ...props,
    currency: props.currency ?? CURRENCY,
  }

  return <NumberValue {...numberProps} />
}

withComponentMarkers(Currency, {
  _supportsSpacingProps: true,
})

export default Currency
