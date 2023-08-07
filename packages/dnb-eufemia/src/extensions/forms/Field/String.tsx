import React, { useContext } from 'react'
import classnames from 'classnames'
import { Input, Textarea } from '../../../components'
import { InputProps } from '../../../components/input/Input'
import { forwardSpaceProps } from '../utils'
import SharedContext from '../../../shared/Context'
import FieldBlock from '../FieldBlock'
import { useInput } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'

interface ErrorMessages {
  required?: string
  schema?: string
  minLength?: string
  maxLength?: string
  pattern?: string
}
export type Props = ComponentProps &
  FieldProps<string, undefined, ErrorMessages> & {
    inputClassName?: string
    type?: InputProps['type']
    multiline?: boolean
    leftIcon?: string
    rightIcon?: string
    clear?: boolean
    autoresize?: boolean
    autoresizeMaxRows?: number
    characterCounter?: boolean
    // Validation
    minLength?: number
    maxLength?: number
    pattern?: string
    // Styling
    width?: false | 'medium' | 'large' | 'stretch'
  }

export default function FieldString(props: Props) {
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
    fromInput: ({ value: valueFromInput }: { value: string }) => {
      if (valueFromInput === '') {
        return props.emptyValue
      }
      return valueFromInput
    },
    width: props.width ?? 'large',
  }
  const {
    id,
    className,
    path,
    'data-testid': dataTestId,
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
    multiline,
    leftIcon,
    rightIcon,
    clear,
    autoresize = true,
    autoresizeMaxRows = 6,
    characterCounter,
    width,
    onFocus,
    onBlur,
    onChange,
  } = useInput(preparedProps)

  const characterCounterElement = characterCounter
    ? props.maxLength
      ? `${value?.length ?? '0'}/${props.maxLength}`
      : `${value?.length ?? '0'}`
    : undefined

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
      {...forwardSpaceProps(props)}
    >
      {multiline ? (
        <Textarea
          id={id}
          className={classnames(
            'dnb-forms-field-string__input',
            width !== false &&
              width !== 'stretch' &&
              `dnb-forms-field-string__input--width-${width}`,
            inputClassName
          )}
          data-testid={dataTestId ?? path ?? 'field-string'}
          placeholder={placeholder}
          value={value}
          on_focus={onFocus}
          on_blur={onBlur}
          on_change={onChange}
          autoresize={autoresize}
          autoresize_max_rows={autoresizeMaxRows}
          disabled={disabled}
          stretch={width === 'stretch'}
        />
      ) : (
        <Input
          id={id}
          className={classnames(
            'dnb-forms-field-string__input',
            width !== false &&
              width !== 'stretch' &&
              `dnb-forms-field-string__input--width-${width}`,
            inputClassName
          )}
          data-testid={dataTestId ?? path ?? 'field-string'}
          type={type}
          placeholder={placeholder}
          value={value ?? ''}
          icon={leftIcon ?? rightIcon}
          icon_position={rightIcon && !leftIcon ? 'right' : undefined}
          clear={clear}
          on_focus={onFocus}
          on_blur={onBlur}
          on_change={onChange}
          disabled={disabled}
          stretch={width === 'stretch'}
        />
      )}
    </FieldBlock>
  )
}
