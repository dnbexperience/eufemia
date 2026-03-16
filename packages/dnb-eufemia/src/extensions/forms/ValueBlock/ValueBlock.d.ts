import React from 'react';
import type { ValueProps } from '../types';
import type { HelpProps } from '../../../components/help-button/HelpButtonInline';
/**
 * Props are documented in ValueDocs.ts
 */
export type Props = Omit<ValueProps<unknown>, 'value'> & {
    id?: string;
    /** The id to link a element with */
    forId?: string;
    /**
     * Provide help content for the value.
     */
    help?: HelpProps;
    /**
     * The layout of the value block.
     * (Undocumented for now, as there is only one layout option, vertical.)
     */
    layout?: 'vertical';
    /**
     * Used internally by the Composition component
     */
    composition?: boolean;
    /**
     * Used internally by the Composition component
     */
    gap?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | false;
    children?: React.ReactNode;
};
declare function ValueBlock(localProps: Props): import("react/jsx-runtime").JSX.Element;
export default ValueBlock;
export declare function isValueEmpty(value: unknown): boolean;
