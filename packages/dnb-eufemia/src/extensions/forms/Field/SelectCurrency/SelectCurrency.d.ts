import { type CurrencyType, type CurrencyLang, type CurrencyISO } from '../../constants/currencies';
import type { FieldPropsWithExtraValue } from '../../types';
import type { FieldBlockWidth } from '../../FieldBlock';
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete';
export type CurrencyFilterSet = 'Scandinavia' | 'Nordic' | 'Europe' | 'Prioritized';
export type { CurrencyType };
export type Props = FieldPropsWithExtraValue<CurrencyISO, CurrencyType, undefined | string> & {
    /**
     * Lists only the currencies you want to show. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
     * Defaults to `Prioritized`.
     */
    currencies?: CurrencyFilterSet;
    /**
     * Use this prop to filter out certain currencies. The function receives the currency object and should return a boolean. Returning `false` will omit the currency.
     */
    filterCurrencies?: (currency: CurrencyType) => boolean;
    /**
     * For internal testing purposes
     */
    noAnimation?: boolean;
    /**
     * The width of the component.
     */
    width?: FieldBlockWidth;
    /**
     * The size of the component.
     */
    size?: AutocompleteAllProps['size'];
};
declare function SelectCurrency(props: Props): import("react/jsx-runtime").JSX.Element;
type GetCurrencyData = {
    lang?: CurrencyLang;
    filter?: Props['filterCurrencies'];
    enableSort?: Extract<CurrencyFilterSet, 'Prioritized'>;
    enableSearch?: boolean;
    makeObject?: (currency: CurrencyType, lang: string) => {
        selectedKey: string;
        selectedValue: string;
        content: string[];
    };
};
export declare function getCurrencyData({ lang, filter, enableSort, enableSearch, makeObject, }?: GetCurrencyData): {
    selectedKey: string;
    selectedValue: string;
    content: string[];
}[];
export declare function currencyFilter(currency: CurrencyType, filterCurrencies: (currency: CurrencyType) => boolean, ccFilter: CurrencyFilterSet): boolean;
export declare function makeCurrencyFilterSet(ccFilter: CurrencyFilterSet): (currency: CurrencyType) => boolean;
export default SelectCurrency;
