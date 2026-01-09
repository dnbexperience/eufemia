import { useCallback, useRef } from 'react'
import type { InvalidDates } from '../../../../../components/date-picker/DatePickerInput'

export default function useInvalidDates() {
  const invalidDatesRef = useRef<InvalidDates>({})

  const setInvalidDates = useCallback((invalidDates: InvalidDates) => {
    invalidDatesRef.current = {
      ...invalidDatesRef.current,
      ...invalidDates,
    }
  }, [])

  return { invalidDatesRef, setInvalidDates }
}
