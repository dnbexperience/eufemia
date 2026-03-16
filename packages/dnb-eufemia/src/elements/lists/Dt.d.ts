/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
export type DtProps = React.AllHTMLAttributes<HTMLDListElement>;
declare function Dt({ ref, ...props }: DtProps & SpacingProps & {
    ref?: React.Ref<HTMLDListElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Dt;
