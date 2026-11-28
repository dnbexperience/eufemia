import { createContext } from 'react'
import type { SkeletonShow } from '../Skeleton'

export type ListVariant = 'basic'
export type ListSize = 'default' | 'small'
export type ListContextValue = {
  variant: ListVariant
  size?: ListSize
  separated: boolean
  skeleton?: SkeletonShow
  disabled?: boolean
}

export const ListContext = createContext<ListContextValue | undefined>(
  undefined
)
