import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import { dnr, fnr } from '@navikt/fnrvalidator'

import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps & {
  omitMask?: boolean
  validate?: boolean
}

function NationalIdentityNumber(props: Props) {
  const { validate = true, omitMask } = props

  const translations = useTranslation().NationalIdentityNumber
  const { label, errorRequired, errorFnr, errorDnr } = translations
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
    pattern: errorRequired,
    errorFnr,
    errorDnr,
  })

  const mask = useMemo(
    () =>
      omitMask
        ? Array(11).fill(/\d/)
        : [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
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
  const validationPattern = '^[0-9]{11}$'

  const fnrValidator = useCallback(
    (value: string) => {
      // have to check for undefined as @navikt/fnrvalidator does not support undefined
      if (value !== undefined || fnr(value).status === 'invalid') {
        return Error(errorFnr)
      }
    },
    [errorFnr]
  )

  const dnrValidator = useCallback(
    (value: string) => {
      // have to check for undefined as @navikt/fnrvalidator does not support undefined
      if (value !== undefined || dnr(value).status === 'invalid') {
        return Error(errorDnr)
      }
    },
    [errorDnr]
  )

  const dnrAndFnrValidator = useCallback(
    (value: string) => {
      const validationPattern = '^[4-9].*' // 1st num is increased by 4. i.e, if 01.01.1985, D number would be 410185.

      if (new RegExp(validationPattern).test(value)) {
        return dnrValidator(value)
      }
      return fnrValidator(value)
    },
    [dnrValidator, fnrValidator]
  )

  const StringFieldProps: Props = {
    ...props,
    pattern:
      validate && props.pattern
        ? props.pattern
        : validate && !props.validator
        ? validationPattern
        : undefined,
    label: props.label ?? label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
    validator: validate ? props.validator : undefined,
    onBlurValidator: validate
      ? props.onBlurValidator || dnrAndFnrValidator
      : undefined,
    exportValidators: { dnrValidator, fnrValidator, dnrAndFnrValidator },
  }

  return <StringField {...StringFieldProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
