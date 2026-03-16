/**
 * Web Accordion Component
 *
 */
import React from 'react';
import type { SpacingProps } from '../space/types';
export type AccordionContentProps = Omit<React.HTMLProps<HTMLElement>, 'onAnimationStart' | 'onAnimationEnd' | 'children'> & SpacingProps & {
    instance?: React.RefObject<unknown>;
    className?: string;
    children?: React.ReactNode | ((...args: any[]) => any);
};
export default function AccordionContent(props: AccordionContentProps): import("react/jsx-runtime").JSX.Element;
