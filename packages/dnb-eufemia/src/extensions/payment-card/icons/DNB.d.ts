import * as React from 'react';

export interface DNBLogoSVGProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const DNBLogoSVG: React.FC<DNBLogoSVGProps>;
export default DNBLogoSVG;
