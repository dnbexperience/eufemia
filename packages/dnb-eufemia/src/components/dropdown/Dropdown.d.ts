import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type DropdownAlignDrawer = 'left' | 'right';
export type DropdownOptionsRender =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownWrapperElement =
  | Record<string, unknown>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownSelectedValue = string | React.ReactNode;
export type DropdownSuffixValue = string | React.ReactNode;
export type DropdownContent = string | React.ReactNode | string[];
export type DropdownRawData =
  | any[]
  | Record<string, unknown>
  | ((...args: any[]) => any);
export type DropdownPageOffset = string | number;
export type DropdownObserverElement = string | React.ReactNode;
export type DropdownMinHeight = string | number;
export type DropdownTitle = string | React.ReactNode;
export type DropdownVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'signal'
  | 'unstyled';
export type DropdownIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type DropdownIconPosition = 'left' | 'right';
export type DropdownTrianglePosition = 'left' | 'right';
export type DropdownLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownLabelDirection = 'horizontal' | 'vertical';
export type DropdownStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownDirection = 'auto' | 'top' | 'bottom';
export type DropdownSize = 'default' | 'small' | 'medium' | 'large';
export type DropdownAlignDropdown = 'left' | 'right';
export type DropdownTriggerElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DropdownDataObject = {
  selected_value?: DropdownSelectedValue;
  content?: DropdownContent;
};
export type DropdownData =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | (string | React.ReactNode | DropdownDataObject)[];
export type DropdownDefaultValue = string | number;
export type DropdownValue = string | number;
export type DropdownChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];

export interface DropdownProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  role?: string;

  /**
   * Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete is using this because of the huge data changes due to search and reorder. Defaults to `null`.
   */
  cache_hash?: string;
  is_popup?: boolean;

  /**
   * Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if a independent width is used. Defaults to `left`.
   */
  align_drawer?: DropdownAlignDrawer;

  /**
   * Has to be a function, returning the items again. Se <a href="/uilib/components/fragments/drawer-list#example-usage-of-options_render">example</a>. This can be used to add additional options above the actual rendered list.
   */
  options_render?: DropdownOptionsRender;

  /**
   * Has to be a HTML Element, ideal a mother element, used to calculate sizes and distances. Also used for the "click outside" detection. Clicking on the `wrapper_element` will not be anymore triggered as an outside click.
   */
  wrapper_element?: DropdownWrapperElement;

  /**
   * Define a HTML class that will be set on the list, beside `dnb-drawer-list__list`.
   */
  list_class?: string;
  fixed_position?: boolean;
  prevent_focus?: boolean;

  /**
   * If set to true, search items by the first key will be ignored. Defaults to `false`.
   */
  skip_keysearch?: boolean;
  selected_value?: DropdownSelectedValue;
  suffix_value?: DropdownSuffixValue;
  content?: DropdownContent;
  prepared_data?: any[];
  raw_data?: DropdownRawData;

  /**
   * If set to true, all keyboard and mouse events will be ignored. Defaults to `false`.
   */
  ignore_events?: boolean;
  handle_dismiss_focus?: (...args: any[]) => any;
  on_pre_change?: (...args: any[]) => any;
  on_resize?: (...args: any[]) => any;

  /**
   * If set to true, the HTML body will get locked from scrolling when the Dropdown is open. Defaults to `false`.
   */
  enable_body_lock?: boolean;

  /**
   * Defines if the available scrollable height. If scrolling not should change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content). Defaults to `window.pageYOffset`.
   */
  page_offset?: DropdownPageOffset;

  /**
   * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the <em>direction calculation</em> on.
   */
  observer_element?: DropdownObserverElement;

  /**
   * Defines if the minimum height (in `rem`) of the options list. Defaults to `10rem`.
   */
  min_height?: DropdownMinHeight;
  id?: string;

  /**
   * Give a title to let the users know what they have to do. Defaults to `Valgmeny`.
   */
  title?: DropdownTitle;

  /**
   * Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.
   */
  variant?: DropdownVariant;

  /**
   * Icon to be included in the dropdown.
   */
  icon?: DropdownIcon;

  /**
   * Change the size of the icon pragmatically.
   */
  icon_size?: string;

  /**
   * Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.
   */
  icon_position?: DropdownIconPosition;

  /**
   * Position of arrow icon/triangle inside the drawer-list. Set to `left` or `right`. Defaults to `left` if not set.
   */
  triangle_position?: DropdownTrianglePosition;

  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: DropdownLabel;

  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`
   */
  label_direction?: DropdownLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: DropdownStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: boolean;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.
   */
  suffix?: DropdownSuffix;

  /**
   * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`). Defaults to `true`.
   */
  scrollable?: boolean;

  /**
   * If set to true, the element is then focusable by assertive technologies.
   */
  focusable?: boolean;

  /**
   * Defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.
   */
  direction?: DropdownDirection;

  /**
   * Defines if the maximum height (in `rem`) of the options list. Defaults to null, as this is set automatically by default.
   */
  max_height?: number;

  /**
   * To disable the React Portal behavior. Defaults to `false`.
   */
  skip_portal?: boolean;

  /**
   * Define a HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portal_class?: string;

  /**
   * To disable appear/disappear (show/hide) animation. Defaults to `false`.
   */
  no_animation?: boolean;

  /**
   * To disable scrolling animation. Defaults to `false`.
   */
  no_scroll_animation?: boolean;

  /**
   * If set to true, the DrawerList will then not make any permanent selection. Defaults to `false`.
   */
  prevent_selection?: boolean;

  /**
   * Same as `prevent_selection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.
   */
  more_menu?: boolean;

  /**
   * Same as `prevent_selection`, but the DrawerList will be opened from the bottom of the page for mobile devices. Defaults to `false`.
   */
  action_menu?: boolean;

  /**
   * If set to true, the DrawerList will handle it&#39;s width and position handling independent to the parent/mother element. Defaults to `false`.
   */
  independent_width?: boolean;

  /**
   * Define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.
   */
  size?: DropdownSize;

  /**
   * Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`.
   */
  align_dropdown?: DropdownAlignDropdown;

  /**
   * Lets you provide a custom React element as the trigger HTML element.
   */
  trigger_element?: DropdownTriggerElement;

  /**
   * <em>(required)</em> the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these <a href="/uilib/components/fragments/drawer-list/info#data-structure">data structure</a>. <br /> If you don&#39;t have to define a `value`, you can also send in a `function` which will be called once the user opens the DrawerList.
   */
  data?: DropdownData;

  /**
   * If you want to define only a startup value (integer) or have to handle a re-render without handling the state during the re-render by yourself, then using `default_value` is a good choice. Defaults to `null`.
   */
  default_value?: DropdownDefaultValue;

  /**
   * Should either be an index (integer) of the data array or a key ("NB:" should not start with a number) – defined by `selected_key` inside an array item. If `data` is an object, use the object key (string) as the `value` to define the selected item. Can be a string or integer. Defaults to `null` and the `title` property will be shown. <br /> "NB:" In case the DrawerList will be re-rendered, this value will be used again. Use `default_value` instead.
   */
  value?: DropdownValue;

  /**
   * If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.
   */
  open_on_focus?: boolean;

  /**
   * If set to true, the DrawerList will not close on any events. Defaults to `false`.
   */
  prevent_close?: boolean;

  /**
   * If set to true, the DrawerList will close on outside clicks, but not on selection. Defaults to `false`.
   */
  keep_open?: boolean;

  /**
   * If set to `true`, the Dropdown will be rendered initially with a visible and accessible data list / options.
   */
  opened?: boolean;
  disabled?: boolean;

  /**
   * If set to `true`, then the dropdown will be 100% in available `width`.
   */
  stretch?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  class?: string;
  className?: string;

  /**
   * <em>(required)</em> the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these <a href="/uilib/components/fragments/drawer-list/info#data-structure">data structure</a>. <br /> If you don&#39;t have to define a `value`, you can also send in a `function` which will be called once the user opens the DrawerList.
   */
  children?: DropdownChildren;

  /**
   * Will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.
   */
  on_show?: (...args: any[]) => any;

  /**
   * Will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.
   */
  on_hide?: (...args: any[]) => any;

  /**
   * Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, selected_key, value }`.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Will be called once the user selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, selected_key, value, active_item }`. The "active_item" property is the currently selected item by keyboard navigation
   */
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Dropdown extends React.Component<DropdownProps, any> {
  static defaultProps: object;
  static HorizontalItem: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  render(): JSX.Element;
}
