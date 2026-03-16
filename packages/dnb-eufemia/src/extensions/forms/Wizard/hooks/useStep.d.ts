import type { WizardContextState } from '../Context/WizardContext';
import type { OnStepChange } from '../Context/types';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
export default function useStep(id?: SharedStateId, { onStepChange }?: {
    onStepChange?: OnStepChange;
}): WizardContextState;
