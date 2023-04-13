import * as React from 'react';
export interface PBSVGProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const PBSVG: React.FC<PBSVGProps>;
export default PBSVG;
