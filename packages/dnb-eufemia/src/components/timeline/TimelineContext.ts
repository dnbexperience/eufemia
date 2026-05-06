import { createContext } from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'

export type TimelineContextValue = {
  skeleton?: SkeletonShow
}

const TimelineContext = createContext<TimelineContextValue | null>(null)

export default TimelineContext
