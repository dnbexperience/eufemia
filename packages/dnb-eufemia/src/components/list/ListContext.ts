import { createContext } from 'react'
import type { SkeletonShow } from '../Skeleton'

export type ListVariant = 'basic'
export type ListContextValue = {
  variant: ListVariant
  separated: boolean
  skeleton?: SkeletonShow
  disabled?: boolean
}

export const ListContext = createContext<ListContextValue | undefined>(
  undefined
)
