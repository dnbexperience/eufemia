import * as React from 'react';
export interface VisaSVGProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const VisaSVG: React.FC<VisaSVGProps>;
export default VisaSVG;
