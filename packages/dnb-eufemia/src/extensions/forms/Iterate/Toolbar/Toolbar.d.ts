import React from 'react';
import type { SpaceAllProps } from '../../../../components/Space';
export type ToolbarParams = {
    index: number;
    items: Array<unknown>;
    value: unknown;
};
export type Props = Omit<SpaceAllProps, 'children'> & {
    children?: React.ReactNode | ((params: ToolbarParams) => React.ReactNode);
};
export default function Toolbar({ children, className, ...rest }?: Props): import("react/jsx-runtime").JSX.Element;
