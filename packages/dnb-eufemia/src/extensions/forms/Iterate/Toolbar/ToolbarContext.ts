import React from 'react'

export type ToolbarContextState = {
  setShowError?: (showError: boolean) => void
}

const ToolbarContext = React.createContext<
  ToolbarContextState | undefined
>(undefined)

export default ToolbarContext
