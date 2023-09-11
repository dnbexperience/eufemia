import React, { useContext } from 'react'
import classnames from 'classnames'
import { HelpButton, Input, Textarea } from '../../../components'
import { InputProps } from '../../../components/input/Input'
import InputMasked, {
  InputMaskedProps,
} from '../../../components/InputMasked'
import { forwardSpaceProps } from '../utils'
import SharedContext from '../../../shared/Context'
import FieldBlock from '../FieldBlock'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps, FieldHelpProps } from '../field-types'

interface ErrorMessages {
  required?: string
  schema?: string
  minLength?: string
  maxLength?: string
  pattern?: string
}
export type Props = ComponentProps &
  FieldHelpProps &
  FieldProps<string, undefined | string, ErrorMessages> & {
    inputClassName?: string
    type?: InputProps['type']
    multiline?: boolean
    leftIcon?: string
    rightIcon?: string
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
  } = useField(preparedProps)

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
      {...forwardSpaceProps(props)}
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
        />
      )}
    </FieldBlock>
  )
}

StringComponent._supportsEufemiaSpacingProps = true
export default StringComponent
