import { useCallback, useRef } from 'react'
import type { DatePickerInvalidDates } from '../../../../../components/date-picker/DatePickerInput'

export default function useInvalidDates(): {
  invalidDatesRef: React.RefObject<DatePickerInvalidDates>
  setInvalidDates: (invalidDates: DatePickerInvalidDates) => void
} {
  const invalidDatesRef = useRef<DatePickerInvalidDates>({})

  const setInvalidDates = useCallback(
    (invalidDates: DatePickerInvalidDates) => {
      invalidDatesRef.current = {
        ...invalidDatesRef.current,
        ...invalidDates,
      }
    },
    []
  )

  return { invalidDatesRef, setInvalidDates }
}
