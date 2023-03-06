/**
 * Web Section Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { DynamicElement, SpacingProps } from '../../shared/types'

export type SectionStyleTypes =
  | 'divider'
  | 'white'
  | 'transparent'
  | 'lavender'
  | 'pistachio'
  | 'emerald-green'
  | 'sea-green'
  | 'fire-red'
  | 'fire-red-8'
  | 'sand-yellow'
  | 'black-3'
  | 'mint-green'
  | 'mint-green-12'

export type SectionSpacing =
  | boolean
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type SectionProps = {
  /**
   * To define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.
   */
  style_type?: SectionStyleTypes | string

  /**
   * Will add spacing around the given content. If `true`, then `large` is used. Se the [available sizes](/uilib/usage/layout/spacing#spacing-helpers). Defaults to `false`.
   */
  spacing?: SectionSpacing

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: DynamicElement

  inner_ref?: React.RefObject<HTMLElement>
  className?: string
  children?: React.ReactNode
}

export type SectionAllProps = SectionProps &
  SpacingProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {
  element: 'section',
}

export default function Section(localProps: SectionAllProps) {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Section
  )

  const {
    element,
    style_type,
    spacing,
    inner_ref,

    className,
    children,

    ...attributes
  } = props

  const params = {
    className: classnames(
      'dnb-section',
      `dnb-section--${style_type || 'mint-green-12'}`,
      spacing &&
        `dnb-section--spacing-${isTrue(spacing) ? 'large' : spacing}`,
      createSpacingClasses(props),
      className
    ),
    ...(attributes as Record<string, unknown>),
  }

  const internalRef = React.useRef<HTMLElement>()
  const elementRef = inner_ref || internalRef
  params['ref'] = elementRef

  validateDOMAttributes(props, params)

  const Element = element || 'section'

  return <Element {...params}>{children}</Element>
}
