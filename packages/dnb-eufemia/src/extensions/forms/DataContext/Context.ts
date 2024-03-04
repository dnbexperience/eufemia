import React from 'react'
import { Ajv, makeAjvInstance } from '../utils/ajv'
import {
  AllJSONSchemaVersions,
  CustomErrorMessagesWithPaths,
  SubmitState,
  Path,
  Identifier,
} from '../types'

type HandleSubmitProps = {
  formElement?: HTMLFormElement
}

export type EventListenerCall = {
  path: Path
  type: 'onSubmit'
  callback: ({ hasError }: { hasError: boolean }) => any
}

export interface ContextState {
  id?: Identifier
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
  hasErrors: () => boolean
  hasFieldState: (state: SubmitState) => boolean
  checkFieldStateFor: (path: Path, state: SubmitState) => boolean
  setFieldState: (path: Path, fieldState: SubmitState) => void
  // Mounted fields - Components telling the provider what fields is on screen at any time
  mountedFieldPaths: string[]
  handleMountField: (path: Path) => void
  handleUnMountField: (path: Path) => void
  formState: SubmitState
  setFormState?: (state: SubmitState) => void
  handleSubmitCall: ({
    originalHandler,
    onSubmit,
    omitSubmitCall,
    omitCheckErrors,
  }: {
    originalHandler: (...args: any[]) => unknown
    onSubmit?: ({
      asyncBehaviorIsEnabled,
    }: {
      asyncBehaviorIsEnabled: boolean
    }) => unknown
    omitSubmitCall?: boolean
    omitCheckErrors?: boolean
  }) => void
  setEventListener: (
    path: EventListenerCall['path'],
    type: EventListenerCall['type'],
    callback: EventListenerCall['callback']
  ) => void
  setProps: (path: Path, props: any) => void
  ajvInstance: Ajv
  contextErrorMessages: CustomErrorMessagesWithPaths
  schema: AllJSONSchemaVersions
  disabled: boolean
  submitError: Error
  _isInsideFormElement?: boolean
}

export const defaultContextState: ContextState = {
  hasContext: false,
  data: undefined,
  schema: undefined,
  disabled: undefined,
  submitError: undefined,
  handlePathChange: () => null,
  updateDataValue: () => null,
  validateData: () => null,
  handleSubmit: () => null,
  scrollToTop: () => null,
  showAllErrors: false,
  formState: undefined,
  setFormState: () => null,
  setEventListener: () => null,
  handleSubmitCall: () => null,
  setShowAllErrors: () => null,
  mountedFieldPaths: [],
  handleMountField: () => null,
  handleUnMountField: () => null,
  hasErrors: () => false,
  hasFieldState: () => false,
  checkFieldStateFor: () => false,
  setFieldState: () => null,
  setProps: () => null,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  _isInsideFormElement: false,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
