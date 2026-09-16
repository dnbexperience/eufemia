import { AmountBase, type StatAmountProps } from './Amount'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type StatNumberProps = StatAmountProps

/**
 * Stat.Number — A general-purpose formatted number display.
 *
 * Supports plain numbers, currencies, percentages, and custom formatting.
 */
const Number = AmountBase

withComponentMarkers(Number, {
  _supportsSpacingProps: true,
})

export default Number
