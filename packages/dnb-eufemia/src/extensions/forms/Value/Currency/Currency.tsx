import { CURRENCY } from '../../../../shared/defaults'
import type { ValueNumberProps as NumberValueProps } from '../Number'
import NumberValue from '../Number'
import type { CurrencyISO } from '../../constants/currencies'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueCurrencyProps = NumberValueProps & {
  /**
   * Defines what format to show the currency value in, e.g. `NOK` or `USD`. Use `true` for the default currency. Defaults to `NOK`.
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
