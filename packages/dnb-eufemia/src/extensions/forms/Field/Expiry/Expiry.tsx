import React, { useCallback } from 'react'
import { FieldHelpProps, FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { useFieldProps } from '../../hooks'
import classnames from 'classnames'
import FieldBlock from '../../FieldBlock'
import { MultiInputMask } from '../../../../components/input-masked'
import type { MultiInputMaskValue } from '../../../../components/input-masked'
import { HelpButton } from '../../../../components'
import useErrorMessage from '../../hooks/useErrorMessage'
import { useLocale as useSharedLocale } from '../../../../shared'
import useLocale from '../../hooks/useLocale'

type ExpiryValue = MultiInputMaskValue<'month' | 'year'>

export type ExpiryProps = FieldHelpProps & FieldProps<string>

function Expiry(props: ExpiryProps) {
  const {
    Date: { errorRequired },
    Expiry: { label: expiryLabel },
  } = useLocale()

  const {
    DatePicker: {
      placeholder_characters: placeholders,
      month: monthLabel,
      year: yearLabel,
    },
  } = useSharedLocale()

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
  })

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
    className,
    label = expiryLabel,
    error,
    hasError,
    info,
    warning,
    help,
    disabled,
    value = '',
    labelDescription,
    layout = 'vertical',
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
  } = useFieldProps(preparedProps)

  const expiry: ExpiryValue = {
    month: ensureValidMonth(value?.substring(0, 2)),
    year: value?.substring(2, 4) ?? '',
  }

  const status = hasError
    ? 'error'
    : warning
    ? 'warn'
    : info
    ? 'info'
    : null

  return (
    <FieldBlock
      className={classnames('dnb-forms-field-expiry', className)}
      id={id}
      forId={`${id}-input-month`}
      label={label}
      layout={layout}
      labelDescription={labelDescription}
      info={info}
      warning={warning}
      error={error}
      {...pickSpacingProps(props)}
    >
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
}

Expiry._supportsEufemiaSpacingProps = true
export default Expiry
