/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
type BlockquoteProps = SpacingProps & React.HTMLAttributes<HTMLElement> & {
    /**
     * Hides the blockquote background by making it transparent
     */
    noBackground?: boolean;
    /**
     * Determines the flow direction of the content inside of blockquote. Can be either `horizontal` or `vertical`
     * Default: `horizontal`
     */
    direction?: 'horizontal' | 'vertical';
};
declare function Blockquote({ noBackground, direction, className, ref, ...props }: BlockquoteProps & {
    ref?: React.Ref<HTMLQuoteElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Blockquote;
