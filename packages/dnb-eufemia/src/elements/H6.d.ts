import * as React from 'react';
export type H6Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H6Top = string | number | boolean;
export type H6Right = string | number | boolean;
export type H6Bottom = string | number | boolean;
export type H6Left = string | number | boolean;
export type H6Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H6Props extends React.HTMLProps<HTMLElement> {
  space?: H6Space;
  top?: H6Top;
  right?: H6Right;
  bottom?: H6Bottom;
  left?: H6Left;
  level?: string;
  size?: H6Size;
  children?: React.ReactNode;
}
declare const H6: React.FC<H6Props>;
export default H6;
