import React from 'react';
import type { ComponentProps } from '../../types';
export type Props = ComponentProps & {
    /** JSON Pointer for where in the source dataset to point at in sub components */
    path?: string;
    iterate?: boolean;
    children?: React.ReactNode;
};
declare function At(props: Props): import("react/jsx-runtime").JSX.Element;
export default At;
