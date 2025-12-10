import React, { useCallback, useMemo } from 'react'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type {
  MultiInputMaskProps,
  MultiInputMaskValue,
} from '../../../../components/input-masked'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import useTranslation from '../../hooks/useTranslation'
import { FormError } from '../../utils'
import { Translation } from '../../../../shared/Context'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = Omit<
  FieldProps<string, undefined | ''>,
  'width' | 'contentWidth'
> & {
  /**
   * The size of the component.
   */
  size?: MultiInputMaskProps<'month' | 'year'>['size']
}

function Expiry(props: ExpiryProps = {}) {
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

  const expiryValidator = useCallback(
    (value: string) => validateMonthAndYear(value, placeholders),
    [placeholders]
  )

  const {
    onBlurValidator = expiryValidator,
    errorMessages: propErrorMessages,
    validateInitially: validateInitiallyProp,
    value: valueProp,
    transformIn: transformInProp,
  } = props

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      ...propErrorMessages,
    }),
    [errorRequired, propErrorMessages]
  )

  const fromInput = useCallback(
    (values: ExpiryValue) => {
      const month = expiryValueToString(values.month, placeholders.month)
      const year = expiryValueToString(values.year, placeholders.year)

      if (
        isFieldEmpty(month, placeholders.month) &&
        isFieldEmpty(year, placeholders.year)
      ) {
        return undefined
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

  const validateInitially = useMemo(() => {
    if (validateInitiallyProp) {
      return validateInitiallyProp
    }

    if (valueProp) {
      return true
    }

    return undefined
  }, [validateInitiallyProp, valueProp])

  const fromExternal = useCallback(
    (external) => {
      if (typeof external === 'string') {
        const { month, year } = stringToExpiryValue(external)
        const monthString = expiryValueToString(month, placeholders.month)
        const yearString = expiryValueToString(year, placeholders.year)

        if (
          isFieldEmpty(monthString, placeholders.month) &&
          isFieldEmpty(yearString, placeholders.year)
        ) {
          return undefined
        }

        return `${monthString}${yearString}`
      }
      return external
    },
    [placeholders.month, placeholders.year]
  )

  const transformIn = useCallback(
    (value: string) => {
      if (transformInProp) {
        const external = transformInProp(value)

        if (typeof external === 'string') {
          return external
        }

        if (external?.year && external?.month) {
          return `${external.month}${external.year}`
        }
      }

      return value
    },
    [transformInProp]
  )

  const provideAdditionalArgs = useCallback((value: string) => {
    let { month, year } = stringToExpiryValue(value)

    if (isNaN(Number(month))) {
      month = undefined
    }
    if (isNaN(Number(year))) {
      year = undefined
    }

    return { month, year }
  }, [])

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    validateInitially,
    fromExternal,
    transformIn,
    fromInput,
    provideAdditionalArgs,
    validateRequired,
    onBlurValidator: onBlurValidator,
    exportValidators: { expiryValidator },
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
    size,
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
        size={size}
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
  const month =
    typeof value === 'string' ? value?.substring(0, 2) : undefined
  const year =
    typeof value === 'string' ? value?.substring(2, 4) : undefined

  return { month, year }
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
  placeholders: Translation['DatePicker']['placeholderCharacters']
) {
  const { month, year } = stringToExpiryValue(date)

  const monthNumber = Number(month)

  const messages: Array<FormError> = []

  // If both month and year are empty/placeholder only, don't show any errors
  const isMonthEmpty =
    !month || (month.includes(placeholders.month) && !/\d/.test(month))
  const isYearEmpty =
    !year || (year.includes(placeholders.year) && !/\d/.test(year))

  if (isMonthEmpty && isYearEmpty) {
    // Both fields are empty/placeholder only, don't show any errors
    return messages
  }

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

  // Original validation logic for year
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
