/**
 * Types for Icon
 *
 */

import type { HTMLProps } from 'react'
import type { FormStatusIcon } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'
import type { ValidIconNumericSize, ValidIconType } from './sizes'
import type { IconFunction, IconType } from './value-types'

export type { IconSVGProps, IconFunction } from './value-types'

export type IconIcon = IconType | FormStatusIcon | IconFunction

export type IconColor =
  | string
  | number
  | { [key: string]: string | number }

export type IconSize =
  | ValidIconNumericSize
  | `${ValidIconNumericSize | number}`
  | ValidIconType
  | 'auto'
  | 'basis'

export type IconProps = {
  /**
   * A React SVG Component.
   */
  icon?: IconIcon

  /**
   * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`, `medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
   */
  size?: IconSize

  /**
   * The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the [colors table](/uilib/usage/customisation/colors), e.g. `var(--color-ocean-green)`. Defaults to no color, which means `--color-black-80`.
   */
  color?: IconColor

  /**
   * Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
   */
  inheritColor?: boolean

  /**
   * The alternative label (text version) of the icon. Defaults to the imported icon name.
   */
  alt?: string

  /**
   * Use a title to provide extra information about the icon used.
   */
  title?: string

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
   */
  modifier?: string

  /**
   * If set to `true`, the icon paths will be filled with `currentColor`.
   */
  fill?: boolean

  /**
   * Plays motion provided by an explicitly imported animated icon. Use `true` or `once` to play once, or `loop` to repeat the animation.
   */
  animate?: boolean | 'once' | 'loop'

  /**
   * Plays an animated icon when the icon itself, or an interactive parent such as a button or link, is hovered.
   */
  animateWhen?: 'hover'

  /**
   * Change this value to replay an animated icon while `animate` remains enabled.
   */
  animationKey?: string | number

  border?: boolean
  width?: `${IconSize}` | `${number}%` | number
  height?: `${IconSize}` | `${number}%` | number
  children?: IconIcon

  /**
   * Activates a named Icon.transition() state on the icon element.
   */
  transitionState?: string
}

export type IconAllProps = IconProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, 'size' | 'children'>
