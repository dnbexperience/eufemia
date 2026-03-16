import React from 'react';
import { TableAccordionContentRow } from './table-accordion/TableAccordionContent';
export type TableTrProps = {
    /**
     * The variant of the tr
     */
    variant?: 'even' | 'odd';
    /**
     * If set to true, the inherited header text will not wrap to new lines.
     * Default: false
     */
    noWrap?: boolean;
    /**
     * Set true to render the tr initially as expanded.
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
     * Default: false
     */
    expanded?: boolean;
    /**
     * Set true to disable the tr to be accessible as an interactive element.
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"`prop in main Table.
     * Default: false
     */
    disabled?: boolean;
    /**
     * Set to true to skip animation.
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
     * Default: false
     */
    noAnimation?: boolean;
    /**
     * Set to `true` to keep the accordion content in the DOM when closed.
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
     * Default: false
     */
    keepInDOM?: boolean;
    /**
     * Will emit when user clicks/expands or on keydown space/enter(in mode="accordion" and mode="navigation") in the table row.
     * Is part of the mode feature and needs to be enabled with the `mode` prop in main Table.
     */
    onClick?: (event: React.SyntheticEvent) => void;
    /**
     * Will emit when table row is expanded.
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
     */
    onOpen?: ({ target }: {
        target: HTMLTableRowElement;
    }) => void;
    /**
     * Will emit when table row is closed (after it was open)
     * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
     */
    onClose?: ({ target }: {
        target: HTMLTableRowElement;
    }) => void;
    /**
     * The content of the component.
     */
    children: React.ReactNode;
};
declare function Tr(componentProps: TableTrProps & React.TableHTMLAttributes<HTMLTableRowElement>): import("react/jsx-runtime").JSX.Element;
declare namespace Tr {
    var AccordionContent: typeof TableAccordionContentRow;
}
export default Tr;
/**
 * Handle odd/even on re-render and React.StrictMode
 */
export declare function useHandleOddEven({ children }: {
    children: any;
}): {
    trCountRef: React.RefObject<{
        count: number;
    }>;
    rerenderAlias: {};
    setRerenderAlias: React.Dispatch<React.SetStateAction<{}>>;
};
