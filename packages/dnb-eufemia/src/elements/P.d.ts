import * as React from 'react';
export type PSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type PTop = string | number | boolean;
export type PRight = string | number | boolean;
export type PBottom = string | number | boolean;
export type PLeft = string | number | boolean;
export type PSize =
  | 'x-small'
  | 'small'
  | 'basis'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large';

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface PProps
  extends Omit<React.HTMLProps<HTMLElement>, 'size'> {
  space?: PSpace;
  top?: PTop;
  right?: PRight;
  bottom?: PBottom;
  left?: PLeft;
  element?: React.ReactNode;
  className?: string;
  small?: boolean;
  medium?: boolean;
  bold?: boolean;
  size?: PSize;
  style_type?: string;
  modifier?: string;
  children?: React.ReactNode;
}
declare const P: React.FC<PProps>;
export default P;
