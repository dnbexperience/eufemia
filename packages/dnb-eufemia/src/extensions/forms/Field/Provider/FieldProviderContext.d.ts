import React from 'react';
import type { UseFieldProps } from '../../types';
export type FieldProviderContextProps = {
    extend: <T = UseFieldProps>(props: T) => T;
    inheritedProps?: UseFieldProps;
    inheritedContext?: UseFieldProps;
};
declare const FieldProviderContext: React.Context<FieldProviderContextProps>;
export default FieldProviderContext;
