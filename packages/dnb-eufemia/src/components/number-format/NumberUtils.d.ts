/**
 * Web NumberFormat Helpers
 *
 */
export type formatTypes = 'phone' | 'org' | 'ban' | 'nin' | 'percent' | 'currency';
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
    /** shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long" */
    compact?: boolean | 'short' | 'long';
    /** How many decimals */
    decimals?: number;
    /**
     * Rounding method
     * - If set to `omit`, the decimal will NOT be rounded.
     * - If set to `half-even`, the decimal will be rounded to the nearest even number.
     * - If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
     */
    rounding?: 'omit' | 'half-even' | 'half-up';
    /**
     * When to display the sign for the number.
     * - `auto` (default): sign display for negative numbers only.
     * - `always`: always display sign.
     * - `exceptZero`: sign display for positive and negative numbers, but not zero.
     * - `negative`: sign display for negative numbers only, including negative zero.
     * - `never`: never display sign.
     */
    signDisplay?: 'auto' | 'always' | 'exceptZero' | 'negative' | 'never';
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
    currency?: string | boolean;
    /** Intl.NumberFormat currency option – you can use false or empty string to hide the sign/name. Defaults to narrowSymbol when the locale is no else we default to code. */
    currencyDisplay?: boolean | '' | 'code' | 'name' | 'symbol' | 'narrowSymbol';
    /** currency option */
    currencyPosition?: formatCurrencyPosition;
    /** hides the currency sign */
    omitCurrencySign?: boolean;
    /** will remove all extra signs, like a currency sign or percent sign for the cleanedValue return when returnAria is true */
    cleanCopyValue?: boolean;
    /** Intl.NumberFormat options (NumberFormatOptions) */
    options?: object;
    /** If an object should be returned, including the "aria" property */
    returnAria?: boolean;
    /** ARIA Text to be displayed when value is invalid. */
    invalidAriaText?: string;
}
export declare const NUMBER_CHARS = "\\-0-9,.";
export declare const NUMBER_MINUS = "-|\u2212|\u2010|\u2012|\u2013|\u2014|\u2015";
/**
 * Format a number to a streamlined format based on the given locale
 *
 * @param {string|number} value any number
 * @type {object} string or object { when: { min: 'small' } } that describes the media query
 * @property {string} locale - media queries
 * @property {boolean} clean - if true, clean the number for unwanted decimal separators
 * @property {string|boolean} compact - shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either a boolean, or a string with "short" or "long"
 * @property {boolean} phone - if true, it formats to a phone number
 * @property {boolean} org - if true, it formats to a Organization Number
 * @property {boolean} ban - if true, it formats to a Bank Account Number
 * @property {boolean} nin - if true, it formats to a National Identification Number
 * @property {boolean} percent - if true, it formats with a percent
 * @property {string|boolean} currency - currency code (ISO 4217) or `true` to use the default, `NOK`
 * @property {string} currencyDisplay - use false or empty string to hide the sign or "code", "name", "symbol" or "narrowSymbol" – supports the API from number.toLocaleString
 * @property {string} currencyPosition - can be "before" or "after"
 * @property {string} omitCurrencySign - hides currency sign if true is given
 * @property {number} decimals - defines how many decimals should be added
 * @property {string} rounding - if `omit`, the decimal will NOT be rounded. If `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
 * @property {object} options - accepts all number.toLocaleString API options
 * @property {boolean} returnAria - if true, this function returns an object that includes an aria property with a special aria formatting
 * @property {string} invalidAriaText - aria text to be displayed when value is invalid.
 * @returns a formatted number as a string or as an object if "returnAria" is true
 */
export declare const format: (value: any, { locale, clean, compact, phone, org, ban, nin, percent, currency, currencyDisplay, currencyPosition, omitCurrencySign, cleanCopyValue, decimals, rounding, signDisplay, options, returnAria, invalidAriaText, }?: formatOptionParams) => any;
/**
 * Fill format decimals
 *
 * @param {number|string} value
 * @param {number} decimals how many decimals
 * @param {boolean} defines what rounding method to use for decimals
 * @param {boolean} clean whether the value should be cleaned or not
 * @param {object} opts immutable object
 * @returns A decimal prepared number
 */
export declare const formatDecimals: (value: any, decimals: any, rounding: any, opts?: {}) => any;
/**
 * Find the amount of decimals
 *
 * @param {number|string} value any number
 * @param {string} decimalSeparator a dot or comma
 * @returns Amount of decimals
 */
export declare const countDecimals: (value: any, decimalSeparator?: string) => number;
/**
 * The main number formatter function
 * This function is used to call the browsers/Node.js "Intl.NumberFormat" or "Number.toLocaleString" APIs
 *
 * @param {string|number} number any number
 * @param {string} locale locale as a string
 * @param {string} options formatting options based on the toLocaleString API
 * @param {string} formatter optional, a custom formatter can be given
 * @returns Formatted number
 */
export declare const formatNumber: (number: any, locale: any, options?: {}, formatter?: any) => string;
/**
 * Use this function to format phone numbers
 *
 * @param {string|number} number a phone number
 * @param {string} locale locale as a string
 * @returns A formatted phone number
 */
export declare const formatPhone: (number: any, locale?: any) => {
    number: any;
    aria: any;
};
/**
 * Use this function to format Bank Account Numbers
 *
 * @param {string|number} number a Bank Account Number
 * @param {string} locale locale as a string
 * @returns A formatted Bank Account Number
 */
export declare const formatBAN: (number: any, locale?: any) => {
    number: any;
    aria: any;
};
/**
 * Use this function to format Organization Numbers
 *
 * @param {string|number} number a Organization Number
 * @param {string} locale locale as a string
 * @returns A formatted Organization Number
 */
export declare const formatORG: (number: any, locale?: any) => {
    number: any;
    aria: any;
};
/**
 * Use this function to format National Identification Numbers
 *
 * @param {string|number} number a National Identification Number
 * @param {string} locale locale as a string
 * @returns A formatted National Identification Number
 */
export declare const formatNIN: (number: any, locale?: any) => {
    number: any;
    aria: any;
};
/**
 * This function cleans numbers for separators
 * https://en.wikipedia.org/wiki/Decimal_separator
 *
 * @param {string|number} num any number
 * @returns A number that contains valid number separators
 */
export declare function cleanNumber(num: any, { decimalSeparator, thousandsSeparator, prefix, suffix, }?: {
    decimalSeparator?: any;
    thousandsSeparator?: any;
    prefix?: any;
    suffix?: any;
}): any;
/**
 * So iOS v13 can select something on the first try, we run this add range trick.
 * NB: This hack may be removed in future iOS versions.
 */
export declare function runIOSSelectionFix(): void;
/**
 * Will return currency display value based on navigator/browser and locale
 *
 * @property {string} currencyDisplay (optional) code, name, symbol or narrowSymbol
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export declare function getFallbackCurrencyDisplay(locale?: any, currencyDisplay?: any): any;
/**
 * This function returns a decimal separator symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export declare function getDecimalSeparator(locale?: any): any;
/**
 * This function returns a thousands separator symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @returns {string} a separator symbol
 */
export declare function getThousandsSeparator(locale?: any): any;
/**
 * This function returns a currency symbol based on the given locale
 *
 * @property {string} locale (optional) the locale to use, defaults to nb-NO
 * @property {string} currency (optional) a given currency
 * @property {string} display (optional) what currency display
 * @property {number} number (optional) only to define if it should be formatted in singular or plural
 * @returns {string} a currency symbol
 */
export declare function getCurrencySymbol(locale?: string | null, currency?: string | boolean | null, display?: string | boolean | null, number?: string | number): any;
/**
 * Rounds the number to the nearest even number
 *
 * @param {number} num the number to round
 * @param {number} decimalPlaces the number of decimal places to round to
 * @returns {number} the rounded number
 */
export declare function roundHalfEven(num: any, decimalPlaces?: number): number;
