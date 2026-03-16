/**
 * HTML Element
 *
 */
import React from 'react';
import { TypographyProps } from '../typography/Typography';
type SpanProps = TypographyProps<HTMLSpanElement>;
declare function Span({ ref, ...props }: SpanProps & {
    ref?: React.Ref<HTMLSpanElement>;
}): import("react/jsx-runtime").JSX.Element;
export default Span;
