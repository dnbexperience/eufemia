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

// Re-export SVG components and alt texts for convenience
export * from './LogoSvg'

export type LogoWidth = string
export type LogoHeight = string
export type LogoSvgComponent =
  | React.ComponentType<
      React.SVGProps<SVGSVGElement> & { alt?: React.ReactNode }
    >
  | React.ReactElement<
      React.SVGProps<SVGSVGElement> & { alt?: React.ReactNode }
    >
export type CustomLogoSvg =
  | LogoSvgComponent
  | ((theme: UseThemeReturn) => LogoSvgComponent)

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
  svg?: CustomLogoSvg
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
    svg: svgProp = DnbDefault as CustomLogoSvg, // Default to DNB logo if no svg provided
    ...rest
  } = props

  // Attempt to get theme from context
  const brand = useMemo(() => {
    if (brandProp) {
      return brandProp === 'ui' ? 'dnb' : brandProp
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
    if (theme && typeof svgProp === 'function' && svgProp.length === 1) {
      return (svgProp as (theme: UseThemeReturn) => LogoSvgComponent)(
        theme
      )
    }
    return svgProp as LogoSvgComponent
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
    }

    return 'dnb'
  }, [svg])

  const className = useMemo(() => {
    const base = `${detectedBrand}-logo`
    return classnames(
      base,
      sharedClasses,
      (parseFloat(width) > 0 || parseFloat(height) > 0) &&
        `${base}--has-size`,
      inheritSize && `${base}--inherit-size`,
      inheritColor && `${base}--inherit-color`
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
