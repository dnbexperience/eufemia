import * as React from 'react';
export interface GlobalStatusControllerProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  status_id?: string;
  remove_on_unmount?: boolean;
}
export default class GlobalStatusController extends React.Component<
  GlobalStatusControllerProps,
  unknown
> {
  static defaultProps: Partial<GlobalStatusControllerProps>;
  render(): JSX.Element;
}
export interface GlobalStatusRemoveProps {
  id?: string;
  status_id: string;
}
export class GlobalStatusRemove extends React.Component<
  GlobalStatusRemoveProps,
  unknown
> {
  static defaultProps: Partial<GlobalStatusRemoveProps>;
  render(): JSX.Element;
}
export interface GlobalStatusInterceptorProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
}
export class GlobalStatusInterceptor extends React.Component<
  GlobalStatusInterceptorProps,
  unknown
> {
  static defaultProps: Partial<GlobalStatusInterceptorProps>;
  render(): JSX.Element;
  add: (props: { status_id: string; item?: GlobalStatusItem }) => void;
}
