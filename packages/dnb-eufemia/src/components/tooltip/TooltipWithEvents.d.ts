/**
 * Web Tooltip Component
 *
 */
import React from 'react';
import type { TooltipProps } from './types';
type TooltipWithEventsProps = {
    target: TooltipProps['targetElement'];
    attributes?: React.HTMLAttributes<HTMLElement>;
    targetRefreshKey?: TooltipProps['targetRefreshKey'];
    forceOpen?: TooltipProps['forceOpen'];
};
declare function TooltipWithEvents(props: TooltipProps & TooltipWithEventsProps): import("react/jsx-runtime").JSX.Element;
export default TooltipWithEvents;
