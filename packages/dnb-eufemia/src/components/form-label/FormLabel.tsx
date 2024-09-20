/**
 * Web FormLabel Component
 *
 */

import React, { useEffect, useRef } from 'react'
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
import {
  FormElementProps,
  pickFormElementProps,
} from '../../shared/helpers/filterValidProps'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import { omitSpacingProps } from '../flex/utils'
import Context from '../../shared/Context'
import type {
  DynamicElement,
  DynamicElementParams,
  SpacingProps,
} from '../../shared/types'
import { FieldHelpProps } from '../../extensions/forms'
import HelpButton from '../HelpButton'

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

  /**
   * For internal use only
   */
  labelDirection?: FormElementProps['labelDirection']

  /** @deprecated use forId instead */
  for_id?: string
  /** @deprecated use srOnly instead */
  sr_only?: boolean
  /** @deprecated use "vertical" (or "labelDirection" for internal use) instead (was not documented before) */
  label_direction?: FormElementProps['label_direction']
} & FieldHelpProps

export type FormLabelAllProps = FormLabelProps &
  React.HTMLAttributes<HTMLLabelElement> &
  SpacingProps

export default function FormLabel(localProps: FormLabelAllProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = convertSnakeCaseProps(
    extendPropsWithContext(
      localProps,
      null,
      { skeleton: context?.skeleton },
      pickFormElementProps(context?.FormRow), // Deprecated – can be removed in v11
      pickFormElementProps(context?.formElement),
      context?.FormLabel
    )
  )

  const nestedContent = props?.text || props?.children
  const nestedNode =
    nestedContent?.['type'] === FormLabel ? nestedContent?.['type'] : null
  const nestedElement = nestedNode
    ? () => React.createElement(nestedNode, nestedContent['props'])
    : null

  const {
    forId,
    text,
    srOnly,
    vertical,
    labelDirection,
    size,
    skeleton,
    element: Element = nestedElement || 'label',
    innerRef,
    className,
    children,
    help,
    ...attributes
  } = props

  const content = text || children

  const isInteractive = Boolean(
    !props.disabled &&
      !srOnly &&
      (typeof props.onClick === 'function' || forId)
  )

  const isVertical = isTrue(vertical) || labelDirection === 'vertical'

  const params = {
    className: classnames(
      'dnb-form-label',
      isVertical && `dnb-form-label--vertical`,
      srOnly && 'dnb-sr-only',
      size && `dnb-h--${size}`,
      isInteractive && 'dnb-form-label--interactive',
      help && `dnb-form-label--has-help`,
      createSkeletonClass('font', skeleton, context),
      createSpacingClasses(
        content ? { right: 'small', ...props } : omitSpacingProps(props)
      ),
      className
    ),
    htmlFor: forId,
    ...(attributes as DynamicElementParams),
  }

  const labelRef = useRef<HTMLLabelElement>(null)
  const ref = innerRef || labelRef
  if (!nestedNode) {
    params['ref'] = ref
  }

  useEffect(() => {
    if (!forId) {
      return
    }

    const forElem = document.querySelector(`#${forId}`)
    const target =
      forElem?.closest('.dnb-input__border--root') ||
      forElem?.closest('.dnb-input__border')

    if (target) {
      const enter = () => target.classList.add('hover')
      const leave = () => target.classList.remove('hover')

      const elem = ref.current
      elem?.addEventListener?.('mouseenter', enter)
      elem?.addEventListener?.('mouseleave', leave)

      return () => {
        elem?.removeEventListener?.('mouseenter', enter)
        elem?.removeEventListener?.('mouseleave', leave)
      }
    }
  }, [forId, ref])

  skeletonDOMAttributes(params, skeleton, context)
  validateDOMAttributes(localProps, params)

  return help ? (
    <>
      <Element {...params}>
        {content}
        <HelpButton
          left="x-small"
          title={help.title}
          displayMethod="inline"
          contentId={help.contentId}
        />
      </Element>
      {help.content && (
        <HelpButton.Content contentId={help.contentId}>
          {help.content}
        </HelpButton.Content>
      )}
    </>
  ) : (
    <Element {...params}>{content}</Element>
  )
}

FormLabel._formElement = true
FormLabel._supportsSpacingProps = true
