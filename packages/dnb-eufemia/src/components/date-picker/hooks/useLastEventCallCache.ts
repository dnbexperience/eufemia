import { useEffect, useState } from 'react'
import { Dates } from './useDates'

export type LastEventCallCache = {
  startDate?: Dates['startDate']
  endDate?: Dates['startDate']
}

type uncachedDates = LastEventCallCache

export default function useLastEventCallCache(
  uncachedDates: uncachedDates
) {
  const [cache, setCache] = useState<LastEventCallCache>(undefined)

  useEffect(() => {
    if (
      cache &&
      (cache.startDate !== uncachedDates.startDate ||
        cache.endDate !== uncachedDates.endDate)
    ) {
      setCache(undefined)
    }
  }, [uncachedDates, cache])

  return [cache, setCache] as const
}
