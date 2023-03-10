import * as React from 'react';
import type { SpacingProps } from '../shared/types';

export interface BlockquoteProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  children?: React.ReactNode;
}
declare const Blockquote: React.FC<BlockquoteProps>;
export default Blockquote;
