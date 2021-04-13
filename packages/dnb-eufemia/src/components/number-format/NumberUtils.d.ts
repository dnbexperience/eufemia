export type formatTypes = 'phone' | 'org' | 'ban' | 'nin' | 'currency';
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
  locale: string;

  /** The given type */
  type: formatTypes | string;
}
export type formatValue = string | number;
export type formatReturnType = formatReturnValue | formatValue;
export interface formatOptionParams {
  /** can be "auto" */
  locale?: string;

  /** Should the number be cleaned */
  clean?: boolean;

  /** How many decimals */
  decimals?: number;

  /** Do not round the retuned number */
  omit_rounding?: boolean;

  /** phone type */
  phone?: boolean;
  /** org type */
  org?: boolean;
  /** ban type */
  ban?: boolean;
  /** nin type */
  nin?: boolean;
  /** currency type */
  currency?: boolean;

  /** Intl.NumberFormat currency option */
  currency_display?: string;
  /** currency option */
  currency_position?: formatCurrencyPosition;

  /** Intl.NumberFormat options (NumberFormatOptions) */
  options?: object;

  /** If an object should be returned, including the "aria" property */
  returnAria?: boolean;
}
export const format: (
  value: formatValue,
  options?: formatOptionParams
) => formatReturnType;

export const cleanNumber: (num: number | string) => void;
