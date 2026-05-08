import { createContext } from 'react'
import type { ReactElement, ReactNode, RefObject } from 'react'
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
  titleProp: ReactNode
}

export type WizardContextState = {
  id?: string
  totalSteps?: number
  activeIndex?: StepIndex
  initialActiveIndex?: StepIndex
  stepElementRef?: RefObject<HTMLElement>
  stepsRef?: RefObject<Steps>
  updateTitlesRef?: RefObject<() => void>
  activeIndexRef?: RefObject<StepIndex>
  stepIndexRef?: RefObject<StepIndex>
  totalStepsRef?: RefObject<number>
  prerenderFieldPropsRef?: RefObject<
    Record<
      `step-${number}`,
      {
        index: number
        fn: () => ReactElement
      }
    >
  >
  hasErrorInOtherStepRef?: RefObject<boolean>
  onStepChangeEventsRef?: RefObject<Set<OnStepChange>>
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
  mapOverChildrenRef?: RefObject<boolean>
}

const WizardContext = createContext<WizardContextState | undefined>(
  undefined
)

export default WizardContext
