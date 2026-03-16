import React from 'react';
import type { SpaceProps } from '../../../../components/Space';
import type { SubmitState } from '../../types';
export type Props = {
    state: SubmitState;
    label?: React.ReactNode;
    showLabel?: boolean;
    className?: string;
    children?: React.ReactNode;
} & SpaceProps;
declare function SubmitIndicator(props: Props): import("react/jsx-runtime").JSX.Element;
export default SubmitIndicator;
