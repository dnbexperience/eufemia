import * as React from 'react';

export interface AlignmentHelperProps
  extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}
declare const AlignmentHelper: React.FC<AlignmentHelperProps>;
export default AlignmentHelper;
