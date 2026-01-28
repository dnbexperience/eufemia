/**
 * Web Logo Component
 */

import React, { useContext, useMemo } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { DnbDefault } from './LogoSvg'
import type { UseThemeReturn } from '../../shared/useTheme'

import type { IconColor } from '../Icon'
import type { SpacingProps } from '../space/types'
import type { LogoSvgComponent } from './LogoSvg'

// Re-export SVG components and alt texts for convenience
export * from './LogoSvg'

export type LogoWidth = string
export type LogoHeight = string

export type SvgComponent =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ReactElement<React.SVGProps<SVGSVGElement>>

export type CustomLogoSvg = LogoSvgComponent | SvgComponent
export type Svg =
  | CustomLogoSvg
  | ((theme: UseThemeReturn) => CustomLogoSvg)

export type LogoProps = {
  /**
   * Define the width of the logo.
   */
  width?: LogoWidth
  /**
   * Define the height of the logo.
   */
  height?: LogoHeight
  /**
   * Define the color of the logo.
   */
  color?: IconColor
  /**
   * Set to `true`to inherit the color with `currentColor`. Defaults to `false`.
   */
  inheritColor?: boolean
  /**
   * Set to `true` if you want the logo to inherit the parent `height`. Defaults to `false`.
   */
  inheritSize?: boolean
  /**
   * Provide a custom SVG to render instead of the built-in logos.
   * Can be a React component (receives standard SVG props), a React element, or a function that receives the theme and returns a SVG component.
   */
  svg?: Svg
} & SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size'>

const defaultProps: Partial<LogoProps> = {
  inheritSize: false,
}

function Logo(localProps: LogoProps) {
  const context = useContext(Context)

  const props = extendPropsWithContext(
    localProps,
    defaultProps,
    context.Logo
  )

  const {
    width,
    inheritSize,
    height,
    color,
    inheritColor,
    className: classNameProp,
    svg: svgProp = DnbDefault, // Default to DNB logo if no svg provided
    ...rest
  } = props

  // If svg is a function, call it with a sanitized theme (omit DOM-irrelevant keys)
  const theme = useMemo(() => {
    if (!context?.theme) {
      return null
    }
    const { name, size } = context.theme
    return {
      name,
      size,
      isUi: name === 'ui',
      isSbanken: name === 'sbanken',
      isEiendom: name === 'eiendom',
      isCarnegie: name === 'carnegie',
    }
  }, [context?.theme])

  const svg = useMemo(() => {
    if (Object.hasOwn(svgProp, 'brand')) {
      return svgProp as LogoSvgComponent
    }
    if (theme && typeof svgProp === 'function' && svgProp.length === 1) {
      return (svgProp as (theme: UseThemeReturn) => CustomLogoSvg)(theme)
    }
    return svgProp as SvgComponent
  }, [svgProp, theme])

  // Alt text for the logo does not need to be translated. DNB alt will be the same in English.
  const altText = useMemo(() => {
    const alt = svg?.['alt']
    if (alt) {
      return alt as string
    }
    return 'logo'
  }, [svg])

  const sharedClasses = clsx(classNameProp, createSpacingClasses(props))

  const detectedBrand = useMemo(() => {
    if (Object.hasOwn(svg, 'brand')) {
      const brand = (svg as LogoSvgComponent).brand
      return brand
    }

    return theme?.name || 'ui'
  }, [svg, theme])

  const className = useMemo(() => {
    return clsx(
      'dnb-logo',
      `dnb-logo--${detectedBrand}`,
      sharedClasses,
      (parseFloat(width) > 0 || parseFloat(height) > 0) &&
        `dnb-logo--has-size`,
      inheritSize && `dnb-logo--inherit-size`,
      inheritColor && `dnb-logo--inherit-color`
    )
  }, [
    detectedBrand,
    sharedClasses,
    width,
    height,
    inheritSize,
    inheritColor,
  ])

  const rootParams = {
    role: 'img',
    'aria-hidden': true,
    className,
    alt: altText,
    ...rest,
  }

  const svgParams = useMemo(() => {
    return {
      width,
      height,
      color,
      alt: altText,
    }
  }, [altText, color, height, width])

  const remainingDOMProps = validateDOMAttributes(props, rootParams)

  return (
    <span {...remainingDOMProps}>
      {renderCustomSvg(svg, svgParams, theme)}
    </span>
  )
}

function renderCustomSvg(
  SvgComponent:
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | React.ReactElement<React.SVGProps<SVGSVGElement>>,
  svgParams: React.SVGProps<SVGSVGElement> & { alt: string },
  theme: UseThemeReturn
) {
  if (React.isValidElement(SvgComponent)) {
    const allowedProps: Record<string, unknown> = {}
    if (theme) {
      for (const key in SvgComponent.props) {
        if (!(key in theme)) {
          allowedProps[key] = SvgComponent.props[key]
        }
      }
    }

    return React.createElement(SvgComponent.type, {
      ...allowedProps,
      ...svgParams,
    })
  }

  return <SvgComponent {...svgParams} />
}

export default Logo
