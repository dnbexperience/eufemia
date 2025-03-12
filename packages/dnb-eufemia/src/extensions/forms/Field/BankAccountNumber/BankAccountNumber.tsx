import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'

import useTranslation from '../../hooks/useTranslation'
import type { ValidatorDisableable } from '../../types'

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  validate?: boolean
  omitMask?: boolean
  onBlurValidator?: ValidatorDisableable<string>
}

function BankAccountNumber(props: Props) {
  const {
    errorBankAccountNumber,
    errorBankAccountNumberLength,
    errorRequired,
    label,
  } = useTranslation().BankAccountNumber

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorBankAccountNumber,
      ...props.errorMessages,
    }
  }, [errorBankAccountNumber, errorRequired, props.errorMessages])

  const bankAccountNumberValidator = useCallback(
    (value: string) => {
      if (value !== undefined) {
        const bankAccountNoIs11Digits = value?.length === 11

        if (!bankAccountNoIs11Digits) {
          return Error(errorBankAccountNumberLength)
        }

        if (bankAccountNoIs11Digits && !isValidAccountNumber(value)) {
          return Error(errorBankAccountNumber)
        }
      }
    },
    [errorBankAccountNumber, errorBankAccountNumberLength]
  )

  const {
    validate = true,
    omitMask,
    // Deprecated – can be removed in v11
    validator,
    onChangeValidator = validator,
    onBlurValidator = bankAccountNumberValidator,
    label: labelProp,
    width,
  } = props

  const mask = useMemo(
    () =>
      omitMask
        ? [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]
        : [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ],
    [omitMask]
  )

  const onBlurValidatorToUse =
    onBlurValidator === false ? undefined : onBlurValidator

  const StringFieldProps: StringFieldProps = {
    ...props,
    className: 'dnb-forms-field-bank-account-number',
    label: labelProp ?? label,
    errorMessages,
    mask,
    width: width ?? 'medium',
    inputMode: 'numeric',
    onChangeValidator: validate ? onChangeValidator : undefined,
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: { bankAccountNumberValidator },
  }

  return <StringField {...StringFieldProps} />
}

function isValidAccountNumber(digits: string) {
  if (digits === '00000000000') {
    return false
  }
  let checkDigit = 2
  let sum = 0

  for (let i = digits.length - 2; i >= 0; --i) {
    sum += parseInt(digits.charAt(i)) * checkDigit

    checkDigit += 1

    if (checkDigit > 7) {
      checkDigit = 2
    }
  }

  const result = 11 - (sum % 11)
  const finalCheckDigit = result === 11 ? 0 : result

  return parseInt(digits.charAt(digits.length - 1), 10) === finalCheckDigit
}

BankAccountNumber._supportsSpacingProps = true
export default BankAccountNumber
