import type { ValueNumberProps as NumberValueProps } from '../Number'
import NumberValue from '../Number'
import type { CurrencyISO } from '../../constants/currencies'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueCurrencyProps = NumberValueProps & {
  /**
   * Defines what format to show the currency value in, e.g. `NOK` or `USD`. Use `true` for the default currency. Defaults to the `currency` of the [Provider](/web/styling-and-themes/configuration/provider/), which is `NOK` unless set.
   */
  currency?: CurrencyISO | true
}

function Currency(props: ValueCurrencyProps) {
  const numberProps: ValueCurrencyProps = {
    ...props,
    // `true` makes NumberFormat use the Provider currency
    currency: props.currency ?? true,
  }

  return <NumberValue {...numberProps} />
}

withComponentMarkers(Currency, {
  _supportsSpacingProps: true,
})

export default Currency
