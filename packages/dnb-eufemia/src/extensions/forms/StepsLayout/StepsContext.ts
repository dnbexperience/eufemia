import React from 'react'

interface StepsContextState {
  activeIndex: number
  handlePrevious: () => void
  handleNext: () => void
}

const StepsContext = React.createContext<StepsContextState | undefined>(
  undefined
)

export default StepsContext
