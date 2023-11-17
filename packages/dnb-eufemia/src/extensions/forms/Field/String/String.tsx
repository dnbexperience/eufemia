import React, { useContext, useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { JSONSchema7 } from 'json-schema'
import { HelpButton, Input, Textarea } from '../../../../components'
import { InputProps } from '../../../../components/input/Input'
import InputMasked, {
  InputMaskedProps,
} from '../../../../components/InputMasked'
import SharedContext from '../../../../shared/Context'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'

interface ErrorMessages {
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
    autoresizeMaxRows?: number
    characterCounter?: boolean
    mask?: InputMaskedProps['mask']
    // Validation
    minLength?: number
    maxLength?: number
    pattern?: string
    // Styling
    width?: false | 'small' | 'medium' | 'large' | 'stretch'
  }

function StringComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useMemo(
    () => ({
      required: tr.inputErrorRequired,
      minLength: tr.stringInputErrorMinLength.replace(
        '{minLength}',
        props.minLength?.toString()
      ),
      maxLength: tr.stringInputErrorMaxLength.replace(
        '{maxLength}',
        props.maxLength?.toString()
      ),
      pattern: tr.inputErrorPattern,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages, props.minLength, props.maxLength]
  )
  const schema = useMemo<JSONSchema7>(
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
    ({ value, cleanedValue }: { value: string; cleanedValue: string }) => {
      if (value === '') {
        return props.emptyValue
      }
      // Cleaned value for masked
      return cleanedValue ?? value
    },
    [props.emptyValue]
  )

  const preparedProps: Props = {
    ...props,
    errorMessages,
    schema,
    fromInput,
    width: props.width ?? 'large',
  }

  const {
    id,
    name,
    className,
    autoComplete,
    innerRef,
    inputClassName,
    layout,
    type,
    placeholder,
    label,
    labelDescription,
    labelSecondary,
    value,
    info,
    warning,
    error,
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
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(preparedProps)

  const characterCounterElement = characterCounter
    ? props.maxLength
      ? `${value?.length ?? '0'}/${props.maxLength}`
      : `${value?.length ?? '0'}`
    : undefined
  const cn = classnames('dnb-forms-field-string__input', inputClassName)

  const sharedProps = {
    id,
    name,
    autoComplete,
    className: cn,
    placeholder: placeholder,
    suffix: help ? (
      <HelpButton title={help.title}>{help.contents}</HelpButton>
    ) : undefined,
    on_focus: handleFocus,
    on_blur: handleBlur,
    on_change: handleChange,
    disabled: disabled,
    stretch: width !== undefined,
    inner_ref: innerRef,
    status: error ? 'error' : undefined,
    value: value?.toString() ?? '',
  }

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-string', className)}
      forId={id}
      layout={layout}
      label={label}
      labelDescription={labelDescription}
      labelSecondary={labelSecondary ?? characterCounterElement}
      info={info}
      warning={warning}
      error={error}
      width={width === 'stretch' ? width : undefined}
      contentsWidth={width !== false ? width : undefined}
      {...pickSpacingProps(props)}
    >
      {multiline ? (
        <Textarea
          {...sharedProps}
          autoresize={autoresize}
          autoresize_max_rows={autoresizeMaxRows}
        />
      ) : mask ? (
        <InputMasked
          {...sharedProps}
          mask={mask}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
        />
      ) : (
        <Input
          {...sharedProps}
          type={type}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          clear={clear}
        />
      )}
    </FieldBlock>
  )
}

StringComponent._supportsSpacingProps = true
export default StringComponent
