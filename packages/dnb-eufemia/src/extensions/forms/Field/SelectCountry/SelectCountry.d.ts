import type listOfCountries from '../../constants/countries';
import { type CountryType, type CountryLang, type CountryISO } from '../../constants/countries';
import type { FieldPropsWithExtraValue } from '../../types';
import type { FieldBlockWidth } from '../../FieldBlock';
import type { AutocompleteAllProps } from '../../../../components/autocomplete/Autocomplete';
export type CountryFilterSet = 'Scandinavia' | 'Nordic' | 'Europe' | 'Prioritized';
export type { CountryType };
export type Props = FieldPropsWithExtraValue<CountryISO, CountryType, undefined | string> & {
    /**
     * Lists only the countries you want to show. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
     * Defaults to `Prioritized`.
     */
    countries?: CountryFilterSet;
    /**
     * Use this prop to filter out certain countries. The function receives the country object and should return a boolean. Returning `false` will omit the country.
     */
    filterCountries?: (country: CountryType) => boolean;
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
declare function SelectCountry(props: Props): import("react/jsx-runtime").JSX.Element;
type GetCountryData = {
    countries: typeof listOfCountries;
    lang?: CountryLang;
    filter?: Props['filterCountries'];
    sort?: Extract<CountryFilterSet, 'Prioritized'>;
    makeObject?: (country: CountryType, lang: string) => {
        selectedKey: string;
        content: string | Array<string>;
    };
};
export declare function getCountryData({ countries, lang, filter, sort, makeObject, }: GetCountryData): {
    selectedKey: string;
    content: string | Array<string>;
}[];
export declare function countryFilter(country: CountryType, filterCountries: (country: CountryType) => boolean, ccFilter: CountryFilterSet): boolean;
export declare function makeCountryFilterSet(ccFilter: CountryFilterSet): (country: CountryType) => boolean;
export default SelectCountry;
