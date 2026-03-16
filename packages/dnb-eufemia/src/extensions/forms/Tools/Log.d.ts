import React from 'react';
import type { SectionAllProps } from '../../../components/Section';
declare function Log({ placeholder, label, data: logData, ...props }: Omit<SectionAllProps, 'data' | 'label'> & {
    data?: unknown;
    label?: React.ReactNode;
    placeholder?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export default Log;
