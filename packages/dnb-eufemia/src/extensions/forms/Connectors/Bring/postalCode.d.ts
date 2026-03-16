import type { Path, PathStrict, UseFieldProps } from '../../types';
import type { GeneralConfig, HandlerConfig, PreResponseResolver, ResponseResolver } from '../createContext';
export declare const supportedCountryCodes: readonly ["NO", "DK", "SE", "FI", "NL", "DE", "US", "BE", "FO", "GL", "IS", "SJ"];
export type SupportedCountries = (typeof supportedCountryCodes)[number];
type AutofillHandlerConfig = HandlerConfig & {
    countryCode?: PathStrict | SupportedCountries | Lowercase<SupportedCountries>;
};
export declare const unsupportedCountryCodeMessage = "Postal code verification is not supported for {countryCode}.";
export type PostalCodeResolverData = {
    postal_codes: {
        postal_code: string;
        city: string;
    }[];
};
export type PostalCodeResolverPayload = {
    city: string;
};
export declare const preResponseResolver: PreResponseResolver;
export declare const responseResolver: ResponseResolver<PostalCodeResolverData, PostalCodeResolverPayload>;
export declare function autofill(generalConfig: GeneralConfig, handlerConfig?: AutofillHandlerConfig & {
    cityPath: Path;
}): UseFieldProps<string>['onChange'];
export declare function validator(generalConfig: GeneralConfig, handlerConfig?: AutofillHandlerConfig): UseFieldProps<string>['onChangeValidator'] | UseFieldProps<string>['onBlurValidator'];
export declare function getMockData(countryCode?: string): {
    postal_codes: {
        city: string;
        postal_code: string;
    }[];
};
export {};
