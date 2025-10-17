/**
 * Web Section Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  DynamicElement,
  ResponsiveProp,
  SpacingProps,
} from '../../shared/types'
import Space from '../space/Space'
import { getColor } from '../../shared/helpers'

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

export type TextColor = string
export type OutlineColor = string | boolean
export type BackgroundColor = string
export type DropShadow = boolean
export type RoundedCorner = boolean | [boolean, boolean, boolean, boolean]

export type SectionProps = {
  /**
   * Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type prop
   */
  variant?: SectionVariants | string

  /**
   * Define if the background color should break-out to a fullscreen view. Defaults to `true`.
   */
  breakout?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the Card should break out negatively on larger screens. You cannot use `breakout` and `outset` together.
   * Defaults to `false`
   */
  outset?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the section should have rounded corners. Defaults to `false`.
   */
  roundedCorner?: RoundedCorner | ResponsiveProp<RoundedCorner>

  /**
   * Define a custom border color. Use a Eufemia color.
   */
  outline?: OutlineColor | ResponsiveProp<OutlineColor>

  /**
   * Define a custom border width. Defaults to `var(--card-outline-width)`.
   */
  outlineWidth?: number | string | ResponsiveProp<number | string>

  /**
   * Define a custom text color to compliment the backgroundColor. Use a Eufemia color.
   */
  textColor?: TextColor | ResponsiveProp<TextColor>

  /**
   * Define a custom background color, instead of a variant. Use a Eufemia color.
   */
  backgroundColor?: BackgroundColor | ResponsiveProp<BackgroundColor>

  /**
   * Define a custom drop-shadow.
   */
  dropShadow?: DropShadow | ResponsiveProp<DropShadow>

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: DynamicElement

  /**
   * Define a React.Ref.
   */
  innerRef?: React.RefObject<HTMLElement>

  /**
   * @deprecated in v11 use "background" prop instead
   */
  style_type?: SectionStyleTypes | string
}

export type SectionAllProps = SectionProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>

type SectionReturnParams = Record<string, unknown> & {
  className: string
  innerRef: React.RefObject<HTMLElement>
  children: React.ReactNode
  style: React.CSSProperties
}

const defaultProps = {
  element: 'section',
}

export default function Section(localProps: SectionAllProps) {
  return <Space {...SectionParams(localProps)} />
}

export function SectionParams(
  localProps: SectionAllProps
): SectionReturnParams {
  const context = React.useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Section
  )

  const {
    variant,
    breakout = !props.outset,
    outset,
    roundedCorner,
    textColor,
    backgroundColor,
    dropShadow,
    outline,
    outlineWidth = typeof props.outline === 'undefined' &&
    typeof props.outlineWidth === 'undefined'
      ? 'none'
      : props.outlineWidth,
    innerRef,

    className,
    children,

    style_type,

    ...attributes
  } = props

  const internalRef = React.useRef<HTMLElement>()
  const elementRef = innerRef || internalRef

  return Object.freeze({
    ...attributes,
    className: classnames(
      'dnb-section',
      `dnb-section--${variant ? variant : style_type || 'default'}`,
      className
    ),
    style: {
      ...computeStyle(
        breakout,
        'breakout',
        (value) => `var(--breakout--${value ? 'on' : 'off'})`
      ),
      ...computeStyle(outset, 'outset', (value) => (value ? '1' : '0')),
      ...computeStyle(roundedCorner, 'rounded-corner', (value) =>
        typeof value === 'boolean'
          ? value && 'var(--rounded-corner--value)'
          : value
              .map((v) => (v ? 'var(--rounded-corner--value)' : '0'))
              .join(' ')
      ),
      ...computeStyle(textColor, 'text-color', (value) => getColor(value)),
      ...computeStyle(backgroundColor, 'background-color', (value) =>
        getColor(value)
      ),
      ...computeStyle(
        dropShadow,
        'drop-shadow',
        (value) => value && 'var(--shadow-default)'
      ),
      ...computeStyle(outline, 'outline-color', (value) =>
        typeof value === 'boolean'
          ? value && 'var(--outline-color--value)'
          : getColor(value)
      ),
      ...computeStyle(outlineWidth, 'outline-width', (value) =>
        typeof value === 'number' ? `${value}px` : value
      ),
      ...attributes?.style,
    } as React.CSSProperties,
    innerRef: elementRef,
    children,
  })
}

function computeStyle<T extends boolean | string | number | boolean[]>(
  property: T | ResponsiveProp<T>,
  name: string,
  valueCallback: (value: T) => string | undefined
) {
  let media = property as ResponsiveProp<T>

  if (
    media !== null &&
    (Array.isArray(media) || typeof media !== 'object')
  ) {
    media = {
      small: property,
      medium: property,
      large: property,
    } as ResponsiveProp<T>
  }

  const result = {}

  for (const size in media as ResponsiveProp<T>) {
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
