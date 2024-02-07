import React, { useContext, useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { HelpButton, Input, Textarea } from '../../../../components'
import { InputProps } from '../../../../components/input/Input'
import InputMasked, {
  InputMaskedProps,
} from '../../../../components/InputMasked'
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
    type?: InputProps['type']
    multiline?: boolean
    leftIcon?: string
    rightIcon?: string
    inputClassName?: string
    innerRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    clear?: boolean
    autoresize?: boolean
    autoComplete?: HTMLInputElement['autocomplete']
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
    autoresizeMaxRows?: number
    characterCounter?: Omit<TextCounterProps, 'text'> | number
    mask?: InputMaskedProps['mask']
    submitElement?: InputProps['submit_element']
    // Validation
    minLength?: number
    maxLength?: number
    pattern?: string
    // Styling
    width?: false | 'small' | 'medium' | 'large' | 'stretch'
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
    autoComplete,
    inputMode,
    innerRef,
    inputClassName,
    layout,
    type,
    placeholder,
    label,
    labelDescription,
    value,
    info,
    warning,
    error,
    hasError,
    disabled,
    help,
    multiline,
    leftIcon,
    rightIcon,
    clear,
    autoresize = true,
    autoresizeMaxRows = 6,
    characterCounter,
    mask,
    width,
    ariaAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    submitElement,
  } = useDataValue(preparedProps)

  const transformInstantly = useCallback(
    (value: string) => (props.capitalize ? toCapitalized(value) : value),
    [props.capitalize]
  )

  const cn = classnames('dnb-forms-field-string__input', inputClassName)

  const sharedProps = {
    id,
    name,
    autoComplete,
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

  const fieldBlockProps = {
    className: classnames('dnb-forms-field-string', className),
    forId: id,
    layout,
    label,
    labelDescription,
    info,
    warning,
    error,
    disabled,
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
          autoresize={autoresize}
          autoresize_max_rows={autoresizeMaxRows}
          characterCounter={characterCounter}
        />
      ) : mask ? (
        <InputMasked
          {...sharedProps}
          mask={mask}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          clear={clear}
        />
      ) : (
        <Input
          {...sharedProps}
          type={type}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          clear={clear}
          submit_element={submitElement}
        />
      )}
    </FieldBlock>
  )
}

StringComponent._supportsSpacingProps = true
export default StringComponent
