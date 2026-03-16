import React from 'react';
import type { ValueProps } from '../../types';
export type Props = ValueProps<boolean> & {
    trueText?: React.ReactNode;
    falseText?: React.ReactNode;
};
declare function BooleanComponent(props: Props): import("react/jsx-runtime").JSX.Element;
export default BooleanComponent;
