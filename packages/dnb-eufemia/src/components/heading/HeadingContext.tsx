/**
 * Web Heading Context
 *
 */

import React from 'react'
import { SkeletonContextProps } from '../skeleton/SkeletonHelper'
import { HeadingProps } from './Heading'

export type HeadingContextProps = {
  heading?: HeadingProps
} & SkeletonContextProps

const HeadingContext = React.createContext<HeadingContextProps>({
  heading: null,
})

export default HeadingContext
