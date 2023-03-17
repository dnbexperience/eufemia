import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { DrawerListProps } from './DrawerList';

export interface DrawerListProviderProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps,
    DrawerListProps {}
export default class DrawerListProvider extends React.Component<
  DrawerListProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
