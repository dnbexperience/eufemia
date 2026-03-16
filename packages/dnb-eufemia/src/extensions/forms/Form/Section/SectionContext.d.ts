import React from 'react';
import type { Path } from '../../types';
import type { SectionProps } from '.';
export interface SectionContextState {
    path?: Path;
    props?: SectionProps;
    errorPrioritization?: Array<'fieldSchema' | 'sectionSchema' | 'contextSchema'>;
}
declare const SectionContext: React.Context<SectionContextState>;
export default SectionContext;
