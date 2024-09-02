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
  const translations = useTranslation().NationalIdentityNumber
  const errorMessage = translations.errorRequired

  const { validate = true, omitMask } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorMessage,
    pattern: errorMessage,
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
      if (
        new RegExp(validationPattern).test(value) &&
        fnr(value).status === 'invalid'
      ) {
        return Error(translations.errorFnr)
      }
      return undefined
    },
    [translations.errorFnr]
  )

  const dnrValidator = useCallback(
    (value: string) => {
      const validationPattern = '^[4-7]([0-9]{10}$)' // 1st num is increased by 4. i.e, if 01.01.1985, D number would be 410185.
      if (
        new RegExp(validationPattern).test(value) &&
        dnr(value).status === 'invalid'
      ) {
        return Error(translations.errorDnr)
      }
      return undefined
    },
    [translations.errorDnr]
  )

  const dnrAndFnrValidator = useCallback(
    (value: string) => {
      return dnrValidator(value) || fnrValidator(value)
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
    label: props.label ?? translations.label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
    validator: validate
      ? props.validator || dnrAndFnrValidator
      : undefined,
  }

  return <StringField {...StringFieldProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
