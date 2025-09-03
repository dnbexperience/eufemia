import React, { useCallback, useContext, useMemo, useRef } from 'react'
import StringField from '../String'
import CompositionField, {
  Props as CompositionFieldProps,
} from '../Composition'
import SelectionField from '../Selection'
import SharedContext from '../../../../shared/Context'
import { parseISO, isValid, isAfter } from 'date-fns'

import useTranslation from '../../hooks/useTranslation'
import type {
  FieldPropsWithExtraValue,
  ValidatorDisableable,
} from '../../types'
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
    errorDateOfBirthFuture,
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
      const [year, month, day] = splitValue(value)
      if (year && month && day) {
        const dateValue = parseISO(value)
        if (!isValid(dateValue)) {
          return Error(errorDateOfBirth)
        }
        if (isAfter(dateValue, new Date())) {
          return Error(errorDateOfBirthFuture)
        }
      }
    },
    [errorDateOfBirth, errorDateOfBirthFuture]
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
    value,
    emptyValue,
    label: labelProp,
    width = 'large',
    help,
    error,
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
        year,
        month,
        day,
      }
    },
    [emptyValue]
  )

  const callOnChange = useCallback(
    (data: EventValues) => {
      const eventValues = prepareEventValues(data)
      handleChange(
        joinValue([eventValues.year, eventValues.month, eventValues.day]),
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

  useMemo(() => {
    if (
      props.value &&
      !dayRef.current &&
      !monthRef.current &&
      !yearRef.current
    ) {
      const [year, month, day] = splitValue(props.value)

      dayRef.current = day
      monthRef.current = month
      yearRef.current = year
    }
  }, [value, props.value])

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
      label={labelProp ?? label}
      width={width}
      help={help}
      {...compositionFieldProps}
    >
      <StringField
        value={dayRef.current}
        autoComplete="bday-day"
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
        variant="autocomplete"
        labelDescription={monthLabel}
        width="medium"
        placeholder=""
        autocompleteProps={{
          searchNumbers: true,
          inputIcon: '',
          showSubmitButton: true,
          placeholder: monthPlaceholder,
          autoComplete: 'bday-month',
        }}
        data={months}
        onChange={handleMonthChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
      <StringField
        value={yearRef.current}
        autoComplete="bday-year"
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
  return array.filter(Boolean).join('-')
}

function splitValue(value: string) {
  return typeof value === 'string'
    ? value.split('-')
    : [undefined, undefined, undefined]
}
