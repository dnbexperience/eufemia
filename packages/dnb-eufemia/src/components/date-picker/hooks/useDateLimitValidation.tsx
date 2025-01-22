import { useMemo } from 'react'
import { useTranslation } from '../../../shared'
import { DatePickerDates } from './useDates'
import { format, isAfter, isBefore } from 'date-fns'
import { DatePickerProps } from '../DatePicker'
import { Li, Ul } from '../../../elements'

type DateLimitValidation = {
  status: DatePickerProps['status']
  statusState: DatePickerProps['statusState']
}

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

  const validationMessage = useMemo<
    DateLimitValidation | undefined
  >(() => {
    if (!minDate && !maxDate) {
      return undefined
    }

    const statusState = 'error'

    // Handle non range validation
    if (!isRange) {
      if (isBefore(startDate, minDate)) {
        return {
          status: translation.errorMinDate.replace(
            /%s/,
            format(minDate, dateFormat)
          ),
          statusState,
        }
      }

      if (isAfter(startDate, maxDate)) {
        return {
          status: translation.errorMaxDate.replace(
            /%s/,
            format(maxDate, dateFormat)
          ),
          statusState,
        }
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

    const status =
      messages.length > 1
        ? combineErrorMessages(translation.errorRangeTitle, messages)
        : messages[0]

    return status ? { status, statusState } : undefined
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

export function combineErrorMessages(
  title: string,
  messages: React.ReactNode[]
) {
  return (
    <>
      {title}
      <Ul>
        {messages.map((status, i) => {
          return <Li key={i}>{status}</Li>
        })}
      </Ul>
    </>
  )
}
