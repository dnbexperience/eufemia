import { useMemo } from 'react'
import { useTranslation } from '../../../shared'
import { DatePickerDates } from './useDates'
import { format, isAfter, isBefore } from 'date-fns'
import { DatePickerProps } from '../DatePicker'

export default function useDateLimitValidation({
  minDate,
  maxDate,
  endDate,
  startDate,
  isRange,
  dateFormat,
}: Pick<
  DatePickerDates,
  'startDate' | 'endDate' | 'minDate' | 'maxDate'
> & {
  isRange: DatePickerProps['range']
  dateFormat: DatePickerProps['dateFormat']
}) {
  const translation = useTranslation().DatePicker

  const validationMessage = useMemo<string | undefined>(() => {
    if (!minDate && !maxDate) {
      return undefined
    }

    // Handle non range validation
    if (!isRange) {
      if (isBefore(startDate, minDate)) {
        return translation.errorMinDate.replace(
          /%s/,
          format(minDate, dateFormat)
        )
      }

      if (isAfter(startDate, maxDate)) {
        return translation.errorMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat)
        )
      }
    }

    let validationMessage = ''

    if (isBefore(startDate, minDate)) {
      validationMessage += translation.errorRangeStartDateMinDate.replace(
        /%s/,
        format(minDate, dateFormat)
      )
    }

    if (isAfter(startDate, maxDate)) {
      validationMessage += translation.errorRangeStartDateMaxDate.replace(
        /%s/,
        format(maxDate, dateFormat)
      )
    }

    if (isBefore(endDate, minDate)) {
      validationMessage += translation.errorRangeEndDateMinDate.replace(
        /%s/,
        format(minDate, dateFormat)
      )
    }

    if (isAfter(endDate, maxDate)) {
      validationMessage += translation.errorRangeEndDateMaxDate.replace(
        /%s/,
        format(maxDate, dateFormat)
      )

      return validationMessage || undefined
    }

    return undefined
  }, [
    startDate,
    endDate,
    minDate,
    maxDate,
    isRange,
    dateFormat,
    translation,
  ])

  return validationMessage
}
