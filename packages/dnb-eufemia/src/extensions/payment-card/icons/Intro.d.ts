import * as React from 'react';
export interface IntroProps extends React.HTMLProps<HTMLElement> {
  /**
   * function fill() { [native code] }
   */
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const Intro: React.FC<IntroProps>;
export default Intro;
