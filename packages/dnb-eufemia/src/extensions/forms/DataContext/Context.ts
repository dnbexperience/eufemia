import React from 'react'
import { Ajv, makeAjvInstance } from '../utils/ajv'
import { CustomErrorMessagesWithPaths } from '../types'

type HandleSubmitProps = {
  formElement?: HTMLFormElement
}

export interface ContextState {
  hasContext: boolean
  /** The dataset for the form / form steps */
  data: any
  /** Should the form validate data before submitting? */
  errors?: Record<string, Error>
  /** Will set autoComplete="on" on each nested Field.String and Field.Number */
  autoComplete?: boolean
  handlePathChange: (path: string, value: any) => void
  updateDataValue: (path: string, value: any) => void
  validateData: () => void
  handleSubmit: (props?: HandleSubmitProps) => any
  scrollToTop: () => void
  // Error status
  showAllErrors: boolean
  setShowAllErrors: (showAllErrors: boolean) => void
  // Mounted fields - Components telling the provider what fields is on screen at any time
  mountedFieldPaths: string[]
  handleMountField: (path: string) => void
  handleUnMountField: (path: string) => void
  setValueWithError: (identifier: string, hasError: boolean) => void
  hasErrors: () => boolean
  ajvInstance: Ajv
  contextErrorMessages: CustomErrorMessagesWithPaths
  _isInsideFormElement?: boolean
}

export const defaultContextState: ContextState = {
  hasContext: false,
  data: undefined,
  handlePathChange: () => null,
  updateDataValue: () => null,
  validateData: () => null,
  handleSubmit: () => null,
  scrollToTop: () => null,
  showAllErrors: false,
  setShowAllErrors: () => null,
  mountedFieldPaths: [],
  handleMountField: () => null,
  handleUnMountField: () => null,
  hasErrors: () => false,
  setValueWithError: () => null,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  _isInsideFormElement: false,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
