import React from 'react';
import type { Props as FlexContainerProps } from '../../../../components/flex/Container';
import type { ArrayItemAreaProps } from '../Array/ArrayItemArea';
export type Props = {
    /**
     * The title of the ViewContainer.
     */
    title?: React.ReactNode;
    /**
     * An alternative toolbar to be shown in the ViewContainer.
     */
    toolbar?: React.ReactNode;
    /**
     * The variant of the toolbar.
     */
    toolbarVariant?: ArrayItemAreaProps['toolbarVariant'];
};
export type AllProps = Props & Omit<FlexContainerProps, 'onAnimationEnd'> & ArrayItemAreaProps;
declare function ViewContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
declare namespace ViewContainer {
    var EditButton: typeof import("./EditButton").default;
    var RemoveButton: typeof import("./RemoveButton").default;
}
export default ViewContainer;
