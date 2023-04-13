import * as React from 'react';
export type SkeletonArticleRows = string | number;
export type SkeletonArticleChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
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
