import * as React from 'react';

export interface PlussProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const Pluss: React.FC<PlussProps>;
export default Pluss;
