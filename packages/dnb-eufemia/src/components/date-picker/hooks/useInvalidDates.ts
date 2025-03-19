import { useRef } from 'react'

export type InvalidDates = {
  invalidDate?: string
  invalidStartDate?: string
  invalidEndDate?: string
}

export default function useInvalidDates() {
  const invalidDatesRef = useRef<InvalidDates>({
    invalidStartDate: null,
    invalidEndDate: null,
  })

  function setInvalidDates(invalidDate: InvalidDates) {
    invalidDatesRef.current = {
      ...invalidDatesRef.current,
      ...invalidDate,
    }
  }

  return { invalidDatesRef, setInvalidDates }
}
