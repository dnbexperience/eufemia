import React from 'react';
import type { SpaceProps } from '../space/Space';
import type { MediaQueryBreakpoints } from '../../shared/MediaQueryUtils';
import type { UseMediaQueries } from '../../shared/useMedia';
type Gap = false | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
export type BasicProps = {
    direction?: 'horizontal' | 'vertical';
    wrap?: boolean;
    rowGap?: Gap;
    sizeCount?: number;
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    /** For when used as a flex item in an outer container in addition to being a container: */
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    /** When "line-framed" is used, a line will be shown between items and above the first and below the last item */
    divider?: 'space' | 'line' | 'line-framed';
    /** Spacing between items inside */
    gap?: Gap;
    breakpoints?: MediaQueryBreakpoints;
    queries?: UseMediaQueries;
};
export type Props = BasicProps & SpaceProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'ref' | 'wrap' | 'value' | 'label' | 'title' | 'placeholder'>;
export declare function pickFlexContainerProps<T extends Props>(props: T, defaults?: Partial<Props>, skip?: Array<keyof Props>): Omit<Props, 'children'>;
declare function FlexContainer(props: Props): import("react/jsx-runtime").JSX.Element;
export default FlexContainer;
