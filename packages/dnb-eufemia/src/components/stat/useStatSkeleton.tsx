import React from 'react'
import Context from '../../shared/Context'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import type { SkeletonMethods } from '../skeleton/SkeletonHelper'
import type { SkeletonShow } from '../skeleton/Skeleton'
import StatRootContext from './StatRootContext'

export default function useStatSkeleton(
  skeleton?: SkeletonShow,
  method: SkeletonMethods = 'font'
) {
  const context = React.useContext(Context)
  const { skeleton: rootSkeleton } = React.useContext(StatRootContext)

  const hasSkeleton = Boolean(
    skeleton ?? rootSkeleton ?? context?.skeleton
  )

  return {
    hasSkeleton,
    context,
    skeletonClass: createSkeletonClass(method, hasSkeleton, context),
    applySkeletonAttributes: (
      attributes: React.HTMLProps<HTMLElement>
    ) => {
      skeletonDOMAttributes(attributes, hasSkeleton, context)
    },
  }
}
