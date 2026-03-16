import React from 'react';
import type { Path, ValueProps } from '../../types';
export type ValueProviderProps = {
    children: React.ReactNode;
    overwriteProps?: {
        [key: Path]: ValueProps;
    };
} & ValueProps;
declare function ValueProviderProvider(props: ValueProviderProps): import("react/jsx-runtime").JSX.Element;
export default ValueProviderProvider;
