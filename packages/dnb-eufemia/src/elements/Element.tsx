/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../shared/Context'
import { validateDOMAttributes } from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
  SkeletonMethods,
} from '../components/skeleton/SkeletonHelper'
import usePropsWithContext from '../shared/hooks/usePropsWithContext'
import { includeValidProps } from '../components/form-row/FormRowHelpers'

export type ElementProps = {
  is: React.ReactNode
  skeleton?: boolean
  skeletonMethod?: SkeletonMethods
  class?: string
  className?: string
  internalClass?: string
  css?: string
  children?: React.ReactNode
  innerRef?: React.ForwardedRef<unknown>

  /** @deprecated use innerRef instead */
  inner_ref?: React.ForwardedRef<unknown>

  /** @deprecated use skeletonMethod instead */
  skeleton_method?: SkeletonMethods
}

type Attributes = Record<string, unknown>

export const defaultProps = {
  skeletonMethod: 'font',
}

const Element = React.forwardRef((props: ElementProps, ref) => {
  return <ElementInstance innerRef={ref} {...props} />
})

function ElementInstance(localProps: ElementProps) {
  const context = React.useContext(Context)
  const props = usePropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    includeValidProps(context?.FormRow)
  )

  // deprecated
  if (typeof props.inner_ref !== 'undefined') {
    props.innerRef = props.inner_ref
    delete props.inner_ref
  }
  // deprecated
  if (typeof props.skeleton_method !== 'undefined') {
    props.skeletonMethod = props.skeleton_method
    delete props.skeleton_method
  }

  const {
    className, // eslint-disable-line
    class: _className, // eslint-disable-line
    internalClass, // eslint-disable-line
    css, // eslint-disable-line
    is, // eslint-disable-line
    innerRef, // eslint-disable-line
    skeleton, // eslint-disable-line
    skeletonMethod, // eslint-disable-line

    ...attributes
  }: ElementProps & Attributes = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = is as any

  const tagClass =
    internalClass || (typeof Tag === 'string' ? `dnb-${Tag}` : '')
  const internalClassName = classnames(
    !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) && tagClass,
    className,
    _className,
    css,
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
