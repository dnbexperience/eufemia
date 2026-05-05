import { createContext } from 'react'
export type ToolbarContextState = {
  setShowError: (showError: boolean) => void
  onEdit?: () => void
  onDone?: () => void
  onCancel?: () => void
}

const ToolbarContext = createContext<ToolbarContextState | undefined>(
  undefined
)

export default ToolbarContext
