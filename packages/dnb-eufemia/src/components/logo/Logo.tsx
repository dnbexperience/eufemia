/**
 * Web Logo Component
 */

import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { DnbDefault, DnbLogoAlt } from './LogoSvg'
import type { UseThemeReturn } from '../../shared/useTheme'

import type { IconColor } from '../Icon'
import type { SpacingProps } from '../space/types'
import type { LogoSvg, LogoSvgComponent } from './LogoSvg'

// Re-export SVG components and alt texts for convenience
export * from './LogoSvg'

export type LogoWidth = string
export type LogoHeight = string
export type CustomLogoSvg = LogoSvg | LogoSvgComponent
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
   * Set to `true` if you do not want to inherit the color by `currentColor`. Defaults to `false`.
   */
  inheritColor?: boolean
  /**
   * Set to `true` if you want the logo to inherit the parent size
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
    return svgProp as LogoSvg
  }, [svgProp, theme])

  // const svg2 = useMemo(() => {
  //   if (typeof svgProp === 'function') {
  //     type SvgFactory = (t: UseThemeReturn) => unknown
  //     const fn = svgProp as SvgFactory & {
  //       displayName?: string
  //       prototype?: { isReactComponent?: unknown }
  //     }

  //     // If it looks like a React component (PascalCase or react component prototype), don't call it
  //     const fnName = fn.displayName || fn.name || ''
  //     const looksLikeComponent =
  //       !!fn.prototype?.isReactComponent ||
  //       (fnName && fnName[0] === fnName[0]?.toUpperCase())

  //     if (looksLikeComponent) {
  //       return svgProp as LogoSvgComponent
  //     }

  //     if (theme) {
  //       try {
  //         const maybeEl = (fn as (t: UseThemeReturn) => unknown)(theme)
  //         if (React.isValidElement(maybeEl) && maybeEl.type === 'svg') {
  //           return maybeEl
  //         }
  //       } catch {
  //         // ignore and fall through to treat as component
  //       }
  //     }

  //     return svgProp as LogoSvgComponent
  //   }

  //   return svgProp
  // }, [svgProp, theme])

  // Alt text for the logo does not need to be translated. DNB alt will be the same in English.
  const altText = useMemo(() => {
    const alt = svg?.['alt']
    if (alt) {
      return alt as string
    }
    return DnbLogoAlt
  }, [svg])

  const sharedClasses = classnames(
    classNameProp,
    createSpacingClasses(props)
  )

  const detectedBrand = useMemo(() => {
    if (Object.hasOwn(svg, 'brand')) {
      const brand = (svg as LogoSvgComponent).brand
      return brand === 'ui' ? 'dnb' : brand
    }

    // Determine brand based on svg component/element name
    let name: string | undefined

    if (React.isValidElement(svg)) {
      const el = svg as React.ReactElement & {
        type?: { displayName?: string; name?: string }
      }
      name = el.type?.displayName || el.type?.name
    } else if (typeof svg === 'function') {
      name = svg.displayName || svg.name
    }

    const n = (name || '').toLowerCase()
    if (n.includes('sbanken')) {
      return 'sbanken'
    } else if (n.includes('eiendom')) {
      return 'eiendom'
    } else if (n.includes('carnegie')) {
      return 'carnegie'
    }

    return theme?.name === 'ui' ? 'dnb' : theme?.name || 'dnb'
  }, [svg, theme])

  const className = useMemo(() => {
    return classnames(
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
