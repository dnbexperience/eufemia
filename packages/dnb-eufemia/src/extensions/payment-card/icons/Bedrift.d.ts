import * as React from 'react';
export interface BedriftProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const Bedrift: React.FC<BedriftProps>;
export default Bedrift;
