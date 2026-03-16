import React from 'react';
import type { DrawerListDataArrayObject } from './DrawerList';
export type DrawerListItemProps = Omit<React.HTMLProps<HTMLLIElement>, 'children' | 'onClick'> & {
    children: ItemContentChildren;
    active?: boolean;
    hash?: string;
    selected?: boolean;
    /**
     * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
     */
    value?: string;
    onClick?: (params: {
        selected: boolean;
        /**
         * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
         */
        value: string;
        [key: string]: unknown;
    }) => void;
};
export declare function DrawerListItem(props: DrawerListItemProps & {
    ref?: React.Ref<HTMLLIElement>;
}): import("react/jsx-runtime").JSX.Element;
export type ItemContentChildren = React.ReactNode | DrawerListDataArrayObject;
export interface ItemContentProps {
    hash?: string;
    children?: ItemContentChildren;
}
export declare function ItemContent({ hash, children }: ItemContentProps): import("react/jsx-runtime").JSX.Element;
export type DrawerListHorizontalItemProps = {
    children: React.ReactNode;
} & Omit<React.HTMLProps<HTMLElement>, 'children'>;
export declare function DrawerListHorizontalItem({ className, ...props }: DrawerListHorizontalItemProps): import("react/jsx-runtime").JSX.Element;
