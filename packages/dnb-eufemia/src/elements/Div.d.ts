import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export interface DivProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  children?: React.ReactNode;
}
declare const Div: React.FC<DivProps>;
export default Div;
