import React from 'react';
import type { TableTrProps } from './TableTr';
export type TableClickableHeadProps = {
    trIsOpen?: boolean;
    trIsHover?: boolean;
    trHadClick?: boolean;
    clickable: boolean;
    noAnimation?: boolean;
    ariaLabel: string;
} & TableTrProps & React.TableHTMLAttributes<HTMLTableRowElement>;
export declare function TableClickableHead(allProps: TableClickableHeadProps): import("react/jsx-runtime").JSX.Element;
export declare function onClickTr(event: React.SyntheticEvent, allowInteractiveElement?: boolean, onClick?: (event: React.SyntheticEvent) => void): void;
export declare function TableClickableButtonTd(props: {
    trIsOpen?: boolean;
    ariaLabel: string;
    icon: 'chevron_down' | 'chevron_right';
    onClick: (event: React.SyntheticEvent, allowInteractiveElement: boolean) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function TableIconSrTh(props: {
    text: string;
}): import("react/jsx-runtime").JSX.Element;
export declare const isTableHead: (children: React.ReactNode[]) => boolean;
