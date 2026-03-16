/**
 * Web TermDefinition Component
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
export type TermDefinitionProps = {
    /**
     * The term shown as the anchor trigger.
     */
    children: React.ReactNode;
    /**
     * The explanatory text/content shown inside the tooltip.
     */
    content: React.ReactNode;
    /**
     * Optional CSS class for the anchor trigger.
     */
    className?: string;
    /**
     * Tooltip placement relative to the trigger.
     */
    placement?: 'top' | 'right' | 'bottom' | 'left';
};
type TermDefinitionAllProps = TermDefinitionProps & SpacingProps & React.HTMLAttributes<HTMLSpanElement>;
export default function TermDefinition(localProps: TermDefinitionAllProps): import("react/jsx-runtime").JSX.Element;
export {};
