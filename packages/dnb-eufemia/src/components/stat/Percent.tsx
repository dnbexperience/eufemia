import { AmountBase, type StatAmountProps } from './Amount'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type StatPercentProps = Omit<
  StatAmountProps,
  'currency' | 'currencyDisplay' | 'currencyPosition'
>

function Percent(props: StatPercentProps) {
  return <AmountBase {...props} percent />
}

withComponentMarkers(Percent, {
  _supportsSpacingProps: true,
})

export default Percent
