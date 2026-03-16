import type { ListVariant } from './ListContext';
import type { ItemContentProps } from './ItemContent';
import React from 'react';
import type { IconIcon } from '../icon/Icon';
export type ItemActionIconPosition = 'left' | 'right';
export type ItemActionProps = {
    variant?: ListVariant;
    selected?: boolean;
    chevronPosition?: ItemActionIconPosition;
    icon?: IconIcon;
    title?: React.ReactNode;
    href?: string;
    target?: string;
    rel?: string;
} & Omit<ItemContentProps, 'title'>;
declare function ItemAction(props: ItemActionProps): import("react/jsx-runtime").JSX.Element;
export default ItemAction;
export declare function ChevronIcon(): import("react/jsx-runtime").JSX.Element;
