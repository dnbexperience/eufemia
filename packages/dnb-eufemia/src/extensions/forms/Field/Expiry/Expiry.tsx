import React, { useCallback, useMemo } from 'react'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import useTranslation from '../../hooks/useTranslation'
import { FormError } from '../../utils'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldProps<string, undefined | ''>

function Expiry(props: ExpiryProps) {
  const {
    Date: { errorRequired },
    Expiry: { label: expiryLabel },
  } = useTranslation()

  const {
    DatePicker: {
      placeholderCharacters: placeholders,
      month: monthLabel,
      year: yearLabel,
    },
  } = useSharedTranslation()

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...props.errorMessages,
    }),
    [errorRequired, props.errorMessages]
  )

  const handleInput = useCallback(
    (values: ExpiryValue) => {
      const month = expiryValueToString(values.month, placeholders.month)
      const year = expiryValueToString(values.year, placeholders.year)

      if (
        isFieldEmpty(month, placeholders.month) &&
        isFieldEmpty(year, placeholders.year)
      ) {
        return ''
      }

      return `${month}${year}`
    },
    [placeholders.month, placeholders.year]
  )

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      return required && !value ? error : undefined
    },
    []
  )

  const monthAndYearValidator = useCallback(
    (value: string) => validateMonthAndYear(value, placeholders),
    [placeholders]
  )

  const validateInitially = useMemo(() => {
    if (props.validateInitially) {
      return props.validateInitially
    }

    if (props.value) {
      return true
    }

    return undefined
  }, [props.validateInitially, props.value])

  const valueProp = useMemo(() => {
    const { month, year } = stringToExpiryValue(
      props.defaultValue ?? props.value
    )
    const monthString = expiryValueToString(month, placeholders.month)
    const yearString = expiryValueToString(year, placeholders.year)

    if (
      isFieldEmpty(monthString, placeholders.month) &&
      isFieldEmpty(yearString, placeholders.year)
    ) {
      return ''
    }

    return `${monthString}${yearString}`
  }, [
    props.value,
    props.defaultValue,
    placeholders.month,
    placeholders.year,
  ])

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    value: valueProp,
    fromInput: handleInput,
    validateRequired,
    validateInitially: validateInitially,
    onBlurValidator: monthAndYearValidator,
  }

  const {
    id,
    path,
    itemPath,
    className,
    label = expiryLabel,
    hasError,
    info,
    warning,
    disabled,
    value = '',
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const expiry: ExpiryValue = useMemo(
    () => stringToExpiryValue(value),
    [value]
  )

  useMemo(() => {
    if ((path || itemPath) && expiry.month && expiry.year) {
      setDisplayValue(`${expiry.month}/${expiry.year}`)
    }
  }, [expiry.month, expiry.year, itemPath, path, setDisplayValue])

  const status = hasError
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input-month`,
    className: classnames('dnb-forms-field-expiry', className),
    label,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <MultiInputMask
        stretch
        id={`${id}-input`}
        values={expiry}
        status={status}
        statusState={disabled ? 'disabled' : undefined}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        delimiter="/"
        inputMode="numeric"
        inputs={[
          {
            id: 'month',
            label: monthLabel,
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['month'],
            autoComplete: 'cc-exp-month',
            ...htmlAttributes,
          },
          {
            id: 'year',
            label: yearLabel,
            mask: [/[0-9]/, /[0-9]/],
            placeholderCharacter: placeholders['year'],
            autoComplete: 'cc-exp-year',
            ...htmlAttributes,
          },
        ]}
      />
    </FieldBlock>
  )
}

function isFieldEmpty(value: string, placeholder: string) {
  return value === `${placeholder}${placeholder}`
}

function stringToExpiryValue(value: string) {
  const month = value?.substring(0, 2) ?? ''
  const year = value?.substring(2, 4) ?? ''

  return {
    month,
    year,
  }
}

function expiryValueToString(value: string, placeholder: string) {
  if (!value) {
    return `${placeholder}${placeholder}`
  }

  if (value.length === 1) {
    return `${value}${placeholder}`
  }

  return value
}

function validateMonthAndYear(
  date: string,
  placeholders: Record<'month' | 'year', string>
) {
  const { month, year } = stringToExpiryValue(date)

  const monthNumber = Number(month)

  const messages: Array<FormError> = []

  if (
    month.includes(placeholders.month) ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    messages.push(
      new FormError('Expiry.errorMonth', {
        messageValues: { month: month },
      })
    )
  }

  if (year.includes(placeholders.year)) {
    messages.push(
      new FormError('Expiry.errorYear', {
        messageValues: { year: year },
      })
    )
  }

  if (messages.length) {
    return messages
  }
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
