import React from 'react';
import { ListVariant } from './ListContext';
import { Props as FlexProps } from '../flex/Stack';
export type ListContainerProps = {
    variant?: ListVariant;
    separated?: boolean;
} & React.HTMLAttributes<HTMLDivElement> & FlexProps;
declare function ListContainer(props: ListContainerProps): import("react/jsx-runtime").JSX.Element;
export default ListContainer;
