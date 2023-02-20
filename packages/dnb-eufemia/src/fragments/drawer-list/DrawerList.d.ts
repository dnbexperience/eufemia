import * as React from 'react';
export type DrawerListScrollable = string | boolean;
export type DrawerListFocusable = string | boolean;
export type DrawerListDirection = 'auto' | 'top' | 'bottom';
export type DrawerListSize = 'default' | 'small' | 'medium' | 'large';
export type DrawerListNoAnimation = string | boolean;
export type DrawerListNoScrollAnimation = string | boolean;
export type DrawerListPreventSelection = string | boolean;
export type DrawerListActionMenu = string | boolean;
export type DrawerListIsPopup = string | boolean;
export type DrawerListAlignDrawer = 'left' | 'right';
export type DrawerListOptionsRender =
  | Record<string, string>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListWrapperElement =
  | Record<string, string>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DrawerListDefaultValue = string | number;
export type DrawerListValue = string | number;
export type DrawerListSkipPortal = string | boolean;
export type DrawerListPreventClose = string | boolean;
export type DrawerListIndependentWidth = string | boolean;
export type DrawerListFixedPosition = string | boolean;
export type DrawerListKeepOpen = string | boolean;
export type DrawerListPreventFocus = string | boolean;
export type DrawerListSkipKeysearch = string | boolean;
export type DrawerListOpened = string | boolean;
export type DrawerListData =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, string>
  | (
      | string
      | React.ReactNode
      | {
          selected_value?: string | React.ReactNode;
          suffix_value?: string | React.ReactNode;
          content?: string | React.ReactNode | string[];
        }
    )[];
export type DrawerListSelectedValue = string | React.ReactNode;
export type DrawerListSuffixValue = string | React.ReactNode;
export type DrawerListContent = string | React.ReactNode | string[];
export type DrawerListRawData =
  | any[]
  | Record<string, string>
  | ((...args: any[]) => any);
export type DrawerListIgnoreEvents = string | boolean;
export type DrawerListSpace =
  | string
  | number
  | boolean
  | {
      top?: string | number | boolean;
      right?: string | number | boolean;
      bottom?: string | number | boolean;
      left?: string | number | boolean;
    };
export type DrawerListTop = string | number | boolean;
export type DrawerListRight = string | number | boolean;
export type DrawerListBottom = string | number | boolean;
export type DrawerListLeft = string | number | boolean;
export type DrawerListChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, string>
  | any[];
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DrawerListProps extends React.HTMLProps<HTMLElement> {
  id?: string;
  role?: string;
  cache_hash?: string;
  triangle_position?: string;
  scrollable?: DrawerListScrollable;
  focusable?: DrawerListFocusable;
  direction?: DrawerListDirection;
  size?: DrawerListSize;
  max_height?: number;
  no_animation?: DrawerListNoAnimation;
  no_scroll_animation?: DrawerListNoScrollAnimation;
  prevent_selection?: DrawerListPreventSelection;
  action_menu?: DrawerListActionMenu;
  is_popup?: DrawerListIsPopup;
  align_drawer?: DrawerListAlignDrawer;
  options_render?: DrawerListOptionsRender;
  wrapper_element?: DrawerListWrapperElement;
  default_value?: DrawerListDefaultValue;
  value?: DrawerListValue;
  skip_portal?: DrawerListSkipPortal;
  portal_class?: string;
  list_class?: string;
  prevent_close?: DrawerListPreventClose;
  independent_width?: DrawerListIndependentWidth;
  fixed_position?: DrawerListFixedPosition;
  keep_open?: DrawerListKeepOpen;
  prevent_focus?: DrawerListPreventFocus;
  skip_keysearch?: DrawerListSkipKeysearch;
  opened?: DrawerListOpened;
  class?: string;
  data?: DrawerListData;
  selected_value?: DrawerListSelectedValue;
  suffix_value?: DrawerListSuffixValue;
  content?: DrawerListContent;
  prepared_data?: any[];
  raw_data?: DrawerListRawData;
  ignore_events?: DrawerListIgnoreEvents;
  space?: DrawerListSpace;
  top?: DrawerListTop;
  right?: DrawerListRight;
  bottom?: DrawerListBottom;
  left?: DrawerListLeft;
  className?: string;
  children?: DrawerListChildren;
  on_show?: (...args: any[]) => any;
  on_hide?: (...args: any[]) => any;
  handle_dismiss_focus?: (...args: any[]) => any;
  on_change?: (...args: any[]) => any;
  on_pre_change?: (...args: any[]) => any;
  on_resize?: (...args: any[]) => any;
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class DrawerList extends React.Component<
  DrawerListProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
export type ItemContentChildren = React.ReactNode | Record<string, string>;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface ItemContentProps {
  hash?: string;
  children?: ItemContentChildren;
}
export const ItemContent: React.FC<ItemContentProps>;
