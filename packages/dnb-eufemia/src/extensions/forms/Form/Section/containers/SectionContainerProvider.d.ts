import React from 'react';
import type { ContainerMode } from './SectionContainer';
export type Props = {
    validateInitially?: boolean;
    containerMode?: ContainerMode;
    disableEditing?: boolean;
    children: React.ReactNode;
};
declare function SectionContainerProvider(props: Props): import("react/jsx-runtime").JSX.Element;
export default SectionContainerProvider;
