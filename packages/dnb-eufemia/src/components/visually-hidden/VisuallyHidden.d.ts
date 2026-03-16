import React from 'react';
import type { DynamicElement } from '../../shared/types';
export interface VisuallyHiddenProps {
    /**
     * Hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user)
     * Default: false
     */
    focusable?: boolean;
    /**
     * Root element of the component
     * Default: span
     */
    element?: DynamicElement;
}
export type VisuallyHiddenAllProps = VisuallyHiddenProps & React.HTMLProps<HTMLSpanElement>;
declare const VisuallyHidden: (localProps: VisuallyHiddenAllProps) => import("react/jsx-runtime").JSX.Element;
export default VisuallyHidden;
