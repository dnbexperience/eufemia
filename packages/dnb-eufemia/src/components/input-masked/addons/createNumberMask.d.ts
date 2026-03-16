export type CreateNumberMaskOptions = {
    prefix?: string;
    suffix?: string;
    includeThousandsSeparator?: boolean;
    thousandsSeparatorSymbol?: string;
    allowDecimal?: boolean;
    decimalSymbol?: string;
    decimalLimit?: number;
    integerLimit?: number | false;
    requireDecimal?: boolean;
    allowNegative?: boolean;
};
export type NumberMaskFunction = ((rawValue?: string) => Array<string | RegExp>) & {
    instanceOf?: string;
    maskParams?: Record<string, unknown>;
};
export default function createNumberMask({ prefix, suffix, includeThousandsSeparator, thousandsSeparatorSymbol, allowDecimal, decimalSymbol, decimalLimit, integerLimit, requireDecimal, allowNegative, }?: CreateNumberMaskOptions): NumberMaskFunction;
