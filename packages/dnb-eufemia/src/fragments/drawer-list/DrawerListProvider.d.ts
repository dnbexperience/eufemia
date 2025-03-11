import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { DrawerListProps } from './DrawerList.tsx';

export interface DrawerListProviderProps
  extends Omit<DrawerListProps, 'children'>,
    React.HTMLProps<HTMLElement>,
    SpacingProps {
  hasFocusOnElement?: boolean;
  setState?: (state: any, cb?: any) => void;
  setHidden?: (args?: any[], onStateComplete?: any) => void;
  selectItemAndClose?: (
    itemToSelect: any,
    args?: {
      fireSelectEvent?: boolean;
      event: any;
    }
  ) => any;
  selected_item?: number;
  active_item?: number;
  showFocusRing?: boolean;
  closestToTop?: number;
  closestToBottom?: number;
  usePortal?: boolean;
  addObservers?: () => void;
  removeObservers?: () => void;
  _refShell?: React.RefObject<any>;
  _refTriangle?: React.RefObject<any>;
  _refUl?: React.RefObject<any>;
  _refRoot?: React.RefObject<any>;
  attributes?: Record<string, any>;
}
export default class DrawerListProvider extends React.Component<
  DrawerListProviderProps,
  any
> {
  static blurDelay: number;
  static defaultProps: object;
  render(): JSX.Element;
}
