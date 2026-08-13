import { AmountBase, type AmountProps } from './Amount'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CurrencyProps = Omit<AmountProps, 'percent'> & {
  percent?: never
}

function Currency(props: CurrencyProps) {
  const { currency = true } = props

  return <AmountBase {...props} currency={currency} />
}

withComponentMarkers(Currency, {
  _supportsSpacingProps: true,
})

export default Currency
