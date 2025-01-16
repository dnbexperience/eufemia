import { useMemo } from 'react'
import { useTranslation } from '../../../shared'
import { DatePickerDates } from './useDates'
import { isAfter, isBefore } from 'date-fns'

export default function useMinMaxDateValidation({
  minDate,
  maxDate,
  endDate,
  startDate,
  isRange,
}: Pick<
  DatePickerDates,
  'startDate' | 'endDate' | 'minDate' | 'maxDate'
> & {
  isRange: boolean
}) {
  const translation = useTranslation().DatePicker

  const validationMessage = useMemo<string | undefined>(() => {
    if (isBefore(startDate, minDate)) {
      return translation.errorDateIsBeforeMinDate.replace(
        '%s',
        minDate.toLocaleDateString()
      )
    }

    if (isAfter(startDate, maxDate)) {
      return translation.errorDateIsAfterMaxDate.replace(
        '%s',
        maxDate.toLocaleDateString()
      )
    }

    return undefined
  }, [startDate, minDate, maxDate, translation])

  return validationMessage
}
