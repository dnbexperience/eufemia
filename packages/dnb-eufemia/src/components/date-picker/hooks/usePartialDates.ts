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
    const nonPartialDates = Object.entries(partialDates).reduce(
      (dates, [dateKey, dateValue]) => {
        if (isFullyFilledOut(dateValue)) {
          dates[dateKey] = null
        }

        return dates
      },
      {}
    )

    partialDatesRef.current = {
      ...partialDatesRef.current,
      ...partialDates,
      ...nonPartialDates,
    }
  }

  return { partialDatesRef, setPartialDates }
}

function isFullyFilledOut(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}
