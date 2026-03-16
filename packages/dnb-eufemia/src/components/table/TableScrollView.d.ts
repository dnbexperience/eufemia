import React from 'react';
import type { ScrollViewAllProps } from '../../fragments/scroll-view/ScrollView';
import type { SpacingProps } from '../../shared/types';
export type TableScrollViewProps = {
    /**
     * The content of the component.
     */
    children: React.ReactElement<HTMLTableElement>;
};
export type TableScrollViewAllProps = TableScrollViewProps & Omit<React.TableHTMLAttributes<HTMLDivElement>, 'children'> & SpacingProps & ScrollViewAllProps;
export default function TableScrollView(props: TableScrollViewAllProps): import("react/jsx-runtime").JSX.Element;
