import React from 'react'

export interface IterateElementContextState {
  index: number
  value: unknown
  path?: string
  handleChange: (path: string, value: unknown) => void
  handleRemove: () => void
  handlePush: (value: unknown) => void
}

const IterateElementContext = React.createContext<
  IterateElementContextState | undefined
>(undefined)

export default IterateElementContext
