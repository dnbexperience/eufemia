import * as React from 'react';
import type { SpacingProps } from '../shared/types';

type H6Size =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface H6Props
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  level?: string;
  size?: H6Size;
  children?: React.ReactNode;
}
declare const H6: React.FC<H6Props>;
export default H6;
