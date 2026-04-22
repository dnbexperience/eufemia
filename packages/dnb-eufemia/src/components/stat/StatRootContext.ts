import React from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'

type StatRootContextValue = {
  inRoot: boolean
  skeleton?: SkeletonShow
}

const StatRootContext = React.createContext<StatRootContextValue>({
  inRoot: false,
  skeleton: undefined,
})

export default StatRootContext
