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
   * Skip rendering the tooltip in a React Portal. When `true`, the tooltip renders inline in the DOM tree instead of being portaled to document.body. Useful for cases where you need the tooltip to be part of the same DOM hierarchy for styling or event handling. Defaults to `false`.
   */
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  /**
   * CSS class name applied to the Tooltip portal root element. Has effect only when not using `skipPortal`.
   */
  portalRootClass?: string
  targetSelector?: string
  targetElement?: ReactNode | RefObject<unknown> | HTMLElement
  tooltip?: ReactNode
  className?: string
  children?: ReactNode
  style?: CSSProperties
  /**
   * Set to `true` to omit the `aria-describedby` attribute on the target element. Defaults to `false`.
   */
  omitDescribedBy?: boolean
  /**
   * Keep the tooltip portal mounted in the DOM even when closed. When `true`, the tooltip remains in the DOM when inactive. Defaults to `false`.
   */
  keepInDOM?: boolean
  /**
   * Adjust the pixel gap between the tooltip content and its trigger. Use positive values to place the tooltip further away (e.g., to match custom spacing). Defaults to `16`.
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
