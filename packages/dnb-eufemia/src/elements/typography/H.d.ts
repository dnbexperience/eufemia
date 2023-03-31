import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
export type HSize =
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';

export interface HProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  as?: string;
  level?: string;
  size?: HSize;
  children?: React.ReactNode;
}

export type SharedHProps = Omit<HProps, 'as'>;

export default class H extends React.Component<HProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
