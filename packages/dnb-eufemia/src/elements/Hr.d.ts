import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export interface HrProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  className?: string;
  light?: boolean;
  medium?: boolean;
  fullscreen?: boolean;
}
declare const Hr: React.FC<HrProps>;
export default Hr;
