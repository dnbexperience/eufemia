import * as React from 'react';
export type H1Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H1Top = string | number | boolean;
export type H1Right = string | number | boolean;
export type H1Bottom = string | number | boolean;
export type H1Left = string | number | boolean;
export type H1Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface H1Props extends React.HTMLProps<HTMLElement> {
  space?: H1Space;
  top?: H1Top;
  right?: H1Right;
  bottom?: H1Bottom;
  left?: H1Left;
  level?: string;
  size?: H1Size;
  children?: React.ReactNode;
}
declare const H1: React.FC<H1Props>;
export default H1;
