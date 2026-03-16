import React from 'react';
import type { ListVariant } from './ListContext';
import type { Props as FlexProps } from '../flex/Container';
import type { SkeletonShow } from '../Skeleton';
export type ItemContentProps = {
    variant?: ListVariant;
    selected?: boolean;
    pending?: boolean;
    skeleton?: SkeletonShow;
} & React.HTMLAttributes<HTMLDivElement> & FlexProps;
declare function ItemContent(props: ItemContentProps): import("react/jsx-runtime").JSX.Element;
export default ItemContent;
