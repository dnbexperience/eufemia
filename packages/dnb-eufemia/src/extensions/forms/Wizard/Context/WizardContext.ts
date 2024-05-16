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
export type SetActiveIndexOptions = {
  skipStepChangeCall?: boolean
  skipStepChangeCallBeforeMounted?: boolean
  skipStepChangeCallFromHook?: boolean
  skipErrorCheck?: boolean
}
export interface WizardContextState {
  id?: string
  totalSteps?: number
  activeIndex?: StepIndex
  stepElementRef?: React.MutableRefObject<HTMLElement>
  titlesRef?: React.MutableRefObject<Array<string>>
  activeIndexRef?: React.MutableRefObject<StepIndex>
  prerenderFieldPropsRef?: React.MutableRefObject<
    Record<string, () => React.ReactElement>
  >
  prerenderFieldProps?: boolean
  handlePrevious?: () => void
  handleNext?: () => void
  setActiveIndex?: (
    index: StepIndex,
    {
      skipStepChangeCall,
      skipStepChangeCallBeforeMounted,
      skipStepChangeCallFromHook,
    }?: SetActiveIndexOptions
  ) => void
  setFormError?: (error: Error) => void
}

const WizardContext = React.createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
