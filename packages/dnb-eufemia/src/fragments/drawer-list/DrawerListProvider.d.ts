import * as React from 'react';
export type DrawerListProviderDirection = 'auto' | 'top' | 'bottom';
export type DrawerListProviderSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large';
export type DrawerListProviderAlignDrawer = 'left' | 'right';
export type DrawerListProviderOptionsRender =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListProviderWrapperElement =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListProviderDefaultValue = string | number;
export type DrawerListProviderValue = string | number;
export type DrawerListProviderData =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | (
      | string
      | React.ReactNode
      | {
          selected_value?: string | React.ReactNode;
          suffix_value?: string | React.ReactNode;
          content?: string | React.ReactNode | string[];
        }
    )[];
export type DrawerListProviderSelectedValue = string | React.ReactNode;
export type DrawerListProviderSuffixValue = string | React.ReactNode;
export type DrawerListProviderContent =
  | string
  | React.ReactNode
  | string[];
export type DrawerListProviderRawData =
  | any[]
  | Record<string, unknown>
  | ((...args: any[]) => any);
export type DrawerListProviderSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type DrawerListProviderTop = string | number | boolean;
export type DrawerListProviderRight = string | number | boolean;
export type DrawerListProviderBottom = string | number | boolean;
export type DrawerListProviderLeft = string | number | boolean;
export type DrawerListProviderPageOffset = string | number;
export type DrawerListProviderObserverElement = string | React.ReactNode;
export type DrawerListProviderMinHeight = string | number;

export interface DrawerListProviderProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  role?: string;
  cache_hash?: string;
  triangle_position?: string;
  scrollable?: boolean;
  focusable?: boolean;
  direction?: DrawerListProviderDirection;
  size?: DrawerListProviderSize;
  max_height?: number;
  no_animation?: boolean;
  no_scroll_animation?: boolean;
  prevent_selection?: boolean;
  action_menu?: boolean;
  is_popup?: boolean;
  align_drawer?: DrawerListProviderAlignDrawer;
  options_render?: DrawerListProviderOptionsRender;
  wrapper_element?: DrawerListProviderWrapperElement;
  default_value?: DrawerListProviderDefaultValue;
  value?: DrawerListProviderValue;
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
  data?: DrawerListProviderData;
  selected_value?: DrawerListProviderSelectedValue;
  suffix_value?: DrawerListProviderSuffixValue;
  content?: DrawerListProviderContent;
  prepared_data?: any[];
  raw_data?: DrawerListProviderRawData;
  ignore_events?: boolean;
  space?: DrawerListProviderSpace;
  top?: DrawerListProviderTop;
  right?: DrawerListProviderRight;
  bottom?: DrawerListProviderBottom;
  left?: DrawerListProviderLeft;
  className?: string;
  on_show?: (...args: any[]) => any;
  on_hide?: (...args: any[]) => any;
  handle_dismiss_focus?: (...args: any[]) => any;
  on_change?: (...args: any[]) => any;
  on_pre_change?: (...args: any[]) => any;
  on_resize?: (...args: any[]) => any;
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  enable_body_lock?: boolean;
  page_offset?: DrawerListProviderPageOffset;
  observer_element?: DrawerListProviderObserverElement;
  min_height?: DrawerListProviderMinHeight;
  children: React.ReactNode;
}
export default class DrawerListProvider extends React.Component<
  DrawerListProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
