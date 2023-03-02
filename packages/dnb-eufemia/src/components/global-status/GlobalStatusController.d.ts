import * as React from 'react';
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface GlobalStatusControllerProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * The main ID. Defaults to the prop
   */
  id?: string;
  status_id?: string;
  remove_on_unmount?: boolean;
}
export default class GlobalStatusController extends React.Component<
  GlobalStatusControllerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface GlobalStatusRemoveProps {
  /**
   * The main ID. Defaults to the prop
   */
  id?: string;
  status_id: string;
}
export class GlobalStatusRemove extends React.Component<
  GlobalStatusRemoveProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
