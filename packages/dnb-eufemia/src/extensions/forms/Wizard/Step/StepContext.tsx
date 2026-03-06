import React from 'react'
import type { StepIndex } from '../Context/types'

export interface WizardStepContextState {
  index?: StepIndex
}

const WizardStepContext = React.createContext<
  WizardStepContextState | undefined
>(undefined)

export default WizardStepContext
