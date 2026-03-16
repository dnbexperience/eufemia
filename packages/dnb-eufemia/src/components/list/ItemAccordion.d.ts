import React from 'react';
import type { ListVariant } from './ListContext';
import type { ItemContentProps } from './ItemContent';
import type { IconIcon } from '../icon/Icon';
export type ItemAccordionIconPosition = 'left' | 'right';
export type ItemAccordionProps = {
    variant?: ListVariant;
    open?: boolean;
    /**
     * When true, keeps the accordion content in the DOM when closed. Defaults to false.
     */
    keepInDOM?: boolean;
    chevronPosition?: ItemAccordionIconPosition;
    icon?: IconIcon;
    title?: React.ReactNode;
    id?: string;
} & Omit<ItemContentProps, 'title'>;
declare function ItemAccordion(props: ItemAccordionProps): import("react/jsx-runtime").JSX.Element;
declare namespace ItemAccordion {
    var Header: typeof AccordionHeader;
    var Content: typeof AccordionContent;
}
export type AccordionHeaderProps = {
    open?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & ItemContentProps;
declare function AccordionHeader(props: AccordionHeaderProps): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent(props: ItemContentProps): import("react/jsx-runtime").JSX.Element;
export default ItemAccordion;
