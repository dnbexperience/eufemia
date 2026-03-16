import React from 'react';
import type { JsonObject } from '../../utils/json-pointer';
import IsolationCommitButton from './IsolationCommitButton';
import IsolationResetButton from './IsolationResetButton';
import { type Props as ProviderProps } from '../../DataContext/Provider';
import type { IsolationDataReference } from './IsolationDataReference';
import type { OnCommit, Path } from '../../types';
export type IsolationProviderProps<Data extends JsonObject> = {
    /**
     * Form.Isolation: Will be called when the isolated context is committed.
     */
    onCommit?: OnCommit<Data>;
    /**
     * Form.Isolation: Will be called when the form is cleared via Form.clearData
     */
    onClear?: () => void;
    /**
     * Form.Isolation: A function that will be called when the isolated context is committed.
     * It will receive the data from the isolated context and the data from the outer context.
     * You can use this to transform the data before it is committed.
     */
    transformOnCommit?: (isolatedData: Data, handlerData: Data) => JsonObject;
    /**
     * Prevent the form from being submitted when there are fields with errors inside the Form.Isolation.
     */
    bubbleValidation?: boolean;
    /**
     * Prevents uncommitted changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.
     */
    preventUncommittedChanges?: boolean;
    /**
     * If set to `true`, the Form.Isolation will reset its data context after committing the data to the outer context.
     */
    resetDataAfterCommit?: boolean;
    /**
     * Provide a reference by using Form.Isolation.createDataReference.
     */
    dataReference?: IsolationDataReference;
    /**
     * Used internally by the Form.Isolation component
     */
    path?: Path;
    /**
     * Used internally by the Form.Isolation component
     */
    isolate?: boolean;
};
export type IsolationProps<Data extends JsonObject> = Omit<ProviderProps<Data>, 'onSubmit' | 'onSubmitRequest' | 'onSubmitComplete' | 'minimumAsyncBehaviorTime' | 'asyncSubmitTimeout' | 'scrollTopOnSubmit' | 'sessionStorageId' | 'globalStatusId'> & {
    /**
     * A ref (function) that you can call in order to commit the data programmatically to the outer context.
     */
    commitHandleRef?: React.RefObject<() => void>;
};
declare function IsolationProvider<Data extends JsonObject>(props: IsolationProps<Data>): import("react/jsx-runtime").JSX.Element;
declare namespace IsolationProvider {
    var CommitButton: typeof IsolationCommitButton;
    var ResetButton: typeof IsolationResetButton;
    var createDataReference: typeof import("./IsolationDataReference").createDataReference;
}
export default IsolationProvider;
