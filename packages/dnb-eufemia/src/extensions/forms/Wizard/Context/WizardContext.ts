import React from 'react'
import { Path } from '../../types'
import { VisibleWhen } from '../../Form/Visibility'
import {
  InternalStepStatus,
  InternalStepStatuses,
  SetActiveIndexOptions,
  StepIndex,
  Steps,
} from './types'

export interface WizardContextState {
  id?: string
  totalSteps?: number
  activeIndex?: StepIndex
  stepElementRef?: React.MutableRefObject<HTMLElement>
  stepsRef?: React.MutableRefObject<Steps>
  updateTitlesRef?: React.MutableRefObject<() => void>
  activeIndexRef?: React.MutableRefObject<StepIndex>
  totalStepsRef?: React.MutableRefObject<number>
  stepStatusRef?: React.MutableRefObject<InternalStepStatuses>
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
  revealError?: (index: StepIndex, path: Path, hasError: boolean) => void
  hasInvalidStepsState?: (forStates?: Array<InternalStepStatus>) => boolean
  check?: ({ visibleWhen }: { visibleWhen: VisibleWhen }) => boolean
}

const WizardContext = React.createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
