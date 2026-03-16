/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
type CodeProps = SpacingProps & React.HTMLAttributes<HTMLElement>;
declare function Code({ ref, ...props }: CodeProps & {
    ref?: React.Ref<HTMLElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Code;
