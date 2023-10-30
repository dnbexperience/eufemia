/**
 * Web Section Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  extendPropsWithContext,
} from '../../shared/component-helper'
import type {
  DynamicElement,
  ResponsiveProp,
  SpacingProps,
} from '../../shared/types'
import Space from '../space/Space'

export type SectionVariants = 'error' | 'info' | 'warning' | 'success'

export type SectionStyleTypes =
  | 'divider'
  | 'white'
  | 'transparent'

  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'lavender'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'pistachio'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'emerald-green'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'sea-green'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'fire-red'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'fire-red-8'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'sand-yellow'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'black-3'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'mint-green'
  /** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
  | 'mint-green-12'

export type SectionSpacing =
  | boolean
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type TextColor = string
export type OutlineColor = string | boolean
export type BackgroundColor = string

export type SectionProps = {
  /**
   * Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type prop
   */
  variant?: SectionVariants | string

  /**
   * Define if the background color should break-out to a fullscreen view. Defualts to `true`.
   */
  breakout?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the section should have rounded corners. Defualts to `false`.
   */
  roundedCorner?: boolean | ResponsiveProp<boolean>

  /**
   * Define a custom border color. Use a Eufemia color.
   */
  outline?: OutlineColor | ResponsiveProp<OutlineColor>

  /**
   * Define a custom text color to compliment the backgroundColor. Use a Eufemia color.
   */
  textColor?: TextColor | ResponsiveProp<TextColor>

  /**
   * Define a custom background color, instead of a variant. Use a Eufemia color.
   */
  backgroundColor?: BackgroundColor | ResponsiveProp<BackgroundColor>

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: DynamicElement

  /**
   * Define a React.Ref.
   */
  innerRef?: React.RefObject<HTMLElement>

  /**
   * @deprecated in v11 use "innerSpace" prop instead */
  spacing?: SectionSpacing | ResponsiveProp<SectionSpacing>
  /**
   * @deprecated in v11 use "background" prop instead */
  style_type?: SectionStyleTypes | string
  /**
   * @deprecated in v11 use "innerRef" prop instead */
  inner_ref?: React.RefObject<HTMLElement>
}

export type SectionAllProps = SectionProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

type Attributes = Record<string, unknown> & { style?: React.CSSProperties }

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
    breakout = true,
    roundedCorner,
    textColor,
    backgroundColor,
    outline,
    innerRef,

    className,
    children,

    spacing,
    style_type,
    inner_ref,

    ...attributes
  } = props

  const params = {
    className: classnames(
      'dnb-section',
      `dnb-section--${variant ? variant : style_type || 'default'}`,
      spacing &&
        `dnb-section--spacing-${isTrue(spacing) ? 'large' : spacing}`,
      className
    ),
    ...attributes,
  } as Attributes

  const internalRef = React.useRef<HTMLElement>()
  const elementRef = innerRef || inner_ref || internalRef
  params.innerRef = elementRef

  const styleObj = {
    ...computeStyle(
      breakout,
      'breakout',
      (value) => `var(--breakout--${value ? 'on' : 'off'})`
    ),
    ...computeStyle(
      roundedCorner,
      'rounded-corner',
      (value) => value && 'var(--rounded-corner--value)'
    ),
    ...computeStyle(textColor, 'text-color', (value) => getColor(value)),
    ...computeStyle(backgroundColor, 'background-color', (value) =>
      getColor(value)
    ),
    ...computeStyle(outline, 'outline-color', (value) =>
      String(value) === 'true'
        ? 'var(--outline-color--value)'
        : getColor(value)
    ),
    ...params?.style,
  } as React.CSSProperties

  return (
    <Space {...params} element={element} style={styleObj}>
      {children}
    </Space>
  )
}

function getColor(value: string) {
  return value
    ? !/#|var/.test(value)
      ? `var(--color-${value})`
      : value
    : undefined
}

function computeStyle(
  property: ResponsiveProp<unknown> | boolean | string,
  name: string,
  valueCallback: (value: string) => string | undefined
) {
  let media = property as ResponsiveProp<unknown>

  if (media !== null && typeof media !== 'object') {
    media = {
      small: property,
      medium: property,
      large: property,
    } as ResponsiveProp<unknown>
  }

  const result = {}

  for (const size in media as ResponsiveProp<unknown>) {
    if (typeof media?.[size] !== 'undefined') {
      const value = valueCallback(media?.[size])
      if (typeof value === 'string') {
        result[`--${name}--${size}`] = value
      }
    }
  }

  return result
}

Section._name = 'Section'
Section._supportsSpacingProps = true
