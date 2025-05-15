import { useCallback, useRef } from 'react'
import { DatePickerDates } from './useDates'

export type SubmittedCalendarDates = Pick<
  DatePickerDates,
  'startDate' | 'endDate'
>

export default function useSubmittedCalendarDates() {
  const submittedCalendarDatesRef = useRef<SubmittedCalendarDates>({})

  const setSubmittedCalendarDates = useCallback(
    (dates: SubmittedCalendarDates) => {
      submittedCalendarDatesRef.current = dates
    },
    []
  )

  return {
    submittedCalendarDatesRef,
    setSubmittedCalendarDates,
  }
}
