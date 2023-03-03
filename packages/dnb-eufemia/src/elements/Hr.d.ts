import * as React from 'react';
export type HrSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type HrTop = string | number | boolean;
export type HrRight = string | number | boolean;
export type HrBottom = string | number | boolean;
export type HrLeft = string | number | boolean;

export interface HrProps extends React.HTMLProps<HTMLElement> {
  space?: HrSpace;
  top?: HrTop;
  right?: HrRight;
  bottom?: HrBottom;
  left?: HrLeft;
  className?: string;
  light?: boolean;
  medium?: boolean;
  fullscreen?: boolean;
}
declare const Hr: React.FC<HrProps>;
export default Hr;
