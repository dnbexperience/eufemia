import React from 'react';
import type { InputMaskedProps } from '../../../../components/InputMasked';
import type { CountryType } from '../../constants/countries';
import type { Props as StringFieldProps } from '../String';
import type { FieldPropsWithExtraValue } from '../../types';
import type { CountryFilterSet } from '../SelectCountry';
export type AdditionalArgs = {
    phoneNumber: string;
    countryCode: string;
    iso?: string;
};
export type Props = Omit<FieldPropsWithExtraValue<string, AdditionalArgs, undefined | string>, 'layout' | 'layoutOptions' | 'labelSize'> & {
    countryCodeFieldClassName?: string;
    numberFieldClassName?: string;
    countryCodePlaceholder?: string;
    countryCodeLabel?: React.ReactNode | false;
    numberLabel?: React.ReactNode | false;
    numberMask?: InputMaskedProps['mask'];
    pattern?: StringFieldProps['pattern'];
    width?: 'large' | 'stretch';
    inputRef?: React.RefObject<HTMLInputElement>;
    omitCountryCodeField?: boolean;
    onCountryCodeChange?: (value: string | undefined) => void;
    onNumberChange?: (value: string | undefined) => void;
    /**
     * Defines the countries to filter. Can be `Scandinavia`, `Nordic`, `Europe` or `Prioritized`.
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
} & Pick<StringFieldProps, 'size'>;
declare function PhoneNumber(props?: Props): import("react/jsx-runtime").JSX.Element;
export default PhoneNumber;
