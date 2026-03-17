import { useState } from 'react'
import type { DatePickerDates } from './useDates'

export type LastEventCallCache = {
  startDate?: DatePickerDates['startDate']
  endDate?: DatePickerDates['startDate']
}

type UncachedDates = LastEventCallCache

export default function useLastEventCallCache(
  uncachedDates: UncachedDates
) {
  const [cache, setCache] = useState<LastEventCallCache>(undefined)

  if (
    cache &&
    (cache.startDate !== uncachedDates.startDate ||
      cache.endDate !== uncachedDates.endDate)
  ) {
    setCache(undefined)
  }

  return [cache, setCache] as const
}
