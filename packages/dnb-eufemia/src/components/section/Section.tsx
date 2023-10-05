/**
 * Web Section Component
 *
 */

import React, { useMemo } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import type { DynamicElement, SpacingProps } from '../../shared/types'
import useMedia, { UseMediaQueries } from '../../shared/useMedia'
import {
  createPaddingClasses,
  PaddingProps,
} from './responsivePaddingUtils'

export type SectionVariants = 'error' | 'info' | 'warning' | 'success'

export type SectionLayouts = 'full-width' | 'block'

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

type SpacingValue =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

type DynamicSpacingValue = 'xx-large' | 'x-large' | 'large' | 'medium'

//type ResponsiveSpacing = Record<'small' | 'medium' | 'large', SpacingValue>
type ResponsiveSpacing = {
  small?: SpacingValue
  medium?: SpacingValue
  large?: SpacingValue
}

export type SectionSpacing = boolean | SpacingValue | ResponsiveSpacing

export type DynamicSectionSpacing = boolean | DynamicSpacingValue

/*

spacing="large" -> "large" padding uansett

dynamic_spacing="large" -> Autmatiske breakpoint-verdier (f.eks "large" på stor skjerm, "medium" på middels og "small" på listne)

spacing={{
  small: 'xx-small',
  medium: 'small',
  large: 'medium',
}}

*/

export type SectionProps = {
  /**
   * Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type prop
   */
  variant?: SectionVariants | string

  /**
   * The outer layout of the section, controlling how it places itself or looks in the viewport.
   */
  layout?: SectionLayouts | string

  /**
   * To define the style of the visual helper. Use and `Style ID` from below. Defaults to `mint-green-12`.
   */
  style_type?: SectionStyleTypes | string

  /**
   * Will add spacing around the given content. If `true`, then `large` is used. See the [available sizes](/uilib/usage/layout/spacing#spacing-helpers). Defaults to `false`.
   */
  spacing?: SectionSpacing

  dynamic_spacing?: DynamicSectionSpacing

  // spacing_large?: SpacingValue
  // spacing_medium?: SpacingValue
  // spacing_small?: SpacingValue

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
  PaddingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

const defaultProps = {
  element: 'section',
  layout: 'full-width',
}

const defaultSpacing: SpacingValue = 'large'
const defaultDynamicSpacing: DynamicSpacingValue = 'large'

const dynamicSpacingMap: Record<
  DynamicSpacingValue,
  Record<keyof UseMediaQueries, SpacingValue>
> = {
  'xx-large': {
    large: 'xx-large',
    medium: 'large',
    small: 'medium',
  },
  'x-large': {
    large: 'x-large',
    medium: 'large',
    small: 'medium',
  },
  large: {
    large: 'large',
    medium: 'medium',
    small: 'small',
  },
  medium: {
    large: 'medium',
    medium: 'small',
    small: 'x-small',
  },
}

export default function Section(localProps: SectionAllProps) {
  const context = React.useContext(Context)
  const media = useMedia()
  const { isSmall, isMedium, isLarge, key } = media

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Section
  )

  const {
    element,
    variant,
    layout,
    style_type,
    spacing: spacingProp,
    dynamic_spacing,
    // spacing_large,
    // spacing_medium,
    // spacing_small,
    inner_ref,
    className,
    children,
    ...attributes
  } = props

  /*const spacing: SpacingValue = useMemo(() => {
    // Dynamic spacing
    if (isTrue(dynamic_spacing)) {
      return dynamicSpacingMap[defaultDynamicSpacing][key]
    } else if (
      typeof dynamic_spacing === 'string' &&
      dynamic_spacing in dynamicSpacingMap
    ) {
      return dynamicSpacingMap[dynamic_spacing][key]
    }

    // Custom dynamic spacing
    if (isSmall && spacing_small !== undefined) {
      return spacing_small
    }
    if (isMedium && spacing_medium !== undefined) {
      return spacing_medium
    }
    if (isLarge && spacing_large !== undefined) {
      return spacing_large
    }

    // Fixed spacing
    if (isTrue(spacingProp)) {
      return defaultSpacing
    }
    return spacingProp as SpacingValue
  }, [
    key,
    dynamic_spacing,
    isSmall,
    isMedium,
    isLarge,
    spacingProp,
    // spacing_small,
    // spacing_medium,
    // spacing_large,
  ])*/

  const params = {
    className: classnames(
      'dnb-section',
      `dnb-section--${variant ? variant : style_type || 'default'}`,
      //spacing && `dnb-section--spacing-${spacing}`,
      layout && `dnb-section--layout-${layout}`,
      createSpacingClasses(props),
      createPaddingClasses('dnb-section', {
        padding: spacingProp,
        dynamic_padding: dynamic_spacing,
      }),
      className
    ),
    ...(attributes as Record<string, unknown>),
  }

  const internalRef = React.useRef<HTMLElement>()
  const elementRef = inner_ref || internalRef
  params['ref'] = elementRef

  validateDOMAttributes(props, params)

  const Element = element || 'section'

  return (
    <Element {...params}>
      PADDING: {JSON.stringify(spacingProp)}
      <br />
      Dynamic spacing: {JSON.stringify(dynamic_spacing)}
      <br />
      {children}
    </Element>
  )
}

Section._supportsSpacingProps = true
