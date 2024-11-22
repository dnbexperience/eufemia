import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import { Validator } from '../../types'

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  validate?: boolean
  omitMask?: boolean
  onBlurValidator?: Validator<string> | false
}

function OrganizationNumber(props: Props) {
  const translations = useTranslation().OrganizationNumber
  const { errorOrgNo, errorOrgNoLength, errorRequired, label } =
    translations

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorOrgNo,
      ...props.errorMessages,
    }),
    [errorRequired, errorOrgNo, props.errorMessages]
  )

  const organizationNumberValidator = useCallback(
    (value: string) => {
      if (value !== undefined) {
        const orgNoIs9Digits = value?.length === 9

        if (!orgNoIs9Digits) {
          return Error(errorOrgNoLength)
        }
        if (orgNoIs9Digits && !isValidOrgNumber(value)) {
          return Error(errorOrgNo)
        }
      }
    },
    [errorOrgNo, errorOrgNoLength]
  )

  const {
    validate = true,
    omitMask,
    // Deprecated – can be removed in v11
    validator,
    onChangeValidator = validator,
    onBlurValidator = organizationNumberValidator,
    label: labelProp,
    width,
  } = props

  const mask = useMemo(
    () =>
      omitMask
        ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    [omitMask]
  )

  const onBlurValidatorToUse =
    onBlurValidator === false ? undefined : onBlurValidator

  const StringFieldProps: StringFieldProps = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    label: labelProp ?? label,
    errorMessages,
    mask,
    width: width ?? 'medium',
    inputMode: 'numeric',
    onChangeValidator: validate ? onChangeValidator : undefined,
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: { organizationNumberValidator },
  }

  return <StringField {...StringFieldProps} />
}

/**
 * Source:
 * www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
 */
function isValidOrgNumber(digits: string) {
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

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
