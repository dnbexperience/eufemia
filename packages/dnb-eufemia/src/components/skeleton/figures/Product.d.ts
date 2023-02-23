import * as React from 'react';
export type SkeletonProductRows = string | number;
export type SkeletonProductChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

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
