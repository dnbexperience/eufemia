import React, { useCallback, useMemo } from 'react'
import type {
  FieldProps,
  Validator,
  ValidatorWithCustomValidators,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import clsx from 'clsx'
import type { FieldBlockProps } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import type {
  SegmentedFieldProps,
  SegmentedFieldValue,
} from '../../../../components/input-masked/segmented-field/SegmentedField'
import SegmentedField from '../../../../components/input-masked/segmented-field/SegmentedField'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import useTranslation from '../../hooks/useTranslation'
import { FormError } from '../../utils'
import type { Translation } from '../../../../shared/Context'

type ExpiryValue = SegmentedFieldValue<'month' | 'year'>

export type ExpiryValidator = ValidatorWithCustomValidators<
  string,
  {
    expiryValidator: Validator<string>
  }
>

export type ExpiryProps = Omit<
  FieldProps<string, undefined | ''>,
  'width' | 'contentWidth'
> & {
  /**
   * The size of the component.
   */
  size?: SegmentedFieldProps<'month' | 'year'>['size']
}

function Expiry(props: ExpiryProps = {}) {
  const { label: expiryLabel, errorRequired } = useTranslation().Expiry

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
    onChangeValidator,
    errorMessages: propErrorMessages,
    validateInitially: validateInitiallyProp,
    validateContinuously,
    value: valueProp,
    transformIn: transformInProp,
    onStatusChange,
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
      const monthString = expiryValueToString(
        stripPlaceholderChars(values.month, placeholders.month),
        placeholders.month
      )
      const yearString = expiryValueToString(
        stripPlaceholderChars(values.year, placeholders.year),
        placeholders.year
      )

      if (
        isFieldEmpty(monthString, placeholders.month) &&
        isFieldEmpty(yearString, placeholders.year)
      ) {
        return undefined
      }

      return `${monthString}${yearString}`
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

        if (external?.year || external?.month) {
          const monthString = expiryValueToString(
            external.month as string,
            placeholders.month
          )
          const yearString = expiryValueToString(
            external.year as string,
            placeholders.year
          )

          if (
            isFieldEmpty(monthString, placeholders.month) &&
            isFieldEmpty(yearString, placeholders.year)
          ) {
            return undefined
          }

          return `${monthString}${yearString}`
        }
      }

      return value
    },
    [transformInProp, placeholders.month, placeholders.year]
  )

  const provideAdditionalArgs = useCallback(
    (value: string) => {
      const { month, year } = stringToExpiryValue(value)

      return {
        month:
          stripPlaceholderChars(month, placeholders.month) || undefined,
        year: stripPlaceholderChars(year, placeholders.year) || undefined,
      }
    },
    [placeholders.month, placeholders.year]
  )

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    validateInitially,
    validateContinuously,
    fromExternal,
    // @ts-expect-error - strictFunctionTypes
    transformIn,
    // @ts-expect-error - strictFunctionTypes
    fromInput,
    provideAdditionalArgs,
    validateRequired,
    onBlurValidator: onBlurValidator,
    onChangeValidator,
    onStatusChange,
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

  const expiry: ExpiryValue = useMemo(() => {
    const { month, year } = stringToExpiryValue(value)

    return {
      month: stripPlaceholderChars(month, placeholders.month),
      year: stripPlaceholderChars(year, placeholders.year),
    }
  }, [placeholders.month, placeholders.year, value])

  useMemo(() => {
    if ((path || itemPath) && expiry.month && expiry.year) {
      setDisplayValue(`${expiry.month}/${expiry.year}`)
    }
  }, [expiry.month, expiry.year, itemPath, path, setDisplayValue])

  const status = hasError
    ? 'error'
    : warning
    ? 'warning'
    : info
    ? 'info'
    : null

  const fieldBlockProps: FieldBlockProps = {
    id,
    forId: `${id}-input`,
    className: clsx('dnb-forms-field-expiry', className),
    label,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <SegmentedField
        stretch
        id={`${id}-input`}
        values={expiry}
        status={status === 'error'}
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
            spinButton: {
              min: 1,
              max: 12,
              getInitialValue: () => new Date().getMonth() + 1,
            },
            placeholder: repeatPlaceholder(placeholders.month, 2),
            autoComplete: 'cc-exp-month',
            ...htmlAttributes,
          },
          {
            id: 'year',
            label: yearLabel,
            mask: [/[0-9]/, /[0-9]/],
            spinButton: {
              min: 0,
              max: 99,
              getInitialValue: () => new Date().getFullYear() % 100,
            },
            placeholder: repeatPlaceholder(placeholders.year, 2),
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

function repeatPlaceholder(character: string, length: number) {
  if (!character) {
    return ''
  }

  return Array.from({ length }, () => character).join('')
}

function stripPlaceholderChars(
  value: string | undefined,
  placeholder: string
) {
  if (!value) {
    return ''
  }

  if (!placeholder) {
    return value
  }

  return value.split(placeholder).join('')
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
