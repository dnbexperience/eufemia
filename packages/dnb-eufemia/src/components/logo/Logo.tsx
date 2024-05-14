/**
 * Web Logo Component
 */

import React, { useContext } from 'react'
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
import LogoSvg, { LogoType } from './LogoSvg'

export type LogoWidth = number | string
export type LogoHeight = number | string
export type LogoVariant = 'default' | 'compact' | 'compactHorizontal'

export type LogoProps = {
  /**
   * Define either the width of the logo.
   */
  width?: LogoWidth // v11: replace with string
  /**
   * Or define the height of the logo.
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
  class?: string
  className?: string
} & SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size'> &
  DeprecatedLogoProps

type DeprecatedLogoProps = {
  /** @deprecated Will be removed in eufemia v11 */
  alt?: string
  /** @deprecated Will be removed in eufemia v11 */
  ratio?: number | string
  /** @deprecated Use 'inheritColor' */
  inherit_color?: boolean
  /** @deprecated Will be removed in eufemia v11 */
  size?: string | number
}

const defaultProps: LogoProps = {
  size: 'auto',
  variant: 'default',
  inheritSize: false,
}

function Logo(localProps: LogoProps) {
  const context = useContext(Context)

  // Two diffrent translations for sbanken and dnb as different props: {alt, sbankenAlt}
  const translations = context.getTranslation(localProps).Logo

  const props = extendPropsWithContext(
    convertSnakeCaseProps(localProps),
    defaultProps,
    context.Logo
  )

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    size,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ratio,
    width,
    inheritSize,
    height,
    brand: _brand,
    variant,
    color,
    inheritColor,
    className,
    class: _className,
    ...rest
  } = convertDimentionalPropsToString(props)

  let brand = _brand

  if (brand == null && context.theme) {
    // Attempt to get theme from context
    brand = context.theme.name
  }

  let logoType: LogoType = 'dnb'

  if (brand === 'sbanken') {
    if (variant === 'compact') {
      logoType = 'sbankenCompact'
    } else if (variant === 'compactHorizontal') {
      logoType = 'sbankenHorizontal'
    } else {
      logoType = 'sbankenDefault'
    }
  }

  const altText =
    logoType === 'dnb' ? translations.alt : translations.sbankenAlt

  const rootParams = {
    role: 'img',
    ['aria-hidden']: true,
    className:
      logoType === 'dnb'
        ? classnames(
            'dnb-logo',
            className,
            _className,
            createSpacingClasses(props),
            (parseFloat(width) > 0 || parseFloat(height) > 0) &&
              'dnb-logo--has-size',
            (inheritSize || size === 'inherit') &&
              'dnb-logo--inherit-size',
            inheritColor && 'dnb-logo--inherit-color'
          )
        : classnames(
            'sbanken-logo',
            className,
            _className,
            createSpacingClasses(props),
            (parseFloat(width) > 0 || parseFloat(height) > 0) &&
              'sbanken-logo--has-size',
            (inheritSize || size === 'inherit') &&
              'sbanken-logo--inherit-size',
            inheritColor && 'sbanken-logo--inherit-color'
          ),

    alt: altText,
    ...rest,
  }

  const svgParams = {
    width,
    height,
    color,
    alt: altText,
  }

  validateDOMAttributes(props, rootParams)

  return (
    <span {...rootParams}>
      <LogoSvg logoType={logoType} svgParams={svgParams} />
    </span>
  )
}

function convertDimentionalPropsToString(allProps: LogoProps) {
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

export default Logo
