import { useCallback, useMemo } from 'react'
import type { FieldStringProps as StringFieldProps } from '../String'
import StringField from '../String'
import type { Validator, ValidatorWithCustomValidators } from '../../types'
import { FormError } from '../../utils'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import {
  norwegianFnrValidator,
  norwegianDnrValidator,
  norwegianDnrAndFnrValidator,
} from './validators'

export type NationalIdentityNumberValidator =
  ValidatorWithCustomValidators<
    string,
    {
      dnrValidator: Validator<string>
      fnrValidator: Validator<string>
      dnrAndFnrValidator: Validator<string>
    }
  >

export type FieldNationalIdentityNumberProps = Omit<
  StringFieldProps,
  'onBlurValidator'
> & {
  omitMask?: boolean
  validate?: boolean
  onBlurValidator?: NationalIdentityNumberValidator | false
}

function NationalIdentityNumber(props: FieldNationalIdentityNumberProps) {
  const translations = useTranslation().NationalIdentityNumber
  const {
    label,
    errorRequired,
    errorFnr,
    errorFnrLength,
    errorDnr,
    errorDnrLength,
  } = translations
  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorFnr,
      ...props.errorMessages,
    }),
    [errorRequired, errorFnr, props.errorMessages]
  )

  const fnrValidator = useCallback(
    (value: string) =>
      norwegianFnrValidator(value, { errorFnr, errorFnrLength }),
    [errorFnr, errorFnrLength]
  )

  const dnrValidator = useCallback(
    (value: string) =>
      norwegianDnrValidator(value, { errorDnr, errorDnrLength }),
    [errorDnr, errorDnrLength]
  )

  const dnrAndFnrValidator = useCallback(
    (value: string) =>
      norwegianDnrAndFnrValidator(value, {
        errorFnr,
        errorFnrLength,
        errorDnr,
        errorDnrLength,
      }),
    [errorFnr, errorFnrLength, errorDnr, errorDnrLength]
  )

  const {
    validate = true,
    omitMask,
    onChangeValidator,
    onBlurValidator = dnrAndFnrValidator,
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
    onChangeValidator: validate ? onChangeValidator : undefined,
    // @ts-expect-error - strictFunctionTypes
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
    return undefined // stop here
  }

  const yearPart = value.substring(4, 6)
  const centuryNumber = Number.parseInt(value.substring(6, 7), 10)

  const isBornIn20XX = centuryNumber >= 5
  const year = isBornIn20XX ? `20${yearPart}` : `19${yearPart}`
  const month = Number.parseInt(value.substring(2, 4), 10)

  const differentiatorValue =
    value.length > 0
      ? Number.parseInt(value.substring(0, 1), 10)
      : undefined
  const isDnr = differentiatorValue && differentiatorValue > 3

  const day = isDnr
    ? Number.parseInt(value.substring(0, 2), 10) - 40
    : Number.parseInt(value.substring(0, 2), 10)

  return new Date(Number.parseInt(year, 10), month - 1, day)
}

export function createMinimumAgeValidator(age: number) {
  return (value: string) => {
    if (typeof value !== 'string') {
      return undefined // stop here
    }

    const identificationNumberIs7DigitsOrMore = value?.length >= 7

    if (!identificationNumberIs7DigitsOrMore) {
      return new FormError(
        'NationalIdentityNumber.errorMinimumAgeValidatorLength'
      )
    }

    if (identificationNumberIs7DigitsOrMore) {
      const date = getBirthDateByFnrOrDnr(value)
      if (getAgeByBirthDate(date) >= age) {
        return undefined // stop here
      }
    }

    return new FormError(
      'NationalIdentityNumber.errorMinimumAgeValidator',
      { messageValues: { age: String(age) } }
    )
  }
}

export function createMinimumAgeVerifier(age: number) {
  const validator = createMinimumAgeValidator(age)
  return (value: string) => {
    if (value?.length >= 7) {
      return !(validator(value) instanceof Error)
    }

    return false
  }
}

withComponentMarkers(NationalIdentityNumber, {
  _supportsSpacingProps: true,
})

export default NationalIdentityNumber
