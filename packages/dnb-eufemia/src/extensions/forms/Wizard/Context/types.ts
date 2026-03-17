import type { StepIndicatorStatusState } from '../../../../components/step-indicator/StepIndicatorItem'
import type { EventReturnWithStateObject, Path } from '../../types'

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
export type Steps = Map<
  StepIndex,
  {
    index: StepIndex
    id: string
    title: React.ReactNode
    stringifiedTitle: string
    inactive?: boolean
    keepInDOM?: boolean

    /** Used internally to set the status */
    status?: string

    /** Used internally to set the statusState */
    statusState?: StepIndicatorStatusState
  }
>
export type SetActiveIndexOptions = {
  skipStepChangeCall?: boolean
  skipStepChangeCallBeforeMounted?: boolean
  skipStepChangeCallFromHook?: boolean
  skipErrorCheck?: boolean
}

export type InternalStepStatus = 'error' | 'unknown' | undefined
export type InternalStepStatuses = Map<StepIndex, InternalStepStatus>
export type InternalVisitedSteps = Map<StepIndex, boolean>
export type InternalFieldError = Map<
  Path,
  {
    index: StepIndex
    hasError: boolean
  }
>
