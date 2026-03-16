import type { Props as SelectionProps } from '../../Field/Selection';
import type { Path, PathStrict, ReceiveAdditionalEventArgs } from '../../types';
import type { GeneralConfig, HandlerConfig, PreResponseResolver, ResponseResolver } from '../createContext';
export declare const supportedCountryCodes: readonly ["NO"];
export type SupportedCountries = (typeof supportedCountryCodes)[number];
export declare const unsupportedCountryMessage = "Postal code verification is not supported for {countryCode}.";
export type AddressResolverData = {
    addresses: {
        street_name: string;
        house_number: string;
        postal_code: string;
        city: string;
    }[];
};
export type AddressResolverPayload = Array<{
    item: AddressResolverData['addresses'][0];
    selectedValue: string;
    selectedKey: string;
    content: string[];
}>;
type SuggestionsConnectorReturn = (event: {
    value: string;
    showIndicator: () => void;
    hideIndicator: () => void;
    updateData: (data: AddressResolverPayload) => void;
} & ReceiveAdditionalEventArgs<string>) => Promise<void>;
type SuggestionsHandlerConfig = HandlerConfig & {
    countryCode?: PathStrict | SupportedCountries | Lowercase<SupportedCountries>;
    cityPath: Path;
    postalCodePath: Path;
};
export declare const preResponseResolver: PreResponseResolver;
export declare const responseResolver: ResponseResolver<AddressResolverData, AddressResolverPayload>;
export declare function suggestions(generalConfig: GeneralConfig, handlerConfig?: SuggestionsHandlerConfig): SuggestionsConnectorReturn;
export declare function suggestionsElement(generalConfig: GeneralConfig, handlerConfig?: SuggestionsHandlerConfig): (props: SelectionProps) => import("react/jsx-runtime").JSX.Element;
export declare function getMockData(countryCode?: string): {
    addresses: {
        address_id: string;
        street_name: string;
        house_number: number;
        postal_code: string;
        city: string;
        county: string;
        municipality: string;
        type: string;
    }[];
};
export {};
