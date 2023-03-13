import * as React from 'react';
import type { SpacingProps } from '../shared/types';
type H5Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H5Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H5Size;
  children?: React.ReactNode;
}
declare const H5: React.FC<H5Props>;
export default H5;
