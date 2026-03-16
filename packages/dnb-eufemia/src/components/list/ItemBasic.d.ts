import React from 'react';
import type { ItemContentProps } from './ItemContent';
import type { IconIcon } from '../icon/Icon';
export type ItemBasicProps = {
    icon?: IconIcon;
    title?: React.ReactNode;
} & Omit<ItemContentProps, 'title'>;
declare function ItemBasic(props: ItemBasicProps): import("react/jsx-runtime").JSX.Element;
export default ItemBasic;
