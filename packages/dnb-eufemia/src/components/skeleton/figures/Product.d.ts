import * as React from 'react';
export type SkeletonProductRows = string | number;
export type SkeletonProductChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface SkeletonProductProps
  extends React.HTMLProps<HTMLElement> {
  rows?: SkeletonProductRows;
  children?: SkeletonProductChildren;
}
export default class SkeletonProduct extends React.Component<
  SkeletonProductProps,
  any
> {
  render(): JSX.Element;
}
