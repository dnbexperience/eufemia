import * as React from 'react';
export type H5Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H5Top = string | number | boolean;
export type H5Right = string | number | boolean;
export type H5Bottom = string | number | boolean;
export type H5Left = string | number | boolean;
export type H5Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H5Props extends React.HTMLProps<HTMLElement> {
  space?: H5Space;
  top?: H5Top;
  right?: H5Right;
  bottom?: H5Bottom;
  left?: H5Left;
  level?: string;
  size?: H5Size;
  children?: React.ReactNode;
}
declare const H5: React.FC<H5Props>;
export default H5;
