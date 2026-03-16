/**
 * Web TableContext Context
 *
 */
import React from 'react';
import type { Translation } from '../../shared/Context';
import type { TableAllProps } from './Table';
type TableContextProps = {
    trCountRef: React.RefObject<{
        count: number;
    }>;
    rerenderAlias: Record<string, never>;
    collapseTrCallbacks: React.RefObject<(() => void)[]>;
    allProps: TableAllProps & Translation['Table'];
    hasAccordionRows?: boolean;
};
export declare const TableContext: React.Context<TableContextProps>;
export {};
