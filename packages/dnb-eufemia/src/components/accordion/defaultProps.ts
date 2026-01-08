import type { AccordionProps, GroupProps } from './Accordion'

export const accordionDefaultProps: AccordionProps & GroupProps = {
  variant: 'outlined',
  icon_size: 'medium',
} as const
