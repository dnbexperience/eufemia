/**
 * Web Space Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  isTrue,
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context, { ContextProps } from '../../shared/Context'
import { spacingPropTypes } from './SpacingHelper'
import { createSpacingClasses, isInline } from './SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import Section from '../section/Section'

import type { DynamicElement, SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'

export { spacingPropTypes }

export type SpaceProps = {
  /**
   * Defines the HTML element used.
   * Default: div
   */
  element?: DynamicElement

  /**
   * If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.
   * Default: false
   */
  inline?: boolean

  /**
   * If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline={true}` in combination.
   * Default: false
   */
  no_collapse?: boolean

  /**
   * If set to `true`, then the space element will be 100% in `width`.
   * Default: false
   */
  stretch?: boolean

  /**
   * If set to `true`, a loading skeleton will be shown.
   * Default: false
   */
  skeleton?: SkeletonShow

  /**
   * Send along a custom React Ref.
   * Default: null
   */
  innerRef?: React.RefObject<HTMLElement>
} & SpacingProps

export type SpaceAllProps = SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

const defaultProps = {}

export default function Space(localProps: SpaceAllProps) {
  const context = React.useContext<ContextProps & SpacingProps>(Context)

  // consume the space context
  const props = context.space
    ? // use only the props from context, who are available here anyway
      extendPropsWithContext(
        localProps,
        defaultProps,
        { space: context.space },
        { skeleton: context?.skeleton }
      )
    : localProps

  const {
    element = 'div',
    inline,
    no_collapse,
    top,
    right,
    bottom,
    left,
    space,
    stretch,
    skeleton,
    innerRef,
    className,
    children,

    ...attributes
  } = props

  const params = {
    className: classnames(
      'dnb-space',
      isTrue(stretch) && 'dnb-space--stretch',
      isTrue(inline) && 'dnb-space--inline',
      createSkeletonClass(null, skeleton), // do not send along context
      createSpacingClasses({ top, right, bottom, left, space }),
      className
    ),
    ...attributes,
  }

  skeletonDOMAttributes(params, skeleton) // do not send along context

  return (
    <Element
      element={element}
      no_collapse={no_collapse}
      innerRef={innerRef}
      {...params}
    >
      {children}
    </Element>
  )
}

Space._supportsSpacingProps = true

function Element({
  element,
  no_collapse,
  children,
  innerRef,
  ...props
}: SpaceAllProps) {
  const ElementDynamic = element as DynamicElement<any>
  let component: React.ReactElement = null

  if (ElementDynamic === Section) {
    component = (
      <ElementDynamic {...props} inner_ref={innerRef}>
        {children}
      </ElementDynamic>
    )
  } else {
    // also used for code markup simulation
    validateDOMAttributes({}, props)

    component = (
      <ElementDynamic {...props} ref={innerRef}>
        {children}
      </ElementDynamic>
    )
  }

  if (isTrue(no_collapse)) {
    const R =
      ElementDynamic === 'span' || isInline(element as string)
        ? 'span'
        : 'div'
    return (
      <R
        className={classnames(
          'dnb-space--no-collapse',
          isInline(element as string) && 'dnb-space--inline'
        )}
      >
        {component}
      </R>
    )
  }

  return component
}
