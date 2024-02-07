import React from 'react'
import { Ajv, makeAjvInstance } from '../utils/ajv'
import {
  AllJSONSchemaVersions,
  CustomErrorMessagesWithPaths,
} from '../types'

export type Path = string
export type Identifier = string

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
  handlePathChange: (path: Path, value: any) => void
  updateDataValue: (
    path: Path,
    value: any,
    props: { disabled: boolean }
  ) => void
  validateData: () => void
  handleSubmit: (props?: HandleSubmitProps) => any
  scrollToTop: () => void
  // Error status
  showAllErrors: boolean
  setShowAllErrors: (showAllErrors: boolean) => void
  // Mounted fields - Components telling the provider what fields is on screen at any time
  mountedFieldPaths: string[]
  handleMountField: (path: Path) => void
  handleUnMountField: (path: Path) => void
  setValueWithError: (path: Path, hasError: boolean) => void
  setProps: (path: Path, props: any) => void
  hasErrors: () => boolean
  hasFieldError: (path: Path) => boolean
  ajvInstance: Ajv
  contextErrorMessages: CustomErrorMessagesWithPaths
  schema: AllJSONSchemaVersions
  _isInsideFormElement?: boolean
}

export const defaultContextState: ContextState = {
  hasContext: false,
  data: undefined,
  schema: undefined,
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
  hasFieldError: () => false,
  setValueWithError: () => null,
  setProps: () => null,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  _isInsideFormElement: false,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
