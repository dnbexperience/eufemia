import * as React from 'react';
export type H3Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H3Top = string | number | boolean;
export type H3Right = string | number | boolean;
export type H3Bottom = string | number | boolean;
export type H3Left = string | number | boolean;
export type H3Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H3Props extends React.HTMLProps<HTMLElement> {
  space?: H3Space;
  top?: H3Top;
  right?: H3Right;
  bottom?: H3Bottom;
  left?: H3Left;
  level?: string;
  size?: H3Size;
  children?: React.ReactNode;
}
declare const H3: React.FC<H3Props>;
export default H3;
