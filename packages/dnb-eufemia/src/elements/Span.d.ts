import * as React from 'react';
export type SpanSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type SpanTop = string | number | boolean;
export type SpanRight = string | number | boolean;
export type SpanBottom = string | number | boolean;
export type SpanLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface SpanProps extends React.HTMLProps<HTMLElement> {
  space?: SpanSpace;
  top?: SpanTop;
  right?: SpanRight;
  bottom?: SpanBottom;
  left?: SpanLeft;
  children?: React.ReactNode;
}
declare const Span: React.FC<SpanProps>;
export default Span;
