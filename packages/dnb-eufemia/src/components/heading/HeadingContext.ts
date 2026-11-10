import { createContext } from 'react'
/**
 * Web Heading Context
 *
 */

import type { SkeletonContextValue } from '../skeleton/SkeletonHelper'
import type { HeadingProps } from './Heading'

export type HeadingContextValue = {
  heading?: HeadingProps & {
    revision?: number
    recalculate?: () => void
  }
} & SkeletonContextValue

const HeadingContext = createContext<HeadingContextValue>({
  heading: null,
})

export default HeadingContext
