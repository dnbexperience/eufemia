import { AmountBase, type AmountProps } from './Amount'

export type NumberProps = AmountProps

/**
 * Stat.Number — A general-purpose formatted number display.
 *
 * Supports plain numbers, currencies, percentages, and custom formatting.
 */
const Number = AmountBase

Number._supportsSpacingProps = true

export default Number
