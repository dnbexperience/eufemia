import React from 'react';
import type { SpaceType, SpacingProps } from '../../shared/types';
import type { End, Start } from './types';
export declare const omitSpacingProps: <Props extends SpacingProps>(props: Props) => Omit<Props, keyof SpacingProps>;
/**
 * Picks the spacing props from the given props object.
 * @template Props - The type of the props object.
 * @param {Props} props - The props object.
 * @returns {SpacingProps} - The spacing props object.
 */
export declare function pickSpacingProps<Props extends SpacingProps>(props: Props): SpacingProps;
/**
 * Retrieves the space value of a Flex component based on the specified type and element.
 * @param type - The type of space value to retrieve (Start or End).
 * @param element - The React element to extract the space value from.
 * @returns The space value of the element, or undefined if it cannot be determined.
 */
export declare function getSpaceValue(type: Start | End, element: React.ReactNode): SpaceType | undefined;
/**
 * Checks if the provided element is a heading element.
 * @param element - The element to check.
 * @returns `true` if the element is a heading element, `false` otherwise.
 */
export declare function isHeadingElement(element: React.ReactNode): boolean;
/**
 * Determines the spacing variant of a React node element.
 * @param element - The React node element to check.
 * @returns The spacing variant (true, false or "children") of the element, or undefined if it does not support spacing props.
 */
export declare function getSpaceVariant(element: React.ReactNode): import("../../shared/helpers/withComponentMarkers").SpacingPropsVariant;
/**
 * Renders an element with spacing props applied.
 * If the element is a component that accepts spacing props, the props are directly applied.
 * If the element is a component that has children and accepts spacing props, the props are applied to the children.
 * If the element does not accept spacing props, the element is returned as is.
 *
 * @param element - The element to render with spacing props.
 * @param spaceProps - The spacing props to apply.
 * @returns The rendered element with spacing props applied.
 */
export declare function renderWithSpacing(element: React.ReactNode, spaceProps: SpacingProps & {
    key?: string;
    className?: string;
}): any;
