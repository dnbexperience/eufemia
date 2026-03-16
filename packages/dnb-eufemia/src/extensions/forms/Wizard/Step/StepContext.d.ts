import React from 'react';
import type { StepIndex } from '../Context/types';
export interface WizardStepContextState {
    index?: StepIndex;
}
declare const WizardStepContext: React.Context<WizardStepContextState>;
export default WizardStepContext;
