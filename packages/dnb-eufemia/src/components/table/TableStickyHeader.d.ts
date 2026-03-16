import React from 'react';
export type StickyTableHeaderProps = {
    /**
     * Makes the Table header sticky
     * Default: false
     */
    sticky?: boolean | 'css-position';
    /**
     * The offset from top in rem or em unit
     * Default: false
     */
    stickyOffset?: string | number;
};
export declare const useStickyHeader: ({ sticky, stickyOffset, }: StickyTableHeaderProps) => {
    elementRef: React.RefObject<HTMLTableElement>;
};
