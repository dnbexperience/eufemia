import * as React from 'react';
export type SkeletonCircleRows = string | number;
export type SkeletonCircleChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

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
