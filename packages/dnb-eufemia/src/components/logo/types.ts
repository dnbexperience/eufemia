/**
 * Types for Logo
 *
 */

import type {
  ComponentType,
  HTMLProps,
  ReactElement,
  SVGProps,
} from 'react'
import type { UseThemeReturn } from '../../shared/useTheme'
import type { IconColor } from '../Icon'
import type { SpacingProps } from '../../shared/types'
import type { LogoSvgComponent } from './LogoSvg'

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
