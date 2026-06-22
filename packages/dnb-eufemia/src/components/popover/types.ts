import type {
  CSSProperties,
  HTMLAttributes,
  HTMLProps,
  ReactNode,
  Ref,
  RefCallback,
  RefObject,
} from 'react'
import type { ButtonProps } from '../button/Button'

export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left'

export type PopoverArrow = 'center' | 'top' | 'right' | 'bottom' | 'left'

export type PopoverAlign = null | 'center' | 'right' | 'left'

export type PopoverAutoAlignMode = 'initial' | 'scroll' | 'never'

export type PopoverTargetElementObject = {
  verticalRef?: PopoverTargetElement
  horizontalRef?: PopoverTargetElement
}

export type PopoverTargetElement =
  | ReactNode
  | RefObject<unknown>
  | HTMLElement
  | PopoverTargetElementObject

export type PopoverResolvedTargetElement =
  | HTMLElement
  | null
  | PopoverTargetElementObject

export type PopoverTriggerRenderProps = HTMLAttributes<HTMLElement> & {
  ref: RefCallback<HTMLElement>
  active: boolean
  open: () => void
  close: () => void
  toggle: (next?: boolean) => void
}

export type PopoverContentRenderProps = {
  active: boolean
  open: () => void
  close: () => void
  toggle: (next?: boolean) => void
  id: string
}

export type PopoverRenderable<T> = ReactNode | ((context: T) => ReactNode)

type PopoverOverlayProps = Omit<
  PopoverAllProps,
  'children' | 'content' | 'title'
>

/**
 * @deprecated Use `triggerProps` instead of `triggerAttributes`.
 */
export type PopoverTriggerAttributes = HTMLAttributes<HTMLElement> & {
  ref?: RefObject<HTMLElement> & Ref<HTMLElement>
}

type PopoverPropsBase = {
  id?: string
  placement?: PopoverPlacement
  arrowPosition?: PopoverArrow
  /**
   * CSS selector that points to the element the arrow should align with. When the popover points vertically it aligns horizontally, and vice versa for horizontal placements.
   */
  arrowPositionSelector?: string
  /**
   * Hide the arrow element from the popover. When `true`, the arrow will not be rendered regardless of the `arrowPosition` property.
   * Default: `false`
   */
  hideArrow?: boolean
  alignOnTarget?: PopoverAlign
  /**
   * Horizontal offset in pixels to adjust the popover placement. Positive values move the popover to the right, negative values move it to the left. Useful for fine-tuning alignment when the default placement needs adjustment.
   * Default: `0`
   */
  horizontalOffset?: number
  /**
   * Offset in pixels from the edge when the arrow is positioned at the edge. When set, this value replaces the default edge spacing (8px) and arrow boundary (8px). Useful for components like Tooltip that need the arrow closer to the edge.
   */
  arrowEdgeOffset?: number
  fixedPosition?: boolean
  contentRef?: RefObject<HTMLSpanElement>
  /**
   * Render inline instead of inside the shared Popover portal.
   */
  skipPortal?: boolean
  /**
   * Forces the popover to recalculate its layout whenever this value changes. Useful when the trigger moves but the DOM tree stays mounted.
   */
  targetRefreshKey?: unknown
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  portalRootClass?: string
  targetSelector?: string
  targetElement?: PopoverTargetElement
  className?: string
  children?: ReactNode
  style?: CSSProperties
  omitDescribedBy?: boolean
  /**
   * Control when the popover automatically flips its placement to fit within the viewport. `initial` (default): Flip placement only on initial open when there's limited space. `scroll`: Flip placement on initial open and during scroll events. `never`: Never automatically flip placement, always use the specified `placement` property.
   * Default: `"initial"`
   */
  autoAlignMode?: PopoverAutoAlignMode
  /**
   * Bias vertical auto alignment toward the preferred placement until the trigger crosses a viewport threshold. Only applies to `placement="top"` and `placement="bottom"`. Example: `0.75` keeps `placement="bottom"` until the trigger reaches the bottom quarter of the viewport.
   */
  autoAlignViewportThreshold?: number
}

export type PopoverAllProps = PopoverPropsBase &
  Omit<HTMLProps<HTMLElement>, keyof PopoverPropsBase>

export type PopoverProps = PopoverOverlayProps & {
  /**
   * Alternative content property. Accepts nodes or a render function that receives the same helpers as `content`.
   */
  children?: PopoverRenderable<PopoverContentRenderProps>
  /**
   * Content rendered inside the popover. Can also be a render function that receives helpers such as `close`.
   */
  content?: PopoverRenderable<PopoverContentRenderProps>
  /**
   * Optional heading shown above the body content. Matches the typography used in TermDefinition.
   */
  title?: ReactNode
  /**
   * Custom trigger element or render function. Required unless you point Popover at an existing element using `targetElement` / `targetSelector`.
   */
  trigger?: PopoverRenderable<PopoverTriggerRenderProps>
  /**
   * Props forwarded to the default trigger wrapper (e.g. aria-*).
   */
  triggerProps?: PopoverTriggerAttributes
  /**
   * Deprecated. Use `triggerProps` instead.
   * @deprecated Use `triggerProps` instead.
   */
  triggerAttributes?: PopoverTriggerAttributes
  /**
   * Class name merged with the default trigger wrapper.
   */
  triggerClassName?: string
  /**
   * Spacing in pixels between the trigger element and the popover surface.
   */
  triggerOffset?: number
  /**
   * Controls the open state when provided. Use together with `onOpenChange`.
   */
  open?: boolean
  /**
   * Whether the popover should be open by default when uncontrolled.
   */
  openInitially?: boolean
  /**
   * Called whenever the open state changes (both controlled and uncontrolled).
   */
  onOpenChange?: (open: boolean) => void
  /**
   * If `true`, focus is moved into the popover content when it opens.
   */
  focusOnOpen?: boolean
  /**
   * Provide a specific element (or function returning one) to receive focus when the popover opens.
   */
  focusOnOpenElement?: HTMLElement | null | (() => HTMLElement | null)
  /**
   * Called after the popover has completed its initial focus sequence.
   */
  onFocusComplete?: () => void
  /**
   * Moves focus back to the trigger element once the popover closes (defaults to `true`).
   */
  restoreFocus?: boolean
  /**
   * Prevent closing the popover when interacting outside of it or pressing Escape. Useful when the popover needs to stay open while other parts of the page are interacted with.
   */
  preventClose?: boolean
  /**
   * Removes the built-in close button.
   */
  hideCloseButton?: boolean
  /**
   * Customize the built-in close button (icon, title, variant, etc.).
   */
  closeButtonProps?: Partial<ButtonProps>
  /**
   * Remove the default padding inside the popover by setting `--inner-space: 0` on the surface.
   */
  noInnerSpace?: boolean
  /**
   * If set to `true`, the popover will not have a max-width limitation.
   */
  noMaxWidth?: boolean
  /**
   * Keep the portal mounted in the DOM even when the popover is closed. Useful when the content should preserve its state.
   * Default: `false`
   */
  keepInDOM?: boolean
  /**
   * Control when the popover automatically flips its placement to fit within the viewport. `initial` (default): Flip placement only on initial open when there's limited space. `scroll`: Flip placement on initial open and during scroll events. `never`: Never automatically flip placement, always use the specified `placement` property.
   * Default: `"initial"`
   */
  autoAlignMode?: PopoverAutoAlignMode
  /**
   * Additional class name(s) merged into the popover content wrapper.
   * @private For internal use only.
   */
  contentClassName?: string
  /**
   * Overrides the default BEM root block. Useful when mirroring Popover styles.
   * @private For internal use only.
   */
  baseClassName?: string
  /**
   * Stops rendering the focus-trap button used to return focus to the trigger.
   * @private For internal use only.
   */
  disableFocusTrap?: boolean
  /**
   * Removes the outline/border that normally surrounds the popover surface.
   * @private For internal use only.
   */
  hideOutline?: boolean
}
