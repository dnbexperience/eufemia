import type React from 'react'
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
  | React.ReactNode
  | React.MutableRefObject<unknown>
  | HTMLElement
  | PopoverTargetElementObject

export type PopoverResolvedTargetElement =
  | HTMLElement
  | null
  | PopoverTargetElementObject

export type PopoverTriggerRenderProps =
  React.HTMLAttributes<HTMLElement> & {
    ref: React.RefCallback<HTMLElement>
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

export type PopoverRenderable<T> =
  | React.ReactNode
  | ((context: T) => React.ReactNode)

type PopoverOverlayProps = Omit<
  PopoverAllProps,
  'children' | 'content' | 'title'
>

export type TriggerAttributes = React.HTMLAttributes<HTMLElement> & {
  ref?: React.MutableRefObject<HTMLElement> & React.Ref<HTMLElement>
}

type PopoverPropsBase = {
  id?: string
  placement?: PopoverPlacement
  arrowPosition?: PopoverArrow
  /**
   * CSS selector used to pick the element that controls arrow alignment.
   */
  arrowPositionSelector?: string
  /**
   * Hide the arrow element from the popover.
   * When `true`, the arrow will not be rendered regardless of the `arrowPosition` prop.
   * @default false
   */
  hideArrow?: boolean
  alignOnTarget?: PopoverAlign
  /**
   * Horizontal offset in pixels to adjust the popover placement.
   * Positive values move the popover to the right, negative values move it to the left.
   * @default 0
   */
  horizontalOffset?: number
  /**
   * Offset in pixels from the edge when the arrow is positioned at the edge.
   * When set, this value replaces the default edge spacing (8px) and arrow boundary (8px).
   * Useful for components like Tooltip that need the arrow closer to the edge.
   * @default undefined (uses default 8px)
   */
  arrowEdgeOffset?: number
  fixedPosition?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  /**
   * Skip rendering the popover in a React Portal.
   * When `true`, the popover renders inline in the DOM tree instead of being portaled to document.body.
   * Useful for cases where you need the popover to be part of the same DOM hierarchy for styling or event handling.
   * @default false
   */
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  portalRootClass?: string
  targetSelector?: string
  targetElement?: PopoverTargetElement
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  omitDescribedBy?: boolean
  /**
   * Control when the popover automatically flips its placement to fit within the viewport.
   * - `"initial"` (default): Flip placement only on initial open when there's limited space.
   * - `"scroll"`: Flip placement on initial open and during scroll events.
   * - `"never"`: Never automatically flip placement, always use the specified `placement` prop.
   * @default "initial"
   */
  autoAlignMode?: PopoverAutoAlignMode
}

export type PopoverAllProps = PopoverPropsBase &
  Omit<React.HTMLProps<HTMLElement>, keyof PopoverPropsBase>

export type PopoverProps = PopoverOverlayProps & {
  /**
   * Alternative content prop. Accepts React nodes or a render function that receives
   * context helpers (`active`, `open`, `close`, `toggle`, `id`).
   * If both `children` and `content` are provided, `content` takes precedence.
   */
  children?: PopoverRenderable<PopoverContentRenderProps>
  /**
   * Content rendered inside the popover. Can be React nodes or a render function
   * that receives context helpers (`active`, `open`, `close`, `toggle`, `id`).
   * Takes precedence over `children` when both are provided.
   */
  content?: PopoverRenderable<PopoverContentRenderProps>
  /**
   * Optional heading shown above the body content.
   * Matches the typography style used in TermDefinition component.
   */
  title?: React.ReactNode
  /**
   * Custom trigger element or render function. Required unless you point Popover
   * at an existing element using `targetElement` or `targetSelector`.
   * The render function receives trigger props including `ref`, `active`, `open`, `close`, and `toggle`.
   */
  trigger?: PopoverRenderable<PopoverTriggerRenderProps>
  /**
   * Extra HTML attributes passed to the trigger wrapper element.
   * Useful for adding aria-* attributes, data-* attributes, or event handlers.
   * These are merged with the default trigger attributes.
   */
  triggerAttributes?: TriggerAttributes
  /**
   * Additional class name(s) merged with the default trigger wrapper classes.
   * The default class `dnb-popover__trigger` is always included.
   */
  triggerClassName?: string
  /**
   * Distance in pixels between the popover and its trigger element.
   * @default 16
   */
  triggerOffset?: number
  /**
   * Controlled open state. When provided, the popover becomes a controlled component.
   * Use together with `onOpenChange` to manage the open state externally.
   */
  open?: boolean
  /**
   * Uncontrolled initial open state. Use this for uncontrolled popovers.
   * @default false
   */
  openInitially?: boolean
  /**
   * Callback fired when the open state changes. Receives the new open state as a parameter.
   * Useful for syncing state with external state management or tracking user interactions.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * If true, focus is moved into the popover content when it opens.
   * @default true
   */
  focusOnOpen?: boolean
  /**
   * Provide a specific element (or function returning one) to receive focus when the popover opens.
   * Takes precedence over the default focus behavior when `focusOnOpen` is true.
   */
  focusOnOpenElement?: HTMLElement | null | (() => HTMLElement | null)
  /**
   * Moves focus back to the trigger element once the popover closes.
   * @default true
   */
  restoreFocus?: boolean
  /**
   * Prevent closing the popover when interacting outside of it or pressing Escape.
   * Useful when you need the popover to stay open while the user interacts elsewhere in the document.
   */
  preventClose?: boolean
  /**
   * Convenience prop to remove the built-in close button.
   * @default false
   */
  hideCloseButton?: boolean
  /**
   * Customize the built-in close button (icon, title, variant, etc.).
   * Only applies when the close button is rendered.
   */
  closeButtonProps?: Partial<ButtonProps>
  /**
   * Disable inner spacing (padding) of the popover content.
   * When set to `true`, sets `--inner-space: 0` to remove padding.
   * Useful for components like DatePicker that manage their own spacing.
   */
  noInnerSpace?: boolean
  /**
   * Disable the max-width constraint on the popover content.
   * When set to `true`, removes the max-width limit, allowing the popover to expand to its natural width.
   * @default false
   */
  noMaxWidth?: boolean
  /**
   * Keep the popover portal mounted in the DOM even when closed.
   * When `true`, the popover remains in the DOM when inactive, which is useful for:
   * - Maintaining `aria-describedby` references for accessibility
   * - Ensuring screen readers can always find the associated element
   * - Preventing layout shifts when the popover appears/disappears
   * @default false
   */
  keepInDOM?: boolean
  /**
   * Control when the popover automatically flips its placement to fit within the viewport.
   * - `"initial"` (default): Flip placement only on initial open when there's limited space.
   * - `"scroll"`: Flip placement on initial open and during scroll events.
   * - `"never"`: Never automatically flip placement, always use the specified `placement` prop.
   * @default "initial"
   */
  autoAlignMode?: PopoverAutoAlignMode
  /**
   * Additional class name(s) for the popover content element.
   * @private For internal use only.
   */
  contentClassName?: string
  /**
   * Optional secondary base class name used to mirror Popover BEM classes.
   * @private For internal use only.
   */
  baseClassName?: string
  /**
   * Visual theme for the popover surface.
   * @private For internal use only.
   */
  theme?: 'light' | 'dark'
  /**
   * Disable rendering of the focus-trap button used to return focus to the trigger.
   * @private For internal use only.
   */
  disableFocusTrap?: boolean
  /**
   * Hide outline around the popover.
   * @private For internal use only.
   */
  hideOutline?: boolean
}
