import { useRef } from 'react'
import { DatePickerDates } from './useDates'

export type InitialCalendarDates = Pick<
  DatePickerDates,
  'startDate' | 'endDate'
>

export default function useInitialCalendarDates() {
  const initialCalendarDatesRef = useRef<InitialCalendarDates>({})

  const setInitialCalendarDates = (dates: InitialCalendarDates) => {
    initialCalendarDatesRef.current = {
      ...initialCalendarDatesRef.current,
      ...dates,
    }
  }

  return {
    initialCalendarDatesRef,
    setInitialCalendarDates,
  }
}
