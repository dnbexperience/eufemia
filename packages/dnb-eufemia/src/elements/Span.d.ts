import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export interface SpanProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  children?: React.ReactNode;
}
declare const Span: React.FC<SpanProps>;
export default Span;
