/**
 * Web TableContext Context
 *
 */
import React from 'react';
import type { TableTrProps } from '../TableTr';
type TableAccordionContextProps = {
    toggleOpenTr: (event: React.SyntheticEvent, allowInteractiveElement?: boolean) => void;
    trIsOpen: boolean;
    keepInDOM: TableTrProps['keepInDOM'];
    countTds: number;
    noAnimation: TableTrProps['noAnimation'];
    onOpen: TableTrProps['onOpen'];
    onClose: TableTrProps['onClose'];
};
export declare const TableAccordionContext: React.Context<TableAccordionContextProps>;
export {};
