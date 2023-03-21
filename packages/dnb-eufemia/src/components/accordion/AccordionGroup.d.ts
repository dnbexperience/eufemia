import * as React from 'react';
import type { GroupProps } from './Accordion';

export interface AccordionGroupProps
  extends React.HTMLProps<HTMLElement>,
    GroupProps {
  onInit?: (...args: any[]) => any;
}
export default class AccordionGroup extends React.Component<
  AccordionGroupProps,
  any
> {
  render(): JSX.Element;
}
