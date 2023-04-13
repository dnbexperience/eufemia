import * as React from 'react';
export interface SVGProps extends React.HTMLProps<HTMLElement> {
  stroke?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const SVG: React.FC<SVGProps>;
export default SVG;
