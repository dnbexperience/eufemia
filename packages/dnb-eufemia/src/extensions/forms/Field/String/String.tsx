import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import clsx from 'clsx'
import { Input, Textarea } from '../../../../components'
import * as z from 'zod'
import type { InputProps } from '../../../../components/input/Input'
import type { InputMaskedProps } from '../../../../components/InputMasked'
import InputMasked from '../../../../components/InputMasked'
import type { TextareaProps } from '../../../../components/Textarea'
import DataContext from '../../DataContext/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import type { FieldBlockProps, FieldBlockWidth } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import { useFieldProps } from '../../hooks'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { toCapitalized } from '../../../../shared/component-helper'
import type { TextCounterProps } from '../../../../fragments/TextCounter'
import type { FieldProps, Schema } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FieldStringProps = FieldProps<string, undefined | string> & {
  /** Renders a multiline textarea instead of a single-line input. */
  multiline?: boolean
  /** Additional CSS class applied to the inner input element. */
  inputClassName?: string
  /** Ref to the underlying input or textarea element. */
  ref?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  /** Defines the width of the field block container. */
  width?: FieldBlockWidth
  /** The size of the input. Available sizes: `small`, `medium` (default), `large`. */
  size?: InputProps['size'] | TextareaProps['size']
  /** If set to `true` the placeholder will remain visible when the field has focus. */
  keepPlaceholder?: InputProps['keepPlaceholder']

  // - Validation
  /** Minimum number of characters required. Triggers a validation error if the value is shorter. */
  minLength?: number
  /** Maximum number of characters allowed. Triggers a validation error if the value is longer. */
  maxLength?: number
  /** Regex pattern string the value must match. Triggers a validation error on mismatch. */
  pattern?: string

  // - Input props
  /** HTML input type attribute, e.g. `text`, `password`, `search`. Defaults to `text`. */
  type?: InputProps['type']
  /** Text alignment inside the input: `left`, `center`, or `right`. */
  align?: InputProps['align']
  /** If `true`, all text in the input is selected on focus. */
  selectAll?: InputProps['selectAll']
  /** If `true`, shows a clear button inside the input. */
  clear?: boolean
  /** Input mask configuration for masked input patterns. */
  mask?: InputMaskedProps['mask']
  /** If `true`, allows typing beyond the defined mask boundaries. */
  allowOverflow?: InputMaskedProps['allowOverflow']
  /** Icon displayed on the left side of the input. Accepts icon name strings. */
  leftIcon?: string
  /** Icon displayed on the right side of the input. Accepts icon name strings. */
  rightIcon?: string
  /** Custom React element rendered as a submit button inside the input. */
  submitElement?: InputProps['submitElement']
  /** If `true`, capitalizes the first letter of the input value. */
  capitalize?: boolean
  /** If `true`, trims leading and trailing whitespace from the value on blur. */
  trim?: boolean

  // - Textarea props
  /** Number of visible text rows for the textarea (when `multiline` is true). */
  rows?: TextareaProps['rows']
  /** Maximum number of rows the textarea can grow to when `autoResize` is enabled. */
  autoResizeMaxRows?: TextareaProps['autoResizeMaxRows']
  /** If `true`, the textarea height adjusts automatically to its content. */
  autoResize?: TextareaProps['autoResize']
  /** Displays a character counter. Pass a number to set the max count, or a config object. */
  characterCounter?: Omit<TextCounterProps, 'text'> | number

  // - Html props
  /** HTML `autocomplete` attribute for browser autofill hints. */
  autoComplete?: HTMLInputElement['autocomplete']
  /** Hint for the virtual keyboard type on touch devices, e.g. `numeric`, `email`, `tel`. */
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  /** Controls browser autocorrect behavior. */
  autoCorrect?: React.HTMLAttributes<HTMLInputElement>['autoCorrect']
  /** Controls browser spell-checking behavior. */
  spellCheck?: React.HTMLAttributes<HTMLInputElement>['spellCheck']
  /** If `true`, the input receives focus when the component mounts. */
  autoFocus?: React.HTMLAttributes<HTMLInputElement>['autoFocus']
  /** Controls text auto-capitalization on touch devices. */
  autoCapitalize?: React.HTMLAttributes<HTMLInputElement>['autoCapitalize']

  // - Events
  /** Callback fired when a key is pressed while the input has focus. */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

function StringComponent(props: FieldStringProps) {
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)

  const schema = useMemo<Schema<string>>(() => {
    return (
      // Use a factory so the schema is created using the current props
      // at validation time (min/max/pattern). This keeps rules in sync
      // with dynamic prop changes and avoids stale closures.
      props.schema ??
      ((p: FieldStringProps) => {
        return z.string().superRefine((val, ctx) => {
          if (p.minLength !== undefined && val.length < p.minLength) {
            ctx.addIssue({
              code: 'too_small',
              minimum: p.minLength,
              type: 'string',
              inclusive: true,
              origin: 'string',
              message: 'StringField.errorMinLength',
              messageValues: {
                minLength: String(p.minLength),
              },
            })
          }
          if (p.maxLength !== undefined && val.length > p.maxLength) {
            ctx.addIssue({
              code: 'too_big',
              maximum: p.maxLength,
              type: 'string',
              inclusive: true,
              origin: 'string',
              message: 'StringField.errorMaxLength',
              messageValues: {
                maxLength: String(p.maxLength),
              },
            })
          }
          if (p.pattern && !new RegExp(p.pattern, 'u').test(val)) {
            ctx.addIssue({
              code: 'invalid_format',
              validation: 'regex',
              format: 'regex',
              message: 'Field.errorPattern',
              messageValues: {
                pattern: p.pattern,
              },
            })
          }
        })
      })
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.schema, props.minLength, props.maxLength, props.pattern])
  const fromInput = useCallback(
    (event: { value: string; cleanedValue?: string }) => {
      if (typeof event === 'string') {
        event = { value: event }
      }
      if (event?.value === '') {
        return props.emptyValue
      }
      // Cleaned value for masked
      return event?.cleanedValue ?? event?.value
    },
    [props.emptyValue]
  )
  const toEvent = useCallback(
    (value: string, type: string) => {
      if (props.trim && type === 'onBlur') {
        const spaces = '[\\s ]'
        if (new RegExp(`^${spaces}|${spaces}$`).test(value)) {
          value = value.replace(
            new RegExp(`^${spaces}+|${spaces}+$`, 'g'),
            ''
          )
          handleChange(value)
        }
      }
      return value
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.trim]
  )
  const transform = props.transformValue
  const transformValue = useCallback(
    (value: string) => {
      if (props.capitalize) {
        value = toCapitalized(String(value || ''))
      }
      return transform?.(value) || value
    },
    [props.capitalize, transform]
  )

  const ref = useRef<HTMLInputElement>(undefined)
  const preparedProps: FieldStringProps = {
    ...props,
    schema,
    // @ts-expect-error - strictFunctionTypes
    fromInput,
    toEvent,
    transformValue,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'large'),
    ref: props.ref ?? ref,
  }

  const {
    id,
    name,
    className,
    ref: inputRef,
    inputClassName,
    placeholder,
    value,
    hasError,
    disabled,
    multiline,
    mask,
    allowOverflow,
    leftIcon,
    rightIcon,
    width,
    htmlAttributes,
    submitElement,

    // - Input props
    type,
    clear,
    align,
    size,
    selectAll,
    keepPlaceholder,

    // - Textarea props
    rows,
    autoResizeMaxRows = 6,
    autoResize = true,
    characterCounter,

    // - Html props
    autoComplete,
    inputMode,
    autoCorrect,
    spellCheck,
    autoFocus,
    autoCapitalize,

    // - Events
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
    onKeyDown,
  } = useFieldProps(preparedProps)

  useEffect(() => {
    // Use getElementById to read the current DOM input value
    const input = id ? document.getElementById(id) : null
    setDisplayValue((input as HTMLInputElement)?.value)
  }, [id, setDisplayValue, value])

  const transformInstantly = useCallback(
    (value: string) => (props.capitalize ? toCapitalized(value) : value),
    [props.capitalize]
  )

  const { handleSubmit } = dataContext ?? {}
  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (
        !multiline &&
        dataContext?.props?.isolate &&
        event.key === 'Enter'
      ) {
        handleSubmit() // So we commit the data to the outer context
        event.preventDefault?.() // And prevent the default form submit
      }

      onKeyDown?.(event)
    },
    [handleSubmit, dataContext?.props?.isolate, multiline, onKeyDown]
  )

  const cn = clsx('dnb-forms-field-string__input', inputClassName)

  const sharedProps = {
    id,
    name,
    autoComplete,
    autoCorrect,
    spellCheck,
    autoFocus,
    autoCapitalize,
    inputMode,
    className: cn,
    placeholder,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown: handleKeyDown as any,
    disabled,
    ...htmlAttributes,
    stretch: Boolean(width),
    ref: inputRef as any,
    status: hasError ? 'error' : undefined,
    value: transformInstantly(value?.toString() ?? ''),
  }

  const textareaProps: TextareaProps = {
    keepPlaceholder,
    rows,
    autoResizeMaxRows: autoResizeMaxRows,
    autoResize,
    characterCounter,
  }

  const inputProps = {
    type,
    clear,
    size,
    align,
    selectAll,
    icon: leftIcon ?? rightIcon,
    iconPosition: rightIcon && !leftIcon ? ('right' as const) : undefined,
    submitElement: submitElement,
    keepPlaceholder: keepPlaceholder,
  }

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    className: clsx('dnb-forms-field-string', className),
    width:
      width === 'stretch' || fieldBlockContext?.composition
        ? width
        : undefined,
    contentWidth: width !== false ? width : undefined,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      {multiline ? (
        <Textarea {...sharedProps} {...textareaProps} />
      ) : mask ? (
        <InputMasked
          {...sharedProps}
          {...inputProps}
          mask={mask}
          allowOverflow={allowOverflow}
        />
      ) : (
        <Input {...sharedProps} {...inputProps} />
      )}
    </FieldBlock>
  )
}

withComponentMarkers(StringComponent, {
  _supportsSpacingProps: true,
})

export default StringComponent
