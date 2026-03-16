import React from 'react';
import type { ValueProps } from '../../types';
export type ValueProviderContextProps = {
    extend: <T = ValueProps>(props: T) => T;
    inheritedProps?: ValueProps;
    inheritedContext?: ValueProps;
};
declare const ValueProviderContext: React.Context<ValueProviderContextProps>;
export default ValueProviderContext;
