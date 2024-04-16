import * as React from 'react';
import type { SpacingProps } from '../space/types';
export type CustomContentTitle =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
export type CustomContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface CustomContentProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  displayName?: string;
  title?: CustomContentTitle;
  hash?: string;
  selected?: boolean;
  disabled?: boolean;
  children?: CustomContentChildren;
  className?: string;
  class?: string;
}
export default class CustomContent extends React.Component<
  CustomContentProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
