/**
 * Web FormLabel Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  isTrue,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import { omitSpacingProps } from '../flex/utils'
import Context from '../../shared/Context'
import type {
  DynamicElement,
  DynamicElementParams,
  SpacingProps,
} from '../../shared/types'

export type FormLabelProps = {
  forId?: string
  element?: DynamicElement<HTMLLabelElement>
  text?: React.ReactNode
  size?: 'basis' | 'medium' | 'large'
  id?: string
  skeleton?: boolean
  label?: React.ReactNode
  vertical?: boolean
  srOnly?: boolean
  innerRef?: React.RefObject<HTMLElement>

  /** Is not a part of HTMLLabelElement and not documented as of now */
  disabled?: boolean

  /** @deprecated use forId instead */
  for_id?: string
  /** @deprecated use srOnly instead */
  sr_only?: boolean
  /** @deprecated use labelDirection instead (was not documented before) */
  label_direction?: 'vertical' | 'horizontal'
}

export type FormLabelAllProps = FormLabelProps &
  React.HTMLAttributes<HTMLLabelElement> &
  SpacingProps

export default function FormLabel(localProps: FormLabelAllProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    null,
    { skeleton: context?.skeleton },
    pickFormElementProps(context?.FormRow), // Deprecated – can be removed in v11
    pickFormElementProps(context?.formElement),
    context?.FormLabel
  )

  const {
    forId,
    text,
    srOnly,
    vertical,
    size,
    skeleton,
    element: Element = 'label',
    innerRef,
    className,
    children,

    /** @deprecated can be removed in v11 */
    for_id,
    sr_only,
    label_direction,

    ...attributes
  } = props

  const content = text || children

  const isInteractive =
    !props.disabled &&
    !srOnly &&
    (typeof props.onClick === 'function' || forId || for_id)

  const params = {
    className: classnames(
      'dnb-form-label',
      (isTrue(vertical) || label_direction === 'vertical') &&
        `dnb-form-label--vertical`,
      (srOnly || isTrue(sr_only)) && 'dnb-sr-only',
      size && `dnb-h--${size}`,
      isInteractive && 'dnb-form-label--interactive',
      createSkeletonClass('font', skeleton, context),
      createSpacingClasses(
        content ? { right: 'small', ...props } : omitSpacingProps(props)
      ),
      className
    ),
    htmlFor: forId || for_id,
    ...(attributes as DynamicElementParams),
  }

  params['ref'] = innerRef

  skeletonDOMAttributes(params, skeleton, context)
  validateDOMAttributes(localProps, params)

  return <Element {...params}>{content}</Element>
}

FormLabel._formElement = true
FormLabel._supportsSpacingProps = true
