import { useRef } from 'react'
import { InvalidDates } from '../../../../../components/date-picker/DatePickerInput'

export default function useInvalidDates() {
  const invalidDatesRef = useRef<InvalidDates>({})

  function setInvalidDates(invalidDates: InvalidDates) {
    invalidDatesRef.current = {
      ...invalidDatesRef.current,
      ...invalidDates,
    }
  }

  return { invalidDatesRef, setInvalidDates }
}
