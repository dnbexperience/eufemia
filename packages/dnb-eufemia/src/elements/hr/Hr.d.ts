/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
type HrProps = SpacingProps & React.HTMLAttributes<HTMLHRElement> & {
    /**
     * To make the hr full width.
     */
    breakout?: boolean;
    /**
     * To make the hr dashed.
     */
    dashed?: boolean;
};
declare const Hr: ({ breakout, dashed, className, ...props }?: HrProps) => import("react/jsx-runtime").JSX.Element;
export default Hr;
