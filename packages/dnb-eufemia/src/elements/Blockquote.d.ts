import * as React from 'react';
export type BlockquoteSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type BlockquoteTop = string | number | boolean;
export type BlockquoteRight = string | number | boolean;
export type BlockquoteBottom = string | number | boolean;
export type BlockquoteLeft = string | number | boolean;

export interface BlockquoteProps extends React.HTMLProps<HTMLElement> {
  space?: BlockquoteSpace;
  top?: BlockquoteTop;
  right?: BlockquoteRight;
  bottom?: BlockquoteBottom;
  left?: BlockquoteLeft;
  children?: React.ReactNode;
}
declare const Blockquote: React.FC<BlockquoteProps>;
export default Blockquote;
