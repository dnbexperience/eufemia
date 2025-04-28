import React, { useCallback, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import CompositionField from '../Composition'
import SelectionField from '../Selection'

import useTranslation from '../../hooks/useTranslation'
import type { ValidatorDisableable } from '../../types'
import classNames from 'classnames'

export type Props = Omit<StringFieldProps, 'onBlurValidator'> & {
  validate?: boolean
  onBlurValidator?: ValidatorDisableable<string>
}

function DateOfBirth(props: Props) {
  const {
    errorDateOfBirth,
    errorDateOfBirthLength,
    errorRequired,
    label,
  } = useTranslation().DateOfBirth

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorDateOfBirth,
      ...props.errorMessages,
    }
  }, [errorDateOfBirth, errorRequired, props.errorMessages])

  const dateOfBirthValidator = useCallback(
    (value: string) => {
      // Sjekke om datoen er gyldig og sjekke om datoen ikke er i fremtiden?
      // Eller skal man kanskje kunne registrere fødselsdato i fremtiden?
      if (value !== undefined) {
        const bankAccountNoIs11Digits = value?.length === 11

        if (!bankAccountNoIs11Digits) {
          return Error(errorDateOfBirthLength)
        }

        if (bankAccountNoIs11Digits) {
          return Error(errorDateOfBirth)
        }
      }
    },
    [errorDateOfBirth, errorDateOfBirthLength]
  )

  const {
    validate = true,
    onChangeValidator,
    onBlurValidator = dateOfBirthValidator,
    label: labelProp,
    width,
  } = props

  const onBlurValidatorToUse =
    onBlurValidator === false ? undefined : onBlurValidator

  const StringFieldProps: StringFieldProps = {
    ...props,
    className: 'dnb-forms-field-date-of-birth',
    label: labelProp ?? label,
    errorMessages,
    width: width ?? 'medium',
    inputMode: 'numeric',
    onChangeValidator: validate ? onChangeValidator : undefined,
    onBlurValidator: validate ? onBlurValidatorToUse : undefined,
    exportValidators: { dateOfBirthValidator },
  }

  const months = useMemo(() => {
    return [
      { value: '01', title: 'January (01)' },
      { value: '02', title: 'February (02)' },
      { value: '03', title: 'March (03)' },
      { value: '04', title: 'April (04)' },
      { value: '05', title: 'May (05)' },
      { value: '06', title: 'June (06)' },
      { value: '07', title: 'July (07)' },
      { value: '08', title: 'August (08)' },
      { value: '09', title: 'September (09)' },
      { value: '10', title: 'October (10)' },
      { value: '11', title: 'November (11)' },
      { value: '12', title: 'December (12)' },
    ]
  }, [])

  return (
    <CompositionField
      className={classNames('dnb-forms-field-date-of-birth')}
      label="a"
    >
      <StringField
        autoComplete="bday-day"
        className={classNames('dnb-forms-field-date-of-birth__day')}
        label="b"
        {...StringFieldProps}
      />
      <SelectionField
        autoComplete="bday-month"
        variant="autocomplete"
        width="medium"
        label="c"
        data={months}
        className={classNames('dnb-forms-field-date-of-birth__month')}
      />
      <StringField
        autoComplete="bday-year"
        className={classNames('dnb-forms-field-date-of-birth__year')}
        label="d"
      />
    </CompositionField>
  )
}

DateOfBirth._supportsSpacingProps = true
export default DateOfBirth
