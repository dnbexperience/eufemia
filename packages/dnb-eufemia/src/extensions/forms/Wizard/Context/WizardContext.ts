import React from 'react'
import { EventReturnWithStateObject } from '../../types'
import { VisibleWhen } from '../../Form/Visibility'

export type OnStepsChangeMode = 'previous' | 'next' | 'stepListModified'
export type OnStepChangeOptions = {
  preventNavigation: (shouldPrevent?: boolean) => void
  id?: string
  previousStep: {
    index: StepIndex
    id?: string
  }
}
export type OnStepChange = (
  index: StepIndex,
  mode: OnStepsChangeMode,
  options: OnStepChangeOptions
) =>
  | EventReturnWithStateObject
  | void
  | Promise<EventReturnWithStateObject | void>

export type StepIndex = number
export type Steps = Record<string, { title: string; id: string }>
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
  stepsRef?: React.MutableRefObject<Steps>
  updateTitlesRef?: React.MutableRefObject<() => void>
  activeIndexRef?: React.MutableRefObject<StepIndex>
  totalStepsRef?: React.MutableRefObject<number>
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
  check?: ({ visibleWhen }: { visibleWhen: VisibleWhen }) => boolean
}

const WizardContext = React.createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
