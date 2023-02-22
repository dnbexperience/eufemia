import * as React from 'react';
export type SkeletonArticleRows = string | number;
export type SkeletonArticleChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface SkeletonArticleProps
  extends React.HTMLProps<HTMLElement> {
  rows?: SkeletonArticleRows;
  children?: SkeletonArticleChildren;
}
export default class SkeletonArticle extends React.Component<
  SkeletonArticleProps,
  any
> {
  render(): JSX.Element;
}
