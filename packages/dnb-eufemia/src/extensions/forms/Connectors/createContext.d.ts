import type { ReceiveAdditionalEventArgs } from '../types';
export type UrlSecondParameter = {
    countryCode: string;
};
export type GeneralConfig = {
    fetchConfig?: {
        url: string | ((value: string, { countryCode }: UrlSecondParameter) => string | Promise<string>);
        headers?: HeadersInit;
    };
};
export declare function createContext<GeneralConfigGeneric = GeneralConfig>(generalConfig?: GeneralConfigGeneric): {
    withConfig<HandlerMethod extends (generalConfig: GeneralConfigGeneric, handlerConfig: unknown) => ReturnType<HandlerMethod>>(fn: HandlerMethod, handlerConfig?: Parameters<HandlerMethod>[1]): ReturnType<HandlerMethod>;
};
export type HandlerConfig = {
    preResponseResolver?: PreResponseResolver;
    responseResolver?: ResponseResolver;
};
export type PreResponseResolver = (fromField: {
    value: string;
}) => unknown;
export type ResponseResolver<Response = unknown, Payload = Record<string, unknown>> = (response: Response, handlerConfig?: HandlerConfig) => {
    /**
     * The matcher to be used to determine if and how the connector,
     * such as an validator for `onChangeValidator` or `onBlurValidator`,
     * should validate the field value.
     */
    matcher?: (value: string) => boolean;
    /**
     * The payload to be returned and used by the connector.
     */
    payload?: Payload;
};
export type FetchDataFromAPIOptions = {
    generalConfig: GeneralConfig;
    parameters?: UrlSecondParameter;
    abortControllerRef?: {
        current: null | AbortController;
    };
    preResponseResolver?: PreResponseResolver;
};
export type FetchDataReturnValue<Data = unknown> = {
    data: Data;
    status: number;
};
export declare function fetchData<Data = unknown>(value: string, options: FetchDataFromAPIOptions): Promise<FetchDataReturnValue<Data>>;
export declare function getCountryCodeValue({ countryCode: givenCountryCode, additionalArgs, }: {
    countryCode?: string;
    additionalArgs: ReceiveAdditionalEventArgs<unknown>;
}): {
    countryCode: string;
    countryCodeValue: any;
};
export declare function handleCountryPath({ value, countryCode: givenCountryCode, additionalArgs, handler, }: {
    value: string;
    countryCode?: string;
    additionalArgs: ReceiveAdditionalEventArgs<unknown>;
    handler: (value: string, additionalArgs: ReceiveAdditionalEventArgs<unknown>) => void;
}): {
    countryCode: string;
};
export declare function isSupportedCountryCode(countryCode: string, supportedCountryCodes: readonly string[]): boolean;
