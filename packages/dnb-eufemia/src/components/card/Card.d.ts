import React from 'react';
import type { SectionProps } from '../section/Section';
import type { BasicProps as FlexContainerProps } from '../flex/Container';
import type { BasicProps as FlexItemProps } from '../flex/Item';
import type { SpaceProps } from '../Space';
export type Props = {
    /**
     * Define a title that appears on top of the Card
     */
    title?: React.ReactNode;
    /**
     * Define if the Card should behave responsive. Defaults to `true`
     */
    responsive?: boolean;
    /**
     * Define if the Card should get the same background color as the outline border
     */
    filled?: boolean;
} & FlexContainerProps & Pick<SectionProps, 'outset' | 'outline' | 'outlineWidth' | 'dropShadow' | 'backgroundColor'> & FlexItemProps & {
    stack?: boolean;
} & SpaceProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'title' | 'span'>;
declare function Card(props: Props): import("react/jsx-runtime").JSX.Element;
export default Card;
