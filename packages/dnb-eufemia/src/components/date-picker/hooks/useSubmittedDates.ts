import { useCallback, useRef } from 'react'
import { DatePickerDates } from './useDates'

export type DatePickerSubmittedDates = Pick<
  DatePickerDates,
  'startDate' | 'endDate'
>

export default function useSubmittedDates() {
  const submittedDatesRef = useRef<DatePickerSubmittedDates>({})

  const setSubmittedDates = useCallback(
    (dates: DatePickerSubmittedDates) => {
      submittedDatesRef.current = dates
    },
    []
  )

  return {
    submittedDatesRef,
    setSubmittedDates,
  }
}
