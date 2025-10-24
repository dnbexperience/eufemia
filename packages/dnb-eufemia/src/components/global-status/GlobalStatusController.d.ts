import * as React from 'react';
export interface GlobalStatusControllerProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  statusId?: string;
  removeOnUnmount?: boolean;
}
export default class GlobalStatusController extends React.Component<
  GlobalStatusControllerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
export interface GlobalStatusRemoveProps {
  id?: string;
  statusId: string;
}
export class GlobalStatusRemove extends React.Component<
  GlobalStatusRemoveProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
export interface GlobalStatusInterceptorProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
}
export class GlobalStatusInterceptor extends React.Component<
  GlobalStatusInterceptorProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
  add: (props: { statusId: string; item?: GlobalStatusItem }) => void;
}
