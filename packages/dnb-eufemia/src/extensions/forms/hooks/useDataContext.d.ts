import type { SharedStateId } from '../../../shared/helpers/useSharedState';
import type { ContextState } from '../DataContext/Context';
export default function useDataContext(id?: SharedStateId): {
    dataContext?: ContextState;
    getContext: () => ContextState;
};
