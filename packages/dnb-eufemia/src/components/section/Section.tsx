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

export type SectionVariants = 'error' | 'info' | 'warning' | 'success'

export type SectionStyleTypes =
  | 'divider'
  | 'white'
  | 'transparent'

  /** @deprecated in v11 use "variant" prop instead */
  | 'lavender'
  /** @deprecated in v11 use "variant" prop instead */
  | 'pistachio'
  /** @deprecated in v11 use "variant" prop instead */
  | 'emerald-green'
  /** @deprecated in v11 use "variant" prop instead */
  | 'sea-green'
  /** @deprecated in v11 use "variant" prop instead */
  | 'fire-red'
  /** @deprecated in v11 use "variant" prop instead */
  | 'fire-red-8'
  /** @deprecated in v11 use "variant" prop instead */
  | 'sand-yellow'
  /** @deprecated in v11 use "variant" prop instead */
  | 'black-3'
  /** @deprecated in v11 use "variant" prop instead */
  | 'mint-green'
  /** @deprecated in v11 use "variant" prop instead */
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
   * Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type prop
   */
  variant?: SectionVariants | string

  /**
   * To define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.
   */
  style_type?: SectionStyleTypes | string

  /**
   * Will add spacing around the given content. If `true`, then `large` is used. See the [available sizes](/uilib/usage/layout/spacing#spacing-helpers). Defaults to `false`.
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
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

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
    variant,
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
      `dnb-section--${variant ?? (style_type || 'default')}`,
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
