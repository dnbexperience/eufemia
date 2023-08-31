import React from 'react'
import { InputMasked, HelpButton } from '../../../components'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import FieldBlock from '../FieldBlock'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps, FieldHelpProps } from '../field-types'

interface ErrorMessages {
  required?: string
  schema?: string
  minimum?: string
  maximum?: string
  exclusiveMinimum?: string
  exclusiveMaximum?: string
  multipleOf?: string
}

export type Props = ComponentProps &
  FieldHelpProps &
  FieldProps<number, undefined, ErrorMessages> & {
    inputClassName?: string
    // Formatting
    thousandSeparator?: string | true
    decimalSymbol?: string
    decimalLimit?: number
    prefix?: string
    suffix?: string
    // Validation
    minimum?: number // aka greater than or equal to
    maximum?: number // aka less than or equal to
    exclusiveMinimum?: number // aka greater than
    exclusiveMaximum?: number // aka less than
    multipleOf?: number
    // Styling
    width?: false | 'small' | 'medium' | 'large' | 'stretch'
    rightAligned?: boolean
  }

function NumberComponent(props: Props) {
  const {
    thousandSeparator,
    decimalSymbol = ',',
    decimalLimit = 12,
    prefix,
    suffix,
    rightAligned,
  } = props

  const preparedProps: Props = {
    ...props,
    schema: props.schema ?? {
      type: 'number',
      minimum: props.minimum,
      maximum: props.maximum,
      exclusiveMinimum: props.exclusiveMinimum,
      exclusiveMaximum: props.exclusiveMaximum,
      multipleOf: props.multipleOf,
    },
    toInput: (external: number | undefined) => {
      if (external === undefined) {
        return ''
      }
      return external
    },
    fromInput: ({
      value,
      numberValue,
    }: {
      value: string
      numberValue: number
    }) => {
      if (value === '') {
        return emptyValue
      }
      return numberValue
    },
    width: props.width ?? 'medium',
  }

  const {
    id,
    className,
    inputClassName,
    layout,
    placeholder,
    label,
    labelDescription,
    labelSecondary,
    value,
    disabled,
    info,
    warning,
    error,
    help,
    emptyValue,
    width,
    onFocus,
    onBlur,
    onChange,
  } = useField(preparedProps)

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-number', className)}
      forId={id}
      layout={layout}
      label={label}
      labelDescription={labelDescription}
      labelSecondary={labelSecondary}
      info={info}
      warning={warning}
      error={error}
      contentsWidth={width !== false ? width : undefined}
      {...forwardSpaceProps(props)}
    >
      <InputMasked
        id={id}
        className={classnames(
          'dnb-forms-field-number__input',
          inputClassName,
        )}
        placeholder={placeholder}
        value={value}
        as_number
        number_mask={{
          decimalLimit,
          decimalSymbol,
          includeThousandsSeparator: thousandSeparator !== undefined,
          thousandsSeparatorSymbol:
            thousandSeparator === true ? ' ' : thousandSeparator,
          prefix,
          suffix,
        }}
        right={rightAligned}
        on_focus={onFocus}
        on_blur={onBlur}
        on_change={onChange}
        disabled={disabled}
        stretch={width !== undefined}
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.contents}</HelpButton>
          ) : undefined
        }
      />
    </FieldBlock>
  )
}

NumberComponent._supportsEufemiaSpacingProps = true
export default NumberComponent
