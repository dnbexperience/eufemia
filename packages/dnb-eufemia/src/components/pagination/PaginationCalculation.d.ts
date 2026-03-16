/**
 * Pagination Calculate
 *
 */
export declare const calculatePagination: (pageCount: number, currentPage: number, isSmallScreen?: boolean) => Array<Array<number>>;
export declare const getDotsAriaLabel: ({ morePages, numbersList: nList, pageNumberGroups: pGroups, }: {
    morePages: string;
    numbersList: Array<number>;
    pageNumberGroups: Array<Array<number>>;
}) => string;
