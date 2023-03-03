import * as React from 'react';
export type AccordionContentSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type AccordionContentTop = string | number | boolean;
export type AccordionContentRight = string | number | boolean;
export type AccordionContentBottom = string | number | boolean;
export type AccordionContentLeft = string | number | boolean;
export type AccordionContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface AccordionContentProps
  extends React.HTMLProps<HTMLElement> {
  instance?: React.LegacyRef;
  space?: AccordionContentSpace;
  top?: AccordionContentTop;
  right?: AccordionContentRight;
  bottom?: AccordionContentBottom;
  left?: AccordionContentLeft;
  className?: string;
  children?: AccordionContentChildren;
}
declare const AccordionContent: React.FC<AccordionContentProps>;
export default AccordionContent;
