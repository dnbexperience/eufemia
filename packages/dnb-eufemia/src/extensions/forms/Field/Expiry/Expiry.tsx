import React, { useCallback, useMemo } from 'react'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'
import { useTranslation as useSharedTranslation } from '../../../../shared'
import useTranslation from '../../hooks/useTranslation'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldHelpProps &
  FieldProps<string, undefined | ''>

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

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      return required && !value ? error : undefined
    },
    []
  )

  const preparedProps: ExpiryProps = {
    ...props,
    errorMessages,
    fromInput: toExpiryString,
    validateRequired,
  }

  const {
    id,
    path,
    className,
    label = expiryLabel,
    hasError,
    info,
    warning,
    help,
    disabled,
    value = '',
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
  } = useFieldProps(preparedProps)

  const expiry: ExpiryValue = useMemo(() => {
    return {
      month: ensureValidMonth(value?.substring(0, 2)),
      year: value?.substring(2, 4) ?? '',
    }
  }, [value])

  useMemo(() => {
    if (path && expiry.month && expiry.year) {
      setDisplayValue(path, `${expiry.month}/${expiry.year}`)
    }
  }, [expiry.month, expiry.year, path, setDisplayValue])

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
            mask: getMonthMask(expiry?.month),
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
        suffix={
          help ? (
            <HelpButton title={help.title}>{help.content}</HelpButton>
          ) : undefined
        }
      />
    </FieldBlock>
  )
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry

function toExpiryString(values: ExpiryValue) {
  return Object.values(values).join('')
}

function ensureValidMonth(month: string) {
  // Return empty value if no month is given
  if (!month) {
    return ''
  }

  const [firstMask, secondMask] = getMonthMask(month)

  const firstDigit = month?.charAt(0)
  const isFirstDigitValid = firstMask.test(firstDigit)

  if (firstDigit && !isFirstDigitValid) {
    // Return empty value if the first digit is invalid
    return ''
  }

  const secondDigit = month?.charAt(1)
  const isSecondDigitValid = secondMask.test(secondDigit)

  if (secondDigit && !isSecondDigitValid) {
    // Return empty value if the second digit is invalid
    return ''
  }

  // Return given month of month value is valid
  return month
}

function getMonthMask(month: string) {
  const firstDigit = month?.charAt(0)

  return [
    /[0-1]/,
    firstDigit === '0' || firstDigit === '' ? /[1-9]/ : /[0-2]/,
  ]
}
