import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { ContextState } from '../../DataContext/Context';
import type { EventStateObject, Path } from '../../types';
import type { FormError } from '../../utils';
type UseDataReturn = {
    hasErrors: ContextState['hasErrors'];
    hasFieldError: ContextState['hasFieldError'];
    setFormError: (error: Error | FormError | undefined | null) => void;
    setFieldStatus: (path: Path, status: EventStateObject) => void;
};
export default function useValidation(id?: SharedStateId): UseDataReturn;
export {};
