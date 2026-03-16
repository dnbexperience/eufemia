import React from 'react';
import type { DlAllProps } from '../../../../elements/Dl';
import type { ValueProps } from '../../types';
export type Props = Omit<DlAllProps, 'label' | 'labelSrOnly' | 'children'> & {
    children: React.ReactNode;
    transformLabel?: ValueProps['transformLabel'];
    inheritVisibility?: ValueProps['inheritVisibility'];
    inheritLabel?: ValueProps['inheritLabel'];
};
declare function SummaryList(props: Props): import("react/jsx-runtime").JSX.Element;
export default SummaryList;
