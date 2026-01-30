import { useCallback, useRef } from 'react'
import { InvalidDates } from '../../../../../components/date-picker/DatePickerInput'

export default function useInvalidDates(): {
  invalidDatesRef: React.MutableRefObject<InvalidDates>
  setInvalidDates: (invalidDates: InvalidDates) => void
} {
  const invalidDatesRef = useRef<InvalidDates>({})

  const setInvalidDates = useCallback((invalidDates: InvalidDates) => {
    invalidDatesRef.current = {
      ...invalidDatesRef.current,
      ...invalidDates,
    }
  }, [])

  return { invalidDatesRef, setInvalidDates }
}
