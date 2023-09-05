import { JSONSchema7 } from 'json-schema'
import { FormError } from './types'
interface DefaultErrorMessages {
  required?: string
}

export interface FieldProps<
  Value = unknown,
  EmptyValue = undefined | string | number,
  ErrorMessages extends { required?: string } = DefaultErrorMessages,
> {
  /** ID added to the actual field component, and linked to the label via for-attribute */
  id?: string
  layout?: 'horizontal' | 'vertical'
  /** Main label text */
  label?: string
  /** A more discreet text displayed beside the label (i.e for "(optional)") */
  labelDescription?: string
  /** Secondary information displayed at the end of the label line (i.e character counter) */
  labelSecondary?: string
  /** Text showing in place of the value if no value is given */
  placeholder?: string
  /** JSON Pointer for where the data for this field is located in the source dataset */
  path?: string
  value?: Value
  info?: Error | FormError | string
  warning?: Error | FormError | string
  error?: Error | FormError
  disabled?: boolean
  onFocus?: (value: Value | EmptyValue) => void
  onBlur?: (value: Value | EmptyValue) => void
  onChange?: (value: Value | EmptyValue) => void
  emptyValue?: EmptyValue
  // Validation
  required?: boolean
  schema?: JSONSchema7
  validator?: (
    value: Value | EmptyValue
  ) => Error | undefined | Promise<Error | undefined>
  onBlurValidator?: (
    value: Value | EmptyValue
  ) => Error | undefined | Promise<Error | undefined>
  /**
   * Should error messages based on validation be shown initially (from given value-prop or source data)
   * before the user interacts with the field?
   * @default false
   * */
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
  toInput?: (external: Value | undefined) => any
  fromInput?: (...args: any[]) => Value | undefined
}

export interface FieldHelpProps {
  help?: {
    title?: string
    contents?: string
  }
}
