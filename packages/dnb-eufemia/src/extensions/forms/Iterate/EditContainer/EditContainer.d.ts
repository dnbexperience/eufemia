import React from 'react';
import type { Props as FlexContainerProps } from '../../../../components/flex/Container';
import type { ArrayItemAreaProps } from '../Array/ArrayItemArea';
export type Props = {
    /**
     * The title of the EditContainer.
     */
    title?: React.ReactNode;
    /**
     * The title for a new item show within the EditContainer.
     */
    titleWhenNew?: React.ReactNode;
    /**
     * If the EditContainer is open or not.
     */
    open?: boolean;
    /**
     * An alternative toolbar to be shown in the EditContainer.
     */
    toolbar?: React.ReactNode;
    /**
     * The variant of the toolbar.
     */
    toolbarVariant?: ArrayItemAreaProps['toolbarVariant'];
};
export type AllProps = Props & Omit<FlexContainerProps, 'onAnimationEnd'> & ArrayItemAreaProps;
declare function EditContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
declare namespace EditContainer {
    var DoneButton: typeof import("./DoneButton").default;
    var CancelButton: typeof import("./CancelButton").default;
}
export default EditContainer;
export declare function EditContainerWithoutToolbar(props: Props & Omit<FlexContainerProps, 'onAnimationEnd'> & {
    toolbar?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
