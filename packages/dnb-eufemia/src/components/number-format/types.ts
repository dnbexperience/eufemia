/**
 * Types for NumberFormatBase
 *
 */

import type { CSSProperties, HTMLProps, ReactNode } from 'react'
import type {
  NumberFormatCurrencyPosition as NumberFormatCurrencyPositionBase,
  NumberFormatOptions,
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './utils'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'

export type NumberFormatPrefix = ReactNode | (() => ReactNode)

export type NumberFormatSuffix = ReactNode | (() => ReactNode)

export type NumberFormatCurrency = string | boolean

export type NumberFormatCurrencyPosition =
  | 'auto'
  | NumberFormatCurrencyPositionBase

export type NumberFormatCompact = 'short' | 'long' | boolean

export type NumberFormatLink = 'tel' | 'sms'

export type NumberFormatSignDisplay =
  | 'auto'
  | 'always'
  | 'exceptZero'
  | 'negative'
  | 'never'

export type NumberFormatDecimals = number

export type NumberFormatElement = string

export type NumberFormatTooltip = string | (() => ReactNode) | ReactNode

export type NumberFormatChildren = ReactNode | (() => ReactNode)

export type NumberFormatProps = {
  id?: string
  /** The numeric or string value to format. */
  value?: NumberFormatValue
  /** BCP 47 locale string for formatting, e.g. `nb-NO`, `en-US`. Defaults to context locale. */
  locale?: string
  /** Content placed before the formatted value. Can be a string or React element. */
  prefix?: NumberFormatPrefix
  /** Content placed after the formatted value. Can be a string or React element. */
  suffix?: NumberFormatSuffix
  /** Formats the value as a currency. Pass `true` for locale default or a currency code string (e.g. `NOK`, `USD`). */
  currency?: NumberFormatCurrency
  /** How to display the currency: `code` (NOK), `name` (Norwegian krone), `symbol` (kr), or `narrowSymbol`. */
  currencyDisplay?:
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
    | ''
    | false
  /** Position of the currency symbol relative to the value: `auto`, `before`, or `after`. */
  currencyPosition?: NumberFormatCurrencyPosition
  /** Compact number display. `short` (e.g., 1.2K), `long` (e.g., 1.2 thousand), or `true` for short. */
  compact?: NumberFormatCompact
  /** If `true`, renders the value in monospace font for tabular alignment. */
  monospace?: boolean
  /** Additional `Intl.NumberFormat` options for custom formatting. */
  options?: NumberFormatOptions
  /** Fixed number of decimal digits to display. */
  decimals?: NumberFormatDecimals
  /** If `true`, selects the entire value text on click. */
  selectAll?: boolean
  /** If `true`, keeps the value text selected at all times after click. */
  alwaysSelectAll?: boolean
  /** If `true`, copies the selected value to clipboard on selection. */
  copySelection?: boolean
  /** If `true`, strips formatting characters (spaces, currency symbols) from the copied value. */
  cleanCopyValue?: boolean
  /** Rounding strategy: `omit` (truncate), `half-even` (banker's rounding), or `half-up`. */
  rounding?: 'omit' | 'half-even' | 'half-up'
  /** Controls display of positive/negative signs: `auto`, `always`, `exceptZero`, `negative`, `never`. */
  signDisplay?: NumberFormatSignDisplay
  /** If `true`, strips trailing zeroes from decimal values. */
  clean?: boolean
  /** Screen-reader-only label for the formatted value for accessibility. */
  srLabel?: ReactNode
  /** HTML element to render as. Defaults to `span`. */
  element?: NumberFormatElement
  /** Tooltip content shown on hover over the formatted value. */
  tooltip?: NumberFormatTooltip
  /** If `true`, renders a skeleton loading placeholder instead of the value. */
  skeleton?: SkeletonShow
  className?: string
  children?: NumberFormatChildren
  style?: CSSProperties
  lang?: string
}

export type NumberFormatInternalFormatter = (
  value: NumberFormatValue | null,
  options: NumberFormatOptionParams & { returnAria: true }
) => NumberFormatReturnValue

export type NumberFormatInternalProps = {
  /** @internal */
  __format?: NumberFormatInternalFormatter
}

export type NumberFormatAllProps = NumberFormatProps &
  Omit<
    HTMLProps<HTMLElement>,
    'prefix' | 'label' | 'placeholder' | 'children'
  > &
  SpacingProps &
  NumberFormatInternalProps

// Public types re-exported from the surrounding modules,
// so NumberFormat can expose them from a single place.
export type { NumberFormatOptions } from './NumberUtils'
export type {
  NumberFormatReturnValue,
  NumberFormatOptionParams,
  NumberFormatReturnType,
  NumberFormatType,
} from './utils'
export type { NumberFormatter } from './useNumberFormat'
export type {
  NumberFormatParts,
  NumberFormatReturnWithParts,
} from './useNumberFormatWithParts'
