import React from 'react';
import type { TableTrProps } from '../TableTr';
export type TableAccordionHeadProps = {
    /** The row number */
    count: number;
} & TableTrProps & React.TableHTMLAttributes<HTMLTableRowElement>;
export declare function TableAccordionHead(allProps: TableAccordionHeadProps): import("react/jsx-runtime").JSX.Element;
