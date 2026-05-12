import type { CSSProperties, HTMLProps, ReactNode, RefObject } from 'react'
import type { SpacingProps } from '../../shared/types'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

export type TooltipArrow =
  | null
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
export type TooltipAlign = null | 'center' | 'right' | 'left'

export type TooltipSize = 'default' | 'large'

export type TooltipProps = {
  id?: string
  size?: TooltipSize
  /**
   * Controls visibility. When provided as a boolean, Tooltip is controlled and ignores DOM events (hover/focus/touch). `true` keeps it visible; `false` keeps it hidden. When not provided (undefined), the Tooltip uses default hover/focus behavior.
   */
  open?: boolean
  placement?: TooltipPlacement
  arrow?: TooltipArrow
  align?: TooltipAlign
  fixedPosition?: boolean
  contentRef?: RefObject<HTMLSpanElement>
  /**
   * Skip rendering the tooltip in a React Portal.
   * When `true`, the tooltip renders inline in the DOM tree instead of being portaled to document.body.
   * Useful for cases where you need the tooltip to be part of the same DOM hierarchy for styling or event handling.
   * Default: `false`
   */
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  /**
   * CSS class name applied to the Tooltip portal root element.
   * Has effect only when not using `skipPortal`.
   */
  portalRootClass?: string
  targetSelector?: string
  targetElement?: ReactNode | RefObject<unknown> | HTMLElement
  tooltip?: ReactNode
  className?: string
  children?: ReactNode
  style?: CSSProperties
  /**
   * Whether to omit the aria-describedby attribute.
   */
  omitDescribedBy?: boolean
  /**
   * Keep the tooltip portal mounted in the DOM even when closed.
   * Useful if you want the tooltip markup to stay mounted to avoid layout shifts.
   * Default: `false`
   */
  keepInDOM?: boolean
  /**
   * Additional spacing in pixels between the tooltip and its trigger.
   * Maps directly to the Popover `triggerOffset`.
   * Default: `16`
   */
  triggerOffset?: number
  /**
   * Forces the tooltip to re-evaluate the target position when the provided key changes.
   */
  targetRefreshKey?: unknown
}

export type TooltipAllProps = TooltipProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, keyof TooltipProps>
