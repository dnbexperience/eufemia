import { createContext } from 'react'
/**
 * Web Heading Context
 *
 */

import type { SkeletonContextValue } from '../skeleton/SkeletonHelper'
import type { HeadingProps } from './Heading'
import type { createHeadingOrder } from './useHeadingOrder'

export type HeadingContextValue = {
  heading?: HeadingProps & {
    revision?: number
    recalculate?: () => void
    order?: ReturnType<typeof createHeadingOrder>
  }
} & SkeletonContextValue

const HeadingContext = createContext<HeadingContextValue>({
  heading: null,
})

export default HeadingContext
