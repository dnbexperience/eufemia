import React, { useCallback, useContext, useMemo, useRef } from 'react'
import StringField from '../String'
import CompositionField, {
  Props as CompositionFieldProps,
} from '../Composition'
import SelectionField from '../Selection'
import SharedContext from '../../../../shared/Context'

import useTranslation from '../../hooks/useTranslation'
import type {
  FieldPropsWithExtraValue,
  ValidatorDisableable,
} from '../../types'
import classNames from 'classnames'
import { formatDate } from '../../../../components/date-format/DateFormatUtils'
import { useFieldProps } from '../../hooks'

export type AdditionalArgs = {
  day: string
  month: string
  year: string
}

type EventValues = {
  day?: string
  month?: string
  year?: string
}

export type Props = Omit<
  FieldPropsWithExtraValue<string, AdditionalArgs, undefined | string>,
  | 'layout'
  | 'layoutOptions'
  | 'labelSize'
  | 'labelDescription'
  | 'labelDescriptionInline'
> & {
  validate?: boolean
  onDayChange?: (value: string | undefined) => void
  onMonthChange?: (value: string | undefined) => void
  onYearChange?: (value: string | undefined) => void
  onBlurValidator?: ValidatorDisableable<string>
}

function DateOfBirth(props: Props) {
  const {
    errorDateOfBirth,
    errorDateOfBirthLength,
    errorRequired,
    label,
    dayLabel,
    monthLabel,
    yearLabel,
    dayPlaceholder,
    monthPlaceholder,
    yearPlaceholder,
  } = useTranslation().DateOfBirth
  const { locale } = useContext(SharedContext)

  const dayRef = useRef<Props['value']>(props?.emptyValue)
  const monthRef = useRef<Props['value']>(props?.emptyValue)
  const yearRef = useRef<Props['value']>(props?.emptyValue)

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

  const onBlurValidator = useMemo(() => {
    if (props.onBlurValidator === false) {
      return undefined
    }

    if (props.onBlurValidator) {
      return props.onBlurValidator
    }

    return dateOfBirthValidator
  }, [props.onBlurValidator, dateOfBirthValidator])

  const preparedProps: Props = {
    ...props,
    errorMessages,
    onBlurValidator,
    exportValidators: { dateOfBirthValidator },
  }

  const {
    id,
    emptyValue,
    label: labelProp,
    width = 'large',
    help,
    error,
    hasError,
    disabled,
    handleChange,
    onDayChange,
    onMonthChange,
    onYearChange,
    setHasFocus,
  } = useFieldProps(preparedProps)

  const prepareEventValues = useCallback(
    ({
      day = dayRef.current || emptyValue,
      month = monthRef.current || emptyValue,
      year = yearRef.current || emptyValue,
    }: EventValues = {}) => {
      return {
        day,
        month,
        year,
      }
    },
    [emptyValue]
  )

  const callOnChange = useCallback(
    (data: EventValues) => {
      console.log(data)
      const eventValues = prepareEventValues(data)
      handleChange(
        joinValue([eventValues.day, eventValues.month, eventValues.year]),
        eventValues
      )
    },
    [prepareEventValues, handleChange]
  )

  const callOnBlurOrFocus = useCallback(
    (hasFocus: boolean) => {
      setHasFocus(hasFocus, undefined, prepareEventValues())
    },
    [prepareEventValues, setHasFocus]
  )

  const handleDayChange = useCallback(
    (value: string) => {
      const day = (dayRef.current = value || emptyValue)

      callOnChange({ day })
      onDayChange?.(day)
    },
    [emptyValue, callOnChange, onDayChange]
  )

  const handleMonthChange = useCallback(
    (value: string) => {
      const month = (monthRef.current = value || emptyValue)

      callOnChange({ month })
      onMonthChange?.(month)
    },
    [emptyValue, callOnChange, onMonthChange]
  )

  const handleYearChange = useCallback(
    (value: string) => {
      const year = (yearRef.current = value || emptyValue)

      callOnChange({ year })
      onYearChange?.(year)
    },
    [emptyValue, callOnChange, onYearChange]
  )

  const handleOnBlur = useCallback(() => {
    callOnBlurOrFocus(false)
  }, [callOnBlurOrFocus])

  const handleOnFocus = useCallback(() => {
    callOnBlurOrFocus(true)
  }, [callOnBlurOrFocus])

  const compositionFieldProps: CompositionFieldProps = {
    error,
    className: 'dnb-forms-field-date-of-birth',
    label: labelProp ?? label,
  }

  const months = [...Array(12)].map((_, i) => {
    return {
      value: String(i + 1).padStart(2, '0'),
      title: capitalizeFirstLetter(
        formatDate(new Date(0, i, 1), {
          locale,
          options: { month: 'long' },
        })
      ),
    }
  })

  return (
    <CompositionField
      className={classNames('dnb-forms-field-date-of-birth')}
      label={labelProp ?? label}
      width={width}
      help={help}
      {...compositionFieldProps}
    >
      <StringField
        value={dayRef.current}
        autoComplete="bday-day"
        className={classNames('dnb-forms-field-date-of-birth__day')}
        labelDescription={dayLabel}
        width="3.34rem" // Enough width for 2 digits
        inputMode="numeric"
        mask={[/[0-9]/, /[0-9]/]}
        placeholder={dayPlaceholder}
        onChange={handleDayChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
      <SelectionField
        value={monthRef.current}
        autoComplete="bday-month"
        variant="autocomplete"
        labelDescription={monthLabel}
        width="medium"
        placeholder=""
        autocompleteProps={{
          searchNumbers: true,
          inputIcon: '',
          showSubmitButton: true,
          placeholder: monthPlaceholder,
        }}
        data={months}
        className={classNames('dnb-forms-field-date-of-birth__month')}
        onChange={handleMonthChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
      <StringField
        value={yearRef.current}
        autoComplete="bday-year"
        className={classNames('dnb-forms-field-date-of-birth__year')}
        labelDescription={yearLabel}
        width="stretch"
        inputMode="numeric"
        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
        placeholder={yearPlaceholder}
        onChange={handleYearChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
    </CompositionField>
  )
}

DateOfBirth._supportsSpacingProps = true
export default DateOfBirth

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function joinValue(array: Array<string>) {
  return array.filter(Boolean).join('/')
}
