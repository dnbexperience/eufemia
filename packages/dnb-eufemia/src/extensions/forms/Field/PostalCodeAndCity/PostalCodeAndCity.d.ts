import type { Props as FieldBlockProps } from '../../FieldBlock';
import type { Props as StringFieldProps } from '../String';
import type { CountryCode } from '../../types';
import type { SpacingProps } from '../../../../shared/types';
export type Props = Pick<FieldBlockProps, 'error' | 'warning' | 'info' | 'width' | 'className' | 'help' | keyof SpacingProps> & Partial<Record<'postalCode' | 'city', StringFieldProps>> & {
    /**
     * Defines which country the postal code and city is for.
     * Setting it to anything other than `no` will remove the default norwegian postal code pattern.
     * You can also use the value of another field to define the countryCode, by using a path value i.e. `/myCountryCodePath`.
     * Default: `NO`
     */
    countryCode?: CountryCode;
} & Pick<StringFieldProps, 'size'>;
declare function PostalCodeAndCity(props: Props): import("react/jsx-runtime").JSX.Element;
export default PostalCodeAndCity;
