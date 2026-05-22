import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { extendPropsWithContext } from '@dnb/eufemia/src/shared/component-helper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '@dnb/eufemia/src/components/skeleton/SkeletonHelper'

import type { SkeletonShow } from '@dnb/eufemia/src/components/skeleton/Skeleton'

export type ComponentProps = {
  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow
}
export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { skeleton, className, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton }
    // ...
  )

  // This helper will add some needed HTML attributes like "disabled", "aria-disabled" and "aria-label"
  skeletonDOMAttributes(rest, skeleton, context)

  // This helper will add needed skeleton css classes in order to create a custom skeleton
  const skeletonClassName = createSkeletonClass(
    'shape',
    skeleton,
    context,
    className
  )

  // Use skeleton, skeletonClassName and spread the ...rest
}

export default MyComponent
