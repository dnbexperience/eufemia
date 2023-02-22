import * as React from 'react';
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DrawerListPortalInnerRef {
  current?: React.ReactNode | Record<string, unknown>;
}
export type DrawerListPortalCurrent =
  | React.ReactNode
  | Record<string, unknown>;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DrawerListPortalRootRef {
  current?: React.ReactNode | Record<string, unknown>;
}
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

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
