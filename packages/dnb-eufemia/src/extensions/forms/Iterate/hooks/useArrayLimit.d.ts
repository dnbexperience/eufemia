import type { Path } from '../../types';
type SharedState = {
    show?: boolean;
    limit?: number;
    total?: number;
};
export default function useArrayLimit(path: Path): {
    setShowStatus: (show: boolean) => void;
    setLimitProps: (props: Omit<SharedState, "show">) => void;
    error: Error;
    hasReachedLimit: boolean;
};
export {};
