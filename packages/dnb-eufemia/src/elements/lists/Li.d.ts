/**
 * HTML Element
 *
 */
import React from 'react';
import type { ElementProps } from '../Element';
export type LiAllProps = React.AllHTMLAttributes<HTMLLIElement> & ElementProps;
declare const Li: ({ className, ...props }?: LiAllProps) => import("react/jsx-runtime").JSX.Element;
export default Li;
