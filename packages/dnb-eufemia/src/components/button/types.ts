/**
 * Types for Button
 *
 */

import type {
  AnchorHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { IconIcon, IconSize } from '../icon/Icon'
import type {
  DataAttributes,
  DynamicElement,
  SpacingProps,
} from '../../shared/types'
import type { FormStatusBaseProps } from '../FormStatus'
import type { AnchorProps } from '../Anchor'

export type ButtonText = string | ReactNode

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'unstyled'

export type ButtonSize = 'default' | 'small' | 'medium' | 'large'

export type ButtonIcon = IconIcon

export type ButtonIconPositionTertiary = 'top'

export type ButtonIconPosition = 'left' | 'right'

export type ButtonIconPositionAll =
  | 'left'
  | 'right'
  | ButtonIconPositionTertiary

export type ButtonTooltip = string | (() => ReactNode) | ReactNode

export type ButtonTo = string | ReactRouterLink['to']

export type ButtonSkeleton = SkeletonShow

export type ButtonChildren = string | (() => ReactNode) | ReactNode

export type ReactRouterLink = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to:
    | string
    | {
        pathname?: string
        search?: string
        has?: string
      }
}

export type ButtonElement =
  | DynamicElement<HTMLButtonElement | HTMLAnchorElement | AnchorProps>
  | ComponentType<ReactRouterLink & { ref?: Ref<HTMLAnchorElement> }>
  | ReactNode

export type ButtonClickEvent = {
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
}

export type ButtonOnClick =
  | ((args: ButtonClickEvent) => void)
  | MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  | ((...args: unknown[]) => void)

export type ButtonProps = {
  /**
   * The content of the button can be a string or a React Element.
   */
  text?: ButtonText
  /**
   * The type HTML attribute. Defaults to `button` to prevent accidental form submissions.
   */
  type?: string
  /**
   * Required if there is no text in the button. If `text` and `children` are `undefined`, setting the `title` property will automatically set `aria-label` with the same value. Accepts `ReactNode`. If a JSX element is provided, it will be converted to a plain string using `convertJsxToString` — only static text content is extracted. Custom components that don't render static children will result in an empty string.
   */
  title?: ReactNode
  /**
   * Defines the kind of button. Possible values are `primary`, `secondary` and `tertiary`. Defaults to `primary` (or `secondary` if icon only). The `tertiary` button is normally used together with an icon and officially supports only the default and large sizes.
   */
  variant?: ButtonVariant
  /**
   * The size of the button. There is `default`, `small`, `medium` and `large`. The `tertiary` button officially supports only default and large. Changing the size mainly affects spacing, but the large tertiary button also has a larger font size.
   */
  size?: ButtonSize
  /**
   * To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon="chevron_right"`), other icons should be set as React elements. For the `tertiary` button an icon is basically required for accessibility reasons (unless you explicitly turn it off with `icon={false}`).
   */
  icon?: ButtonIcon
  /**
   * Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.
   */
  iconPosition?: ButtonIconPositionAll
  /**
   * Define icon width and height. Defaults to `16px`.
   */
  iconSize?: IconSize
  /**
   * When using an icon created with `Icon.transition()`, set this to the active state name to drive the transition.
   */
  transitionState?: string
  /**
   * Only for icon buttons. If true, use the style for a selected icon button. Defaults to `false`.
   */
  selected?: boolean
  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: ButtonTooltip
  id?: string
  /**
   * If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.
   */
  href?: string
  /**
   * When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.
   */
  target?: string
  /**
   * When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples (non-exhaustive list) of values are `nofollow`, `search`, and `tag`.
   */
  rel?: string
  /**
   * Use this property only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.
   */
  to?: ButtonTo
  /**
   * If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.
   */
  customContent?: ReactNode
  /**
   * If set to `true` the button text will wrap into new lines if the overflow point is reached. Defaults to `false`.
   */
  wrap?: boolean
  /**
   * Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.
   */
  bounding?: boolean
  /**
   * Set it to `true` in order to stretch the button to the available space. Defaults to `false`.
   */
  stretch?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: ButtonSkeleton
  disabled?: boolean
  ref?: Ref<HTMLElement>
  className?: string
  children?: ButtonChildren
  /**
   * Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.
   */
  element?: ButtonElement
  onClick?: ButtonOnClick
} & FormStatusBaseProps &
  Partial<
    DataAttributes &
      Omit<
        Partial<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>,
        'onClick' | 'title'
      >
  > &
  SpacingProps
