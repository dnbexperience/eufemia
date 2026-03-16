/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
import type { ElementProps } from '../Element';
import type { HeadingSize } from '../../components/heading/Heading';
export type HSize = HeadingSize;
type HProps = SpacingProps & React.HTMLAttributes<HTMLHeadingElement> & {
    /**
     * Defines the Element Type, like "h1"
     * Default: h1
     */
    as?: string;
    /**
     * Makes the component use the elements heading level. e.g. h3 will make the component use level 3
     */
    level?: 'use';
    /**
     * Sets the font size based on headingSize_#{HEADING_SIZE} mixins found in typography-mixins.scss. For more detailed information go here: https://eufemia.dnb.no/uilib/typography/font-size/.
     * Use value 'auto' to base size on heading level
     * Default: xx-large
     */
    size?: HSize | 'auto';
    /**
     * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean;
} & ElementProps;
export type SharedHProps = Omit<HProps, 'as'>;
declare const H: ({ as, is, level, size, proseMaxWidth: proseMaxWidthProp, className, ...props }: HProps) => import("react/jsx-runtime").JSX.Element;
export default H;
