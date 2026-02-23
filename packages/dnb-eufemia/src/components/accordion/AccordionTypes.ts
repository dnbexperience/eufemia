import type { AccordionProps } from './Accordion'

export type GroupProps = AccordionProps & {
  allowCloseAll?: boolean
  /**
   * Determines how many accordions can be expanded at once.
   * Default: `single`
   */
  expandBehavior?: 'single' | 'multiple'
  /**
   * ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions.
   *
   * Default: `undefined`
   */
  expandedId?: string
  collapseAllHandleRef?: React.MutableRefObject<() => void>
}

export const accordionDefaultProps: Partial<AccordionProps & GroupProps> =
  {
    variant: 'outlined',
    iconSize: 'medium',
  }
