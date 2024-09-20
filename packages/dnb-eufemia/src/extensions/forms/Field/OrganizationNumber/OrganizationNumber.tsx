import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps & {
  validate?: boolean
  omitMask?: boolean
}

function OrganizationNumber(props: Props) {
  const translations = useTranslation().OrganizationNumber
  const { errorPattern, errorRequired, label } = translations

  const { validate = true, omitMask } = props

  const validationPattern = '^[0-9]{9}$'

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
    pattern: errorPattern,
  })

  const mask = useMemo(
    () =>
      omitMask
        ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        : [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
    [omitMask]
  )

  const organizationNumberValidator = useCallback(
    (value: string) => {
      const isValidOrgNumber = (digits: string) => {
        //www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
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

        return (
          parseInt(digits.charAt(digits.length - 1), 10) ===
          finalCheckDigit
        )
      }
      if (
        new RegExp(validationPattern).test(value) &&
        !isValidOrgNumber(value)
      ) {
        return Error(errorPattern)
      }
    },
    [errorPattern]
  )

  const StringFieldProps: Props = {
    ...props,
    className: 'dnb-forms-field-organization-number',
    pattern: props.pattern ?? (validate ? validationPattern : undefined),
    label: props.label ?? label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
    validator: validate
      ? props.validator || organizationNumberValidator
      : undefined,
    // exportValidators: { organizationNumberValidator },
  }

  return <StringField {...StringFieldProps} />
}

OrganizationNumber._supportsSpacingProps = true
export default OrganizationNumber
