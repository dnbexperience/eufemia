import * as React from 'react';

export interface ClockSVGProps extends React.HTMLProps<HTMLElement> {
  stroke?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const ClockSVG: React.FC<ClockSVGProps>;
export default ClockSVG;
