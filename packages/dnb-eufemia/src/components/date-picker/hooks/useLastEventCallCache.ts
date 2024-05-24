import { useEffect, useState } from 'react'
import { Dates } from './useDates'

export type LastEventCallCache = {
  startDate?: Dates['startDate']
  endDate?: Dates['startDate']
}

type NonCachedDates = LastEventCallCache

export default function useLastEventCallCache(
  nonCachedDates: NonCachedDates
) {
  const [cache, setCache] = useState<LastEventCallCache>(undefined)

  useEffect(() => {
    if (
      cache &&
      (cache.startDate !== nonCachedDates.startDate ||
        cache.endDate !== nonCachedDates.endDate)
    ) {
      setCache(undefined)
    }
  }, [nonCachedDates, cache])

  return [cache, setCache] as const
}
