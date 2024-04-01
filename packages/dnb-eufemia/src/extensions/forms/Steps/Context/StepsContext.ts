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
export interface StepsContextState {
  id?: string
  activeIndex: StepIndex
  handlePrevious: () => void
  handleNext: () => void
  setActiveIndex: (
    index: StepIndex,
    { skipCallOnChange }?: { skipCallOnChange?: boolean }
  ) => void
  setFormError: (error: Error) => void
}

const StepsContext = React.createContext<StepsContextState | undefined>({
  id: null,
  activeIndex: 0,
  setActiveIndex: () => null,
  handlePrevious: () => null,
  handleNext: () => null,
  setFormError: () => null,
})

export default StepsContext
