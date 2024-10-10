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
  const { label, errorRequired, errorFnr, errorDnr, errorAdult } =
    translations
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
    pattern: errorFnr,
    errorFnr,
    errorDnr,
    errorAdult,
  })

  const fnrValidator = useCallback(
    (value: string) => {
      // We don't want to validate if the value is undefined
      if (value !== undefined && fnr(value).status === 'invalid') {
        return Error(errorFnr)
      }
    },
    [errorFnr]
  )

  const dnrValidator = useCallback(
    (value: string) => {
      // We don't want to validate if the value is undefined
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

  const adultValidator = useCallback(
    (value: string) => {
      // We don't want to validate if the value is undefined
      if (value !== undefined && !is18YearsOrOlder(value)) {
        return Error(errorAdult)
      }
    },
    [errorAdult]
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
    onBlurValidator === false ? undefined : onBlurValidator

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
      adultValidator,
    },
  }

  return <StringField {...StringFieldProps} />
}

function is18YearsOrOlder(value: string) {
  if (!new RegExp('^[0-9]{11}$').test(value)) return false

  function getAge(birthDate: Date): number {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    const day = today.getDate() - birthDate.getDate()

    if (month < 0 || (month === 0 && day < 0)) {
      return age - 1
    }

    return age
  }

  const yearPart = value.substring(4, 6)
  const individNumber = Number.parseInt(value.substring(6, 9))

  const isBornIn20XX = individNumber >= 500 && individNumber <= 999
  const year = isBornIn20XX ? `20${yearPart}` : `19${yearPart}`
  const month = Number.parseInt(value.substring(2, 4))

  const isDnr = dnr(value).status === 'valid'

  const day = isDnr
    ? Number.parseInt(value.substring(0, 2)) - 40
    : Number.parseInt(value.substring(0, 2))
  const date = new Date(Number.parseInt(year), month - 1, day)

  return getAge(date) >= 18
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
