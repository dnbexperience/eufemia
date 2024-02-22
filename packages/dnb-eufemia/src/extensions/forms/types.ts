import type { SpacingProps } from '../../components/space/types'
import type { JSONSchema7 } from 'json-schema'
import type { JSONSchemaType } from 'ajv/dist/2020'
import { AriaAttributes } from 'react'

export type * from 'json-schema'
export type JSONSchema = JSONSchema7
export type AllJSONSchemaVersions = JSONSchema7 | JSONSchemaType<unknown>
export { JSONSchemaType }

type ValidationRule = string | string[]
type MessageValues = Record<string, string>

interface IFormErrorOptions {
  validationRule?: ValidationRule
  messageValues?: MessageValues
}

/**
 * Standard error object for Eufemia Forms, extending the built-in error with additional information for data handling
 */
export class FormError extends Error {
  /**
   * What validation rule did the error occur based on? (i.e: minLength, required or maximum)
   */
  validationRule?: ValidationRule

  /**
   * Replacement values relevant for this error.
   * @example { minLength: 3 } to be able to replace values in a message like "Minimum {minLength} characters"
   */
  messageValues?: MessageValues

  constructor(message: string, options?: IFormErrorOptions) {
    super(message)

    if (options) {
      this.validationRule = options.validationRule
      this.messageValues = options.messageValues
    }
  }
}

/**
 * Accept any key, so custom message keys can be used
 */
export type CustomErrorMessages = Record<string, string>

/**
 * Accept any key, so custom message keys can be used
 * including the path to the field the message is for
 */
export type CustomErrorMessagesWithPaths =
  | CustomErrorMessages
  | {
      // eslint-disable-next-line no-unused-vars
      [K in `/${string}`]?: CustomErrorMessages
    }

export interface DefaultErrorMessages {
  required?: string
  pattern?: string
}

export interface DataValueReadProps<Value = unknown> {
  /** JSON Pointer for where the data for this field is located in the source dataset */
  path?: string
  /** JSON Pointer for where the data for this field is located in the source iterate loop element */
  itemPath?: string
  value?: Value
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

export interface DataValueWriteProps<
  Value = unknown,
  EmptyValue = undefined | string,
> {
  emptyValue?: EmptyValue
  onFocus?: (value: Value | EmptyValue) => void
  onBlur?: (value: Value | EmptyValue) => void
  onChange?: (
    value: Value | EmptyValue,
    additionalArgs?: AdditionalEventArgs
  ) => void
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
  EmptyValue = undefined | string,
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
  EmptyValue = undefined | string,
> = ComponentProps &
  DataValueReadProps<Value> &
  DataValueWriteProps<Value, EmptyValue>

export interface FieldProps<
  Value = unknown,
  EmptyValue = undefined | string,
  ErrorMessages extends DefaultErrorMessages = DefaultErrorMessages,
> extends DataValueReadWriteComponentProps<Value, EmptyValue>,
    AriaAttributes {
  /** ID added to the actual field component, and linked to the label via for-attribute */
  id?: string
  name?: string
  layout?: 'horizontal' | 'vertical'
  /** Main label text */
  label?: React.ReactNode
  /** A more discreet text displayed beside the label */
  labelDescription?: React.ReactNode
  /** Text showing in place of the value if no value is given */
  placeholder?: string
  autoComplete?:
    | HTMLInputElement['autocomplete']
    | HTMLTextAreaElement['autocomplete']
  info?: React.ReactNode
  warning?: React.ReactNode
  error?: Error | FormError
  hasError?: boolean
  disabled?: boolean
  readOnly?: boolean
  capitalize?: boolean
  trim?: boolean
  // Validation
  required?: boolean
  schema?: AllJSONSchemaVersions
  validator?: (
    value: Value | EmptyValue,
    errorMessages?: ErrorMessages
  ) => Error | undefined | Promise<Error | undefined>
  onBlurValidator?: (
    value: Value | EmptyValue
  ) => Error | undefined | Promise<Error | undefined>
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
  /** Should validation be done while writing, not just when blurring the field? */
  continuousValidation?: boolean
  errorMessages?: ErrorMessages
  // Derivatives
  toInput?: (external: Value | unknown) => Value | unknown
  fromInput?: (external: Value | unknown) => Value
  toEvent?: (
    internal: Value,
    type: 'onChange' | 'onFocus' | 'onBlur' | 'onBlurValidator'
  ) => Value
  fromExternal?: (external: Value) => Value
  transformValue?: (value: Value, currentValue?: Value) => Value
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
}

export interface FieldHelpProps {
  help?: {
    title?: string
    content?: string
  }
}

export interface ValueProps<Value>
  extends DataValueReadComponentProps<Value> {
  label?: string
  /** Field label to show above the data value. */
  showEmpty?: boolean
  /** Text showing in place of the value if no value is given. */
  placeholder?: string
  /** JSON Pointer for where the data for this field is located in the source iterate loop element */
  itemPath?: string
  /** For showing the value inline (not as a block element) */
  inline?: boolean
  // Derivatives
  /** Prepare value for display (regardless of source like props or data context) */
  prepare?: (external: Value | undefined) => string
}

export type Path = string
export type Identifier = string
export type SubmitState = 'pending' | 'complete' | 'error' | 'abort'
