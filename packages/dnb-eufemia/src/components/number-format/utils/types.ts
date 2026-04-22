// TypeScript types shared across the NumberFormat utilities.

/** A single part returned by `Intl.NumberFormat.formatToParts()`. */
export type FormatPartItem = {
  type: string
  value: string
}

/** Formatter callback that transforms individual format parts. */
export type PartFormatter = (item: FormatPartItem) => FormatPartItem

/** Valid values for the Intl currencyDisplay option. */
export type CurrencyDisplayValue =
  | 'code'
  | 'name'
  | 'symbol'
  | 'narrowSymbol'

/** Internal format options passed to `Intl.NumberFormat`. */
export type InternalNumberFormatOptions = Omit<
  Intl.NumberFormatOptions,
  'currencyDisplay'
> & {
  decimals?: number
  currencyDisplay?: CurrencyDisplayValue
}

/** Return value of inline part-formatters (phone, BAN, NIN, etc.). */
export type FormattedParts = {
  number: string
  aria: string
}

export type NumberFormatType =
  | 'number'
  | 'currency'
  | 'phone'
  | 'ban'
  | 'nin'
  | 'org'
export type NumberFormatCurrencyPosition = 'before' | 'after'
export type NumberFormatReturnValue = {
  /** The given number */
  value: NumberFormatValue
  /** Cleans a number from unnecessary parts */
  cleanedValue: string
  /** The formatted display number */
  number: string
  /** A screen reader optimized number */
  aria: string
  /** Language code, like en-US */
  locale: string
  /** The given type */
  type: NumberFormatType
}
export type NumberFormatValue = string | number
export type NumberFormatReturnType =
  | NumberFormatReturnValue
  | NumberFormatValue
export type NumberFormatOptions = Record<string, unknown> | string

export type NumberFormatOptionParams = {
  /** can be "auto" */
  locale?: string
  /** Should the number be cleaned */
  clean?: boolean
  /** shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long" */
  compact?: boolean | 'short' | 'long'
  /** How many decimals */
  decimals?: number
  /**
   * Rounding method
   * - If set to `omit`, the decimal will NOT be rounded.
   * - If set to `half-even`, the decimal will be rounded to the nearest even number.
   * - If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
   */
  rounding?: 'omit' | 'half-even' | 'half-up'
  /**
   * When to display the sign for the number.
   * - `auto` (default): sign display for negative numbers only.
   * - `always`: always display sign.
   * - `exceptZero`: sign display for positive and negative numbers, but not zero.
   * - `negative`: sign display for negative numbers only, including negative zero.
   * - `never`: never display sign.
   */
  signDisplay?: 'auto' | 'always' | 'exceptZero' | 'negative' | 'never'
  /** Currency code (ISO 4217) or `true` to use the default, `NOK`. */
  currency?: string | boolean
  /** Intl.NumberFormat currency option – you can use false or empty string to hide the sign/name. Defaults to narrowSymbol when the locale is no else we default to code. */
  currencyDisplay?:
    | boolean
    | ''
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
  /** currency option */
  currencyPosition?: NumberFormatCurrencyPosition
  /** hides the currency sign */
  omitCurrencySign?: boolean
  /** will remove all extra signs, like a currency sign or percent sign for the cleanedValue return when returnAria is true */
  cleanCopyValue?: boolean
  /** Intl.NumberFormat options (NumberFormatOptions) */
  options?: NumberFormatOptions
  /** If an object should be returned, including the "aria" property */
  returnAria?: boolean
  /** ARIA Text to be displayed when value is invalid. */
  invalidAriaText?: string
}

/**
 * Overloaded signature used by every public `format*` helper.
 *
 * - With `returnAria: true` → `NumberFormatReturnValue` (the full object).
 * - Otherwise → `string` (the formatted display value).
 */
export type NumberFormatFunction = {
  (
    value: NumberFormatValue | null | undefined,
    options: NumberFormatOptionParams & { returnAria: true }
  ): NumberFormatReturnValue
  (
    value: NumberFormatValue | null | undefined,
    options?: NumberFormatOptionParams
  ): string
}
