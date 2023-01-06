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
import {
  createSkeletonClass,
  skeletonDOMAttributes,
  SkeletonMethods,
} from '../components/skeleton/SkeletonHelper'
import { includeValidProps } from '../components/form-row/FormRowHelpers'

import type { DynamicElement, SpacingProps } from '../shared/types'

export type ElementIsType = string | React.ReactNode // | DynamicElement

export type ElementInternalProps = {
  /**
   * Defines the Element Type, like "div"
   */
  as: ElementIsType
}

export type ElementProps = {
  skeleton?: boolean
  skeletonMethod?: SkeletonMethods
  internalClass?: string
  innerRef?: React.RefObject<HTMLElement> | React.ForwardedRef<unknown>
  children?: React.ReactNode
} & SpacingProps

export type ElementAllProps = ElementProps &
  ElementInternalProps &
  React.HTMLProps<HTMLElement>

type Attributes = Record<string, unknown>

export const defaultProps = {
  skeletonMethod: 'font',
}

const Element = React.forwardRef((props: ElementAllProps, ref) => {
  return <ElementInstance innerRef={ref} {...props} />
})

function ElementInstance(localProps: ElementAllProps) {
  const context = React.useContext(Context)
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    includeValidProps(context?.FormRow)
  )

  const {
    className,
    internalClass,
    as,
    innerRef,
    skeleton,
    skeletonMethod,
    ...rest
  } = props

  const Tag = as as DynamicElement
  const attributes = rest as Attributes

  const tagClass =
    internalClass || (typeof Tag === 'string' ? `dnb-${Tag}` : '')
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
