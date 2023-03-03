import * as React from 'react';
export type HSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type HTop = string | number | boolean;
export type HRight = string | number | boolean;
export type HBottom = string | number | boolean;
export type HLeft = string | number | boolean;
export type HSize =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface HProps extends React.HTMLProps<HTMLElement> {
  space?: HSpace;
  top?: HTop;
  right?: HRight;
  bottom?: HBottom;
  left?: HLeft;
  className?: string;
  as?: string;
  level?: string;
  size?: HSize;
  children?: React.ReactNode;
}
export default class H extends React.Component<HProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
