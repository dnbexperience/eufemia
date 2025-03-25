import { useCallback, useRef } from 'react'
import { InvalidDates } from '../../../../../components/date-picker/hooks/useInvalidDates'

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
