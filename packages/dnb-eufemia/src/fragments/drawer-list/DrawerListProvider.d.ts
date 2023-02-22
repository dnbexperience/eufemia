import * as React from 'react';
export type DrawerListProviderScrollable = string | boolean;
export type DrawerListProviderFocusable = string | boolean;
export type DrawerListProviderDirection = 'auto' | 'top' | 'bottom';
export type DrawerListProviderSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large';
export type DrawerListProviderNoAnimation = string | boolean;
export type DrawerListProviderNoScrollAnimation = string | boolean;
export type DrawerListProviderPreventSelection = string | boolean;
export type DrawerListProviderActionMenu = string | boolean;
export type DrawerListProviderIsPopup = string | boolean;
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
export type DrawerListProviderSkipPortal = string | boolean;
export type DrawerListProviderPreventClose = string | boolean;
export type DrawerListProviderIndependentWidth = string | boolean;
export type DrawerListProviderFixedPosition = string | boolean;
export type DrawerListProviderKeepOpen = string | boolean;
export type DrawerListProviderPreventFocus = string | boolean;
export type DrawerListProviderSkipKeysearch = string | boolean;
export type DrawerListProviderOpened = string | boolean;
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
export type DrawerListProviderIgnoreEvents = string | boolean;
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
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DrawerListProviderProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  role?: string;
  cache_hash?: string;
  triangle_position?: string;
  scrollable?: DrawerListProviderScrollable;
  focusable?: DrawerListProviderFocusable;
  direction?: DrawerListProviderDirection;
  size?: DrawerListProviderSize;
  max_height?: number;
  no_animation?: DrawerListProviderNoAnimation;
  no_scroll_animation?: DrawerListProviderNoScrollAnimation;
  prevent_selection?: DrawerListProviderPreventSelection;
  action_menu?: DrawerListProviderActionMenu;
  is_popup?: DrawerListProviderIsPopup;
  align_drawer?: DrawerListProviderAlignDrawer;
  options_render?: DrawerListProviderOptionsRender;
  wrapper_element?: DrawerListProviderWrapperElement;
  default_value?: DrawerListProviderDefaultValue;
  value?: DrawerListProviderValue;
  skip_portal?: DrawerListProviderSkipPortal;
  portal_class?: string;
  list_class?: string;
  prevent_close?: DrawerListProviderPreventClose;
  independent_width?: DrawerListProviderIndependentWidth;
  fixed_position?: DrawerListProviderFixedPosition;
  keep_open?: DrawerListProviderKeepOpen;
  prevent_focus?: DrawerListProviderPreventFocus;
  skip_keysearch?: DrawerListProviderSkipKeysearch;
  opened?: DrawerListProviderOpened;
  class?: string;
  data?: DrawerListProviderData;
  selected_value?: DrawerListProviderSelectedValue;
  suffix_value?: DrawerListProviderSuffixValue;
  content?: DrawerListProviderContent;
  prepared_data?: any[];
  raw_data?: DrawerListProviderRawData;
  ignore_events?: DrawerListProviderIgnoreEvents;
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
