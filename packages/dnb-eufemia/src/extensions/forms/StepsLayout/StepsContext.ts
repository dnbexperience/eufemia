import React from 'react'

export type StepIndex = number
export interface StepsContextState {
  activeIndex: StepIndex
  handlePrevious: () => void
  handleNext: () => void
  setActiveIndex: (index: StepIndex) => void
}

const StepsContext = React.createContext<StepsContextState | undefined>({
  activeIndex: 0,
  setActiveIndex: () => null,
  handlePrevious: () => null,
  handleNext: () => null,
})

export default StepsContext
