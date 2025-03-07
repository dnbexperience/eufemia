import { useRef } from 'react'

export type PartialDates = {
  partialDate?: string
  partialStartDate?: string
  partialEndDate?: string
}

export default function usePartialDates() {
  const partialDatesRef = useRef<PartialDates>({
    partialStartDate: null,
    partialEndDate: null,
  })

  function setPartialDates(partialDates: PartialDates) {
    partialDatesRef.current = {
      ...partialDatesRef.current,
      ...partialDates,
    }
  }

  return { partialDatesRef, setPartialDates }
}
