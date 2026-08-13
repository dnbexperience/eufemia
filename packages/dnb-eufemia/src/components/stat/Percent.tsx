import { AmountBase, type AmountProps } from './Amount'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type PercentProps = Omit<
  AmountProps,
  'currency' | 'currencyDisplay' | 'currencyPosition'
>

function Percent(props: PercentProps) {
  return <AmountBase {...props} percent />
}

withComponentMarkers(Percent, {
  _supportsSpacingProps: true,
})

export default Percent
