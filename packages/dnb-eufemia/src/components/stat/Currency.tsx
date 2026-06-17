import { AmountBase, type AmountProps } from './Amount'

export type CurrencyProps = Omit<AmountProps, 'percent'> & {
  percent?: never
}

function Currency(props: CurrencyProps) {
  const { currency = true } = props

  return <AmountBase {...props} currency={currency} />
}

Currency._supportsSpacingProps = true

export default Currency
