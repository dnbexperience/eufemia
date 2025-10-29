import type { SpacingProps } from '../../shared/types'

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export type TooltipArrow =
  | null
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
export type TooltipAlign = null | 'center' | 'right' | 'left'

export type TooltipSize = 'basis' | 'large'

export type TooltipProps = {
  id?: string
  size?: TooltipSize
  active?: boolean
  position?: TooltipPosition
  arrow?: TooltipArrow
  align?: TooltipAlign
  fixedPosition?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  /**
   * Skip rendering the tooltip in a React Portal.
   * When `true`, the tooltip renders inline in the DOM tree instead of being portaled to document.body.
   * Useful for cases where you need the tooltip to be part of the same DOM hierarchy for styling or event handling.
   * @default false
   */
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  /**
   * Optional className added to the Tooltip portal root element.
   * Has effect only when not using skipPortal.
   */
  portalRootClass?: string
  targetSelector?: string
  targetElement?:
    | React.ReactNode
    | React.MutableRefObject<unknown>
    | HTMLElement
  /**
   * Forces the tooltip to stay open even when the hover state changes.
   */
  forceActive?: boolean
  tooltip?: React.ReactNode
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  /**
   * Whether to omit the aria-describedby attribute.
   */
  omitDescribedBy?: boolean
  /**
   * Keep the tooltip portal mounted in the DOM even when closed.
   * Useful if you want the tooltip markup to stay mounted to avoid layout shifts.
   * @default false
   */
  keepInDOM?: boolean
  /**
   * Additional spacing in pixels between the tooltip and its trigger.
   * Maps directly to the Popover `triggerOffset`.
   * @default 16
   */
  triggerOffset?: number
  /**
   * Forces the tooltip to re-evaluate the target position when the provided key changes.
   */
  targetRefreshKey?: unknown
}

export type TooltipAllProps = TooltipProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof TooltipProps>
