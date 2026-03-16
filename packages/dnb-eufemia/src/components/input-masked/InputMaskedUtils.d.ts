export declare const invisibleSpace = "\u200B";
/**
 * Will return true if a prop needs Locale support
 *
 * @param {object} props object with given component props
 * @returns Boolean
 */
export declare const isRequestingLocaleSupport: (props: Record<string, any>) => boolean;
/**
 * Will return true if a prop will enable the internal NumberMask
 *
 * @param {object} props object with given component props
 * @returns Boolean
 */
export declare const isRequestingNumberMask: (props: Record<string, any>) => boolean;
/**
 * Probably the most complex part of this component
 * It will modify a given value based on certain criteria's
 *
 * @param {object} param0 object with properties
 * @property {string} localValue optional – if given, it will uses its ending to determine of what to return
 * @property {number|string} value component property value
 * @property {object} context Eufemia Context
 * @property {string} locale Eufemia locale (either from component or context)
 * @property {object} maskParams predefined mask parameters
 * @returns String Value
 */
export type InputMaskParams = {
    showMask?: boolean;
    placeholderChar?: string | null;
    allowDecimal?: boolean;
    decimalLimit?: number;
    decimalSymbol?: string;
    thousandsSeparatorSymbol?: string;
    prefix?: string;
    suffix?: string;
    disallowLeadingZeroes?: boolean;
    integerLimit?: number;
};
export declare const correctNumberValue: ({ localValue, props, locale, maskParams, }: {
    localValue?: string | null;
    props: Record<string, any>;
    locale: string;
    maskParams: InputMaskParams;
}) => string;
/**
 * This is a helper for setting the cursor position,
 * when it is on a not allowed position
 *
 * @param {Element} element Input Element
 * @param {Object} maskParams Mask parameters, containing eventually suffix or prefix
 */
export declare const correctCaretPosition: (element: HTMLInputElement, maskParamsRef: {
    current?: {
        suffix?: string;
        prefix?: string;
        placeholderChar?: string;
    };
}, props: {
    mask?: Array<RegExp | {
        test?: (char: string) => boolean;
    }>;
}) => void;
/**
 * Manipulate needed mask for handle: percent
 *
 * @param {object} param0 object with properties
 * @property {object} props Component property
 * @property {string} locale Eufemia locale (either from component or context)
 * @property {object} maskParams predefined mask parameters
 * @returns Object maskParams
 */
export declare const handlePercentMask: ({ props, locale, maskParams, }: {
    props: Record<string, any>;
    locale: string;
    maskParams: InputMaskParams;
}) => InputMaskParams;
/**
 * Return needed mask for handle: currency
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} maskOptions Component property for change the mask parameters
 * @property {object} currencyMask Component property for change the currency parameters
 * @returns Object maskParams
 */
export declare const handleCurrencyMask: ({ maskOptions, currencyMask, }: {
    maskOptions: Record<string, any>;
    currencyMask: string | Record<string, any>;
}) => InputMaskParams;
/**
 * Return needed mask for handle: number
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} maskOptions Component property for change the mask parameters
 * @property {object} numberMask Component property for change the number parameters
 * @returns Object maskParams
 */
export declare const handleNumberMask: ({ maskOptions, numberMask, }: {
    maskOptions: Record<string, any>;
    numberMask: Record<string, any>;
}) => InputMaskParams;
/**
 * Returns the type of what inputMode or type attribute should be used
 *
 * @param {function} mask mask function
 * @returns undefined|decimal|numeric
 */
export declare function getSoftKeyboardAttributes(mask: undefined | {
    instanceOf?: string;
    maskParams?: {
        allowNegative?: boolean;
        allowDecimal?: boolean;
        decimalLimit?: number;
    };
}): undefined | {
    inputMode: 'decimal' | 'numeric';
};
/**
 * Returns the thousands separator character
 *
 * @param {string} locale Component or context locale
 * @returns String
 */
export declare function handleThousandsSeparator(locale: string): string;
/**
 * Returns the decimal separator character
 *
 * @param {string} locale Component or context locale
 * @returns String
 */
export declare function handleDecimalSeparator(locale: string): string;
/**
 * Will take a JSON and return it parsed
 *
 * @param {string} str
 * @param {*} fallback optional fallback
 * @returns Parsed JSON
 */
export declare function fromJSON<T = unknown>(str: unknown, fallback?: T | null): T | unknown;
