import * as React from 'react';
import type { SpacingProps } from '../shared/types';
type H3Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H3Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H3Size;
  children?: React.ReactNode;
}
declare const H3: React.FC<H3Props>;
export default H3;
