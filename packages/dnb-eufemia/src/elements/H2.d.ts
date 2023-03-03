import * as React from 'react';
export type H2Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H2Top = string | number | boolean;
export type H2Right = string | number | boolean;
export type H2Bottom = string | number | boolean;
export type H2Left = string | number | boolean;
export type H2Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H2Props extends React.HTMLProps<HTMLElement> {
  space?: H2Space;
  top?: H2Top;
  right?: H2Right;
  bottom?: H2Bottom;
  left?: H2Left;
  level?: string;
  size?: H2Size;
  children?: React.ReactNode;
}
declare const H2: React.FC<H2Props>;
export default H2;
