import { useCallback, useRef } from 'react'
import type { DatePickerDates } from './useDates'

export type SubmittedDates = Pick<DatePickerDates, 'startDate' | 'endDate'>

export default function useSubmittedDates() {
  const submittedDatesRef = useRef<SubmittedDates>({})

  const setSubmittedDates = useCallback((dates: SubmittedDates) => {
    submittedDatesRef.current = dates
  }, [])

  return {
    submittedDatesRef,
    setSubmittedDates,
  }
}
