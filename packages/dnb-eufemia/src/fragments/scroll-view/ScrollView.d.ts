/**
 * Web ScrollView Component
 *
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
export type ScrollViewProps = {
    /**
     * To make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation.
     * Default: false
     */
    interactive?: boolean | 'auto';
};
export type ScrollViewAllProps = ScrollViewProps & SpacingProps & Partial<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>> & {
    ref?: React.Ref<unknown>;
};
declare function ScrollView(localProps: ScrollViewAllProps): import("react/jsx-runtime").JSX.Element;
export default ScrollView;
