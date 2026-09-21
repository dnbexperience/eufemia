/**
 * Types for GlobalStatus
 *
 */

import type { HTMLProps, ReactNode } from 'react'
import type { GlobalStatusResult } from './GlobalStatusProvider'
import type { FormStatusText } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'

export type GlobalStatusTitle = ReactNode | boolean

export type GlobalStatusText = string | ReactNode

export type GlobalStatusItem =
  | string
  | {
      text?: ReactNode
      id?: string | number
      itemId?: string
      statusAnchorLabel?: ReactNode
      statusAnchorText?: string
      statusAnchorUrl?: string | boolean
      [key: string]: unknown
    }

export type GlobalStatusState =
  | 'error'
  | 'information'
  | 'warning'
  | 'success'

export type GlobalStatusShow = 'auto' | boolean

export type GlobalStatusDelay = string | number

export type GlobalStatusConfigObject = {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string
  message?: FormStatusText
}

export type GlobalStatusChildren = string | ReactNode

export type GlobalStatusProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string
  statusId?: string
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: GlobalStatusTitle
  defaultTitle?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: GlobalStatusText
  /**
   * The items (list items) appear as a part of the status content. You can both use a JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[]
  /**
   * The icon shown before the status title. Defaults to `exclamation`.
   */
  icon?: IconIcon
  /**
   * The size of the title icon. Defaults to `medium`.
   */
  iconSize?: IconSize
  /**
   * Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `information` and `success`. The default status is `error`.
   */
  state?: GlobalStatusState
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `auto`.
   */
  show?: GlobalStatusShow
  /**
   * Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.
   */
  autoScroll?: boolean
  /**
   * Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.
   */
  autoClose?: boolean
  /**
   * Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.
   */
  noAnimation?: boolean
  /**
   * Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.
   */
  delay?: GlobalStatusDelay
  /**
   * Text of the close button. Defaults to `Lukk`.
   */
  closeText?: ReactNode
  /**
   * Set to `true` if the close button should be hidden for the user. Defaults to `false`.
   */
  hideCloseButton?: boolean
  /**
   * Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omitSetFocusOnUpdate` which is set to `true` by default.
   */
  omitSetFocus?: boolean
  /**
   * Set to `true` to omit setting the focus during update. Defaults to `true`.
   */
  omitSetFocusOnUpdate?: boolean
  /**
   * Defines the anchor text showing up after every item, in case there is a `statusId` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.
   */
  statusAnchorText?: ReactNode
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  className?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  children?: GlobalStatusChildren
  onAdjust?: (globalStatus: GlobalStatusResult) => void
  onOpen?: (globalStatus: GlobalStatusResult) => void
  onShow?: (globalStatus: GlobalStatusResult) => void
  onClose?: (globalStatus: GlobalStatusResult) => void
  onHide?: (globalStatus: GlobalStatusResult) => void
} & Omit<
  HTMLProps<HTMLElement>,
  'ref' | 'children' | 'onClose' | 'onAdjust' | 'onShow' | 'title'
> &
  SpacingProps

export type GlobalStatusStatusId = string

export type GlobalStatusAddProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  statusId: GlobalStatusStatusId
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string
  item?: GlobalStatusItem
  /**
   * The items (list items) appear as a part of the status content. You can both use a JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[]
  onClose?: ({ statusId }: { statusId: GlobalStatusStatusId }) => void
}

export type GlobalStatusUpdateProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string
}

export type GlobalStatusRemoveProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  statusId: GlobalStatusStatusId
  bufferDelay?: number
}

export type GlobalStatusInterceptorProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string
  statusId?: GlobalStatusStatusId
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `auto`.
   */
  show?: boolean
  item?: GlobalStatusItem
}

export type GlobalStatusInterceptorUpdateEvents = {
  onShow?: (globalStatus: GlobalStatusResult) => void
  onHide?: (globalStatus: GlobalStatusResult) => void
  onClose?: (globalStatus: GlobalStatusResult) => void
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string
}
