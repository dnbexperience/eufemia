import * as React from 'react';
import type { HeadingProps } from './Heading';

export interface HeadingProviderProps
  extends React.HTMLProps<HTMLElement>,
    HeadingProps {}
export default class HeadingProvider extends React.Component<
  HeadingProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
