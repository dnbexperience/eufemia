import type { AriaAttributes } from 'react'
import type { SpacingProps } from '../../components/space/types'
import type {
  FilterData,
  TransformData,
  VisibleDataOptions,
} from './DataContext'
import type { SharedFieldBlockProps } from './FieldBlock'
import type { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema'
import type { JSONSchemaType } from 'ajv/dist/2020'
import { JsonObject, FormError } from './utils'
import {
  FormsTranslationFlat,
  FormsTranslationLocale,
} from './hooks/useTranslation'
import { GetValueByPath } from './hooks/useDataValue'

export type * from 'json-schema'
export type JSONSchema = JSONSchema7
export type AllJSONSchemaVersionsBasis<DataType> =
  | JSONSchema4
  | JSONSchema6
  | JSONSchema7
  | JSONSchemaType<DataType>
export type AllJSONSchemaVersions<DataType = unknown> =
  | AllJSONSchemaVersionsBasis<DataType>

  // In order to support "schema = { ... } as const"
  | (Omit<AllJSONSchemaVersionsBasis<DataType>, 'required'> & {
      required?: readonly string[]
    })
export { JSONSchemaType }

export type ValidatorReturnSync<Value> =
  | Error
  | FormError
  | undefined
  | void
  | Array<Validator<Value>>
  | Array<Error | FormError>

export type ValidatorReturnAsync<Value> =
  | ValidatorReturnSync<Value>
  | Promise<ValidatorReturnSync<Value>>
export type Validator<Value, ErrorMessages = DefaultErrorMessages> = (
  value: Value,
  additionalArgs: ValidatorAdditionalArgs<Value, ErrorMessages>
) => ValidatorReturnAsync<Value>
export type ValidatorAdditionalArgs<
  Value,
  ErrorMessages = DefaultErrorMessages,
> = {
  /**
   * Returns the error messages from the { errorMessages } object.
   */
  errorMessages: ErrorMessages

  /**
   * Connects the validator to another field.
   * This allows you to rerun the validator function once the value of the connected field changes.
   */
  connectWithPath: (path: Path) => { getValue: () => Value }

  /**
   * Returns the validators from the { exportValidators } object.
   */
  validators: Record<string, Validator<Value>> | undefined
} & {
  /** @deprecated use the error messages from the { errorMessages } object instead. */
  pattern?: string
  /** @deprecated use the error messages from the { errorMessages } object instead. */
  required?: string
}

/**
 * Accept any key, so custom message keys can be used
 * including the path to the field the message is for
 */
export type GlobalErrorMessagesWithPaths =
  | VariousErrorMessages
  | {
      // eslint-disable-next-line no-unused-vars
      [K in `/${string}`]?: VariousErrorMessages
    }

/**
 * 'MyCustom.message': 'Your custom message'
 */
export type DotNotationErrorMessages = Record<
  `${string}` | `${string}.${string}`,
  string
>
/**
 * { 'nb-NO': { 'Field.errorRequired': 'Dette feltet er påkrevd' } }
 */
export type ErrorMessagesWithLocaleSupport = Record<
  FormsTranslationLocale,
  DefaultErrorMessages
>

export type InternalErrorMessages = Record<FormsTranslationFlat, string>
export type DefaultErrorMessages = Partial<InternalErrorMessages> &
  Partial<DotNotationErrorMessages> &
  Partial<DeprecatedErrorMessages>

export type VariousErrorMessages =
  | DefaultErrorMessages
  | ErrorMessagesWithLocaleSupport

export type DeprecatedErrorMessages = {
  /**
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorRequired)
   */
  required?: string
  /**
   * @deprecated Use translation keys as the message instead of this parameter (e.g. Field.errorPattern)
   */
  pattern?: string
  /**
   * @deprecated use StringField.errorMinLength instead
   */
  minLength?: string
  /**
   * @deprecated use StringField.errorMaxLength instead
   */
  maxLength?: string
  /**
   * @deprecated use NumberField.errorMinimum instead
   */
  minimum?: string
  /**
   * @deprecated use NumberField.errorMaximum instead
   */
  maximum?: string
  /**
   * @deprecated use NumberField.errorExclusiveMinimum instead
   */
  exclusiveMinimum?: string
  /**
   * @deprecated use NumberField.errorExclusiveMaximum instead
   */
  exclusiveMaximum?: string
  /**
   * @deprecated use NumberField.errorMultipleOf instead
   */
  multipleOf?: string
}

export interface DataValueReadProps<Value = unknown> {
  /** JSON Pointer for where the data for this field is located in the source dataset */
  path?: Path
  /** JSON Pointer for where the data for this field is located in the source iterate loop element */
  itemPath?: Path
  /** Source data value for the field. Will take precedence over the path value given in the data context */
  value?: Value
  /** Default source data value for the field. Will not take precedence over the path value given in the data context */
  defaultValue?: Value
}

const dataValueReadProps = ['path', 'itemPath', 'value']

export function pickDataValueReadProps<Props extends DataValueReadProps>(
  props: Props
): DataValueReadProps {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(([key]) =>
      dataValueReadProps.includes(key)
    )
  )
}

export function omitDataValueReadProps<Props extends DataValueReadProps>(
  props: Props
): Omit<DataValueReadProps, keyof DataValueReadProps> {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) => !dataValueReadProps.includes(key)
    )
  )
}

type EventArgs<
  Value,
  ExtraValue extends AdditionalEventArgs,
> = ExtraValue extends undefined
  ? [value: Value]
  : [value: Value, additionalArgs?: ExtraValue]

export interface DataValueWriteProps<
  Value = unknown,
  EmptyValue = undefined | unknown,
  ExtraValue extends AdditionalEventArgs = undefined,
> {
  emptyValue?: EmptyValue
  onFocus?: (...args: EventArgs<Value | EmptyValue, ExtraValue>) => void
  onBlur?: (...args: EventArgs<Value | EmptyValue, ExtraValue>) => void
  onChange?: (
    ...args: EventArgs<Value | EmptyValue, ExtraValue>
  ) => OnChangeReturnType
}

const dataValueWriteProps = ['emptyValue', 'onFocus', 'onBlur', 'onChange']

export function pickDataValueWriteProps<Props extends DataValueWriteProps>(
  props: Props
): DataValueWriteProps {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(([key]) =>
      dataValueWriteProps.includes(key)
    )
  )
}

export function omitDataValueWriteProps<Props extends DataValueWriteProps>(
  props: Props
): Omit<DataValueWriteProps, keyof DataValueWriteProps> {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) => !dataValueWriteProps.includes(key)
    )
  )
}

export type DataValueReadWriteProps<
  Value = unknown,
  EmptyValue = undefined | unknown,
> = DataValueReadProps<Value> & DataValueWriteProps<Value, EmptyValue>

export function pickDataValueReadWriteProps<
  Props extends DataValueReadWriteProps,
>(props: Props): DataValueReadWriteProps {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) =>
        dataValueReadProps.includes(key) ||
        dataValueWriteProps.includes(key)
    )
  )
}

export function omitDataValueReadWriteProps<
  Props extends DataValueReadWriteProps,
>(
  props: Props
): Omit<DataValueReadWriteProps, keyof DataValueReadWriteProps> {
  return Object.fromEntries(
    Object.entries(props ?? {}).filter(
      ([key]) =>
        !dataValueReadProps.includes(key) &&
        !dataValueWriteProps.includes(key)
    )
  )
}

export type ComponentProps = SpacingProps & {
  className?: string
}

export type AdditionalEventArgs = Record<string, unknown>

export type DataValueReadComponentProps<Value = unknown> = ComponentProps &
  DataValueReadProps<Value>

export type DataValueReadWriteComponentProps<
  Value = unknown,
  EmptyValue = undefined | unknown,
> = ComponentProps &
  DataValueReadProps<Value> &
  DataValueWriteProps<Value, EmptyValue>

export type MessagePropParams<Value, ReturnValue> = {
  conditionally: (
    callback: () => ReturnValue | void,
    options?: {
      showInitially?: boolean
    }
  ) => ReturnValue
  getValueByPath: GetValueByPath<Value>
  getFieldByPath: (path: Path) => {
    props: FieldProps
    id: Identifier
  }
}
export type MessageProp<Value, ReturnValue> =
  | ReturnValue
  | ((
      value: Value,
      options: MessagePropParams<Value, ReturnValue>
    ) => ReturnValue)
export type MessageTypes<Value> =
  | UseFieldProps<Value>['info']
  | UseFieldProps<Value>['warning']
  | UseFieldProps<Value>['error']

export interface UseFieldProps<
  Value = unknown,
  EmptyValue = undefined | unknown,
  ErrorMessages extends DefaultErrorMessages = DefaultErrorMessages,
> extends DataValueReadWriteComponentProps<Value, EmptyValue>,
    AriaAttributes {
  // - HTML Element Attributes
  /**
   * ID added to the actual field component, and linked to the label via for-attribute
   */
  id?: Identifier
  name?: string
  disabled?: boolean
  readOnly?: boolean
  autoComplete?:
    | HTMLInputElement['autocomplete']
    | HTMLTextAreaElement['autocomplete']
  /**
   * Text showing in place of the value if no value is given
   */
  placeholder?: React.ReactNode

  /**
   * NB: Undocumented for now.
   * Forwards all possible props to the underlying component.
   */
  htmlAttributes?: Record<string, unknown>

  /**
   * NB: Undocumented for now.
   * Forwards all given props in a props object.
   */
  props?: Record<string, unknown>

  // - Used by useFieldProps and FieldBlock
  info?: MessageProp<Value, React.ReactNode | Array<React.ReactNode>>
  warning?: MessageProp<Value, React.ReactNode | Array<React.ReactNode>>
  error?: MessageProp<Value, Error | FormError | Array<Error | FormError>>

  // - Validation
  required?: boolean
  schema?: AllJSONSchemaVersions<Value>
  /** @deprecated Use `onChangeValidator` instead */
  validator?: Validator<Value>
  onChangeValidator?: Validator<Value>
  onBlurValidator?: Validator<Value>
  exportValidators?: Record<string, Validator<Value>>
  validateRequired?: (
    internal: Value,
    {
      emptyValue,
      required,
      isChanged,
      error,
    }: {
      emptyValue: EmptyValue
      required: boolean
      isChanged: boolean
      error: FormError | undefined
    }
  ) => FormError | undefined
  /**
   * Should error messages based on validation be shown initially (from given value-prop or source data)
   * before the user interacts with the field?
   * @default false
   */
  validateInitially?: boolean
  /**
   * Should error messages be shown when touching (like focusing a field and blurring) without having changed
   * the value? So the user did not introduce a new error, but it was invalid based on validation initially.
   */
  validateUnchanged?: boolean
  /**
   * Should validation be done while writing, not just when blurring the field?
   */
  /**
   * @deprecated – Replaced with validateContinuously, continuousValidation can be removed in v11.
   */
  continuousValidation?: boolean
  /**
   * Should validation be done while writing, not just when blurring the field?
   */
  validateContinuously?: boolean
  /**
   * Provide custom error messages for the field
   */
  errorMessages?: ErrorMessages

  // - Derivatives

  /**
   * Transforms the `value` before it's displayed in the field (e.g. input).
   * Public API. Should not be used internally.
   */
  transformIn?: (external: unknown) => Value

  /**
   * Transforms the value before it gets forwarded to the form data object or returned as the onChange value parameter.
   * Public API. Should not be used internally.
   */
  transformOut?: (internal: Value, additionalArgs?: unknown) => unknown

  /**
   * Transforms the value given by `handleChange` after `fromInput` and before `updateValue` and `toEvent`. The second parameter returns the current value.
   */
  transformValue?: (value: Value, currentValue?: Value) => Value

  /**
   * Transform additionalArgs or generate it based on `value`.
   */
  provideAdditionalArgs?: (
    value: Value,
    additionalArgs?: AdditionalEventArgs
  ) => AdditionalEventArgs

  /**
   * Transforms the value before it gets returned as the `value`.
   */
  toInput?: (external: Value | unknown) => Value | unknown

  /**
   * Transforms the internal value before it gets returned by even callbacks such as `onChange`, `onFocus` and `onBlur`. The second parameter returns the event type: `onChange`, `onFocus`, `onBlur` or `onBlurValidator`.
   */
  toEvent?: (
    internal: Value,
    type: 'onChange' | 'onFocus' | 'onBlur' | 'onBlurValidator'
  ) => Value

  /**
   * Transforms the value given by `handleChange` before it is used in the further process flow. Use it to destruct the value from the original event object.
   */
  fromInput?: (external: Value | unknown) => Value

  /**
   * Transforms the given props `value` before any other step gets entered.
   */
  fromExternal?: (external: Value) => Value

  /**
   * For internal use only.
   */
  valueType?: string | number | boolean | Array<string | number | boolean>
}

export type FieldProps<
  Value = unknown,
  EmptyValue = undefined | unknown,
  ErrorMessages extends DefaultErrorMessages = DefaultErrorMessages,
> = UseFieldProps<Value, EmptyValue, ErrorMessages> & SharedFieldBlockProps

export type FieldPropsGeneric<
  Value = unknown,
  EmptyValue = undefined | unknown,
  ErrorMessages extends DefaultErrorMessages = DefaultErrorMessages,
> = Omit<
  FieldProps<Value, EmptyValue, ErrorMessages>,
  keyof DataValueWriteProps
> &
  DataValueWriteProps<Value, EmptyValue, AdditionalEventArgs>

export type FieldPropsWithExtraValue<
  Value = unknown,
  ExtraValue extends AdditionalEventArgs = AdditionalEventArgs,
  EmptyValue = undefined | unknown,
  ErrorMessages extends DefaultErrorMessages = DefaultErrorMessages,
> = Omit<
  FieldProps<Value, EmptyValue, ErrorMessages>,
  keyof DataValueWriteProps
> &
  DataValueWriteProps<Value, EmptyValue, ExtraValue>

export interface ValueProps<Value = unknown>
  extends DataValueReadComponentProps<Value> {
  /**
   * Field label to show above the data value.
   */
  label?: React.ReactNode

  /** Use `true` to make the label only readable by screen readers. */
  labelSrOnly?: boolean

  /**
   * Use `true` to inherit the label from a visible (rendered) field with the same path.
   */
  inheritLabel?: boolean

  /**
   * Use `true` to inherit the visibility from a field with the same path.
   */
  inheritVisibility?: boolean

  /**
   * Shows the value even if it is empty.
   */
  showEmpty?: boolean

  /**
   * Text showing in place of the value if no value is given.
   */
  placeholder?: React.ReactNode

  /**
   * For showing the value inline (not as a block element)
   */
  inline?: boolean

  /** The max-width of a value block. Defaults to large */
  maxWidth?: 'small' | 'medium' | 'large' | 'auto'

  /**
   * Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.
   */
  transformLabel?: (
    label: React.ReactNode,
    convertJsxToString: (label: React.ReactNode) => string
  ) => React.ReactNode

  /**
   * Transforms the `value` before it's displayed in the field (e.g. input).
   * Public API. Should not be used internally.
   */
  transformIn?: (external: Value | unknown) => Value | unknown

  /**
   * Transforms the value before it gets returned as the `value`.
   */
  toInput?: (external: Value | unknown) => Value | unknown

  /**
   * Transforms the given props `value` before any other step gets entered.
   */
  fromExternal?: (external: Value) => Value
}

export type Path = string
export type Identifier = string

export type SubmitState =
  | 'pending' // Used for async operations
  | 'complete' // Used to hide the submit indicator
  | 'success' // Used for fields
  | 'error' // Used when error is shown
  | 'abort' // Used to abort the state regardless (step change)

/**
 * Provide a error that shows in the FormStatus of a field.
 */
type EventStateObjectError = Error
/**
 * Provide a warning that shows in the FormStatus of a field.
 */
type EventStateObjectWarning = React.ReactNode
/**
 * Provide an info that shows in the FormStatus of a field.
 */
type EventStateObjectInfo = React.ReactNode

/**
 * Provide a status that will enforce the form to stay in pending state
 */
type EventStateObjectStatus = 'pending'

/**
 * Provide a success state that will show an indicator on the related field label
 */
type EventStateObjectSuccess = 'saved'

/**
 * Provide an error or status messages that shows in the FormStatus of a field
 */
export type EventStateObjectOr = {
  error?: EventStateObjectError
  warning?: EventStateObjectWarning
  info?: EventStateObjectInfo
  pending?: EventStateObjectStatus
  customStatus?: unknown
}

export type EventStateObjectEitherOr =
  | { error: EventStateObjectError }
  | { warning: EventStateObjectWarning }
  | { info: EventStateObjectInfo }
  | { status: EventStateObjectStatus }
  | { customStatus: unknown }

export type EventStateObject = EventStateObjectOr &
  EventStateObjectEitherOr

/**
 * Provide 'saved' to indicate the data has been saved successfully. Can not be combined with `error`.
 */
export type EventStateObjectWithSuccess = EventStateObjectOr & {
  success?: EventStateObjectSuccess
} & (EventStateObjectEitherOr | { success: EventStateObjectSuccess })

/**
 * Provide an error or status messages that shows in the FormStatus of a field
 */
export type EventReturnWithStateObject = Error | EventStateObject

export type EventReturnWithStateObjectAndSuccess =
  | Error
  | EventStateObjectWithSuccess

export type OnSubmitParams<Data = JsonObject> = {
  /** Will remove data entries of fields that are not visible */
  reduceToVisibleFields: (
    data: Data,
    options?: VisibleDataOptions
  ) => Partial<Data>

  /** Will call the given function for each data path. The returned `value` will replace each data entry. It's up to you to define the shape of the value. */
  transformData: (data: Data, handler: TransformData) => Partial<Data>

  /** Will filter data based on the given "filterDataHandler" method */
  filterData: (filterDataHandler: FilterData) => Partial<Data>

  /** Will remove browser-side stored autocomplete data  */
  resetForm: () => void

  /** Will empty the whole internal data set of the form  */
  clearData: () => void
}

export type OnSubmitReturn =
  | EventReturnWithStateObject
  | void
  | Promise<EventReturnWithStateObject | void>
export type OnSubmit<Data = JsonObject> = (
  data: Data,
  {
    reduceToVisibleFields,
    transformData,
    filterData,
    resetForm,
    clearData,
  }: OnSubmitParams
) => OnSubmitReturn

export type OnCommit<Data = JsonObject> = (
  data: Data,
  {
    clearData,
    preventCommit,
  }: {
    clearData: () => void
    preventCommit?: () => void
  }
) =>
  | EventReturnWithStateObject
  | void
  | Promise<EventReturnWithStateObject | void>

export type OnChange<Data = JsonObject> = (
  data: Data,
  additionalArgs: Pick<OnSubmitParams, 'filterData'>
) => OnChangeReturnType

type OnChangeReturnType =
  | EventReturnWithStateObjectAndSuccess
  | void
  | Promise<EventReturnWithStateObjectAndSuccess | void>
