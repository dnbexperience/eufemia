import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
export type DrawerListDirection = 'auto' | 'top' | 'bottom';
export type DrawerListSize = 'default' | 'small' | 'medium' | 'large';
export type DrawerListAlignDrawer = 'left' | 'right';
export type DrawerListOptionsRender =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListWrapperElement =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListDefaultValue = string | number;
export type DrawerListValue = string | number;
export type DrawerListDataObject = {
  selected_value?: string | React.ReactNode;
  selectedKey?: string | number;
  /** @deprecated Use "selectedKey" instead */
  selected_key?: string | number;
  suffix_value?: string | React.ReactNode;
  content?: string | React.ReactNode | string[];
  search_content?: string | React.ReactNode | string[];
};
export type DrawerListDataObjectUnion =
  | string
  | React.ReactNode
  | DrawerListDataObject;
export type DrawerListData =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | DrawerListDataObjectUnion[];
export type DrawerListSelectedValue = string | React.ReactNode;
export type DrawerListSuffixValue = string | React.ReactNode;
export type DrawerListContent = string | React.ReactNode | string[];
export type DrawerListRawData =
  | any[]
  | Record<string, unknown>
  | ((...args: any[]) => any);
export type DrawerListChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];
export type DrawerListSuffix = React.ReactNode;
export interface DrawerListProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  id?: string;
  role?: string;
  cache_hash?: string;
  triangle_position?: string;
  scrollable?: boolean;
  focusable?: boolean;
  direction?: DrawerListDirection;
  size?: DrawerListSize;
  min_height?: string | number;
  max_height?: number;
  no_animation?: boolean;
  no_scroll_animation?: boolean;
  prevent_selection?: boolean;
  action_menu?: boolean;
  is_popup?: boolean;
  align_drawer?: DrawerListAlignDrawer;
  options_render?: DrawerListOptionsRender;
  wrapper_element?: DrawerListWrapperElement;
  default_value?: DrawerListDefaultValue;
  value?: DrawerListValue;
  skip_portal?: boolean;
  portal_class?: string;
  list_class?: string;
  prevent_close?: boolean;
  independent_width?: boolean;
  fixed_position?: boolean;
  keep_open?: boolean;
  prevent_focus?: boolean;
  skip_keysearch?: boolean;
  opened?: boolean;
  class?: string;
  data?: DrawerListData;
  selected_value?: DrawerListSelectedValue;
  suffix_value?: DrawerListSuffixValue;
  content?: DrawerListContent;
  prepared_data?: any[];
  raw_data?: DrawerListRawData;
  ignore_events?: boolean;
  className?: string;
  children?: DrawerListChildren;
  suffix?: DrawerListSuffix;
  enable_body_lock?: boolean;
  page_offset?: string | number;
  observer_element?: string | React.ReactNode;
  on_show?: (...args: any[]) => any;
  on_hide?: (...args: any[]) => any;
  handle_dismiss_focus?: (...args: any[]) => any;
  on_change?: (...args: any[]) => any;
  on_pre_change?: (...args: any[]) => any;
  on_resize?: (...args: any[]) => any;
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export type DrawerListOptionsProps = {
  children: React.ReactNode;
};
export type DrawerListItemProps = {
  children: React.ReactNode;
  selected: boolean;
  value: string;
  on_click: ({ value }: { value: string }) => void;
};
export default class DrawerList extends React.Component<
  DrawerListProps,
  any
> {
  static defaultProps: object;
  static Options: (props: DrawerListOptionsProps) => JSX.Element;
  static Item: (props: DrawerListItemProps) => JSX.Element;
  render(): JSX.Element;
}
export type ItemContentChildren =
  | React.ReactNode
  | Record<string, unknown>;
export interface ItemContentProps {
  hash?: string;
  children?: ItemContentChildren;
}
export declare const ItemContent: React.FC<ItemContentProps>;
