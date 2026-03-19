import { useCallback, useRef } from 'react'

export type DatePickerPartialDates = {
  partialDate?: string
  partialStartDate?: string
  partialEndDate?: string
}

export default function usePartialDates() {
  const partialDatesRef = useRef<DatePickerPartialDates>({
    partialStartDate: null,
    partialEndDate: null,
  })

  const setPartialDates = useCallback(
    (partialDates: DatePickerPartialDates) => {
      const nonPartialDates = Object.entries(partialDates).reduce(
        (dates: Record<string, null>, [dateKey, dateValue]) => {
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
    },
    []
  )

  return { partialDatesRef, setPartialDates }
}

function isFullyFilledOut(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}
