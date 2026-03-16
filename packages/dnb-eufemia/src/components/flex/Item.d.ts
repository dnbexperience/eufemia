import React from 'react';
import { SpaceProps } from '../space/Space';
export type Spans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
type MediaSpans = {
    xsmall?: Spans;
    small?: Spans;
    medium?: Spans;
    large?: Spans;
};
export type Span = MediaSpans | Spans;
export type BasicProps = {
    grow?: boolean;
    shrink?: boolean;
    alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    span?: Span;
    ref?: React.Ref<HTMLElement>;
};
export type Props = BasicProps & SpaceProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'wrap' | 'span'>;
declare function FlexItem(props: Props): import("react/jsx-runtime").JSX.Element;
export default FlexItem;
