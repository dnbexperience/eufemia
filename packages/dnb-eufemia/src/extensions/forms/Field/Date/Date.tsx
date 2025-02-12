import React, { useCallback, useContext, useMemo } from 'react'
import { DatePicker } from '../../../../components'
import { useFieldProps } from '../../hooks'
import { FieldProps, AllJSONSchemaVersions } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import classnames from 'classnames'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import SharedContext from '../../../../shared/Context'
import { parseISO, isValid, isBefore, isAfter, format } from 'date-fns'
import useTranslation, {
  FormsTranslation,
} from '../../hooks/useTranslation'
import { formatDate } from '../../Value/Date'
import {
  DatePickerEvent,
  DatePickerProps,
} from '../../../../components/DatePicker'
import { convertStringToDate } from '../../../../components/date-picker/DatePickerCalc'
import { ProviderProps } from '../../../../shared/Provider'
import { locales } from '../../../../components/date-picker/DatePickerCalendar'

// `range`, `showInput`, `showCancelButton` and `showResetButton` are not picked from the `DatePickerProps`
// Since they require `Field.Date` specific comments, due to them having different default values
export type DateProps = FieldProps<string, undefined | string> & {
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
} & Pick<
    DatePickerProps,
    | 'month'
    | 'startMonth'
    | 'endMonth'
    | 'minDate'
    | 'maxDate'
    | 'correctInvalidDate'
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
  >

function DateComponent(props: DateProps) {
  const translations = useTranslation().Date
  const { locale } = useContext(SharedContext)

  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': translations.errorRequired,
      'Field.errorPattern': translations.errorRequired,
      ...props.errorMessages,
    }
  }, [props.errorMessages, translations.errorRequired])

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
      if (required && (!value || !isValid(parseISO(value)))) {
        return error
      }

      return undefined
    },
    []
  )

  const dateLimitValidator = useCallback(
    (value: string) => {
      return validateDateLimit({
        value,
        minDate: props.minDate,
        maxDate: props.maxDate,
        isRange: props.range,
        localeKey: locale,
        translations: translations,
      })
    },
    [props.maxDate, props.minDate, props.range, translations, locale]
  )

  const hasDateLimitAndValue = useMemo(() => {
    return (props.minDate || props.maxDate) && props.value
  }, [props.minDate, props.maxDate, props.value])

  const validateInitially = useMemo(() => {
    if (hasDateLimitAndValue && !props.validateInitially) {
      return true
    }
    return props.validateInitially
  }, [props.validateInitially, hasDateLimitAndValue])

  const preparedProps: DateProps = {
    ...props,
    errorMessages,
    schema,
    fromInput: ({
      date,
      start_date,
      end_date,
    }: DatePickerEvent<React.ChangeEvent<HTMLInputElement>>) => {
      return range ? `${start_date}|${end_date}` : date
    },
    validateRequired,
    validateInitially,
    onBlurValidator: props.onBlurValidator ?? dateLimitValidator,
  }

  const {
    id,
    path,
    itemPath,
    className,
    label,
    value: valueProp,
    hasError,
    disabled,
    htmlAttributes,
    handleFocus,
    handleBlur,
    handleChange,
    setDisplayValue,
    range,
    showCancelButton = true,
    showResetButton = true,
    showInput = true,
    onReset,
    minDate,
    maxDate,
    ...rest
  } = useFieldProps(preparedProps)

  const datePickerProps = pickDatePickerProps(rest)

  const { value, startDate, endDate } = useMemo(() => {
    if (!range || !valueProp) {
      return {
        // Assign to null if falsy value, to properly clear input values
        value: valueProp ?? null,
        startDate: undefined,
        endDate: undefined,
      }
    }

    const [startDate, endDate] = parseRangeValue(valueProp)

    return {
      date: undefined,
      startDate,
      endDate,
    }
  }, [range, valueProp])

  useMemo(() => {
    if ((path || itemPath) && valueProp) {
      setDisplayValue(formatDate(valueProp, { locale }), undefined)
    }
  }, [itemPath, locale, path, setDisplayValue, valueProp])

  const fieldBlockProps: FieldBlockProps = {
    forId: id,
    label: label ?? translations.label,
    className: classnames('dnb-forms-field-string', className),
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
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        status={hasError ? 'error' : undefined}
        range={range}
        onChange={handleChange}
        onReset={(event) => {
          handleChange(event)
          onReset?.(event)
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...datePickerProps}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

function parseRangeValue(value: DateProps['value']) {
  return (
    value
      .split('|')
      // Assign to null if falsy value, to properly clear input values
      .map((value) => (/(undefined|null)/.test(value) ? null : value))
  )
}

function validateDateLimit({
  value,
  isRange,
  localeKey,
  translations,
  ...params
}: {
  value: DateProps['value']
  minDate: DateProps['minDate']
  maxDate: DateProps['maxDate']
  isRange: DateProps['range']
  localeKey: ProviderProps['locale']
  translations: FormsTranslation['Date']
}) {
  if ((!params.minDate && !params.maxDate) || !value) {
    return
  }

  const [startDateParsed, endDateParsed] = parseRangeValue(value)

  const minDate = convertStringToDate(params.minDate)
  const maxDate = convertStringToDate(params.maxDate)
  const startDate = convertStringToDate(startDateParsed)
  const endDate = convertStringToDate(endDateParsed)

  const locale = locales[localeKey]
  const dateFormat = 'PPP'

  // Handle non range validation
  if (!isRange) {
    if (isBefore(startDate, minDate)) {
      return new Error(
        translations.errorMinDate.replace(
          /%s/,
          format(minDate, dateFormat, { locale })
        )
      )
    }

    if (isAfter(startDate, maxDate)) {
      return new Error(
        translations.errorMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat, { locale })
        )
      )
    }

    return
  }

  const messages: Array<Error> = []

  // Start date validation
  if (isBefore(startDate, minDate)) {
    messages.push(
      new Error(
        translations.errorRangeStartDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat, { locale })
        )
      )
    )
  }

  if (isAfter(startDate, maxDate)) {
    messages.push(
      new Error(
        translations.errorRangeStartDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat, { locale })
        )
      )
    )
  }

  // End date validation
  if (isBefore(endDate, minDate)) {
    messages.push(
      new Error(
        translations.errorRangeEndDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat, { locale })
        )
      )
    )
  }

  if (isAfter(endDate, maxDate)) {
    messages.push(
      new Error(
        translations.errorRangeEndDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat, { locale })
        )
      )
    )
  }

  return messages
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
