import React from 'react'

export interface ToolbarContextState {
  setShowError?: (showError: boolean) => void
}

const ToolbarContext = React.createContext<
  ToolbarContextState | undefined
>(undefined)

export default ToolbarContext
