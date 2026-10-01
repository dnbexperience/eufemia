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
   * Stable identifier of the step.
   */
  id: string
  /**
   * The element the step points at: a CSS selector, an element, a ref or a function that returns an element. Omit it to show the step centered on the screen. Steps whose target is missing or hidden are skipped.
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
   * Preferred side of the target to place the step on.
   * Default: `"bottom"`
   */
  placement?: PopoverPlacement
  /**
   * Horizontal alignment on the target when `placement` is `top` or `bottom`.
   * Default: `"center"`
   */
  align?: Exclude<PopoverAlign, null>
  /**
   * Runs before the step is shown, e.g. to reveal the target. May return a promise. The step waits up to 1.5 seconds for it, and then for the target to appear, before the step is skipped.
   */
  onBeforeShow?: () => void | Promise<void>
}

export type GuidedTourDialogContent = {
  title?: ReactNode
  content: ReactNode
}

export type GuidedTourProps = {
  /**
   * Whether the tour is shown.
   */
  open: boolean
  /**
   * The steps of the tour. See [step properties](#step-properties).
   */
  steps: Array<GuidedTourStep>
  /**
   * Shown in a Dialog before the first step, with a start and a skip button.
   */
  intro?: GuidedTourDialogContent
  /**
   * Shown in a Dialog after the last step.
   */
  outro?: GuidedTourDialogContent
  /**
   * Called with `false` when the tour is completed or canceled.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Called when the user finishes the tour.
   */
  onComplete?: () => void
  /**
   * Called when the user closes or skips the tour before it is finished.
   */
  onCancel?: () => void
}
