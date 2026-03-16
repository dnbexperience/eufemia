/**
 * Web AccordionGroup Component
 *
 */
import React from 'react';
import type { GroupProps } from './AccordionTypes';
export type AccordionGroupProps = React.HTMLProps<HTMLElement> & GroupProps & {
    onInit?: (...args: any[]) => any;
};
declare const AccordionGroup: (props: AccordionGroupProps) => import("react/jsx-runtime").JSX.Element;
export default AccordionGroup;
