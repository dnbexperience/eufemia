import * as React from 'react';

export interface MastercardSVGProps extends React.HTMLProps<HTMLElement> {
  textFill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
}
declare const MastercardSVG: React.FC<MastercardSVGProps>;
export default MastercardSVG;
