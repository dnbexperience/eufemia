/**
 * Web Section Component
 *
 */

import { useContext, useRef } from 'react'
import type { CSSProperties, HTMLProps, ReactNode, RefObject } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  DynamicElement,
  InnerSpaceType,
  ResponsiveProp,
  SpacingProps,
} from '../../shared/types'
import Space from '../space/Space'
import Theme, { type ThemeSurface } from '../../shared/Theme'
import { getColor } from '../../shared/helpers'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type SectionVariants =
  | 'error'
  | 'information'
  | 'warning'
  | 'success'
  | 'divider'

export type SectionTextColor = string
export type SectionOutlineColor = string | boolean
export type SectionBackgroundColor = string
export type SectionDropShadow = boolean
export type SectionRoundedCorner =
  | boolean
  | [boolean, boolean, boolean, boolean]

export type SectionProps = {
  /**
   * Defines the semantic purpose and subsequently the style of the visual helper.
   */
  variant?: SectionVariants | string

  /**
   * Define if the background color should break-out to a fullscreen view. Defaults to `true`.
   */
  breakout?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the Section should break out negatively on larger screens. You cannot use `breakout` and `outset` together.
   * Defaults to `false`
   */
  outset?: boolean | ResponsiveProp<boolean>

  /**
   * Define if the section should have rounded corners. Defaults to `false`.
   */
  roundedCorner?:
    | SectionRoundedCorner
    | ResponsiveProp<SectionRoundedCorner>

  /**
   * Define a custom border color. Use a Eufemia color.
   */
  outline?: SectionOutlineColor | ResponsiveProp<SectionOutlineColor>

  /**
   * Define a custom border width. Defaults to `var(--card-outline-width)`.
   */
  outlineWidth?: number | string | ResponsiveProp<number | string>

  /**
   * Define a custom text color to complement the backgroundColor. Use a Eufemia color.
   */
  textColor?: SectionTextColor | ResponsiveProp<SectionTextColor>

  /**
   * Define a custom background color, instead of a variant. Use a Eufemia color.
   */
  backgroundColor?:
    | SectionBackgroundColor
    | ResponsiveProp<SectionBackgroundColor>

  /**
   * Use `true` to show the default Eufemia DropShadow. Supports media query breakpoints like `{ small: true }`.
   */
  dropShadow?: SectionDropShadow | ResponsiveProp<SectionDropShadow>

  /**
   * Define the surface color context. When set to `dark`, ondark design tokens will be used for text and outline colors. Use `initial` to reset to the component's default behavior, ignoring any parent surface context.
   */
  surface?: ThemeSurface

  /**
   * Define what HTML element should be used. Defaults to `<section>`.
   */
  element?: DynamicElement

  /**
   * Define a React.Ref.
   */
  ref?: RefObject<HTMLElement>
}

type SectionSpacingProps = Omit<SpacingProps, 'innerSpace'> & {
  innerSpace?: InnerSpaceType
}

export type SectionAllProps = SectionProps &
  SectionSpacingProps &
  Omit<HTMLProps<HTMLElement>, 'ref'>

type SectionReturnParams = Record<string, unknown> & {
  className: string
  ref: RefObject<HTMLElement>
  children: ReactNode
  style: CSSProperties
}

const defaultProps: Partial<SectionAllProps> = {
  element: 'section',
}

function SectionInstance(localProps: SectionAllProps) {
  return <Space {...SectionParams(localProps)} />
}

export default function Section(props: SectionAllProps) {
  return <SectionInstance {...props} />
}

export function SectionParams(
  localProps: SectionAllProps
): SectionReturnParams {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Section,
    { surface: localProps?.surface ?? context?.theme?.surface }
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
    surface,
    ref: refProp,

    className,
    children,

    ...attributes
  } = props

  const internalRef = useRef<HTMLElement>(undefined)
  const elementRef = refProp || internalRef

  return Object.freeze({
    ...attributes,
    className: clsx(
      'dnb-section',
      `dnb-section--${variant ?? surface ?? 'default'}`,
      surface && `dnb-section--surface-${surface}`,
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
    } as CSSProperties,
    ref: elementRef,
    children: surface ? (
      <Theme.Context surface={surface}>{children}</Theme.Context>
    ) : (
      children
    ),
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
withComponentMarkers(Section, { _supportsSpacingProps: true })
