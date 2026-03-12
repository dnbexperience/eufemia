import { AmountBase } from './Amount'

export type { AmountProps as NumberProps } from './Amount'

/**
 * Stat.Number — A general-purpose formatted number display.
 *
 * Supports plain numbers, currencies, percentages, and custom formatting.
 */
const Number = AmountBase

Number._supportsSpacingProps = true

export default Number
