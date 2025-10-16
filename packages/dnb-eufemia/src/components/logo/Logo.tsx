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
import LogoSvg from './LogoSvg'

export type LogoWidth = string
export type LogoHeight = string
export type LogoVariant = 'default' | 'compact' | 'compactHorizontal'

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
} & SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size'>

const defaultProps: LogoProps = {
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
    width,
    inheritSize,
    height,
    brand: brandProp,
    variant,
    color,
    inheritColor,
    className: classNameProp,
    ...rest
  } = props

  // Attempt to get theme from context
  const brand = context.theme ? context.theme.name : brandProp

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

  // Alt text for the logo does not need to be translated. DNB alt will be the same in English, and sbanken alt should always be in Norwegian
  const altText =
    logoType === 'dnb' ? 'DNB Logo' : 'Sbanken - et konsept fra DNB logo'

  const sharedClasses = classnames(
    classNameProp,
    createSpacingClasses(props)
  )
  const className = useMemo(() => {
    if (logoType === 'dnb') {
      return classnames(
        'dnb-logo',
        sharedClasses,
        (parseFloat(width) > 0 || parseFloat(height) > 0) &&
          'dnb-logo--has-size',
        inheritSize && 'dnb-logo--inherit-size',
        inheritColor && 'dnb-logo--inherit-color'
      )
    }

    return classnames(
      'sbanken-logo',
      sharedClasses,
      (parseFloat(width) > 0 || parseFloat(height) > 0) &&
        'sbanken-logo--has-size',
      inheritSize && 'sbanken-logo--inherit-size',
      inheritColor && 'sbanken-logo--inherit-color'
    )
  }, [logoType, sharedClasses, width, height, inheritSize, inheritColor])

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
      <LogoSvg logoType={logoType} svgParams={svgParams} />
    </span>
  )
}

export default Logo
