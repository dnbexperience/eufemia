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

import type { IconColor } from '../Icon'
import type { SpacingProps } from '../space/types'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import LogoSvg, { DnbLogoAlt, SbankenLogoAlt } from './LogoSvg'

export * from './LogoSvg'

export type LogoWidth = number | string
export type LogoHeight = number | string
/**
 * @deprecated Will be removed in eufemia v11. Use the `svg` prop to provide a custom logo instead.
 */
export type LogoVariant = 'default' | 'compact' | 'compactHorizontal'
export type CustomLogoSvg =
  | React.ComponentType<
      React.SVGProps<SVGSVGElement> & { alt?: React.ReactNode }
    >
  | React.ReactElement<
      React.SVGProps<SVGSVGElement> & { alt?: React.ReactNode }
    >

export type LogoProps = {
  /**
   * Define the width of the logo.
   */
  width?: LogoWidth // v11: replace with string
  /**
   * Define the height of the logo.
   */
  height?: LogoHeight // v11: replace with string
  /**
   * Define the color of the logo.
   */
  color?: IconColor
  /**
   * Define which brands logo to show. `ui` (DNB) or `sbanken`. Defaults to `ui`.
   */
  brand?: string
  /**
   * Define the logo variant, if there is more than one variant of a brands logo. Currently the only option other than default is a `compact` variant of the Sbanken logo. Defaults to `default`.
   * @deprecated Will be removed in eufemia v11. Use the `svg` prop to provide a custom logo instead.
   */
  variant?: LogoVariant
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
   * Can be a React component (receives standard SVG props) or a React element.
   */
  svg?: CustomLogoSvg
} & SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size'> &
  DeprecatedLogoProps

type DeprecatedLogoProps = {
  /** @deprecated Will be removed in eufemia v11 */
  alt?: string
  /** @deprecated Will be removed in eufemia v11 */
  ratio?: number | string
  /** @deprecated Will be removed in eufemia v11 */
  size?: string | number
}

const defaultProps: LogoProps = {
  size: 'auto',
  /**
   * @deprecated Will be removed in v11
   */
  variant: 'default',
  inheritSize: false,
}

function Logo(localProps: LogoProps) {
  const context = useContext(Context)

  const props = extendPropsWithContext(
    convertSnakeCaseProps(localProps),
    defaultProps,
    context.Logo
  )

  const {
    alt, // eslint-disable-line
    size, // eslint-disable-line
    ratio, // eslint-disable-line
    width,
    inheritSize,
    height: heightProp,
    brand: brandProp,
    variant,
    color,
    inheritColor,
    className: classNameProp,
    svg,
    ...rest
  } = convertDimensionalPropsToString(props)

  // Attempt to get theme from context
  const brand = useMemo(() => {
    if (brandProp) {
      return brandProp
    }

    if (context?.theme) {
      switch (context.theme.name) {
        case 'ui':
        case 'eiendom':
          return 'dnb'
      }

      return context.theme.name
    }

    return 'dnb'
  }, [brandProp, context?.theme])

  // @deprecated Can remove this in v11
  const logoType = useMemo(() => {
    if (brand === 'sbanken') {
      if (variant === 'compact') {
        return 'sbankenCompact'
      } else if (variant === 'compactHorizontal') {
        return 'sbankenHorizontal'
      } else {
        return 'sbankenDefault'
      }
    }

    return 'dnb'
  }, [brand, variant])

  /** @deprecated Can remove this in v11 */
  const height = parseFloat(size) > 0 ? size : heightProp

  // Alt text for the logo does not need to be translated. DNB alt will be the same in English.
  const altText = useMemo(() => {
    const alt = svg?.['alt']
    if (alt) {
      return alt
    }

    switch (brand) {
      case 'sbanken':
        return SbankenLogoAlt

      case 'dnb':
        return DnbLogoAlt
    }
  }, [brand, svg])

  const sharedClasses = classnames(
    classNameProp,
    createSpacingClasses(props)
  )
  const className = useMemo(() => {
    return classnames(
      `${brand}-logo`,
      sharedClasses,
      (parseFloat(width) > 0 || parseFloat(height) > 0) &&
        `${brand}-logo--has-size`,
      (inheritSize || size === 'inherit') && `${brand}-logo--inherit-size`,
      inheritColor && `${brand}-logo--inherit-color`
    )
  }, [
    brand,
    sharedClasses,
    width,
    height,
    inheritSize,
    size,
    inheritColor,
  ])

  const rootParams = {
    role: 'img',
    'aria-hidden': true,
    className,
    alt: altText,
    ...rest,
  }

  const svgParams = {
    width,
    height,
    color,
    alt: altText,
  }

  const remainingDOMProps = validateDOMAttributes(props, rootParams)

  return (
    <span {...remainingDOMProps}>
      {svg ? (
        renderCustomSvg(svg, svgParams)
      ) : (
        <LogoSvg logoType={logoType} svgParams={svgParams} />
      )}
    </span>
  )
}

/**
 * @deprecated Can be removed in v11
 */
function convertDimensionalPropsToString(allProps: LogoProps) {
  return {
    ...allProps,
    size: handleTypeToString(allProps.size),
    ratio: handleTypeToString(allProps.ratio),
    width: handleTypeToString(allProps.width),
    height: handleTypeToString(allProps.height),
  }
}

function handleTypeToString(val: number | string) {
  return val ? String(val) : undefined
}

function renderCustomSvg(
  svg:
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | React.ReactElement<React.SVGProps<SVGSVGElement>>,
  svgParams: React.SVGProps<SVGSVGElement> & { alt: string }
) {
  if (React.isValidElement(svg)) {
    return React.cloneElement(svg, { ...svgParams, ...svg.props })
  }

  const SvgComponent = svg as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >
  return <SvgComponent {...svgParams} />
}

export default Logo
