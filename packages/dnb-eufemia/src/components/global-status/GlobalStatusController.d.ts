import * as React from 'react';
export interface GlobalStatusControllerProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  statusId?: string;
  removeOnUnmount?: boolean;
}
declare const GlobalStatusController: React.ComponentClass<GlobalStatusControllerProps> & {
  defaultProps: object;
};
export default GlobalStatusController;
export interface GlobalStatusRemoveProps {
  id?: string;
  statusId: string;
}
export declare const GlobalStatusRemove: React.ComponentClass<GlobalStatusRemoveProps> & {
  defaultProps: object;
};
export interface GlobalStatusInterceptorProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
}
export declare class GlobalStatusInterceptor {
  constructor(props: GlobalStatusInterceptorProps);
  add(props: Record<string, unknown>): void;
  update(props: Record<string, unknown>): void;
  remove(): void;
}
