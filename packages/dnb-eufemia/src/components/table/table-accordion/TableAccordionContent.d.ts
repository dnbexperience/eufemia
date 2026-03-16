import React from 'react';
type TableAccordionContentProps = {
    /** Set to true to expanded the content on initial render */
    expanded?: boolean;
    /** Set to true to skip animation */
    noAnimation?: boolean;
    /** Overwrite the internal collected colSpan (add +1) */
    colSpan?: number;
    variant: 'row' | 'single';
} & React.TableHTMLAttributes<HTMLTableRowElement>;
export type TableAccordionContentRowProps = Omit<TableAccordionContentProps, 'variant' | 'colSpan'>;
export type TableAccordionContentSingleProps = Omit<TableAccordionContentProps, 'variant'>;
export declare function TableAccordionContentRow(props: TableAccordionContentRowProps): import("react/jsx-runtime").JSX.Element;
export declare function TableAccordionContentSingle({ colSpan, ...props }: TableAccordionContentSingleProps): import("react/jsx-runtime").JSX.Element;
export {};
