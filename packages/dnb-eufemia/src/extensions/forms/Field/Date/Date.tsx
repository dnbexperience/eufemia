import { useCallback, useContext, useMemo, useRef } from 'react'
import type {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
} from 'react'
import * as z from 'zod'
import { DatePicker } from '../../../../components'
import { useFieldProps } from '../../hooks'
import type {
  FieldProps,
  Validator,
  ValidatorWithCustomValidators,
  Schema,
} from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { clsx } from 'clsx'
import type { FieldBlockProps } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import SharedContext from '../../../../shared/Context'
import {
  format,
  parseISO,
  isValid,
  isBefore,
  isAfter,
  startOfDay,
} from 'date-fns'
import useTranslation from '../../hooks/useTranslation'
import type {
  DatePickerEvent,
  DatePickerProps,
  DisplayPickerEvent,
} from '../../../../components/DatePicker'
import { convertStringToDate } from '../../../../components/date-picker/DatePickerCalc'
import type { ProviderProps } from '../../../../shared/Provider'
import { FormError } from '../../utils'
import mergeProps from '../../../../shared/helpers/mergeProps'
import type { DatePickerInvalidDates } from '../../../../components/date-picker/DatePickerInput'
import useInvalidDates from './hooks/useInvalidDates'
import type { DateFormatOptions } from '../../../../components/date-format/DateFormatUtils'
import { formatDate } from '../../../../components/date-format/DateFormatUtils'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import { datePickerPropKeys } from './datePickerPropKeys'

// `range`, `showInput`, `showCancelButton` and `showResetButton` are not picked from the `DatePickerProps`
// Since they require `Field.Date` specific comments, due to them having different default values
//
// `inline` is intentionally not supported in `Field.Date`.
// Use `DatePicker` directly if an inline calendar is needed.
export type DateValidator = ValidatorWithCustomValidators<
  string,
  {
    dateValidator: Validator<string>
  }
>

export type DateProps = Omit<
  FieldProps<string, undefined | string>,
  'onBlurValidator'
> & {
  // Validation
  pattern?: string
  /**
   * Defines if the Date field should support a value of two dates (starting and ending date).
   * The value needs to be a string containing two dates, separated by a pipe character (`|`) e.g. (`2024-09-01|2024-09-30`) when this is set to `true`.
   * A range with only one date is stored as `2024-09-01|` or `|2024-09-30`, and an empty range as `undefined`.
   * Defaults to `false`.
   */
  range?: DatePickerProps['range']
  /**
   * If set to `true`, only one calendar is shown in range mode instead of two side-by-side calendars. Only meant to be used if `range` is set to `true`. Defaults to `false`.
   */
  rangeSingleCalendar?: DatePickerProps['rangeSingleCalendar']
  /**
   * If the input fields with the mask should be visible. Defaults to `true`.
   */
  showInput?: DatePickerProps['showInput']

  /**
   * If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"`. Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.
   */
  showCancelButton?: DatePickerProps['showCancelButton']
  /**
   * If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"`. When clicked, the field resets to the initial `value` or `defaultValue`. If no initial value was provided, the field is cleared. Defaults to `true`.
   */
  showResetButton?: DatePickerProps['showResetButton']
  onBlurValidator?: DateValidator | false
} & PickedDatePickerProps

function DateComponent(props: DateProps): ReactElement {
  const { errorRequired, label: defaultLabel } = useTranslation().Date
  const { locale, translation } = useContext(SharedContext)
  const returnFormat =
    props.returnFormat || translation.DatePicker.returnFormat
  const dateFormat = props.dateFormat ?? translation.DatePicker.dateFormat
  const parseValue = useCallback(
    (value: string) =>
      parseFieldDate(value, returnFormat) ??
      (dateFormat !== returnFormat
        ? parseFieldDate(value, dateFormat)
        : null),
    [dateFormat, returnFormat]
  )

  const { invalidDatesRef, setInvalidDates } = useInvalidDates()
  const lastEditedRangeDateRef = useRef<'start' | 'end'>('start')

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, errorRequired])

  const schema = useMemo<Schema<string>>(
    () => {
      if (props.schema) {
        return props.schema
      }

      return (p: DateProps) => {
        let s = z.string()
        if (p?.pattern) {
          try {
            s = s.regex(new RegExp(p.pattern, 'u'))
          } catch (_e) {
            // Ignore invalid regex patterns
          }
        }
        return s
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      return parseValue(value) ? undefined : error
    },
    [props.range, parseValue]
  )

  const dateValidator = useCallback(
    (value: string) => {
      const invalidDateErrors = validateDate(invalidDatesRef.current)

      if (!value || (!props.range && !props.minDate && !props.maxDate)) {
        return invalidDateErrors
      }

      const [start, end] = parseRangeValue(value)
      const startDate = toDay(parseValue(start))
      const endDate = toDay(parseValue(end))
      const rangeOrderErrors = validateRangeOrder({
        startDate,
        endDate,
        isRange: props.range,
        lastEditedDate: lastEditedRangeDateRef.current,
        locale,
      })

      // No need to validate min/max date if they are not provided
      if (!props.minDate && !props.maxDate) {
        return [...invalidDateErrors, ...rangeOrderErrors]
      }

      const dateLimitErrors = validateDateLimit({
        startDate,
        endDate,
        locale,
        minDate: toDay(convertStringToDate(props.minDate, { dateFormat })),
        maxDate: toDay(convertStringToDate(props.maxDate, { dateFormat })),
        isRange: props.range,
      })

      // Skip range order errors when date limit errors exist,
      // since exceeding minDate/maxDate is more specific
      return [
        ...invalidDateErrors,
        ...dateLimitErrors,
        ...(dateLimitErrors.length > 0 ? [] : rangeOrderErrors),
      ]
    },
    [
      props.maxDate,
      props.minDate,
      dateFormat,
      props.range,
      invalidDatesRef,
      locale,
      parseValue,
    ]
  )

  const {
    onBlurValidator: propOnBlurValidator,
    onChangeValidator,
    ...restProps
  } = props

  const onBlurValidator = useMemo(() => {
    if (propOnBlurValidator === false) {
      return undefined
    }

    if (propOnBlurValidator) {
      return propOnBlurValidator
    }

    return dateValidator
  }, [propOnBlurValidator, dateValidator])

  const fromInput = useCallback(
    ({
      date,
      startDate,
      endDate,
      invalidDate,
      invalidStartDate,
      invalidEndDate,
    }: DatePickerEvent<ChangeEvent<HTMLInputElement>>) => {
      // Add to ref, for use in onBlurValidator, would be better if there was a way to add this to additional args
      setInvalidDates({
        invalidDate,
        invalidStartDate,
        invalidEndDate,
      })

      if (props.range) {
        if (!startDate && !endDate) {
          return undefined
        }

        return `${startDate || ''}|${endDate || ''}`
      }

      return date
    },
    [props.range, setInvalidDates]
  )

  const preparedProps = {
    ...restProps,
    errorMessages,
    schema,
    fromInput,
    validateRequired,
    onBlurValidator,
    onChangeValidator,
    exportValidators: { dateValidator },
    invalidDatesRef,
  }

  const {
    fieldBlockProps: sharedFieldBlockProps,
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
    rangeSingleCalendar,
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
  const initialValueRef = useRef(props.value ?? props.defaultValue)
  const valueOnOpenRef = useRef(internalValue)

  const handleOpen = useCallback(
    (event: DatePickerEvent<DisplayPickerEvent>) => {
      valueOnOpenRef.current = internalValue
      datePickerProps.onOpen?.(event)
    },
    [internalValue, datePickerProps.onOpen]
  )

  const handleCancel = useCallback(
    (event: DatePickerEvent<ReactMouseEvent<HTMLButtonElement>>) => {
      const revertValue = valueOnOpenRef.current

      if (range) {
        const [startDate, endDate] = parseRangeValue(revertValue)
        handleChange({
          startDate: startDate ?? undefined,
          endDate: endDate ?? undefined,
        })
      } else {
        handleChange({ date: revertValue ?? undefined })
      }

      datePickerProps.onCancel?.(event)
    },
    [handleChange, range, datePickerProps.onCancel]
  )

  const handleSubmit = useCallback(
    (event: DatePickerEvent<ReactMouseEvent<HTMLButtonElement>>) => {
      valueOnOpenRef.current = internalValue
      datePickerProps.onSubmit?.(event)
    },
    [internalValue, datePickerProps.onSubmit]
  )

  const handleReset = useCallback(
    (
      event: DatePickerEvent<
        ReactMouseEvent<HTMLButtonElement, MouseEvent>
      >
    ) => {
      const initialValue = initialValueRef.current

      if (initialValue) {
        if (range) {
          const [startDate, endDate] = parseRangeValue(initialValue)
          handleChange({
            startDate: startDate ?? undefined,
            endDate: endDate ?? undefined,
          })
        } else {
          handleChange({ date: initialValue })
        }

        onReset?.(event)

        return // stop here
      }

      const reset = {
        date: undefined,
        startDate: undefined,
        endDate: undefined,
        isValid: false,
      }
      handleChange(reset)
      setDisplayValue(undefined)
      onReset?.({
        ...event,
        ...reset,
      })
    },
    [handleChange, onReset, setDisplayValue, range]
  )
  const onFocus = useCallback(() => {
    handleFocus()
    handleError()
  }, [handleFocus, handleError])
  const onType = useCallback(
    (event: DatePickerEvent<ChangeEvent<HTMLInputElement>>) => {
      const { date, startDate, endDate, ...rest } = event

      if (props.range) {
        const start = getTypedDate(
          startDate,
          rest.isValidStartDate,
          returnFormat
        )
        const end = getTypedDate(
          endDate,
          rest.isValidEndDate,
          returnFormat
        )

        // Track which date the user last edited for range order error messages
        const [prevStart, prevEnd] = parseRangeValue(internalValue)
        if (start !== (prevStart ?? undefined)) {
          lastEditedRangeDateRef.current = 'start'
        } else if (end !== (prevEnd ?? undefined)) {
          lastEditedRangeDateRef.current = 'end'
        }

        handleChange({ startDate: start, endDate: end, ...rest })
      } else {
        handleChange({
          date: getTypedDate(date, rest.isValid, returnFormat),
          ...rest,
        })
      }

      // To ensure that the form can show the required error message while typing and blurring
      setChanged(true)

      datePickerProps.onType?.(event)
    },
    [
      handleChange,
      props.range,
      setChanged,
      internalValue,
      returnFormat,
      datePickerProps.onType,
    ]
  )

  const { value, startDate, endDate } = useMemo(() => {
    // The picker reads strings in its date format, so pass the stored
    // return-format value as an ISO date.
    const toPickerDate = (value: string) => {
      const date = parseValue(value)
      return date ? format(date, 'yyyy-MM-dd') : value
    }

    if (!range || !internalValue) {
      return {
        // Assign to null if falsy value, to properly clear input values
        value: internalValue ? toPickerDate(internalValue) : null,
        startDate: undefined,
        endDate: undefined,
      }
    }

    const [startDate, endDate] = parseRangeValue(internalValue)

    return {
      value: undefined,
      startDate: toPickerDate(startDate),
      endDate: toPickerDate(endDate),
    }
  }, [range, internalValue, parseValue])

  useMemo(() => {
    if ((path || itemPath) && value) {
      const date = parseValue(value)
      if (date) {
        setDisplayValue(formatDate(date, { locale }))
      }
    }
  }, [itemPath, locale, path, setDisplayValue, value, parseValue])

  const fieldBlockProps: FieldBlockProps = {
    ...sharedFieldBlockProps,
    forId: id,
    label: label ?? defaultLabel,
    className: clsx('dnb-forms-field-string', className),
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
        alignPicker={
          showInput && (width === 'large' || width === 'stretch')
            ? 'right'
            : undefined
        }
        showCancelButton={showCancelButton}
        showResetButton={showResetButton}
        stretch={width !== undefined}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        status={hasError ? 'error' : undefined}
        range={range}
        rangeSingleCalendar={rangeSingleCalendar}
        {...mergeProps(
          {
            onReset: handleReset,
            onChange: handleChange,
            onFocus,
            onBlur: handleBlur,
            ...datePickerProps,
            onType, // To support validation while typing (e.g. required)
            onOpen: handleOpen,
            onSubmit: handleSubmit,
            onCancel: handleCancel,
          },
          htmlAttributes
        )}
      />
    </FieldBlock>
  )
}

export function parseRangeValue(
  value: DateProps['value']
): Array<string | null> {
  return (
    String(value)
      .split('|')
      // Assign to null if falsy value, to properly clear input values
      .map((value) =>
        !value || /(undefined|null)/.test(value) ? null : value
      )
  )
}

function parseFieldDate(value: string, dateFormat: string) {
  if (!value) {
    return null
  }
  if (dateFormat === 'yyyy-MM-dd') {
    const date = parseISO(value)
    return isValid(date) ? date : null
  }
  return convertStringToDate(value, { dateFormat, strictDateFormat: true })
}

// The picker returns formatted dates when valid, but raw ISO input for
// out-of-bounds or reversed dates. Keep those dates for field validation.
function getTypedDate(
  value: string,
  isPickerValid: boolean,
  returnFormat: string
) {
  if (isPickerValid) {
    return value
  }
  const date = value && parseISO(value)
  return isValid(date) ? format(date, returnFormat) : undefined
}

function toDay(date: Date) {
  return date ? startOfDay(date) : undefined
}

// Validators
function validateDateLimit({
  startDate,
  endDate,
  minDate,
  maxDate,
  isRange,
  locale,
}: {
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  isRange: DateProps['range']
  locale: ProviderProps['locale']
}): Array<FormError> {
  const options: DateFormatOptions = {
    locale,
    options: { dateStyle: 'long' },
  }

  const messages: Array<FormError> = []

  // Handle non range validation
  if (!isRange) {
    if (isBefore(startDate, minDate)) {
      messages.push(
        new FormError('Date.errorMinDate', {
          messageValues: { date: formatDate(minDate, options) },
        })
      )
    }

    if (isAfter(startDate, maxDate)) {
      messages.push(
        new FormError('Date.errorMaxDate', {
          messageValues: { date: formatDate(maxDate, options) },
        })
      )
    }

    return messages
  }

  // Start date validation
  if (isBefore(startDate, minDate)) {
    messages.push(
      new FormError('Date.errorStartDateMinDate', {
        messageValues: { date: formatDate(minDate, options) },
      })
    )
  }

  if (isAfter(startDate, maxDate)) {
    messages.push(
      new FormError('Date.errorStartDateMaxDate', {
        messageValues: { date: formatDate(maxDate, options) },
      })
    )
  }

  // End date validation
  if (isBefore(endDate, minDate)) {
    messages.push(
      new FormError('Date.errorEndDateMinDate', {
        messageValues: { date: formatDate(minDate, options) },
      })
    )
  }

  if (isAfter(endDate, maxDate)) {
    messages.push(
      new FormError('Date.errorEndDateMaxDate', {
        messageValues: { date: formatDate(maxDate, options) },
      })
    )
  }

  return messages
}

function validateRangeOrder({
  startDate,
  endDate,
  isRange,
  lastEditedDate,
  locale,
}: {
  startDate: Date
  endDate: Date
  isRange: DateProps['range']
  lastEditedDate: 'start' | 'end'
  locale: ProviderProps['locale']
}): Array<FormError> {
  if (isRange && startDate && endDate && isAfter(startDate, endDate)) {
    const options: DateFormatOptions = {
      locale,
      options: { dateStyle: 'long' },
    }

    if (lastEditedDate === 'end') {
      return [
        new FormError('Date.errorEndDateMinDate', {
          messageValues: {
            date: formatDate(startDate, options),
          },
        }),
      ]
    }

    return [
      new FormError('Date.errorStartDateMaxDate', {
        messageValues: {
          date: formatDate(endDate, options),
        },
      }),
    ]
  }

  return []
}

function validateDate({
  invalidDate,
  invalidStartDate,
  invalidEndDate,
}: DatePickerInvalidDates): Array<FormError> {
  // Don't show error if the date is empty or contains only placeholder values
  if (invalidDate && !isEmptyOrPlaceholder(invalidDate)) {
    return [
      new FormError('Date.errorInvalidDate', {
        messageValues: { date: invalidDate },
      }),
    ]
  }

  const errors: Array<FormError> = []

  if (invalidStartDate && !isEmptyOrPlaceholder(invalidStartDate)) {
    errors.push(
      new FormError('Date.errorInvalidStartDate', {
        messageValues: { date: invalidStartDate },
      })
    )
  }

  if (invalidEndDate && !isEmptyOrPlaceholder(invalidEndDate)) {
    errors.push(
      new FormError('Date.errorInvalidEndDate', {
        messageValues: { date: invalidEndDate },
      })
    )
  }

  return errors
}

function isEmptyOrPlaceholder(date: string): boolean {
  if (!date) {
    return true
  }

  // Check if the date is empty or contains only non-numeric characters
  // This covers placeholder patterns like "dd", "mm", "yyyy", "åååå", etc.
  return !/\d/.test(date)
}

// `datePickerPropKeys` (used to filter DatePickerProps out of FieldProps)
// lives in its own lightweight module so documentation tooling can import
// it without evaluating this component. Re-exported here to preserve the
// existing `./Date` import path.
export { datePickerPropKeys }

type PickedDatePickerProps = Pick<
  DatePickerProps,
  (typeof datePickerPropKeys)[number]
>

// DatePickerProps that are intentionally not forwarded to DatePicker.
// When a new prop is added to DatePickerProps, add it to either
// datePickerPropKeys (forwarded) or this type (excluded).
type ExcludedDatePickerProps =
  // Value props handled by Field.Date
  | 'date'
  | 'startDate'
  | 'endDate'
  // Props with different defaults, handled separately
  | 'range'
  | 'rangeSingleCalendar'
  | 'showInput'
  | 'showCancelButton'
  | 'showResetButton'
  // Props handled by useFieldProps
  | 'label'
  | 'labelDirection'
  | 'labelSrOnly'
  | 'labelAlignment'
  | 'inputElement'
  | 'disabled'
  | 'stretch'
  | 'skeleton'
  | 'suffix'
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  // Not supported by Field.Date
  | 'inline'
  | 'resetDate'
  | 'preventClose'
  | 'noAnimation'
  | 'enableKeyboardNav'
  | 'tabIndex'
  | 'className'
  | '_omitInputShellClass'

// Compile-time check: every DatePickerProps key must be either
// forwarded (datePickerPropKeys) or explicitly excluded.
// If this errors, a new DatePickerProps key needs to be added
// to one of the two lists above.
type AssertNever<T extends never> = T
// eslint-disable-next-line @typescript-eslint/naming-convention
type _AssertAllPropsHandled = AssertNever<
  Exclude<
    keyof DatePickerProps,
    (typeof datePickerPropKeys)[number] | ExcludedDatePickerProps
  >
>

function pickDatePickerProps(props: DateProps): Partial<DatePickerProps> {
  const datePickerProps = Object.keys(props).reduce(
    (datePickerProps, key) => {
      if ((datePickerPropKeys as ReadonlyArray<string>).includes(key)) {
        datePickerProps[key] = props[key]
      }

      return datePickerProps
    },
    {} as Partial<DatePickerProps>
  )

  return datePickerProps
}

withComponentMarkers(DateComponent, {
  _supportsSpacingProps: true,
})

export default DateComponent
