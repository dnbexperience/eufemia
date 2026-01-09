import React from 'react'
import type { Path } from '../../types'
import type { VisibleWhen } from '../../Form/Visibility'
import type {
  InternalStepStatus,
  OnStepChange,
  SetActiveIndexOptions,
  StepIndex,
  Steps,
} from './types'

export type HandleStatusArgs = {
  id: string
  index: StepIndex
  inactive: boolean
  titleProp: React.ReactNode
}

export interface WizardContextState {
  id?: string
  totalSteps?: number
  activeIndex?: StepIndex
  initialActiveIndex?: StepIndex
  stepElementRef?: React.MutableRefObject<HTMLElement>
  stepsRef?: React.MutableRefObject<Steps>
  updateTitlesRef?: React.MutableRefObject<() => void>
  activeIndexRef?: React.MutableRefObject<StepIndex>
  stepIndexRef?: React.MutableRefObject<StepIndex>
  totalStepsRef?: React.MutableRefObject<number>
  prerenderFieldPropsRef?: React.MutableRefObject<
    Record<
      `step-${number}`,
      {
        index: number
        fn: () => React.ReactElement
      }
    >
  >
  hasErrorInOtherStepRef?: React.MutableRefObject<boolean>
  onStepChangeEventsRef?: React.MutableRefObject<Set<OnStepChange>>
  prerenderFieldProps?: boolean
  keepInDOM?: boolean
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
  setFieldError?: (index: StepIndex, path: Path, hasError: boolean) => void
  hasInvalidStepsState?: (
    index?: StepIndex,
    forStates?: Array<InternalStepStatus>
  ) => boolean
  check?: ({ visibleWhen }: { visibleWhen: VisibleWhen }) => boolean
  collectStepsData?: (args: HandleStatusArgs) => { title: string }
  enableMapOverChildren?: () => void
  mapOverChildrenRef?: React.MutableRefObject<boolean>
}

const WizardContext = React.createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
