import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import type {
  HTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
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
  /**
   * True to be able to write in multiple lines (switching from input-element to textarea-element).
   */
  multiline?: boolean
  /**
   * Class name set on the `<input>` DOM element.
   */
  inputClassName?: string
  /**
   * By providing a `React.Ref` we can get the internally used input element (DOM).
   */
  ref?: RefObject<HTMLInputElement | HTMLTextAreaElement>
  /**
   * `false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width.
   */
  width?: FieldBlockWidth
  /** The size of the input. Available sizes: `small`, `medium` (default), `large`. */
  size?: InputProps['size'] | TextareaProps['size']
  /** If set to `true` the placeholder will remain visible when the field has focus. */
  keepPlaceholder?: InputProps['keepPlaceholder']

  // - Validation
  /**
   * Validation for minimum length of the text (number of characters).
   */
  minLength?: number
  /**
   * Validation for maximum length of the text (number of characters).
   */
  maxLength?: number
  /**
   * Validation based on regex pattern.
   */
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
  /**
   * For icon at the left side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.
   */
  leftIcon?: string
  /**
   * For icon at the right side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.
   */
  rightIcon?: string
  /**
   * Accepts a React element which will show up where the "submit button" would do.
   */
  submitElement?: InputProps['submitElement']
  /**
   * When set to `true`, it will capitalize the first letter of every word, transforming the rest to lower case.
   */
  capitalize?: boolean
  /**
   * When `true`, it will trim leading and trailing whitespaces on blur, triggering `onChange` if the value changes.
   */
  trim?: boolean

  // - Textarea props
  /**
   * To be used together with `multiline`. Set how many rows of text can be shown by default. Defaults to `2`.
   */
  rows?: TextareaProps['rows']
  /**
   * To be used together with `multiline`. Set how many rows of text can be shown at max. Defaults to `6`.
   */
  autoResizeMaxRows?: TextareaProps['autoResizeMaxRows']
  /**
   * To be used together with `multiline`. Set true to expand when writing longer texts. Defaults to `true`.
   */
  autoResize?: TextareaProps['autoResize']
  /**
   * To be used together with `multiline`. Use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.
   */
  characterCounter?: Omit<TextCounterProps, 'text'> | number

  // - Html props
  /**
   * For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.
   */
  autoComplete?: HTMLInputElement['autocomplete']
  /**
   * Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).
   */
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  /** Controls browser autocorrect behavior. */
  autoCorrect?: HTMLAttributes<HTMLInputElement>['autoCorrect']
  /** Controls browser spell-checking behavior. */
  spellCheck?: HTMLAttributes<HTMLInputElement>['spellCheck']
  /** If `true`, the input receives focus when the component mounts. */
  autoFocus?: HTMLAttributes<HTMLInputElement>['autoFocus']
  /** Controls text auto-capitalization on touch devices. */
  autoCapitalize?: HTMLAttributes<HTMLInputElement>['autoCapitalize']

  // - Events
  /** Callback fired when a key is pressed while the input has focus. */
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
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
    fromInput: props.fromInput ?? fromInput,
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
    ({ event }: { event: KeyboardEvent<HTMLInputElement> }) => {
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
    showClearButton: clear,
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
