/**
 * Web AccordionGroup Context
 *
 */
import React from 'react';
import type { AccordionGroupProps } from './AccordionGroup';
type AccordionGroupContextProps = {
    expanded?: boolean;
    group?: string;
    expandedSsr?: boolean;
    rememberState?: boolean;
    flushRememberedState?: boolean;
    expandedId?: string;
    onChange?: (...params: unknown[]) => void;
    onInit?: (...args: any[]) => any;
    collapseAccordionCallbacks?: React.RefObject<(() => void)[]>;
    collapseAllHandleRef?: React.RefObject<() => void>;
    expandBehavior?: AccordionGroupProps['expandBehavior'];
};
declare const AccordionGroupContext: React.Context<AccordionGroupContextProps>;
export default AccordionGroupContext;
