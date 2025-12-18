import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
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
  Validator,
  ValidatorWithCustomValidators,
} from '../../types'
import { formatDate } from '../../../../components/date-format/DateFormatUtils'
import { useFieldProps } from '../../hooks'
import { useIterateItemNo } from '../../Iterate/ItemNo/useIterateItemNo'

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

export type DateOfBirthValidator = ValidatorWithCustomValidators<
  string,
  {
    dateOfBirthValidator: Validator<string>
  }
>

export type Props = Omit<
  FieldPropsWithExtraValue<string, AdditionalArgs, undefined | string>,
  'layout' | 'layoutOptions' | 'labelSize'
> & {
  validate?: boolean
  dateFormat?: string
  onDayChange?: (value: string | undefined) => void
  onMonthChange?: (value: string | undefined) => void
  onYearChange?: (value: string | undefined) => void
  onBlurValidator?: DateOfBirthValidator | false
}

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'

function DateOfBirth(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})
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

  const { dateFormat = DEFAULT_DATE_FORMAT, labelSuffix, required } = props

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

  const provideAdditionalArgs = useCallback(
    (value: string) => {
      const [year, month, day] = splitValue(value, dateFormat)

      if (year && month && day) {
        return {
          year,
          month,
          day,
        }
      }
    },
    [dateFormat]
  )

  const dateOfBirthValidator = useCallback(
    (value: string) => {
      const [year, month, day] = splitValue(value, dateFormat)
      if (year && month && day) {
        // Convert to ISO format for validation
        const isoValue = `${year}-${month}-${day}`
        const dateValue = parseISO(isoValue)
        if (!isValid(dateValue)) {
          return Error(errorDateOfBirth)
        }
        if (isAfter(dateValue, new Date())) {
          return Error(errorDateOfBirthFuture)
        }
      }
    },
    [errorDateOfBirth, errorDateOfBirthFuture, dateFormat]
  )

  const {
    onBlurValidator: propOnBlurValidator,
    onChangeValidator,
    value: propValue,
    space,
    ...otherProps
  } = props

  const onBlurValidator = useMemo(() => {
    if (propOnBlurValidator === false) {
      return undefined
    }

    if (typeof propOnBlurValidator === 'function') {
      // Prioritize the internal validator first; only then run the external one
      return (value: string, args) => {
        const coreResult = dateOfBirthValidator(value)
        if (coreResult instanceof Error) {
          return coreResult
        }
        return propOnBlurValidator(value, args)
      }
    }

    return dateOfBirthValidator
  }, [propOnBlurValidator, dateOfBirthValidator])

  const preparedProps: Props = useMemo(
    () => ({
      ...otherProps,
      value: propValue,
      errorMessages,
      onBlurValidator,
      onChangeValidator,
      exportValidators: { dateOfBirthValidator },
      provideAdditionalArgs,
    }),
    [
      otherProps,
      propValue,
      errorMessages,
      onBlurValidator,
      onChangeValidator,
      dateOfBirthValidator,
      provideAdditionalArgs,
    ]
  )

  const {
    emptyValue,
    label: labelProp,
    width = 'large',
    help,
    labelSrOnly,
    labelDescription,
    labelDescriptionInline,
    error,
    disabled,
    htmlAttributes,
    handleChange,
    onDayChange,
    onMonthChange,
    onYearChange,
    setHasFocus,
    value: fieldValue,
  } = useFieldProps(preparedProps)

  const labelWithItemNo = useIterateItemNo({
    label: labelProp ?? label,
    labelSuffix,
    required,
  })

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
        joinValue(
          [eventValues.year, eventValues.month, eventValues.day],
          dateFormat
        ),
        eventValues
      )
    },
    [prepareEventValues, handleChange, dateFormat]
  )

  const callOnBlurOrFocus = useCallback(
    (hasFocus: boolean) => {
      setHasFocus(hasFocus, undefined, prepareEventValues())
    },
    [prepareEventValues, setHasFocus]
  )

  useEffect(() => {
    if (fieldValue) {
      const [year, month, day] = splitValue(fieldValue, dateFormat)

      // Only update refs if they are empty or if the fieldValue represents a complete date
      // This prevents overriding user input while typing
      const currentValues = joinValue(
        [yearRef.current, monthRef.current, dayRef.current],
        dateFormat
      )
      const shouldUpdate =
        (!dayRef.current && !monthRef.current && !yearRef.current) ||
        fieldValue !== currentValues

      if (shouldUpdate) {
        dayRef.current = day
        monthRef.current = month
        yearRef.current = year

        forceUpdate()
      }
    }
  }, [fieldValue, dateFormat])

  const handleDayChange = useCallback(
    (value: string) => {
      const day = (dayRef.current = value || emptyValue)
      forceUpdate()

      callOnChange({ day, month: monthRef.current, year: yearRef.current })
      onDayChange?.(day)
    },
    [emptyValue, callOnChange, onDayChange]
  )

  const handleMonthChange = useCallback(
    (value: string) => {
      const month = (monthRef.current = value || emptyValue)
      forceUpdate()

      callOnChange({ day: dayRef.current, month, year: yearRef.current })
      onMonthChange?.(month)
    },
    [emptyValue, callOnChange, onMonthChange]
  )

  const handleYearChange = useCallback(
    (value: string) => {
      const year = (yearRef.current = value || emptyValue)
      forceUpdate()

      callOnChange({ day: dayRef.current, month: monthRef.current, year })
      onYearChange?.(year)
    },
    [emptyValue, callOnChange, onYearChange]
  )

  const normalizeDay = useCallback((value: string | undefined) => {
    if (!value) {
      return value
    }

    const trimmed = value.trim()
    if (/^[1-9]$/.test(trimmed)) {
      return trimmed.padStart(2, '0')
    }

    return trimmed
  }, [])

  const normalizeYear = useCallback((value: string | undefined) => {
    if (!value) {
      return value
    }

    const trimmed = value.trim()

    if (/^\d{1,2}$/.test(trimmed)) {
      const padded = trimmed.padStart(2, '0')
      const currentYear = new Date().getFullYear()
      const currentCentury = Math.floor(currentYear / 100) * 100
      let normalized = currentCentury + parseInt(padded, 10)

      if (normalized > currentYear) {
        normalized -= 100
      }

      return String(normalized)
    }

    return trimmed
  }, [])

  const handleOnBlur = useCallback(() => {
    callOnBlurOrFocus(false)
  }, [callOnBlurOrFocus])

  const handleDayBlur = useCallback(() => {
    const normalized = normalizeDay(dayRef.current)

    if (normalized && normalized !== dayRef.current) {
      handleDayChange(normalized)
    }

    handleOnBlur()
  }, [handleDayChange, handleOnBlur, normalizeDay])

  const handleYearBlur = useCallback(() => {
    const normalized = normalizeYear(yearRef.current)

    if (normalized && normalized !== yearRef.current) {
      handleYearChange(normalized)
    }

    handleOnBlur()
  }, [handleOnBlur, handleYearChange, normalizeYear])

  const handleOnFocus = useCallback(() => {
    callOnBlurOrFocus(true)
  }, [callOnBlurOrFocus])

  const compositionFieldProps: CompositionFieldProps = {
    className: 'dnb-forms-field-date-of-birth',
    error,
    label: labelWithItemNo,
    labelSrOnly,
    labelDescription,
    labelDescriptionInline,
    space,
  }

  const months = useMemo(() => {
    return [...Array(12)].map((_, i) => {
      const nr = String(i + 1)
      const value = nr.padStart(2, '0')
      const title = capitalizeFirstLetter(
        formatDate(new Date(0, i, 1), {
          locale,
          options: { month: 'long' },
        })
      )

      return { value, title, search_content: [title, nr, value] }
    })
  }, [locale])

  const onBlurAutocomplete = useCallback(
    ({ value }) => {
      // If the value is a number, find the corresponding month
      const nr = parseFloat(value)
      if (!isNaN(nr)) {
        const monthValue = months.find((m) => parseFloat(m.value) === nr)
          ?.value
        const month = monthValue || emptyValue
        monthRef.current = month
        forceUpdate()
        callOnChange({ month })
      } else {
        // If the value is a month name, find the corresponding value
        const monthValue = months.find((m) => m.title === value)?.value
        if (monthValue) {
          monthRef.current = monthValue
          forceUpdate()
          callOnChange({ month: monthValue })
        }
      }
    },
    [callOnChange, emptyValue, months]
  )

  return (
    <CompositionField width={width} help={help} {...compositionFieldProps}>
      <StringField
        value={dayRef.current}
        autoComplete="bday-day"
        labelDescription={dayLabel}
        width="3.5rem" // Enough width for 2 digits and placeholder in large size
        inputMode="numeric"
        mask={[/[0-9]/, /[0-9]/]}
        placeholder={dayPlaceholder}
        onChange={handleDayChange}
        onFocus={handleOnFocus}
        onBlur={handleDayBlur}
        disabled={disabled}
        htmlAttributes={htmlAttributes}
      />
      <SelectionField
        className="dnb-forms-field-date-of-birth__month"
        value={monthRef.current}
        variant="autocomplete"
        labelDescription={monthLabel}
        width="stretch"
        placeholder=""
        autocompleteProps={{
          openOnFocus: true,
          inputIcon: '',
          placeholder: monthPlaceholder,
          autoComplete: 'bday-month',
          independentWidth: true,
          disableReorder: true,
          onBlur: onBlurAutocomplete,
        }}
        data={months}
        onChange={handleMonthChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        htmlAttributes={htmlAttributes}
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
        onBlur={handleYearBlur}
        disabled={disabled}
        htmlAttributes={htmlAttributes}
      />
    </CompositionField>
  )
}

DateOfBirth._supportsSpacingProps = undefined
export default DateOfBirth

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function joinValue(
  array: Array<string>,
  dateFormat = DEFAULT_DATE_FORMAT
) {
  const [year, month, day] = array
  if (!year || !month || !day) {
    return undefined
  }

  return dateFormat
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
}

function splitValue(value: string, dateFormat = DEFAULT_DATE_FORMAT) {
  if (typeof value !== 'string' || !value) {
    return [undefined, undefined, undefined]
  }

  // Create a regex pattern based on the date format
  const formatPattern = dateFormat
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
    .replace(/yyyy/g, '(\\d{4})')
    .replace(/MM/g, '(\\d{2})')
    .replace(/dd/g, '(\\d{2})')

  const regex = new RegExp(`^${formatPattern}$`)
  const match = value.match(regex)

  if (!match) {
    return [undefined, undefined, undefined]
  }

  // Extract year, month, day based on their position in the format
  const yearIndex = dateFormat.indexOf('yyyy')
  const monthIndex = dateFormat.indexOf('MM')
  const dayIndex = dateFormat.indexOf('dd')

  // Create array of indices sorted by position in format
  const sortedIndices = [yearIndex, monthIndex, dayIndex].sort(
    (a, b) => a - b
  )

  // Map sorted indices to their corresponding match groups
  const result = sortedIndices.map((originalIndex, sortedPosition) => {
    const matchGroupIndex = sortedPosition + 1 // +1 because match[0] is the full match
    return match[matchGroupIndex]
  })

  // Now map back to [year, month, day] order
  const year = result[sortedIndices.indexOf(yearIndex)]
  const month = result[sortedIndices.indexOf(monthIndex)]
  const day = result[sortedIndices.indexOf(dayIndex)]

  return [year, month, day]
}
