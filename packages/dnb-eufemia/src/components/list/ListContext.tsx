import { createContext } from 'react'
import type { SkeletonShow } from '../Skeleton'

export type ListVariant = 'basic'
export type ListContext = {
  variant: ListVariant
  separated: boolean
  skeleton?: SkeletonShow
  disabled?: boolean
}

export const ListContext = createContext<ListContext | undefined>(
  undefined
)
