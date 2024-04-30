import React from 'react'
import { Ajv, makeAjvInstance } from '../utils/ajv'
import {
  AllJSONSchemaVersions,
  CustomErrorMessagesWithPaths,
  SubmitState,
  Path,
  EventStateObject,
  EventReturnWithStateObject,
  Identifier,
  FieldProps,
  FormError,
} from '../types'
import { Props as ProviderProps } from './Provider'

type HandleSubmitProps = {
  formElement?: HTMLFormElement
}

export type EventListenerCall = {
  path: Path
  type: 'onSubmit'
  callback: () => any
}

export type FilterDataHandler<Data> = (
  data: Data,
  filter: FilterData
) => Partial<Data>
export type FilterData = (
  path: Path,
  value: any,
  props: FieldProps,
  internal: {
    error: Error | undefined
  }
) => boolean | undefined
export type TransformData = (
  path: Path,
  value: any,
  props: FieldProps,
  internal: {
    error: Error | undefined
  }
) => any

export interface ContextState {
  id?: Identifier
  hasContext: boolean
  /** The dataset for the form / form wizard */
  data: any
  /** Should the form validate data before submitting? */
  errors?: Record<string, Error>
  /** Will set autoComplete="on" on each nested Field.String and Field.Number */
  autoComplete?: boolean
  handlePathChange: (
    path: Path,
    value?: any
  ) =>
    | EventReturnWithStateObject
    | unknown
    | Promise<EventReturnWithStateObject | unknown>
  handlePathChangeUnvalidated: (path: Path, value: any) => void
  updateDataValue: (path: Path, value: any) => void
  setData: (data: any) => void
  mutateDataHandler?: (data: any, mutate: TransformData) => any
  filterDataHandler?: (data: any, filter: FilterData) => any
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
  setFieldError: (path: Path, error: Error | FormError) => void
  // Mounted fields - Components telling the provider what fields is on screen at any time
  mountedFieldPaths: string[]
  handleMountField: (path: Path) => void
  handleUnMountField: (path: Path) => void
  formState: SubmitState
  setFormState?: (state: SubmitState) => void
  setSubmitState?: (state: EventStateObject) => void
  handleSubmitCall: ({
    onSubmit,
    enableAsyncBehaviour,
    skipFieldValidation,
    skipErrorCheck,
  }: {
    onSubmit: () =>
      | EventReturnWithStateObject
      | void
      | Promise<EventReturnWithStateObject | void>
    enableAsyncBehaviour: boolean
    skipFieldValidation?: boolean
    skipErrorCheck?: boolean
  }) => void
  setFieldEventListener: (
    path: EventListenerCall['path'],
    type: EventListenerCall['type'],
    callback: EventListenerCall['callback']
  ) => void
  setProps: (path: Path, props: any) => void
  ajvInstance: Ajv
  contextErrorMessages: CustomErrorMessagesWithPaths
  schema: AllJSONSchemaVersions
  disabled?: boolean
  required?: boolean
  submitState: Partial<EventStateObject>
  _isInsideFormElement?: boolean
  props: ProviderProps<unknown>
  fieldProps?: Record<Path, unknown>
}

export const defaultContextState: ContextState = {
  hasContext: false,
  data: undefined,
  schema: undefined,
  submitState: undefined,
  handlePathChange: () => null,
  handlePathChangeUnvalidated: () => null,
  updateDataValue: () => null,
  setData: () => null,
  validateData: () => null,
  handleSubmit: () => null,
  scrollToTop: () => null,
  showAllErrors: false,
  formState: undefined,
  setFormState: () => null,
  setSubmitState: () => null,
  setFieldEventListener: () => null,
  handleSubmitCall: () => null,
  setShowAllErrors: () => null,
  mountedFieldPaths: [],
  handleMountField: () => null,
  handleUnMountField: () => null,
  hasErrors: () => false,
  hasFieldState: () => false,
  checkFieldStateFor: () => false,
  setFieldState: () => null,
  setFieldError: () => null,
  setProps: () => null,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  _isInsideFormElement: false,
  props: null,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
