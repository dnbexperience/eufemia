import React from 'react';
import type { JsonObject } from '../../utils/json-pointer';
import type { Ajv } from '../../utils';
import type { GlobalErrorMessagesWithPaths, Path, EventStateObject, OnSubmit, OnChange, EventReturnWithStateObject, OnSubmitRequest, Schema } from '../../types';
import type { IsolationProviderProps } from '../../Form/Isolation/Isolation';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { ContextProps } from '../../../../shared/Context';
import type { ContextState, FilterDataHandler, TransformData, VisibleDataHandler } from '../Context';
export type SharedAttachments<Data = unknown> = {
    visibleDataHandler?: VisibleDataHandler<Data>;
    filterDataHandler?: FilterDataHandler<Data>;
    validationVersion?: number;
    hasErrors?: ContextState['hasErrors'];
    hasFieldError?: ContextState['hasFieldError'];
    setShowAllErrors?: ContextState['setShowAllErrors'];
    setSubmitState?: ContextState['setSubmitState'];
    rerenderUseDataHook?: () => void;
    updateDataValue?: ContextState['updateDataValue'];
    clearData?: () => void;
    setData?: ContextState['setData'];
    fieldConnectionsRef?: ContextState['fieldConnectionsRef'];
    fieldStatusRef?: React.RefObject<Record<Path, EventStateObject>>;
    fieldErrorRef?: ContextState['fieldErrorRef'];
    internalDataRef?: ContextState['internalDataRef'];
};
export type Props<Data extends JsonObject> = IsolationProviderProps<Data> & {
    /**
     * Unique ID to communicate with the hook Form.useData
     */
    id?: SharedStateId;
    /**
     * Unique ID to connect with a GlobalStatus
     */
    globalStatusId?: string;
    /**
     * Source data, will be used instead of defaultData, and leading to updates if changed after mount
     */
    data?: Data;
    /**
     * Default source data, only used if no other source is available, and not leading to updates if changed after mount
     */
    defaultData?: Data;
    /**
     * Empty data, used to clear the data set.
     */
    emptyData?: unknown;
    /**
     * JSON Schema to validate the data against.
     */
    schema?: Schema<Data>;
    /**
     * Custom Ajv instance, if you want to use your own
     */
    ajvInstance?: Ajv;
    /**
     * Custom error messages for the whole data set
     */
    errorMessages?: GlobalErrorMessagesWithPaths;
    /**
     * Transform the data context (internally as well) based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).
     */
    transformIn?: TransformData;
    /**
     * Mutate the data before it enters onSubmit or onChange based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).
     */
    transformOut?: TransformData;
    /**
     * Change handler for the whole data set.
     * You can provide an async function to show an indicator on the current label during a field change.
     */
    onChange?: OnChange<Data>;
    /**
     * Change handler for each value
     */
    onPathChange?: (path: Path, value: unknown) => EventReturnWithStateObject | void | Promise<EventReturnWithStateObject | void>;
    /**
     * Will emit on a form submit – if validation has passed.
     * You can provide an async function to shows a submit indicator during submit. All form elements will be disabled during the submit.
     */
    onSubmit?: OnSubmit<Data>;
    /**
     * Submit was requested, but data was invalid
     */
    onSubmitRequest?: OnSubmitRequest;
    /**
     * Will be called when the onSubmit is finished and had not errors
     */
    onSubmitComplete?: (data: Data, 
    /**
     * The result of the onSubmit function
     */
    result: unknown) => EventReturnWithStateObject | void | Promise<EventReturnWithStateObject | void>;
    /**
     * Will be called when the form is committed.
     * For internal use only.
     */
    onUpdateDataValue?: ContextState['updateDataValue'];
    /**
     * Minimum time to display the submit indicator.
     */
    minimumAsyncBehaviorTime?: number;
    /**
     * The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission.
     */
    asyncSubmitTimeout?: number;
    /**
     * Scroll to top on submit
     */
    scrollTopOnSubmit?: boolean;
    /**
     * Key for caching the data in session storage
     */
    sessionStorageId?: string;
    /**
     * Will change the country code for fields supporting `countryCode`.
     * You can also set a path as the value, e.g. `/myCountryCodePath`.
     */
    countryCode?: ContextState['countryCode'];
    /**
     * Locale to use for all nested Eufemia components
     */
    locale?: ContextProps['locale'];
    /**
     * Provide your own translations. Use the same format as defined in the translation files
     */
    translations?: ContextProps['translations'];
    /**
     * Make all fields required
     */
    required?: boolean;
    /**
     * The children of the context provider
     */
    children: React.ReactNode;
};
export default function Provider<Data extends JsonObject>(props: Props<Data>): import("react/jsx-runtime").JSX.Element;
export declare const clearedData: Readonly<{}>;
