import React from 'react';
import type { Props as FlexContainerProps } from '../../../../../components/flex/Container';
export type ContainerMode = 'view' | 'edit' | 'auto';
export type SectionContainerProps = {
    /**
     * Defines the variant of the ViewContainer or EditContainer. Can be `outline`.
     * Defaults to `outline`.
     */
    variant?: 'outline' | 'basic' | 'filled';
};
export type Props = {
    mode: ContainerMode;
    open?: boolean | undefined;
    ariaLabel?: string;
    omitFocusManagementRef?: React.RefObject<boolean | undefined>;
} & SectionContainerProps;
declare function SectionContainer(props: Props & FlexContainerProps): import("react/jsx-runtime").JSX.Element;
export default SectionContainer;
