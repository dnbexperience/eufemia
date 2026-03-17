/**
 * Web Heading Context
 *
 */

import React from 'react'
import type { SkeletonContextValue } from '../skeleton/SkeletonHelper'
import type { HeadingProps } from './Heading'

export type HeadingContextValue = {
  heading?: HeadingProps
} & SkeletonContextValue

const HeadingContext = React.createContext<HeadingContextValue>({
  heading: null,
})

export default HeadingContext
