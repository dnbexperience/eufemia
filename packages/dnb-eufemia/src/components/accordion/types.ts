import type { RefObject } from 'react'
import type { AccordionProps } from './Accordion'

export type AccordionInstance = {
  _id: string
  close: () => void
  setExpandedState: (expanded: boolean) => void
  state: { expanded: boolean; group?: string }
  props: AccordionProps
}

export type AccordionGroupProps = AccordionProps & {
  /**
   * If set to `true`, the group of accordions will allow all to close.
   */
  allowCloseAll?: boolean
  /**
   * Determines how many accordions can be expanded at once. Defaults to `single`.
   */
  expandBehavior?: 'single' | 'multiple'
  /**
   * Define an `id` of a nested accordion that will get expanded.
   */
  expandedId?: string
  /**
   * Ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions. Defaults to `undefined`.
   */
  collapseAllHandleRef?: RefObject<() => void>
}

export const accordionDefaultProps: Partial<
  AccordionProps & AccordionGroupProps
> = {
  variant: 'outlined',
  iconSize: 'medium',
}
