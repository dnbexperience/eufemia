import React, { useCallback, useContext, useMemo } from 'react'
import { DatePicker } from '../../../../components'
import { useFieldProps } from '../../hooks'
import type {
  FieldProps,
  AllJSONSchemaVersions,
  ValidatorDisableable,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import SharedContext from '../../../../shared/Context'
import { parseISO, isValid, isBefore, isAfter, startOfDay } from 'date-fns'
import useTranslation from '../../hooks/useTranslation'
import {
  DatePickerEvent,
  DatePickerProps,
} from '../../../../components/DatePicker'
import { convertStringToDate } from '../../../../components/date-picker/DatePickerCalc'
import { ProviderProps } from '../../../../shared/Provider'
import { FormError } from '../../utils'
import { InvalidDates } from '../../../../components/date-picker/DatePickerInput'
import useInvalidDates from './hooks/useInvalidDates'
import {
  FormatDateOptions,
  formatDate,
} from '../../../../components/date-format/DateFormatUtils'

// `range`, `showInput`, `showCancelButton` and `showResetButton` are not picked from the `DatePickerProps`
// Since they require `Field.Date` specific comments, due to them having different default values
export type DateProps = Omit<
  FieldProps<string, undefined | string>,
  'onBlurValidator'
> & {
  // Validation
  pattern?: string
  /**
   * Defines if the Date field should support a value of two dates (starting and ending date).
   * The value needs to be a string containing two dates, separated by a pipe character (`|`) i.e. (`01-09-2024|30-09-2024`) when this is set to `true`.
   * Defaults to `false`.
   */
  range?: DatePickerProps['range']
  /**
   * If the input fields with the mask should be visible. Defaults to `true`.
   */
  showInput?: DatePickerProps['showInput']

  /**
   * If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `true`. If the `range` prop is `true`, then the cancel button is shown.
   */
  showCancelButton?: DatePickerProps['showCancelButton']
  /**
   * If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `true`.
   */
  showResetButton?: DatePickerProps['showResetButton']
  onBlurValidator?: ValidatorDisableable<string>
} & Pick<
    DatePickerProps,
    | 'month'
    | 'startMonth'
    | 'endMonth'
    | 'minDate'
    | 'maxDate'
    | 'maskOrder'
    | 'maskPlaceholder'
    | 'dateFormat'
    | 'returnFormat'
    | 'hideNavigation'
    | 'hideDays'
    | 'onlyMonth'
    | 'hideLastWeek'
    | 'disableAutofocus'
    | 'showSubmitButton'
    | 'submitButtonText'
    | 'cancelButtonText'
    | 'resetButtonText'
    | 'firstDay'
    | 'link'
    | 'size'
    | 'sync'
    | 'addonElement'
    | 'shortcuts'
    | 'opened'
    | 'direction'
    | 'alignPicker'
    | 'onDaysRender'
    | 'onType'
    | 'onShow'
    | 'onHide'
    | 'onSubmit'
    | 'onCancel'
    | 'onReset'
    | 'skipPortal'
    | 'yearNavigation'
  >

function DateComponent(props: DateProps) {
  const { errorRequired, label: defaultLabel } = useTranslation().Date
  const { locale } = useContext(SharedContext)

  const { invalidDatesRef, setInvalidDates } = useInvalidDates()

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, errorRequired])

  const schema = useMemo<AllJSONSchemaVersions>(
    () =>
      props.schema ?? {
        type: 'string',
        pattern: props.pattern,
      },
    [props.schema, props.pattern]
  )

  const validateRequired = useCallback(
    (value: string, { required, error }) => {
      if (!required) {
        return undefined
      }

      if (props.range) {
        if (value) {
          const [startDate, endDate] = parseRangeValue(value)
          if (startDate && endDate) {
            // If both dates exists, we don't return an error
            return undefined
          }
        }
        return new FormError('Date.errorRequiredRange')
      }

      return !value || !isValid(parseISO(value)) ? error : undefined
    },
    [props.range]
  )

  const dateValidator = useCallback(
    (value: string) => {
      const invalidDateErrors = validateDate(invalidDatesRef.current)

      // No need to validate min/max date if they are not provided
      if (!props.minDate && !props.maxDate) {
        return invalidDateErrors
      }

      const dateLimitErrors = validateDateLimit({
        value,
        locale,
        minDate: props.minDate,
        maxDate: props.maxDate,
        isRange: props.range,
      })

      return [...invalidDateErrors, ...dateLimitErrors]
    },
    [props.maxDate, props.minDate, props.range, invalidDatesRef, locale]
  )

  const onBlurValidator = useMemo(() => {
    if (props.onBlurValidator === false) {
      return undefined
    }

    if (props.onBlurValidator) {
      return props.onBlurValidator
    }

    return dateValidator
  }, [props.onBlurValidator, dateValidator])

  const fromInput = useCallback(
    ({
      date,
      start_date,
      end_date,
      invalidDate,
      invalidStartDate,
      invalidEndDate,
    }: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>) => {
      // Add to ref, for use in onBlurValidator, would be better if there was a way to add this to additional args
      setInvalidDates({
        invalidDate,
        invalidStartDate,
        invalidEndDate,
      })

      return props.range ? `${start_date}|${end_date}` : date
    },
    [props.range, setInvalidDates]
  )

  const preparedProps = {
    ...props,
    errorMessages,
    schema,
    fromInput,
    validateRequired,
    onBlurValidator,
    exportValidators: { dateValidator },
    invalidDatesRef,
  }

  const {
    id,
    path,
    itemPath,
    className,
    label,
    value: internalValue,
    hasError,
    disabled,
    htmlAttributes,
    handleError,
    handleFocus,
    handleBlur,
    handleChange,
    setChanged,
    setDisplayValue,
    range,
    showCancelButton = true,
    showResetButton = true,
    showInput = true,
    onReset,
    minDate,
    maxDate,
    width,
    ...rest
  } = useFieldProps(preparedProps)

  const datePickerProps = pickDatePickerProps(rest)
  const handleReset = useCallback(
    (event) => {
      handleChange(event)
      onReset?.(event)
    },
    [handleChange, onReset]
  )
  const onFocus = useCallback(() => {
    handleFocus()
    handleError()
  }, [handleFocus, handleError])
  const onType = useCallback(
    (event) => {
      const { date, start_date, end_date, ...rest } = event

      if (props.range) {
        const parsedStartDate = parseISO(start_date)
        const parsedEndDate = parseISO(end_date)
        if (isValid(parsedStartDate) || isValid(parsedEndDate)) {
          handleChange({
            ...(isValid(parsedStartDate) && { start_date }),
            ...(isValid(parsedEndDate) && { end_date }),
            ...rest,
          })
        }
      } else if (isValid(parseISO(date))) {
        handleChange({ date, ...rest })
      } else {
        handleChange(rest)
      }

      // To ensure that the form can show the required error message while typing and blurring
      setChanged(true)
    },
    [handleChange, props.range, setChanged]
  )

  const { value, startDate, endDate } = useMemo(() => {
    if (!range || !internalValue) {
      return {
        // Assign to null if falsy value, to properly clear input values
        value: internalValue ?? null,
        startDate: undefined,
        endDate: undefined,
      }
    }

    const [startDate, endDate] = parseRangeValue(internalValue)

    return {
      value: undefined,
      startDate,
      endDate,
    }
  }, [range, internalValue])

  useMemo(() => {
    if ((path || itemPath) && value) {
      setDisplayValue(formatDate(value, { locale }), undefined)
    }
  }, [itemPath, locale, path, setDisplayValue, value])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    label: label ?? defaultLabel,
    className: classnames('dnb-forms-field-string', className),
    width,
    ...pickSpacingProps(props),
  }

  return (
    <FieldBlock {...fieldBlockProps}>
      <DatePicker
        id={id}
        date={value}
        disabled={disabled}
        showInput={showInput}
        showCancelButton={showCancelButton}
        showResetButton={showResetButton}
        stretch={width !== undefined}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        status={hasError ? 'error' : undefined}
        range={range}
        onReset={handleReset}
        onType={onType} // To support validation while typing (e.g. required)
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={handleBlur}
        {...datePickerProps}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

export function parseRangeValue(value: DateProps['value']) {
  return (
    String(value)
      .split('|')
      // Assign to null if falsy value, to properly clear input values
      .map((value) => (/(undefined|null)/.test(value) ? null : value))
  )
}

// Validators
function validateDateLimit({
  value,
  isRange,
  locale,
  ...dates
}: {
  value: DateProps['value']
  minDate: DateProps['minDate']
  maxDate: DateProps['maxDate']
  isRange: DateProps['range']
  locale: ProviderProps['locale']
}) {
  if ((!dates.minDate && !dates.maxDate) || !value) {
    return []
  }

  const [startDateParsed, endDateParsed] = parseRangeValue(value)

  // Set dates to the start of the day to compare the actual days, and not day and time
  const minDate = startOfDay(convertStringToDate(dates.minDate))
  const maxDate = startOfDay(convertStringToDate(dates.maxDate))

  const startDate = startOfDay(convertStringToDate(startDateParsed))
  const endDate = startOfDay(convertStringToDate(endDateParsed))

  const isoDates = {
    minDate:
      dates.minDate instanceof Date
        ? dates.minDate.toISOString()
        : dates.minDate,
    maxDate:
      dates.maxDate instanceof Date
        ? dates.maxDate.toISOString()
        : dates.maxDate,
  }

  const options: FormatDateOptions = {
    locale,
    options: { dateStyle: 'long' },
  }

  const messages: Array<FormError> = []

  // Handle non range validation
  if (!isRange) {
    if (isBefore(startDate, minDate)) {
      messages.push(
        new FormError('Date.errorMinDate', {
          messageValues: { date: formatDate(isoDates.minDate, options) },
        })
      )
    }

    if (isAfter(startDate, maxDate)) {
      messages.push(
        new FormError('Date.errorMaxDate', {
          messageValues: { date: formatDate(isoDates.maxDate, options) },
        })
      )
    }

    return messages
  }

  // Start date validation
  if (isBefore(startDate, minDate)) {
    messages.push(
      new FormError('Date.errorStartDateMinDate', {
        messageValues: { date: formatDate(isoDates.minDate, options) },
      })
    )
  }

  if (isAfter(startDate, maxDate)) {
    messages.push(
      new FormError('Date.errorStartDateMaxDate', {
        messageValues: { date: formatDate(isoDates.maxDate, options) },
      })
    )
  }

  // End date validation
  if (isBefore(endDate, minDate)) {
    messages.push(
      new FormError('Date.errorEndDateMinDate', {
        messageValues: { date: formatDate(isoDates.minDate, options) },
      })
    )
  }

  if (isAfter(endDate, maxDate)) {
    messages.push(
      new FormError('Date.errorEndDateMaxDate', {
        messageValues: { date: formatDate(isoDates.maxDate, options) },
      })
    )
  }

  return messages
}

function validateDate({
  invalidDate,
  invalidStartDate,
  invalidEndDate,
}: InvalidDates) {
  if (invalidDate) {
    return [
      new FormError('Date.errorInvalidDate', {
        messageValues: { date: invalidDate },
      }),
    ]
  }

  const errors: Array<FormError> = []

  if (invalidStartDate) {
    errors.push(
      new FormError('Date.errorInvalidStartDate', {
        messageValues: { date: invalidStartDate },
      })
    )
  }

  if (invalidEndDate) {
    errors.push(
      new FormError('Date.errorInvalidEndDate', {
        messageValues: { date: invalidEndDate },
      })
    )
  }

  return errors
}

// Used to filter out DatePickerProps from the FieldProps.
// Includes DatePickerProps that are not destructured in useFieldProps
const datePickerPropKeys = [
  'month',
  'startMonth',
  'endMonth',
  'minDate',
  'maxDate',
  'correctInvalidDate',
  'maskOrder',
  'maskPlaceholder',
  'dateFormat',
  'returnFormat',
  'hideNavigation',
  'hideDays',
  'onlyMonth',
  'hideLastWeek',
  'disableAutofocus',
  'showSubmitButton',
  'submitButtonText',
  'cancelButtonText',
  'resetButtonText',
  'firstDay',
  'link',
  'size',
  'sync',
  'addonElement',
  'shortcuts',
  'opened',
  'direction',
  'alignPicker',
  'onDaysRender',
  'showInput',
  'onDaysRender',
  'onType',
  'onShow',
  'onHide',
  'onSubmit',
  'onCancel',
  'onReset',
  'skipPortal',
  'yearNavigation',
]

function pickDatePickerProps(props: DateProps) {
  const datePickerProps = Object.keys(props).reduce(
    (datePickerProps, key) => {
      if (datePickerPropKeys.includes(key)) {
        datePickerProps[key] = props[key]
      }

      return datePickerProps
    },
    {}
  )

  return datePickerProps
}

DateComponent._supportsSpacingProps = true
export default DateComponent
