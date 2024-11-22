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
/** @deprecated use `DrawerListDataArrayObject` */
export type DrawerListDataObject = DrawerListDataArrayObject;
export type DrawerListDataArrayObject = {
  [customProperty: string]: unknown;
  selected_value?: string | React.ReactNode;
  selectedKey?: string | number;
  selected_key?: string | number;
  suffix_value?: string | React.ReactNode;
  content?: DrawerListContent;
  disabled?: boolean;
  search_content?: string | React.ReactNode | string[];
};
/** @deprecated use `DrawerListDataArrayItem` */
export type DrawerListDataObjectUnion = DrawerListDataArrayItem;
export type DrawerListDataArrayItem =
  | DrawerListDataArrayObject
  | DrawerListContent;
export type DrawerListDataArray = DrawerListDataArrayItem[];
export type DrawerListDataRecord = Record<string, DrawerListContent>;
export type DrawerListDataAll = DrawerListDataRecord | DrawerListDataArray;
export type DrawerListData =
  | string
  | ((...args: any[]) => DrawerListDataAll)
  | DrawerListDataAll;
export type DrawerListContent =
  | string
  | React.ReactNode
  | (string | React.ReactNode)[];
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
export interface DrawerListProps {
  id?: string;
  role?: string;
  /**
   * Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
   */
  cache_hash?: string;
  /**
   * Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.
   */
  triangle_position?: string;
  /**
   * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).
   */
  scrollable?: boolean;
  /**
   * If set to `true`, the element is then focusable by assertive technologies.
   */
  focusable?: boolean;
  /**
   * Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.
   */
  direction?: DrawerListDirection;
  size?: DrawerListSize;
  /**
   * Defines the minimum height (in `rem`) of the options list.
   */
  min_height?: string | number;
  /**
   * Defines the maximum height (in `rem`) of the options list.
   */
  max_height?: number;
  /**
   * To disable appear/disappear (show/hide) animation.
   */
  no_animation?: boolean;
  /**
   * To disable scrolling animation.
   */
  no_scroll_animation?: boolean;
  /**
   * If set to `true`, the DrawerList will then not make any permanent selection.
   */
  prevent_selection?: boolean;
  action_menu?: boolean;
  is_popup?: boolean;
  /**
   * Use 'right' to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if an independent width is used.
   */
  align_drawer?: DrawerListAlignDrawer;
  /**
   * Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-options_render). This can be used to add additional options above the actual rendered list.
   */
  options_render?: DrawerListOptionsRender;
  /**
   * Has to be an HTML Element, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapper_element` will not trigger an outside click.
   */
  wrapper_element?: DrawerListWrapperElement;
  /**
   * Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to null.
   */
  default_value?: DrawerListDefaultValue;
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value?: DrawerListValue;
  /**
   * To disable the React Portal behavior.
   */
  skip_portal?: boolean;
  /**
   * Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portal_class?: string;
  /**
   * Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.
   */
  list_class?: string;
  /**
   * If set to `true`, the DrawerList will not close on any events.
   */
  prevent_close?: boolean;
  /**
   * If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.
   */
  independent_width?: boolean;
  /**
   * If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.
   */
  fixed_position?: boolean;
  /**
   * If set to `true`, the DrawerList will close on outside clicks, but not on selection.
   */
  keep_open?: boolean;
  prevent_focus?: boolean;
  /**
   * If set to `true`, search items by the first key will be ignored.
   */
  skip_keysearch?: boolean;
  opened?: boolean;
  data?: DrawerListData;
  prepared_data?: any[];
  raw_data?: DrawerListRawData;
  /**
   * If set to `true`, all keyboard and mouse events will be ignored.
   */
  ignore_events?: boolean;
  className?: string;
  children?: DrawerListChildren;
  suffix?: DrawerListSuffix;
  /**
   * If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.
   */
  enable_body_lock?: boolean;
  /**
   * Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).
   */
  page_offset?: string | number;
  /**
   * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.
   */
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
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value: string;
  on_click: ({
    value
  }: {
    /**
     * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
     */
    value: string;
  }) => void;
};
export type DrawerListAllProps = DrawerListProps &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    'ref' | 'size' | 'label' | 'placeholder' | 'data' | 'children'
  >;
export default class DrawerList extends React.Component<
  DrawerListAllProps,
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
