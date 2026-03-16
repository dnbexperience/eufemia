import type { ContextState } from '../../DataContext/Context';
import type { IsolationDataReference } from './IsolationDataReference';
export type IsolationContext = {
    dataReference: IsolationDataReference;
    resetDataAfterCommit: boolean;
    outerContext: ContextState;
    preventUncommittedChanges: boolean;
    setIsolatedData: (data: unknown) => void;
};
declare const IsolationContext: import("react").Context<IsolationContext>;
export default IsolationContext;
