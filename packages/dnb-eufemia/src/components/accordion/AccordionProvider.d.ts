import * as React from 'react';
import type { AccordionProps } from './Accordion';

export interface AccordionGroupProps
  extends React.HTMLProps<HTMLElement>,
    AccordionProps {
  expanded_id?: string;
  onInit?: (...args: any[]) => any;
}
export default class AccordionGroup extends React.Component<
  AccordionGroupProps,
  any
> {
  render(): JSX.Element;
}
