import * as React from 'react';
export type H4Space =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type H4Top = string | number | boolean;
export type H4Right = string | number | boolean;
export type H4Bottom = string | number | boolean;
export type H4Left = string | number | boolean;
export type H4Size =
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

export interface H4Props extends React.HTMLProps<HTMLElement> {
  space?: H4Space;
  top?: H4Top;
  right?: H4Right;
  bottom?: H4Bottom;
  left?: H4Left;
  level?: string;
  size?: H4Size;
  children?: React.ReactNode;
}
declare const H4: React.FC<H4Props>;
export default H4;
