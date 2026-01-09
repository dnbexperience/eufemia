/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'
import type { SkeletonMethods } from '../components/skeleton/SkeletonHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../components/skeleton/SkeletonHelper'
import type { SkeletonShow } from '../components/skeleton/Skeleton'

import type { DynamicElement, SpacingProps } from '../shared/types'

export type ElementInternalProps = {
  /**
   * Defines the Element Type, like "div"
   */
  as: DynamicElement<unknown>
}

export type ElementProps = {
  skeleton?: SkeletonShow
  skeletonMethod?: SkeletonMethods
  /**
   * As a string: replaces the default tag class `dnb-{TAG_NAME}` with a different class. Empty string does the same as default `undefined`.
   *
   * As a boolean: set it to `false` to disable the default tag class. `true` does the same as default `undefined`.
   *
   * Default: `undefined`
   */
  internalClass?: string | boolean
  innerRef?: React.RefObject<HTMLElement> | React.ForwardedRef<unknown>
  children?: React.ReactNode
} & SpacingProps

export type ElementAllProps = ElementProps &
  ElementInternalProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'as'>

type Attributes = Record<string, unknown>

export const defaultProps = {
  skeletonMethod: 'font',
}

const Element = React.forwardRef((props: ElementAllProps, ref) => {
  return <ElementInstance innerRef={ref} {...props} />
})

function ElementInstance(localProps: ElementAllProps) {
  const context = React.useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps, {
    skeleton: context?.skeleton,
  })

  const {
    className,
    internalClass,
    as,
    innerRef,
    skeleton,
    skeletonMethod,
    ...rest
  } = props

  const Tag = as
  const attributes = rest as Attributes

  const tagClass =
    internalClass === false
      ? ''
      : (internalClass === true ? undefined : internalClass) ||
        (typeof Tag === 'string' ? `dnb-${Tag}` : '')

  const internalClassName = classnames(
    !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) && tagClass,
    className,
    createSkeletonClass(skeletonMethod, skeleton, context),
    createSpacingClasses(
      attributes,
      typeof Tag === 'string' ? `dnb-${Tag}` : null
    )
  )

  validateDOMAttributes(null, attributes)

  skeletonDOMAttributes(attributes, skeleton, context)

  if (typeof Tag !== 'function' && innerRef) {
    attributes.ref = innerRef
  }

  return <Tag className={internalClassName} {...attributes} />
}

export default Element
