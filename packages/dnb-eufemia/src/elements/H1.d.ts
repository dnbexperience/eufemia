import * as React from 'react';
import type { SpacingProps } from '../shared/types';
type H1Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H1Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H1Size;
  children?: React.ReactNode;
}
declare const H1: React.FC<H1Props>;
export default H1;
