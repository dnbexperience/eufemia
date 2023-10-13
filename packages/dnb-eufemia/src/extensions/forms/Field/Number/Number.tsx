import React, { useMemo } from 'react'
import { InputMasked, HelpButton } from '../../../../components'
import { InputMaskedProps } from '../../../../components/InputMasked'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'

interface ErrorMessages {
  required?: string
  schema?: string
  minimum?: string
  maximum?: string
  exclusiveMinimum?: string
  exclusiveMaximum?: string
  multipleOf?: string
}

export type Props = FieldHelpProps &
  FieldProps<number, undefined, ErrorMessages> & {
    inputClassName?: string
    currency?: InputMaskedProps['as_currency']
    percent?: InputMaskedProps['as_percent']
    mask?: InputMaskedProps['mask']
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
    currency,
    percent,
    mask,
    thousandSeparator,
    decimalSymbol = ',',
    decimalLimit = 12,
    prefix,
    suffix,
    rightAligned,
  } = props

  const maskProps: Partial<InputMaskedProps> = useMemo(() => {
    if (currency) {
      return {
        as_currency: currency,
      }
    }
    if (percent) {
      return {
        as_percent: percent,
      }
    }
    // Custom mask based on props
    return {
      as_number: true,
      mask,
      number_mask: {
        decimalLimit,
        decimalSymbol,
        includeThousandsSeparator: thousandSeparator !== undefined,
        thousandsSeparatorSymbol:
          thousandSeparator === true ? ' ' : thousandSeparator,
        prefix,
        suffix,
      },
    }
  }, [
    currency,
    percent,
    mask,
    decimalLimit,
    decimalSymbol,
    thousandSeparator,
    prefix,
    suffix,
  ])

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
    handleFocus,
    handleBlur,
    handleChange,
  } = useDataValue(preparedProps)

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
      {...pickSpacingProps(props)}
    >
      <InputMasked
        id={id}
        className={classnames(
          'dnb-forms-field-number__input',
          inputClassName
        )}
        placeholder={placeholder}
        value={value}
        {...maskProps}
        right={rightAligned}
        on_focus={handleFocus}
        on_blur={handleBlur}
        on_change={handleChange}
        disabled={disabled}
        status={error ? 'error' : undefined}
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
