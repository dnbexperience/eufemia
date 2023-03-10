import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export interface CodeProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  children?: React.ReactNode;
}
declare const Code: React.FC<CodeProps>;
export default Code;
