import type { InternalLocale } from '../../shared/Context';
import type { NumberFormatCurrency } from './NumberFormat';

export type formatTypes =
  | 'phone'
  | 'org'
  | 'ban'
  | 'nin'
  | 'percent'
  | 'currency';
export type formatCurrencyPosition = 'before' | 'after';
export interface formatReturnValue {
  /** The given number */
  value: number;

  /** Cleans a number from unnecessary parts */
  cleanedValue: string;

  /** The formatted display number */
  number: string;

  /** A screen reader optimized number */
  aria: string;

  /** Language code, like en-US */
  locale: InternalLocale;

  /** The given type */
  type: formatTypes | string;
}
export type formatValue = string | number;
export type formatReturnType = formatReturnValue | formatValue;

export interface formatOptionParams {
  /** can be "auto" */
  locale?: InternalLocale;

  /** Should the number be cleaned */
  clean?: boolean;

  /** shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long" */
  compact?: boolean | 'short' | 'long';

  /** How many decimals */
  decimals?: number;

  /** @deprecated Use `rounding: "omit"` instead. */
  omit_rounding?: boolean;

  /**
   * Rounding method
   * - If set to `omit`, the decimal will NOT be rounded.
   * - If set to `half-even`, the decimal will be rounded to the nearest even number.
   * - If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
   */
  rounding?: 'omit' | 'half-even' | 'half-up';

  /** phone type */
  phone?: boolean;
  /** org type */
  org?: boolean;
  /** ban type */
  ban?: boolean;
  /** nin type */
  nin?: boolean;
  /** percent type */
  percent?: boolean;
  /** Currency code (ISO 4217) or `true` to use the default, `NOK`. */
  currency?: NumberFormatCurrency;

  /** Intl.NumberFormat currency option – you can use false or empty string to hide the sign/name. Defaults to narrowSymbol when the locale is no else we default to code. */
  currency_display?:
    | boolean
    | ''
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol';
  /** currency option */
  currency_position?: formatCurrencyPosition;
  /** hides the currency sign */
  omit_currency_sign?: boolean;
  /** will remove all extra signs, like a currency sign or percent sign for the cleanedValue return when returnAria is true */
  clean_copy_value?: boolean;

  /** Intl.NumberFormat options (NumberFormatOptions) */
  options?: object;

  /** If an object should be returned, including the "aria" property */
  returnAria?: boolean;
}

export function format(
  value: formatValue,
  options: formatOptionParams & { returnAria: true }
): formatReturnValue;
export function format(
  value: formatValue,
  options?: formatOptionParams
): formatValue;

type cleanNumberOptions = {
  decimalSeparator?: string;
  thousandsSeparator?: string;
  prefix?: string; // to help the cleaning process
  suffix?: string; // to help the cleaning process
};

export const cleanNumber: (
  num: number | string,
  options?: cleanNumberOptions
) => number | string;

export const copyWithEffect: (
  value: number | string,
  label?: string,
  positionElement?: HTMLElement
) => boolean;

export const getFallbackCurrencyDisplay: (
  locale?: InternalLocale,
  currency_display?: string
) => string;

export const getDecimalSeparator: (locale?: InternalLocale) => string;

export const getThousandsSeparator: (locale?: InternalLocale) => string;

export const getCurrencySymbol: (
  locale?: InternalLocale,
  currency?: NumberFormatCurrency,
  currencyDisplay?: string
) => string;

export const countDecimals: (
  value: number | string,
  currency_display?: string
) => number;

type copy = (content: string, HTMLElement) => void;

/**
 * Only for internal use as of now. So its not documented.
 */
export const useCopyWithNotice: () => { copy: copy };

/**
 * Only for internal use as of now. So its not documented.
 *
 * So iOS v13 can select something on the first try, we run this add range trick.
 * NB: This hack may be removed in future iOS versions.
 */
export const runIOSSelectionFix = () => null;

/**
 * Rounds the number to the nearest even number
 *
 * @param {number} num the number to round
 * @param {number} decimalPlaces the number of decimal places to round to
 * @returns {number} the rounded number
 */
export const roundHalfEven: (
  num: number,
  decimalPlaces?: number
) => number;
