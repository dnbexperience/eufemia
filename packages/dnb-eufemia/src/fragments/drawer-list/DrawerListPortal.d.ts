import * as React from 'react';
export interface DrawerListPortalInnerRef {
  current?: React.ReactNode | Record<string, unknown>;
}
export type DrawerListPortalCurrent =
  | React.ReactNode
  | Record<string, unknown>;
export interface DrawerListPortalRootRef {
  current?: React.ReactNode | Record<string, unknown>;
}
export interface DrawerListPortalProps
  extends React.HTMLProps<HTMLElement> {
  id: string;
  children: React.ReactNode;
  opened: boolean;
  innerRef?: DrawerListPortalInnerRef;
  current?: DrawerListPortalCurrent;
  rootRef: DrawerListPortalRootRef;
  include_owner_width?: boolean;
  independent_width?: boolean;
  fixed_position?: boolean;
  className?: string;
}
export default class DrawerListPortal extends React.Component<
  DrawerListPortalProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
