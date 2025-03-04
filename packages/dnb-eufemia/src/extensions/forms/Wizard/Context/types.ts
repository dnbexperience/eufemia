import { StepIndicatorStatusState } from '../../../../components/step-indicator/StepIndicatorItem'
import { EventReturnWithStateObject, Path } from '../../types'

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
export type Steps = Record<
  string,
  {
    title: string
    id: string
    inactive?: boolean

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

export type InternalStepStatus = 'error' | 'valid' | 'unknown' | undefined
export type InternalStepStatuses = Record<StepIndex, InternalStepStatus>
export type InternalVisitedSteps = Record<StepIndex, boolean>
export type InternalFieldError = Record<
  Path,
  {
    index: StepIndex
    hasError: boolean
  }
>
