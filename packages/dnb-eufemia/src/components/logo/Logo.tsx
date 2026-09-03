/**
 * Web Logo Component
 */

import { createElement, isValidElement, useContext, useMemo } from 'react'
import type {
  ComponentType,
  HTMLProps,
  ReactElement,
  SVGProps,
} from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'
import { DnbDefault } from './LogoSvg'
import useTheme, { type UseThemeReturn } from '../../shared/useTheme'

import type { IconColor } from '../Icon'
import type { SpacingProps } from '../../shared/types'
import type { LogoSvgComponent } from './LogoSvg'

// Re-export SVG components and alt texts for convenience
export * from './LogoSvg'

export type LogoWidth = string
export type LogoHeight = string

export type SvgComponent =
  | ComponentType<SVGProps<SVGSVGElement>>
  | ReactElement<SVGProps<SVGSVGElement>>

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
   * Set to `true` to inherit the color with `currentColor`. Defaults to `false`.
   */
  inheritColor?: boolean
  /**
   * Set to `true` if you want to inherit the `height` of the parent. Defaults to `false`.
   */
  inheritSize?: boolean
  /**
   * Provide a custom SVG to render instead of the built-in logos. Accepts a React SVG component, element, or a function that receives the theme and returns an SVG component. Width, height and color properties still apply. If not provided, defaults to DNB logo. Import SVGs from `@dnb/eufemia/components/Logo` (e.g., `DnbDefault`, `SbankenDefault`, `SbankenCompact`, `SbankenHorizontal`, `CarnegieDefault`, `EiendomDefault`). When using a function, it receives the theme context (useTheme return value) allowing theme-aware logo selection.
   */
  svg?: Svg
} & SpacingProps &
  Omit<HTMLProps<HTMLElement>, 'ref' | 'size'>

const logoDefaultProps: Partial<LogoProps> = {
  inheritSize: false,
}

function Logo(localProps: LogoProps) {
  const context = useContext(Context)

  const props = extendPropsWithContext(
    localProps,
    logoDefaultProps,
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

  // If svg is a function, call it with a sanitized theme (omit DOM-irrelevant keys).
  // Read via useTheme so the resolved `brand` is used (this also covers the
  // deprecated `name`), keeping this component free of the deprecated property.
  const themeContext = useTheme()
  const themeBrand = themeContext?.brand
  const size = themeContext?.size
  const hasTheme = Boolean(themeContext)
  const theme = useMemo(() => {
    if (!hasTheme) {
      return null
    }
    return {
      brand: themeBrand,
      name: themeBrand,
      size,
      isUi: themeBrand === 'ui',
      isSbanken: themeBrand === 'sbanken',
      isEiendom: themeBrand === 'eiendom',
      isCarnegie: themeBrand === 'carnegie',
    }
  }, [hasTheme, themeBrand, size])

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

  const sharedClasses = classNameProp

  const detectedBrand = useMemo(() => {
    if (Object.hasOwn(svg, 'brand')) {
      const brand = (svg as LogoSvgComponent).brand
      return brand
    }

    return theme?.brand || 'ui'
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

  const rootParams = useSpacing(props, {
    role: 'img',
    'aria-hidden': true,
    className,
    ...rest,
    style: rest.style,
    alt: altText,
  })

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
    | ComponentType<SVGProps<SVGSVGElement>>
    | ReactElement<SVGProps<SVGSVGElement>>,
  svgParams: SVGProps<SVGSVGElement> & { alt: string },
  theme: UseThemeReturn
) {
  if (isValidElement(SvgComponent)) {
    const allowedProps: Record<string, unknown> = {}
    if (theme) {
      for (const key in SvgComponent.props) {
        if (!(key in theme)) {
          allowedProps[key] = SvgComponent.props[key]
        }
      }
    }

    return createElement(SvgComponent.type, {
      ...allowedProps,
      ...svgParams,
    })
  }

  return <SvgComponent {...svgParams} />
}

export default Logo
