import React from 'react';
import type { DlProps } from '../../../../elements/Dl';
export type SummaryListContextProps = {
    layout?: DlProps['layout'];
    isNested?: boolean;
    verifyChild?: () => void;
};
declare const SummaryListContext: React.Context<SummaryListContextProps>;
export default SummaryListContext;
