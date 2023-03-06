import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export type PSize =
  | 'x-small'
  | 'small'
  | 'basis'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large';

export interface PProps
  extends Omit<React.HTMLProps<HTMLElement>, 'size'>,
    SpacingProps {
  element?: React.ReactNode;
  className?: string;
  small?: boolean;
  medium?: boolean;
  bold?: boolean;
  size?: PSize;
  modifier?: string;
  children?: React.ReactNode;
}
declare const P: React.FC<PProps>;
export default P;
