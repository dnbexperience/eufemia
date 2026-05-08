import { createContext } from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'

type StatRootContextValue = {
  inRoot: boolean
  skeleton?: SkeletonShow
}

const StatRootContext = createContext<StatRootContextValue>({
  inRoot: false,
  skeleton: undefined,
})

export default StatRootContext
