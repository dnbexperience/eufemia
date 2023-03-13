import * as React from 'react';
type SkeletonCircleRows = string | number;
type SkeletonCircleChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface SkeletonCircleProps extends React.HTMLProps<HTMLElement> {
  rows?: SkeletonCircleRows;
  children?: SkeletonCircleChildren;
}
export default class SkeletonCircle extends React.Component<
  SkeletonCircleProps,
  any
> {
  render(): JSX.Element;
}
