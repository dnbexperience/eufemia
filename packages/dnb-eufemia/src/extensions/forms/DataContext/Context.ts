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
  ValueProps,
  OnChange,
} from '../types'
import { Props as ProviderProps } from './Provider'

type HandleSubmitProps = {
  formElement?: HTMLFormElement
}

export type EventListenerCall = {
  path?: Path
  type?: 'onSubmit'
  callback: () => void
}

export type FilterDataHandler<Data> = (
  data: Data,
  filter: FilterData
) => Partial<Data>
export type FilterDataHandlerCallback<R> = (
  parameters: FilterDataHandlerParameters
) => R
export type FilterDataHandlerParameters =
  FilterDataPathConditionParameters & {
    path: Path
  }
export type FilterDataPathCondition<Data = unknown> = (
  parameters: FilterDataPathConditionParameters<Data>
) => boolean | undefined
export type FilterDataPathConditionParameters<Data = unknown> = {
  value: unknown
  props: FieldProps
  data: Data
  internal: {
    error: Error | undefined
  }
}
export type FilterDataPathObject<Data> = Record<
  Path,
  FilterDataPathCondition<Data> | boolean | undefined
>
export type FilterData<Data = unknown> =
  | FilterDataPathObject<Data>
  | FilterDataHandlerCallback<boolean | undefined>
export type TransformData = FilterDataHandlerCallback<unknown>
export type HandleSubmitCallback = ({
  preventSubmit,
}: {
  preventSubmit: () => void
}) => void

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
  setShowAllErrors: (showAllErrors: boolean) => void
  hasErrors: () => boolean
  hasFieldState: (state: SubmitState) => boolean
  hasFieldError: (path: Path) => boolean
  setFieldState: (path: Path, fieldState: SubmitState) => void
  setFieldError: (path: Path, error: Error | FormError) => void
  handleMountField: (path: Path) => void
  handleUnMountField: (path: Path) => void
  setFormState?: (state: SubmitState) => void
  setSubmitState?: (state: EventStateObject) => void
  addOnChangeHandler?: (callback: OnChange) => void
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
  setFieldEventListener?: (
    path: EventListenerCall['path'],
    type: EventListenerCall['type'],
    callback: EventListenerCall['callback']
  ) => void
  setHasVisibleError?: (path: Path, hasError: boolean) => void
  setFieldProps?: (path: Path, props: unknown) => void
  setValueProps?: (path: Path, props: unknown) => void
  setHandleSubmit?: (callback: HandleSubmitCallback) => void
  fieldPropsRef?: React.MutableRefObject<Record<string, FieldProps>>
  valuePropsRef?: React.MutableRefObject<Record<string, ValueProps>>
  mountedFieldPathsRef?: React.MutableRefObject<Path[]>
  showAllErrors: boolean
  hasVisibleError: boolean
  formState: SubmitState
  ajvInstance: Ajv
  contextErrorMessages: CustomErrorMessagesWithPaths
  schema: AllJSONSchemaVersions
  path?: Path
  disabled?: boolean
  required?: boolean
  submitState: Partial<EventStateObject>
  isInsideFormElement?: boolean
  prerenderFieldProps?: boolean
  props: ProviderProps<unknown>
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
  hasVisibleError: false,
  formState: undefined,
  setFormState: () => null,
  setSubmitState: () => null,
  handleSubmitCall: () => null,
  setShowAllErrors: () => null,
  handleMountField: () => null,
  handleUnMountField: () => null,
  hasErrors: () => false,
  hasFieldState: () => false,
  hasFieldError: () => false,
  setFieldState: () => null,
  setFieldError: () => null,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  isInsideFormElement: false,
  props: null,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
