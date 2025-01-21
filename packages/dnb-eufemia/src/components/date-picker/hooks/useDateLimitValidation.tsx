import { useMemo } from 'react'
import { useTranslation } from '../../../shared'
import { DatePickerDates } from './useDates'
import { format, isAfter, isBefore } from 'date-fns'
import { DatePickerProps } from '../DatePicker'
import { Li, Ul } from '../../../elements'

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

    const messages = []

    if (isBefore(startDate, minDate)) {
      messages.push(
        translation.errorRangeStartDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat)
        )
      )
    }

    if (isAfter(startDate, maxDate)) {
      messages.push(
        translation.errorRangeStartDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat)
        )
      )
    }

    if (isBefore(endDate, minDate)) {
      messages.push(
        translation.errorRangeEndDateMinDate.replace(
          /%s/,
          format(minDate, dateFormat)
        )
      )
    }

    if (isAfter(endDate, maxDate)) {
      messages.push(
        translation.errorRangeEndDateMaxDate.replace(
          /%s/,
          format(maxDate, dateFormat)
        )
      )
    }

    return messages.length > 1 ? (
      <>
        {translation.errorSummary}
        <Ul>
          {messages.map((status, i) => {
            return <Li key={i}>{status}</Li>
          })}
        </Ul>
      </>
    ) : (
      messages[0] || undefined
    )
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
