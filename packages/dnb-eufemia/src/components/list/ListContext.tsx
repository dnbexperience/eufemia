import { createContext } from 'react'
import type { SkeletonShow } from '../Skeleton'

export type ListVariant = 'basic'
export type ListContext = {
  variant: ListVariant
  separated: boolean
  skeleton?: SkeletonShow
}

export const ListContext = createContext<ListContext | undefined>(
  undefined
)
