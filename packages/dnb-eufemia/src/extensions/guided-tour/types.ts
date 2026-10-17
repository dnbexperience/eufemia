import type { ReactNode, RefObject } from 'react'
import type {
  PopoverAlign,
  PopoverPlacement,
} from '../../components/popover/types'

export type GuidedTourTarget =
  | string
  | HTMLElement
  | RefObject<HTMLElement | null>
  | (() => HTMLElement | null)

export type GuidedTourStep = {
  /**
   * Unique identifier of the step.
   */
  id: string
  /**
   * The element to highlight: a CSS selector, an element, a ref or a function that returns an element. Without it, the step is centered on the screen. Steps with a missing or hidden target are skipped.
   */
  target?: GuidedTourTarget
  /**
   * Heading of the step.
   */
  title?: ReactNode
  /**
   * Content of the step.
   */
  content: ReactNode
  /**
   * Preferred side of the target to show the step on.
   * Default: `"bottom"`
   */
  placement?: PopoverPlacement
  /**
   * Alignment on the target when `placement` is `top` or `bottom`.
   * Default: `"center"`
   */
  align?: Exclude<PopoverAlign, null>
  /**
   * Runs each time before the step is shown, e.g. to reveal its target. May return a promise. The tour waits up to 1.5 seconds for the promise, then up to 1.5 seconds for the target to appear, before it skips the step. A rejected promise skips the step.
   */
  onBeforeShow?: () => void | Promise<void>
}

export type GuidedTourDialogContent = {
  title?: ReactNode
  content: ReactNode
}

export type GuidedTourProps = {
  /**
   * Whether the tour is shown. Use together with `onOpenChange`.
   */
  open: boolean
  /**
   * The steps of the tour. See [step properties](#step-properties).
   */
  steps: Array<GuidedTourStep>
  /**
   * Dialog shown before the first step, with a start and a skip button.
   */
  intro?: GuidedTourDialogContent
  /**
   * Dialog shown after the last step. Closing it also completes the tour.
   */
  outro?: GuidedTourDialogContent
  /**
   * Called with `false` when the tour ends.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Called when the tour is finished: after the last step, or when the outro is closed.
   */
  onComplete?: () => void
  /**
   * Called when the tour is skipped or closed before the last step.
   */
  onCancel?: () => void
}
