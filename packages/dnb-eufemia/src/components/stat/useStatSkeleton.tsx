import React from 'react'
import Context from '../../shared/Context'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import StatRootContext from './StatRootContext'

export default function useStatSkeleton(skeleton?: SkeletonShow) {
  const context = React.useContext(Context)
  const { skeleton: rootSkeleton } = React.useContext(StatRootContext)

  const isSkeleton = Boolean(skeleton ?? rootSkeleton ?? context?.skeleton)

  return {
    isSkeleton,
    context,
    skeletonClass: createSkeletonClass('font', isSkeleton, context),
    applySkeletonAttributes: (
      attributes: React.HTMLProps<HTMLElement>
    ) => {
      skeletonDOMAttributes(attributes, isSkeleton, context)
    },
  }
}
