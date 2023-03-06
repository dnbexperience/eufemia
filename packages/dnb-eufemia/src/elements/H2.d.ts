import * as React from 'react';
import type { SpacingProps } from '../shared/types';
export type H2Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H2Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H2Size;
  children?: React.ReactNode;
}
declare const H2: React.FC<H2Props>;
export default H2;
