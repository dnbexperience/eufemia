import React from 'react';
import type { ContainerMode } from './SectionContainer';
export interface SectionContainerContextState {
    validateInitially?: boolean;
    containerMode?: ContainerMode;
    initialContainerMode?: ContainerMode;
    switchContainerMode?: (mode: ContainerMode) => void;
    disableEditing?: boolean;
}
declare const SectionContainerContext: React.Context<SectionContainerContextState>;
export default SectionContainerContext;
