/**
 * Web Space Component
 *
 */

import React from 'react'
import clsx from 'clsx'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import type { ContextProps } from '../../shared/Context'
import Context from '../../shared/Context'
import {
  createSpacingClasses,
  createSpacingProperties,
  isInline,
} from './SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import type {
  DynamicElement,
  DynamicElementParams,
  SpacingProps,
} from '../../shared/types'
import type { SkeletonShow } from '../Skeleton'
import type { InnerSpaceType } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
  noCollapse?: boolean

  /**
   * If set to `true`, then the space element will be 100% in width.
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
  ref?: React.Ref<HTMLElement>
} & Omit<SpacingProps, 'innerSpace'> & { innerSpace?: InnerSpaceType }

export type SpaceAllProps = SpaceProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

const defaultProps: Partial<SpaceAllProps> = {}

function SpaceInstance(localProps: SpaceAllProps) {
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
    noCollapse,
    top,
    right,
    bottom,
    left,
    style,
    space,
    innerSpace,
    stretch,
    skeleton,
    ref,
    className,
    children,

    ...attributes
  } = props

  const params = {
    className: clsx(
      'dnb-space',
      stretch && 'dnb-space--stretch',
      inline && 'dnb-space--inline',
      createSkeletonClass(null, skeleton), // do not send along context
      createSpacingClasses({ top, right, bottom, left, space }),
      className
    ),
    ...attributes,
  }

  const styleObj = {
    ...style,
    ...createSpacingProperties(props),
  } as React.CSSProperties

  skeletonDOMAttributes(params, skeleton) // do not send along context

  return (
    <SpaceElement
      element={element}
      noCollapse={noCollapse}
      ref={ref}
      style={styleObj}
      {...params}
    >
      {children}
    </SpaceElement>
  )
}

function Space(props: SpaceAllProps) {
  return <SpaceInstance {...props} />
}

withComponentMarkers(Space, { _supportsSpacingProps: true })

export default Space

function SpaceElement({
  element,
  noCollapse,
  children,
  ref,
  ...props
}: SpaceAllProps) {
  const ElementDynamic = element

  if (typeof element === 'string') {
    // also used for code markup simulation
    validateDOMAttributes({}, props)
  }
  ;(props as Record<string, unknown>)['ref'] = ref

  const component = (
    <ElementDynamic {...(props as DynamicElementParams)}>
      {children}
    </ElementDynamic>
  )

  if (noCollapse) {
    const R =
      ElementDynamic === 'span' || isInline(element as string)
        ? 'span'
        : 'div'
    return (
      <R
        className={clsx(
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
