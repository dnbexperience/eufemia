import type { ContextState } from '../../DataContext';
export type Props = {
    outerContext: ContextState;
    preventUncommittedChanges: boolean;
    error: Error;
    name?: string;
};
export default function useHandleStatus({ outerContext, preventUncommittedChanges, error, name, }: Props): {
    hasContentChanged: boolean;
    showStatus: any;
};
