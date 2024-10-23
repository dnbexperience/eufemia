import React from 'react'
import { Ajv, FormError, makeAjvInstance } from '../utils'
import {
  AllJSONSchemaVersions,
  GlobalErrorMessagesWithPaths,
  SubmitState,
  Path,
  EventStateObject,
  EventReturnWithStateObject,
  Identifier,
  FieldProps,
  ValueProps,
  OnChange,
  OnSubmitParams,
} from '../types'
import { Props as ProviderProps } from './Provider'
import { SnapshotName } from '../Form/Snapshot'

export type MountState = {
  isPreMounted?: boolean
  isMounted?: boolean
  isVisible?: boolean
  isFocused?: boolean
  wasStepChange?: boolean
}

export type EventListenerCall = {
  path?: Path
  type?: 'onSubmit' | 'onPathChange' | 'onMount'
  callback: (params?: { value: unknown }) => void | Promise<void | Error>
}

export type VisibleDataHandler<Data> = (
  data?: Data,
  options?: VisibleDataOptions
) => Partial<Data>
export type VisibleDataOptions = {
  keepPaths?: Array<Path>
  removePaths?: Array<Path>
}
export type MutateDataHandler<Data> = (
  data: Data,
  mutate: TransformData
) => Partial<Data>
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
export type VisibleData<Data = unknown> = Partial<Data>
export type TransformData = FilterDataHandlerCallback<unknown>
export type HandleSubmitCallback = ({
  preventSubmit,
}: {
  preventSubmit: () => void
}) => void
export type FieldConnections = {
  setEventResult?: (status: EventStateObject) => void
}

export interface ContextState {
  id?: Identifier
  hasContext: boolean
  /** The dataset for the form / form wizard */
  data: any
  internalDataRef?: React.MutableRefObject<any>
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
  updateDataValue: (
    path: Path,
    value: any,
    options?: { preventUpdate?: boolean }
  ) => void
  setData: (data: any) => void
  clearData?: () => void
  mutateDataHandler?: MutateDataHandler<unknown>
  filterDataHandler?: FilterDataHandler<unknown>
  visibleDataHandler?: VisibleDataHandler<unknown>
  validateData: () => void
  handleSubmit: () => Promise<EventStateObject | undefined>
  scrollToTop: () => void
  setShowAllErrors: (showAllErrors: boolean) => void
  hasErrors: () => boolean
  hasFieldState: (state: SubmitState) => boolean
  hasFieldError: (path: Path) => boolean
  setFieldState?: (path: Path, fieldState: SubmitState) => void
  setFieldError?: (path: Path, error: Error | FormError) => void
  setMountedFieldState: (path: Path, options: MountState) => void
  setFormState?: (
    state: SubmitState,
    options?: { keepPending?: boolean }
  ) => void
  setSubmitState?: (state: EventStateObject) => void
  addOnChangeHandler?: (callback: OnChange) => void
  handleSubmitCall: ({
    onSubmit,
    enableAsyncBehavior,
    skipFieldValidation,
    skipErrorCheck,
  }: {
    onSubmit: () =>
      | EventReturnWithStateObject
      | void
      | Promise<EventReturnWithStateObject | void>
    enableAsyncBehavior: boolean
    skipFieldValidation?: boolean
    skipErrorCheck?: boolean
  }) => Promise<EventStateObject | undefined>
  getSubmitData?: () => unknown
  getSubmitOptions?: () => OnSubmitParams
  setFieldEventListener?: (
    path: EventListenerCall['path'],
    type: EventListenerCall['type'],
    callback: EventListenerCall['callback']
  ) => void
  setVisibleError?: (path: Path, hasError: boolean) => void
  setFieldProps?: (path: Path, props: unknown) => void
  setValueProps?: (path: Path, props: unknown) => void
  setHandleSubmit?: (
    callback: HandleSubmitCallback,
    params?: { remove?: boolean }
  ) => void
  setFieldConnection?: (path: Path, connections: FieldConnections) => void
  isEmptyDataRef?: React.MutableRefObject<boolean>
  fieldPropsRef?: React.MutableRefObject<Record<string, FieldProps>>
  valuePropsRef?: React.MutableRefObject<Record<string, ValueProps>>
  fieldConnectionsRef?: React.RefObject<Record<Path, FieldConnections>>
  mountedFieldsRef?: React.MutableRefObject<Record<Path, MountState>>
  snapshotsRef?: React.MutableRefObject<
    Map<SnapshotName, Map<Path, unknown>>
  >
  existingFieldsRef?: React.MutableRefObject<Map<Path, boolean>>
  formElementRef?: React.MutableRefObject<HTMLFormElement>
  fieldErrorRef?: React.MutableRefObject<Record<Path, Error>>
  showAllErrors: boolean
  hasVisibleError: boolean
  formState: SubmitState
  ajvInstance: Ajv
  contextErrorMessages: GlobalErrorMessagesWithPaths
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
  setMountedFieldState: () => null,
  hasErrors: () => false,
  hasFieldState: () => false,
  hasFieldError: () => false,
  ajvInstance: makeAjvInstance(),
  contextErrorMessages: undefined,
  isInsideFormElement: false,
  props: null,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
