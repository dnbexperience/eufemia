import { AmountBase, type StatAmountProps } from './Amount'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type StatCurrencyProps = Omit<StatAmountProps, 'percent'> & {
  percent?: never
}

function Currency(props: StatCurrencyProps) {
  const { currency = true } = props

  return <AmountBase {...props} currency={currency} />
}

withComponentMarkers(Currency, {
  _supportsSpacingProps: true,
})

export default Currency
