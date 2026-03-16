/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
export type DivProps = SpacingProps & React.HTMLAttributes<HTMLElement>;
declare function Div({ ref, ...props }: DivProps & {
    ref?: React.Ref<HTMLElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Div;
