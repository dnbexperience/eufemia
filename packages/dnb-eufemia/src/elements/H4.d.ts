import * as React from 'react';
import type { SpacingProps } from '../shared/types';
export type H4Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H4Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H4Size;
  children?: React.ReactNode;
}
declare const H4: React.FC<H4Props>;
export default H4;
