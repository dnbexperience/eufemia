import React from 'react'
import { EventReturnWithStateObject } from '../../types'

export type OnStepChange = (
  index: StepIndex,
  mode: 'previous' | 'next'
) =>
  | EventReturnWithStateObject
  | void
  | Promise<EventReturnWithStateObject | void>

export type StepIndex = number
export interface WizardContextState {
  id?: string
  totalSteps?: number
  activeIndex: StepIndex
  handlePrevious: () => void
  handleNext: () => void
  setActiveIndex: (
    index: StepIndex,
    { skipCallOnChange }?: { skipCallOnChange?: boolean }
  ) => void
  setFormError: (error: Error) => void
}

const WizardContext = React.createContext<WizardContextState | undefined>({
  id: null,
  totalSteps: null,
  activeIndex: 0,
  setActiveIndex: () => null,
  handlePrevious: () => null,
  handleNext: () => null,
  setFormError: () => null,
})

export default WizardContext
