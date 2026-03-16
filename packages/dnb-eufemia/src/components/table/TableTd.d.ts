import React from 'react';
import { TableAccordionContentSingle } from './table-accordion/TableAccordionContent';
export type TableTdProps = {
    /**
     * if set to `true`, no padding will be added
     * Default: false
     */
    noSpacing?: boolean;
    /**
     * Set to `horizontal` for padding on left and right side
     * Default: undefined
     */
    spacing?: 'horizontal';
    /**
     * The content of the component.
     * Default: null
     */
    children?: React.ReactNode;
};
declare function Td(componentProps: TableTdProps & React.TdHTMLAttributes<HTMLTableCellElement>): import("react/jsx-runtime").JSX.Element;
declare namespace Td {
    var AccordionContent: typeof TableAccordionContentSingle;
}
export default Td;
