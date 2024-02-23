import React, { useContext, useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { HelpButton, Input, Textarea } from '../../../../components'
import { InputProps } from '../../../../components/input/Input'
import InputMasked, {
  InputMaskedProps,
} from '../../../../components/InputMasked'
import { TextareaProps } from '../../../../components/Textarea'
import SharedContext from '../../../../shared/Context'
import FieldBlockContext from '../../FieldBlock/FieldBlockContext'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { toCapitalized } from '../../../../shared/component-helper'
import type { TextCounterProps } from '../../../../fragments/TextCounter'
import type {
  FieldProps,
  FieldHelpProps,
  CustomErrorMessages,
  AllJSONSchemaVersions,
} from '../../types'
import useErrorMessage from '../../hooks/useErrorMessage'

interface ErrorMessages extends CustomErrorMessages {
  required?: string
  schema?: string
  minLength?: string
  maxLength?: string
  pattern?: string
}
export type Props = FieldHelpProps &
  FieldProps<string, undefined | string, ErrorMessages> & {
    // - String props
    multiline?: boolean
    mask?: InputMaskedProps['mask']
    leftIcon?: string
    rightIcon?: string
    inputClassName?: string
    innerRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    submitElement?: InputProps['submit_element']
    width?: false | 'small' | 'medium' | 'large' | 'stretch'

    // - Validation
    minLength?: number
    maxLength?: number
    pattern?: string

    // - Input props
    type?: InputProps['type']
    size?: InputProps['size']
    align?: InputProps['align']
    selectall?: InputProps['selectall']
    clear?: boolean
    keepPlaceholder?: InputProps['keep_placeholder']

    // - Textarea props
    rows?: TextareaProps['rows']
    autoresizeMaxRows?: TextareaProps['autoresize_max_rows']
    autoresize?: TextareaProps['autoresize']
    characterCounter?: Omit<TextCounterProps, 'text'> | number

    // - Html props
    autoComplete?: HTMLInputElement['autocomplete']
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
    autoCorrect?: React.HTMLAttributes<HTMLInputElement>['autoCorrect']
    spellCheck?: React.HTMLAttributes<HTMLInputElement>['spellCheck']
    autoFocus?: React.HTMLAttributes<HTMLInputElement>['autoFocus']
    autoCapitalize?: React.HTMLAttributes<HTMLInputElement>['autoCapitalize']
  }

function StringComponent(props: Props) {
  const fieldBlockContext = useContext(FieldBlockContext)
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: tr.inputErrorRequired,
    minLength: tr.stringInputErrorMinLength,
    maxLength: tr.stringInputErrorMaxLength,
    pattern: tr.inputErrorPattern,
  })

  const schema = useMemo<AllJSONSchemaVersions>(
    () =>
      props.schema ?? {
        type: 'string',
        minLength: props.minLength,
        maxLength: props.maxLength,
        pattern: props.pattern,
      },
    [props.schema, props.minLength, props.maxLength, props.pattern]
  )
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
  const transformValue = useCallback(
    (value: string) => {
      if (props.capitalize) {
        value = toCapitalized(String(value || ''))
      }
      return value
    },
    [props.capitalize]
  )

  const preparedProps: Props = {
    ...props,
    errorMessages,
    schema,
    fromInput,
    toEvent,
    transformValue,
    width:
      props.width ??
      (fieldBlockContext?.composition ? 'stretch' : 'large'),
  }

  const {
    id,
    name,
    className,
    innerRef,
    inputClassName,
    layout,
    placeholder,
    label,
    labelDescription,
    value,
    hasError,
    disabled,
    help,
    multiline,
    mask,
    leftIcon,
    rightIcon,
    width,
    ariaAttributes,
    submitElement,

    // - Input props
    type,
    clear,
    align,
    size,
    selectall,
    keepPlaceholder,

    // - Textarea props
    rows,
    autoresizeMaxRows = 6,
    autoresize = true,
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
  } = useDataValue(preparedProps)

  const transformInstantly = useCallback(
    (value: string) => (props.capitalize ? toCapitalized(value) : value),
    [props.capitalize]
  )

  const cn = classnames('dnb-forms-field-string__input', inputClassName)

  const sharedProps: InputProps & TextareaProps = {
    id,
    name,
    autoComplete,
    autoCorrect,
    spellCheck,
    autoFocus,
    autoCapitalize,
    inputMode,
    className: cn,
    placeholder: placeholder,
    suffix: help ? (
      <HelpButton title={help.title}>{help.content}</HelpButton>
    ) : undefined,
    on_focus: handleFocus,
    on_blur: handleBlur,
    on_change: handleChange,
    disabled,
    ...ariaAttributes,
    stretch: Boolean(
      width !== undefined || fieldBlockContext?.composition
    ),
    inner_ref: innerRef,
    status: hasError ? 'error' : undefined,
    value: transformInstantly(value?.toString() ?? ''),
  }

  const inputProps: InputProps = {
    type,
    clear,
    size,
    align,
    selectall,
    icon: leftIcon ?? rightIcon,
    icon_position: rightIcon && !leftIcon ? 'right' : undefined,
    submit_element: submitElement,
    keep_placeholder: keepPlaceholder,
  }

  const fieldBlockProps = {
    className: classnames('dnb-forms-field-string', className),
    forId: id,
    layout,
    label,
    labelDescription,
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
        <Textarea
          {...sharedProps}
          rows={rows}
          autoresize_max_rows={autoresizeMaxRows}
          autoresize={autoresize}
          characterCounter={characterCounter}
        />
      ) : mask ? (
        <InputMasked {...sharedProps} {...inputProps} mask={mask} />
      ) : (
        <Input {...sharedProps} {...inputProps} />
      )}
    </FieldBlock>
  )
}

StringComponent._supportsSpacingProps = true
export default StringComponent
