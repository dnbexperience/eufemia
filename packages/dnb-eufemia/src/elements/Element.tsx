/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */

import { Fragment, useContext } from 'react'
import type { HTMLProps, ReactNode, Ref, RefObject } from 'react'
import clsx from 'clsx'
import Context from '../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../shared/component-helper'
import { useSpacing } from '../components/space/SpacingUtils'
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
  ref?: RefObject<HTMLElement> | Ref<unknown>
  children?: ReactNode
} & SpacingProps

export type ElementAllProps = ElementProps &
  ElementInternalProps &
  Omit<HTMLProps<HTMLElement>, 'ref' | 'as'>

type Attributes = Record<string, unknown>

export const defaultProps = {
  skeletonMethod: 'font',
}

function Element(localProps: ElementAllProps) {
  const context = useContext(Context)
  const props = extendPropsWithContext(localProps, defaultProps, {
    skeleton: context?.skeleton,
  })

  const {
    className,
    internalClass,
    as,
    ref,
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

  const internalClassName = clsx(
    !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) && tagClass,
    className,
    createSkeletonClass(skeletonMethod, skeleton, context)
  )

  // useSpacing must be called before validateDOMAttributes
  // because the validator removes non-DOM attributes like spacing props
  const params = useSpacing(
    attributes,
    { ...attributes, className: internalClassName },
    typeof Tag === 'string' ? `dnb-${Tag}` : null
  )

  validateDOMAttributes(null, params)

  skeletonDOMAttributes(params, skeleton, context)

  const isFragment = Tag === Fragment

  if (!isFragment && ref) {
    ;(params as Record<string, unknown>).ref = ref
  }

  if (isFragment) {
    return <>{(params as Record<string, unknown>).children as ReactNode}</>
  }

  return <Tag {...params} />
}

export default Element
