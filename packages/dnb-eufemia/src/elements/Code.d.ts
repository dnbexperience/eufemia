import * as React from 'react';
export type CodeSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type CodeTop = string | number | boolean;
export type CodeRight = string | number | boolean;
export type CodeBottom = string | number | boolean;
export type CodeLeft = string | number | boolean;

export interface CodeProps extends React.HTMLProps<HTMLElement> {
  space?: CodeSpace;
  top?: CodeTop;
  right?: CodeRight;
  bottom?: CodeBottom;
  left?: CodeLeft;
  children?: React.ReactNode;
}
declare const Code: React.FC<CodeProps>;
export default Code;
