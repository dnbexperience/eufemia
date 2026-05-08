import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FieldStringProps as StringFieldProps } from '../String'
import StringField from '../String'

import useTranslation from '../../hooks/useTranslation'
import type { Validator, ValidatorWithCustomValidators } from '../../types'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { BankAccountType } from '../../../../components/number-format/utils/formatBankAccountNumber'
import { norwegianBbanValidator } from './validators'
import { getMask, getInputMode, getWidth, hasVariableMask } from './masks'

export type { BankAccountType } from '../../../../components/number-format/utils/formatBankAccountNumber'

export type BankAccountNumberValidator = ValidatorWithCustomValidators<
  string,
  {
    bankAccountNumberValidator: Validator<string>
  }
>

export type FieldBankAccountNumberProps = Omit<
  StringFieldProps,
  'onBlurValidator'
> & {
  validate?: boolean
  omitMask?: boolean
  onBlurValidator?: BankAccountNumberValidator | false

  /**
   * The type of bank account number, used for input mask and formatting.
   * Defaults to `norwegianBban`.
   */
  bankAccountType?: BankAccountType
}

function BankAccountNumber(props: FieldBankAccountNumberProps) {
  const translations = useTranslation().BankAccountNumber

  const {
    validate = true,
    omitMask = false,
    bankAccountType = 'norwegianBban',
    onChangeValidator,
    onBlurValidator: onBlurValidatorProp,
    label: labelProp,
    width,
    value,
    defaultValue,
    onChange: onChangeProp,
    onBlur: onBlurProp,
    ...restProps
  } = props

  const valueRef = useRef(value ?? defaultValue)
  const [maskValue, setMaskValue] = useState(value ?? defaultValue)

  useEffect(() => {
    if (value !== undefined && hasVariableMask(bankAccountType)) {
      setMaskValue(value)
    }
  }, [value, bankAccountType])

  // Strip formatting characters while preserving letters for IBAN.
  const cleanValue = useCallback(
    (val: string) => {
      if (!val) {
        return val
      }
      if (bankAccountType === 'iban') {
        return val.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
      }
      return val.replace(/[^0-9]/g, '')
    },
    [bankAccountType]
  )

  // InputMasked's cleanedValue uses cleanNumber which strips non-numeric
  // characters (including letters). For IBAN values this removes the
  // country code prefix. We provide our own fromInput that cleans the
  // display value instead, preserving letters for IBAN.
  const fromInput = useCallback(
    (event: { value: string; cleanedValue?: string }) => {
      if (event?.value === '') {
        return restProps.emptyValue
      }
      return cleanValue(event?.value)
    },
    [cleanValue, restProps.emptyValue]
  )

  const handleChange = useCallback(
    (newValue: string) => {
      valueRef.current = newValue
      onChangeProp?.(newValue)
    },
    [onChangeProp]
  )

  const handleBlur = useCallback(
    (...args: Parameters<NonNullable<StringFieldProps['onBlur']>>) => {
      if (hasVariableMask(bankAccountType)) {
        setMaskValue(valueRef.current)
      }
      onBlurProp?.(...args)
    },
    [bankAccountType, onBlurProp]
  )

  const label = useMemo(() => {
    if (labelProp !== undefined) {
      return labelProp
    }

    switch (bankAccountType) {
      case 'swedishBban':
        return translations.labelSwedishBban
      case 'swedishBankgiro':
        return translations.labelSwedishBankgiro
      case 'swedishPlusgiro':
        return translations.labelSwedishPlusgiro
      case 'iban':
        return translations.labelIban
      default:
        return translations.label
    }
  }, [labelProp, bankAccountType, translations])

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      'Field.errorPattern': translations.errorBankAccountNumber,
      ...props.errorMessages,
    }
  }, [
    translations.errorRequired,
    translations.errorBankAccountNumber,
    props.errorMessages,
  ])

  const bankAccountNumberValidator = useCallback(
    (value: string) => {
      if (bankAccountType !== 'norwegianBban') {
        return undefined
      }

      return norwegianBbanValidator(value, {
        errorBankAccountNumber: translations.errorBankAccountNumber,
        errorBankAccountNumberLength:
          translations.errorBankAccountNumberLength,
      })
    },
    [bankAccountType, translations]
  )

  const onBlurValidator = onBlurValidatorProp ?? bankAccountNumberValidator

  const mask = useMemo(
    () => getMask(bankAccountType, omitMask, maskValue),
    [bankAccountType, omitMask, maskValue]
  )

  const onBlurValidatorToUse =
    onBlurValidator === false ? undefined : onBlurValidator

  const stringFieldProps: StringFieldProps = {
    ...restProps,
    className: 'dnb-forms-field-bank-account-number',
    label,
    errorMessages,
    mask,
    value,
    defaultValue,
    // @ts-expect-error - strictFunctionTypes
    fromInput,
    onChange: handleChange,
    onBlur: handleBlur,
    width: width ?? getWidth(bankAccountType),
    inputMode: getInputMode(bankAccountType),
    onChangeValidator: validate ? onChangeValidator : undefined,
    // @ts-expect-error - strictFunctionTypes
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: { bankAccountNumberValidator },
  }

  return <StringField {...stringFieldProps} />
}

withComponentMarkers(BankAccountNumber, {
  _supportsSpacingProps: true,
})

export default BankAccountNumber
