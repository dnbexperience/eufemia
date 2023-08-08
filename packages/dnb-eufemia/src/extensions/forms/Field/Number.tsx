import React from 'react'
import { Input } from '../../../components'
import classnames from 'classnames'
import {
  formatNumber,
  parseFormattedNumber,
  forwardSpaceProps,
} from '../utils'
import FieldBlock from '../FieldBlock'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'

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
  FieldProps<number, undefined, ErrorMessages> & {
    inputClassName?: string
    // Formatting
    thousandSeparator?: string
    decimalSymbol?: string
    decimals?: number
    fixedDecimals?: number
    prefix?: string
    suffix?: string
    // Validation
    minimum?: number // aka greater than or equal to
    maximum?: number // aka less than or equal to
    exclusiveMinimum?: number // aka greater than
    exclusiveMaximum?: number // aka less than
    multipleOf?: number
    // Styling
    width?: false | 'medium' | 'large' | 'stretch'
  }

export default function FieldNumber(props: Props) {
  const {
    thousandSeparator,
    decimalSymbol,
    decimals,
    fixedDecimals,
    prefix,
    suffix,
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

      return formatNumber(external, {
        thousandSeparator,
        decimalSymbol,
        decimals,
        fixedDecimals,
        prefix,
        suffix,
      })
    },
    fromInput: ({ value: valueFromInput }: { value: string }) => {
      if (valueFromInput === '') {
        return emptyValue
      }
      return parseFormattedNumber(valueFromInput, {
        thousandSeparator,
        decimalSymbol,
        decimals,
        fixedDecimals,
        prefix,
        suffix,
      })
    },
    width: props.width ?? 'medium',
  }

  const {
    id,
    className,
    'data-testid': dataTestId,
    inputClassName,
    layout,
    placeholder,
    label,
    labelDescription,
    labelSecondary,
    path,
    value,
    disabled,
    info,
    warning,
    error,
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
      {...forwardSpaceProps(props)}
    >
      <Input
        id={id}
        className={classnames(
          'dnb-forms-field-number__input',
          width !== false &&
            width !== 'stretch' &&
            `dnb-forms-field-number__input--width-${width}`,
          inputClassName
        )}
        data-testid={dataTestId ?? path ?? 'field-number'}
        placeholder={placeholder}
        value={value}
        suffix={suffix}
        on_focus={onFocus}
        on_blur={onBlur}
        on_change={onChange}
        disabled={disabled}
        stretch={width === 'stretch'}
      />
    </FieldBlock>
  )
}
