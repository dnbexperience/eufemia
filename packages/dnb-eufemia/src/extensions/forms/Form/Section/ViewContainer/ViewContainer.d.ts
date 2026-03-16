import React from 'react';
import type { Props as FlexContainerProps } from '../../../../../components/flex/Container';
import type { SectionContainerProps } from '../containers/SectionContainer';
export type Props = {
    title?: React.ReactNode;
    onEdit?: () => void;
};
export type AllProps = Props & SectionContainerProps & FlexContainerProps;
declare function ViewContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
declare namespace ViewContainer {
    var EditButton: typeof import("./EditButton").default;
}
export default ViewContainer;
