import type { AriaAttributes } from 'react';
import React from 'react';
import type { FieldPropsGeneric, ProvideAdditionalEventArgs, SubmitState, ReceiveAdditionalEventArgs, Identifier } from '../types';
import type { ContextState } from '../DataContext';
export type DataAttributes = {
    [property: `data-${string}`]: string | boolean | number;
};
export default function useFieldProps<Value, EmptyValue, Props>(localProps: Props & FieldPropsGeneric<Value, EmptyValue>, { executeOnChangeRegardlessOfError, executeOnChangeRegardlessOfUnchangedValue, updateContextDataInSync, omitMultiplePathWarning, forceUpdateWhenContextDataIsSet, omitSectionPath, }?: {
    executeOnChangeRegardlessOfError?: boolean;
    executeOnChangeRegardlessOfUnchangedValue?: boolean;
    updateContextDataInSync?: boolean;
    omitMultiplePathWarning?: boolean;
    forceUpdateWhenContextDataIsSet?: boolean;
    omitSectionPath?: boolean;
}): typeof localProps & ReturnAdditional<Value>;
export interface ReturnAdditional<Value> {
    /** Documented APIs */
    value: Value;
    isChanged: boolean;
    htmlAttributes: AriaAttributes | DataAttributes;
    setHasFocus: (hasFocus: boolean, overrideValue?: Value, additionalArgs?: ProvideAdditionalEventArgs) => void;
    handleError: () => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleChange: (value: Value | unknown, additionalArgs?: ProvideAdditionalEventArgs) => void;
    updateValue: (value: Value) => void;
    setChanged: (state: boolean) => void;
    setDisplayValue: (value: React.ReactNode, { path, type }?: {
        path?: Identifier;
        type?: 'field';
    }) => void;
    forceUpdate: () => void;
    hasError?: boolean;
    /** Internal */
    dataContext: ContextState;
    fieldState: SubmitState;
    additionalArgs: ReceiveAdditionalEventArgs<Value>;
}
export declare function checkForError(potentialErrors: Array<FieldPropsGeneric['error'] | FieldPropsGeneric['warning'] | FieldPropsGeneric['info']>): boolean;
export declare const clearedArray: any[];
