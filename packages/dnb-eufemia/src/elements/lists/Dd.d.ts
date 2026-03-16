/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
export type DdProps = {
    className?: string;
    children: React.ReactNode;
};
declare function Dd({ ref, ...props }: DdProps & SpacingProps & {
    ref?: React.Ref<HTMLElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Dd;
