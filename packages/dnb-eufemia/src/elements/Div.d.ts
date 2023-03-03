import * as React from 'react';
export type DivSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type DivTop = string | number | boolean;
export type DivRight = string | number | boolean;
export type DivBottom = string | number | boolean;
export type DivLeft = string | number | boolean;

export interface DivProps extends React.HTMLProps<HTMLElement> {
  space?: DivSpace;
  top?: DivTop;
  right?: DivRight;
  bottom?: DivBottom;
  left?: DivLeft;
  children?: React.ReactNode;
}
declare const Div: React.FC<DivProps>;
export default Div;
