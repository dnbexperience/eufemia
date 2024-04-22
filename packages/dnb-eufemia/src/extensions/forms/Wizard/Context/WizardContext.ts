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
  activeIndex?: StepIndex
  stepElementRef?: React.MutableRefObject<HTMLElement>
  handlePrevious?: () => void
  handleNext?: () => void
  setActiveIndex?: (
    index: StepIndex,
    { skipCallOnChange }?: { skipCallOnChange?: boolean }
  ) => void
  setFormError?: (error: Error) => void
}

const WizardContext = React.createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
