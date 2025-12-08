import React from 'react'
import { Ajv, FormError, JsonObject } from '../utils'
import {
  GlobalErrorMessagesWithPaths,
  SubmitState,
  Path,
  EventStateObject,
  EventReturnWithStateObject,
  FieldProps,
  ValueProps,
  OnChange,
  OnSubmitParams,
  CountryCode,
  Identifier,
  Schema,
} from '../types'
import { Props as ProviderProps } from './Provider'
import { SnapshotName } from '../Form/Snapshot'
import { SharedStateId } from '../../../shared/helpers/useSharedState'

export type SectionSchemaRegistration = {
  id: symbol
  path?: Path
  schema: Schema
}

export type MountState = {
  isPreMounted?: boolean
  isMounted?: boolean
  isVisible?: boolean
  isFocused?: boolean
  wasStepChange?: boolean
}

export type EventListenerCall = {
  path?: Path
  type?:
    | 'onSubmit'
    | 'onBeforeSubmit'
    | 'onSubmitCall'
    | 'onSubmitRequest'
    | 'onBeforeCommit'
    | 'onAfterCommit'
    | 'onPathChange'
    | 'onMount'
    | 'onSetFieldError'
  callback: (
    params?: { value: unknown } | { preventSubmit: () => void }
  ) => void | Promise<void | Error>
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
export type FilterDataHandlerParameters = DataPathHandlerParameters & {
  path: Path
}
export type DataPathHandler<Data = unknown> = (
  parameters: DataPathHandlerParameters<Data>
) => boolean | undefined
export type DataPathHandlerParameters<Data = unknown> = {
  path: Path
  value: unknown
  displayValue: undefined | React.ReactNode | Array<React.ReactNode>
  label: React.ReactNode
  props: FieldProps
  error: Error | undefined

  /**
   * Used in the "filterData" given by the "useData" hook.
   */
  data: Data

  /** @deprecated – can be removed in v11 */
  internal: {
    error: Error | undefined
  }
}
export type FilterDataPathObject<Data> = Record<
  Path,
  DataPathHandler<Data> | boolean | undefined
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
export type FieldInternalsRefProps =
  | (FieldProps & { children: unknown })
  | undefined
export type FieldInternalsValue<Props = FieldInternalsRefProps> = {
  id?: Identifier
  props?: Props
  enableAsyncMode?: boolean
}
export type FieldInternalsRef = Record<Path, FieldInternalsValue>
export type ValueInternalsRef = Record<
  Path,
  { props: ValueProps | undefined }
>

export interface ContextState {
  id?: SharedStateId
  hasContext: boolean
  /** The dataset for the form / form wizard */
  data: any
  internalDataRef?: React.MutableRefObject<any>
  /** Should the form validate data before submitting? */
  errors?: Record<Path, Error>
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
  setData: (data: any, options?: { preventUpdate?: boolean }) => void
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
  hasFieldWithAsyncValidator?: () => boolean
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
  getSubmitParams?: () => OnSubmitParams
  setFieldEventListener?: (
    path: EventListenerCall['path'],
    type: EventListenerCall['type'],
    callback: EventListenerCall['callback'],
    params?: { remove?: boolean }
  ) => void
  revealError?: (path: Path, hasError: boolean) => void
  setFieldInternals?: <Props>(
    path: Path,
    internals: FieldInternalsValue<Props>
  ) => void
  setValueInternals?: (path: Path, props: unknown) => void
  setFieldConnection?: (path: Path, connections: FieldConnections) => void
  isEmptyDataRef?: React.MutableRefObject<boolean>
  addSetShowAllErrorsRef?: React.MutableRefObject<
    Array<(showAllErrors: boolean) => void>
  >
  fieldDisplayValueRef?: React.MutableRefObject<
    Record<Path, { type: 'field'; value?: React.ReactNode }>
  >
  fieldInternalsRef?: React.MutableRefObject<FieldInternalsRef>
  valueInternalsRef?: React.MutableRefObject<ValueInternalsRef>
  fieldConnectionsRef?: React.RefObject<Record<Path, FieldConnections>>
  mountedFieldsRef?: React.MutableRefObject<Map<Path, MountState>>
  snapshotsRef?: React.MutableRefObject<
    Map<SnapshotName, Map<Path, unknown>>
  >
  existingFieldsRef?: React.MutableRefObject<Map<Path, boolean>>
  formElementRef?: React.MutableRefObject<HTMLFormElement>
  fieldErrorRef?: React.MutableRefObject<Record<Path, Error>>
  errorsRef?: React.MutableRefObject<Record<Path, Error>>
  showAllErrors: boolean | number
  hasVisibleError: boolean
  formState: SubmitState
  getAjvInstance?: () => Ajv
  contextErrorMessages: GlobalErrorMessagesWithPaths
  schema: Schema
  path?: Path
  disabled?: boolean
  required?: boolean
  countryCode?: CountryCode
  submitState: Partial<EventStateObject>
  prerenderFieldProps?: boolean
  decoupleForm?: boolean
  hasElementRef?: React.MutableRefObject<boolean>
  restHandlerProps?: Record<string, unknown>
  registerSectionSchema?: (
    registration: SectionSchemaRegistration
  ) => () => void
  sectionSchemaPathsRef?: React.MutableRefObject<Set<Path>>
  props: ProviderProps<JsonObject>
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
  contextErrorMessages: undefined,
  registerSectionSchema: () => () => undefined,
  sectionSchemaPathsRef: undefined,
  props: null,
}

const Context = React.createContext<ContextState>(defaultContextState)

export default Context
