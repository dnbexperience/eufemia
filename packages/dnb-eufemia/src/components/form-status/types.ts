/**
 * Types for FormStatus
 *
 */

import type { HTMLProps, ReactNode, SVGProps } from 'react'
import type { GlobalStatusConfigObject } from '../GlobalStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceTypeAll } from '../../shared/types'

export type FormStatusText =
  | string
  | boolean
  | (() => ReactNode)
  | ReactNode

export type FormStatusState =
  | 'error'
  | 'warning'
  | 'information'
  | 'success'
  | 'marketing'

export type FormStatusVariant = 'plain' | 'outlined'

export type FormStatusSize = 'default' | 'large'

export type FormStatusAttributes = string | Record<string, unknown>

export type FormStatusChildren = string | (() => ReactNode) | ReactNode

export type FormStatusBaseProps = {
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Valid states are `error`, `warning`, `information`, `success` and `marketing`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps
  /**
   * Set to `true` to disable the status animation. Defaults to `false`.
   */
  statusNoAnimation?: boolean
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
}

export type FormStatusProps = {
  id?: string
  /**
   * The `title` attribute in the status.
   */
  title?: string
  label?: ReactNode
  /**
   * Provide `false` if you want to animate the visibility. Defaults to `true`.
   */
  show?: boolean
  /**
   * The `text` appears as the status message. Besides plain text, you can send in a React component as well.
   */
  text?: FormStatusText
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * The `icon` shown before the status text. Defaults to `error`.
   */
  icon?: IconIcon
  /**
   * The size of the icon. Defaults to `medium`.
   */
  iconSize?: IconSize
  /**
   * Defines the visual appearance of the status. These are the statuses `error`, `warning`, `information` and `marketing`. The default status is `error`.
   */
  state?: FormStatusState
  /**
   * As of now, there is the `plain` and the `outlined` variant. Defaults to `plain`.
   */
  variant?: FormStatusVariant
  /**
   * Defines the appearance size. Available sizes are `default` and `large`. The default size is `default`.
   */
  size?: FormStatusSize
  attributes?: FormStatusAttributes
  textId?: string
  widthSelector?: string
  widthElement?: { current: HTMLElement | null } | null
  /**
   * ~~Use `true` to omit the animation on content visibility. Defaults to `false`.~~ **NB:** Animation is disabled as of now.
   */
  noAnimation?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * If set to `true`, then the FormStatus will be 100% in available `width`. **NB:** Only use this on independent status messages.
   */
  stretch?: boolean
  /**
   * The `role` attribute for accessibility, defaults to `alert`.
   */
  role?: string
  /**
   * Use it to set an inner margin. It supports the same properties as [Space](/uilib/layout/space/properties). Useful for animation.
   */
  shellSpace?: SpaceTypeAll
  className?: string
  /**
   * The `text` appears as the status message. Besides plain text, you can send in a React component as well.
   */
  children?: FormStatusChildren
} & Omit<
  HTMLProps<HTMLElement>,
  'ref' | 'label' | 'value' | 'onFocus' | 'onBlur' | 'children' | 'size'
> &
  SpacingProps

export type ErrorIconProps = SVGProps<SVGSVGElement> & {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
}

export type WarnIconProps = SVGProps<SVGSVGElement> & {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
}

export type InfoIconProps = SVGProps<SVGSVGElement> & {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
}

export type MarketingIconProps = SVGProps<SVGSVGElement> & {
  /**
   * The `title` attribute in the status.
   */
  title?: string
  state?: FormStatusState
}
