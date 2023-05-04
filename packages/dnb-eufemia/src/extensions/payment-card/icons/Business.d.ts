import * as React from 'react';
export interface BusinessProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const Business: React.FC<BusinessProps>;
export default Business;
