import type { Props } from './Indeterminate';
export default function useDependencePaths(dependencePaths: Props['dependencePaths'], propagateIndeterminateState: Props['propagateIndeterminateState']): {
    setAllStates: (checked: boolean) => void;
    indeterminate: boolean;
    internalValue: boolean;
    ariaControlsIds: string;
};
