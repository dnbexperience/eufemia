import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import { dnr, fnr } from '@navikt/fnrvalidator'
import { Validator } from '../../types'

import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  omitMask?: boolean
  validate?: boolean
  onBlurValidator?: Validator<string> | false
}

function NationalIdentityNumber(props: Props) {
  const translations = useTranslation().NationalIdentityNumber
  const { label, errorRequired, errorFnr, errorDnr } = translations
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
    pattern: errorFnr,
    errorFnr,
    errorDnr,
  })

  const fnrValidator = useCallback(
    (value: string) => {
      // have to check for undefined as @navikt/fnrvalidator does not support undefined
      if (value !== undefined && fnr(value).status === 'invalid') {
        return Error(errorFnr)
      }
    },
    [errorFnr]
  )

  const dnrValidator = useCallback(
    (value: string) => {
      // have to check for undefined as @navikt/fnrvalidator does not support undefined
      if (value !== undefined && dnr(value).status === 'invalid') {
        return Error(errorDnr)
      }
    },
    [errorDnr]
  )

  const dnrAndFnrValidator = useCallback(
    (value: string) => {
      const dnrValidationPattern = '^[4-9].*' // 1st num is increased by 4. i.e, if 01.01.1985, D number would be 410185.

      if (new RegExp(dnrValidationPattern).test(value)) {
        return dnrValidator(value)
      }
      return fnrValidator(value)
    },
    [dnrValidator, fnrValidator]
  )

  const {
    validate = true,
    omitMask,
    onBlurValidator = dnrAndFnrValidator,
    validator,
    width,
    label: labelProp,
  } = props

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

  const onBlurValidatorToUse =
    onBlurValidator == false ? undefined : onBlurValidator

  const StringFieldProps: StringFieldProps = {
    ...props,
    label: labelProp ?? label,
    errorMessages,
    mask,
    width: width ?? 'medium',
    inputMode: 'numeric',
    validator: validate ? validator : undefined,
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: {
      dnrValidator,
      fnrValidator,
      dnrAndFnrValidator,
    },
  }

  return <StringField {...StringFieldProps} />
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
