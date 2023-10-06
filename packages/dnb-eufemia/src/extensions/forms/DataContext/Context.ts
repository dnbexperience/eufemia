import React from 'react'

type HandleSubmitProps = {
  formElement?: HTMLFormElement
}

export interface ContextState {
  /** The dataset for the form / form steps */
  data: any
  /** Should the form validate data before submitting? */
  errors?: Record<string, Error>
  handlePathChange: (path: string, value: any) => void
  handleSubmit: (props?: HandleSubmitProps) => any
  // Error status
  showAllErrors: boolean
  setShowAllErrors: (showAllErrors: boolean) => void
  // Mounted fields - Components telling the provider what fields is on screen at any time
  mountedFieldPaths: string[]
  handleMountField: (path: string) => void
  handleUnMountField: (path: string) => void
  setPathWithError: (path: string, hasError: boolean) => void
  hasErrors: () => boolean
  _isInsideFormElement?: boolean
}

export const defaultContextState: ContextState = {
  data: undefined,
  handlePathChange: () => null,
  handleSubmit: () => null,
  showAllErrors: false,
  setShowAllErrors: () => null,
  mountedFieldPaths: [],
  handleMountField: () => null,
  handleUnMountField: () => null,
  hasErrors: () => false,
  setPathWithError: () => null,
  _isInsideFormElement: false,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
