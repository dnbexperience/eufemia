import React, { useContext } from 'react'
import classnames from 'classnames'
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

  const preparedProps: Props = {
    ...props,
    errorMessages: {
      required: sharedContext?.translation.Forms.inputErrorRequired,
      minLength:
        sharedContext?.translation.Forms.stringInputErrorMinLength.replace(
          '{minLength}',
          props.minLength?.toString()
        ),
      maxLength:
        sharedContext?.translation.Forms.stringInputErrorMaxLength.replace(
          '{maxLength}',
          props.maxLength?.toString()
        ),
      pattern: sharedContext?.translation.Forms.inputErrorPattern,
      ...props.errorMessages,
    },
    schema: props.schema ?? {
      type: 'string',
      minLength: props.minLength,
      maxLength: props.maxLength,
      pattern: props.pattern,
    },
    fromInput: ({
      value,
      cleanedValue,
    }: {
      value: string
      cleanedValue: string
    }) => {
      if (value === '') {
        return props.emptyValue
      }
      // Cleaned value for masked
      return cleanedValue ?? value
    },
    width: props.width ?? 'large',
  }
  const {
    id,
    className,
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
      contentsWidth={width !== false ? width : undefined}
      {...pickSpacingProps(props)}
    >
      {multiline ? (
        <Textarea
          id={id}
          className={cn}
          placeholder={placeholder}
          value={value}
          suffix={
            help ? (
              <HelpButton title={help.title} left="x-small">
                {help.contents}
              </HelpButton>
            ) : undefined
          }
          on_focus={handleFocus}
          on_blur={handleBlur}
          on_change={handleChange}
          autoresize={autoresize}
          autoresize_max_rows={autoresizeMaxRows}
          disabled={disabled}
          stretch={width !== undefined}
          inner_ref={innerRef}
          status={error ? 'error' : undefined}
        />
      ) : mask ? (
        <InputMasked
          id={id}
          className={cn}
          mask={mask}
          placeholder={placeholder}
          value={value?.toString() ?? ''}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          suffix={
            help ? (
              <HelpButton title={help.title}>{help.contents}</HelpButton>
            ) : undefined
          }
          on_focus={handleFocus}
          on_blur={handleBlur}
          on_change={handleChange}
          disabled={disabled}
          stretch={width !== undefined}
          inner_ref={innerRef}
          status={error ? 'error' : undefined}
        />
      ) : (
        <Input
          id={id}
          className={cn}
          type={type}
          placeholder={placeholder}
          value={value?.toString() ?? ''}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          clear={clear}
          suffix={
            help ? (
              <HelpButton title={help.title}>{help.contents}</HelpButton>
            ) : undefined
          }
          on_focus={handleFocus}
          on_blur={handleBlur}
          on_change={handleChange}
          disabled={disabled}
          stretch={width !== undefined}
          inner_ref={innerRef}
          status={error ? 'error' : undefined}
        />
      )}
    </FieldBlock>
  )
}

StringComponent._supportsEufemiaSpacingProps = true
export default StringComponent
