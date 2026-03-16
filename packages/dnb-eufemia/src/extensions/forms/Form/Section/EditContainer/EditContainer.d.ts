import React from 'react';
import type { Props as FlexContainerProps } from '../../../../../components/flex/Container';
import { SectionContainerProps } from '../containers/SectionContainer';
export type Props = {
    title?: React.ReactNode;
    onDone?: () => void;
    onCancel?: () => void;
};
export type AllProps = Props & SectionContainerProps & FlexContainerProps;
declare function EditContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
declare namespace EditContainer {
    var DoneButton: typeof import("./DoneButton").default;
    var CancelButton: typeof import("./CancelButton").default;
}
export default EditContainer;
