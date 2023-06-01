import * as React from 'react';
import type { SpacingProps } from '../space/types';
export type AccordionContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface AccordionContentProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  instance?: React.LegacyRef;
  className?: string;
  children?: AccordionContentChildren;
}
declare const AccordionContent: React.FC<AccordionContentProps>;
export default AccordionContent;
