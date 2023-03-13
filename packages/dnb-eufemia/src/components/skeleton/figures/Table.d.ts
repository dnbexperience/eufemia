import * as React from 'react';
type SkeletonTableRows = string | number;
type SkeletonTableChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface SkeletonTableProps extends React.HTMLProps<HTMLElement> {
  rows?: SkeletonTableRows;
  children?: SkeletonTableChildren;
}
export default class SkeletonTable extends React.Component<
  SkeletonTableProps,
  any
> {
  render(): JSX.Element;
}
