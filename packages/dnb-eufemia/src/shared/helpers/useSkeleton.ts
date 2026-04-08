import React from 'react'
import type { SkeletonShow } from '../../components/skeleton/Skeleton'
import type {
  SkeletonMethods,
  SkeletonContextValue,
} from '../../components/skeleton/SkeletonHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../../components/skeleton/SkeletonHelper'

type UseSkeletonReturn = {
  isSkeleton: boolean
  skeletonClass: (method?: SkeletonMethods) => string | null
  skeletonDOMAttributes: (
    params: React.HTMLProps<HTMLElement>
  ) => React.HTMLProps<HTMLElement>
}

export default function useSkeleton(
  skeleton: SkeletonShow,
  context?: SkeletonContextValue
): UseSkeletonReturn {
  const isSkeleton = Boolean(
    skeleton || (skeleton !== false && context?.skeleton)
  )

  return React.useMemo(() => {
    const skeletonClass = (method?: SkeletonMethods) => {
      return createSkeletonClass(method, skeleton, context)
    }

    const domAttributes = (params: React.HTMLProps<HTMLElement>) => {
      return skeletonDOMAttributes(params, skeleton, context)
    }

    return {
      isSkeleton,
      skeletonClass,
      skeletonDOMAttributes: domAttributes,
    }
  }, [isSkeleton, skeleton, context])
}
