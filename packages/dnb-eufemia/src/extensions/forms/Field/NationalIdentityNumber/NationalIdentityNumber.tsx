import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import { dnr, fnr } from '@navikt/fnrvalidator'
import { FormError, Validator } from '../../types'

import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  omitMask?: boolean
  validate?: boolean
  onBlurValidator?: Validator<string> | false
}

function NationalIdentityNumber(props: Props) {
  const translations = useTranslation().NationalIdentityNumber
  const { label, errorRequired, errorFnr, errorDnr, errorBelowAge } =
    translations
  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: errorRequired,
    pattern: errorFnr,
    errorFnr,
    errorDnr,
    errorBelowAge,
  })

  const fnrValidator = useCallback(
    (value: string) => {
      if (
        value !== undefined &&
        (Number.parseInt(value.substring(0, 1)) > 3 ||
          fnr(value).status === 'invalid')
      ) {
        return Error(errorFnr)
      }
    },
    [errorFnr]
  )

  const dnrValidator = useCallback(
    (value: string) => {
      if (
        value !== undefined &&
        (Number.parseInt(value.substring(0, 1)) < 4 ||
          dnr(value).status === 'invalid')
      ) {
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
    },
  }

  return <StringField {...StringFieldProps} />
}

export function getAgeByBirthDate(birthDate: Date): number {
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()
  const day = today.getDate() - birthDate.getDate()

  if (month < 0 || (month === 0 && day < 0)) {
    return age - 1
  }

  return age
}

export function getBirthDateByFnrOrDnr(value: string) {
  if (value === undefined) {
    return // stop here
  }

  const yearPart = value.substring(4, 6)
  const centuryNumber = Number.parseInt(value.substring(6, 7))

  const isBornIn20XX = centuryNumber >= 5
          
  const year = isBornIn20XX ? `20${yearPart}` : `19${yearPart}`
  const month = Number.parseInt(value.substring(2, 4))

  const differentiatorValue =
    value.length > 0 ? Number.parseInt(value.substring(0, 1)) : undefined
  const isDnr = differentiatorValue && differentiatorValue > 3

  const day = isDnr
    ? Number.parseInt(value.substring(0, 2)) - 40
    : Number.parseInt(value.substring(0, 2))

  return new Date(Number.parseInt(year), month - 1, day)
}

export function createAboveAgeValidator(age: number) {
  return (value: string) => {
    if (typeof value !== 'string' || value.length < 9) {
      return
    }

    const date = getBirthDateByFnrOrDnr(value)
    if (getAgeByBirthDate(date) < age) {
      return new FormError('NationalIdentityNumber.errorBelowAge', {
        validationRule: 'errorBelowAge', // "validationRule" Will be removed in future PR
        messageValues: { age: String(age) },
      })
    }
  }
}

NationalIdentityNumber._supportsSpacingProps = true
export default NationalIdentityNumber
