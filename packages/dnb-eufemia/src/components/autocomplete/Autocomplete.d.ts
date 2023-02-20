import * as React from 'react';
export type AutocompleteSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type AutocompleteTop = string | number | boolean;
export type AutocompleteRight = string | number | boolean;
export type AutocompleteBottom = string | number | boolean;
export type AutocompleteLeft = string | number | boolean;
export type AutocompleteActionMenu = string | boolean;
export type AutocompleteIsPopup = string | boolean;
export type AutocompleteAlignDrawer = 'left' | 'right';
export type AutocompleteWrapperElement =
  | Record<string, string>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteIndependentWidth = string | boolean;
export type AutocompleteFixedPosition = string | boolean;
export type AutocompletePreventFocus = string | boolean;
export type AutocompleteSkipKeysearch = string | boolean;
export type AutocompleteSelectedValue = string | React.ReactNode;
export type AutocompleteSuffixValue = string | React.ReactNode;
export type AutocompleteContent = string | React.ReactNode | string[];
export type AutocompleteRawData =
  | any[]
  | Record<string, string>
  | ((...args: any[]) => any);
export type AutocompleteIgnoreEvents = string | boolean;
export type AutocompleteMode = 'sync' | 'async';
export type AutocompleteTitle = string | React.ReactNode;
export type AutocompletePlaceholder = string | React.ReactNode;
export type AutocompleteNoOptions = string | React.ReactNode;
export type AutocompleteShowAll = string | React.ReactNode;
export type AutocompleteAriaLiveOptions = string | React.ReactNode;
export type AutocompleteIndicatorLabel = string | React.ReactNode;
export type AutocompleteSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AutocompleteInputRef =
  | ((...args: any[]) => any)
  | Record<string, string>;
export type AutocompleteIcon = string | React.ReactNode;
export type AutocompleteIconPosition = 'left' | 'right';
export type AutocompleteTrianglePosition = 'left' | 'right';
export type AutocompleteInputIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type AutocompleteLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteLabelDirection = 'horizontal' | 'vertical';
export type AutocompleteLabelSrOnly = string | boolean;
export type AutocompleteKeepValue = string | boolean;
export type AutocompleteKeepValueAndSelection = string | boolean;
export type AutocompleteShowClearButton = string | boolean;
export type AutocompleteStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteStatusNoAnimation = string | boolean;
export type AutocompleteSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteDisableFilter = string | boolean;
export type AutocompleteDisableReorder = string | boolean;
export type AutocompleteScrollable = string | boolean;
export type AutocompleteFocusable = string | boolean;
export type AutocompleteDisableHighlighting = string | boolean;
export type AutocompleteDirection = 'auto' | 'top' | 'bottom';
export type AutocompleteSkipPortal = string | boolean;
export type AutocompleteNoAnimation = string | boolean;
export type AutocompleteNoScrollAnimation = string | boolean;
export type AutocompleteShowSubmitButton = string | boolean;
export type AutocompletePreventSelection = string | boolean;
export type AutocompleteSize = 'default' | 'small' | 'medium' | 'large';
export type AutocompleteAlignAutocomplete = 'left' | 'right';
export type AutocompleteOptionsRender =
  | Record<string, string>
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteInputElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type AutocompleteData =
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
export type AutocompleteSearchInWordIndex = string | number;
export type AutocompleteSearchNumbers = string | boolean;
export type AutocompleteDefaultValue = string | number;
export type AutocompleteValue = string | number;
export type AutocompleteOpenOnFocus = string | boolean;
export type AutocompletePreventClose = string | boolean;
export type AutocompleteKeepOpen = string | boolean;
export type AutocompleteOpened = string | boolean;
export type AutocompleteDisabled = string | boolean;
export type AutocompleteStretch = string | boolean;
export type AutocompleteSkeleton = string | boolean;
export type AutocompletePageOffset = string | number;
export type AutocompleteObserverElement = string | React.ReactNode;
export type AutocompleteChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, string>
  | any[];
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface AutocompleteProps extends React.HTMLProps<HTMLElement> {
  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: AutocompleteSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: AutocompleteTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: AutocompleteRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: AutocompleteBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: AutocompleteLeft;
  role?: string;

  /**
   * Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete is using this because of the huge data changes due to search and reorder. Defaults to `null`.
   */
  cache_hash?: string;
  action_menu?: AutocompleteActionMenu;
  is_popup?: AutocompleteIsPopup;

  /**
   * Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if a independent width is used. Defaults to `left`.
   */
  align_drawer?: AutocompleteAlignDrawer;

  /**
   * Has to be a HTML Element, ideal a mother element, used to calculate sizes and distances. Also used for the "click outside" detection. Clicking on the `wrapper_element` will not be anymore triggered as an outside click.
   */
  wrapper_element?: AutocompleteWrapperElement;

  /**
   * Define a HTML class that will be set on the list, beside `dnb-drawer-list__list`.
   */
  list_class?: string;

  /**
   * If set to true, the DrawerList will handle it&#39;s width and position handling independent to the parent/mother element. Defaults to `false`.
   */
  independent_width?: AutocompleteIndependentWidth;
  fixed_position?: AutocompleteFixedPosition;
  prevent_focus?: AutocompletePreventFocus;

  /**
   * If set to true, search items by the first key will be ignored. Defaults to `false`.
   */
  skip_keysearch?: AutocompleteSkipKeysearch;
  selected_value?: AutocompleteSelectedValue;
  suffix_value?: AutocompleteSuffixValue;
  content?: AutocompleteContent;
  prepared_data?: any[];
  raw_data?: AutocompleteRawData;

  /**
   * If set to true, all keyboard and mouse events will be ignored. Defaults to `false`.
   */
  ignore_events?: AutocompleteIgnoreEvents;
  handle_dismiss_focus?: (...args: any[]) => any;
  on_pre_change?: (...args: any[]) => any;
  on_resize?: (...args: any[]) => any;
  id?: string;

  /**
   * If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.
   */
  mode?: AutocompleteMode;

  /**
   * Give a title to let the user know what theyhaves to do. Defaults to `Skriv og få alternativer&#39;` .
   */
  title?: AutocompleteTitle;

  /**
   * Use this to define the pre-filled placeholder text in the input. Defaults to `title="Skriv og velg"`.
   */
  placeholder?: AutocompletePlaceholder;

  /**
   * Text show in the "no options" item. Defaults to `Ingen alternativer`.
   */
  no_options?: AutocompleteNoOptions;

  /**
   * Text that lets a user unravel all the available options. Defaults to `Vis alt`.
   */
  show_all?: AutocompleteShowAll;

  /**
   * Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.
   */
  aria_live_options?: AutocompleteAriaLiveOptions;

  /**
   * Text show on indicator "options" item. Defaults to `Henter data ...`.
   */
  indicator_label?: AutocompleteIndicatorLabel;

  /**
   * Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`.
   */
  show_options_sr?: string;

  /**
   * Only for screen readers (VocieOver). The label used to announce the selected item. Defaults to `Valgt:`.
   */
  selected_sr?: string;

  /**
   * Title on submit button. Defaults to `Vis alternativer`.
   */
  submit_button_title?: string;

  /**
   * The icon used in the submit button. Defaults to `chevron_down`.
   */
  submit_button_icon?: AutocompleteSubmitButtonIcon;

  /**
   * Use a React.Ref to get access to the `input` DOM element.
   */
  input_ref?: AutocompleteInputRef;

  /**
   * To be included in the autocomplete input.
   */
  icon?: AutocompleteIcon;

  /**
   * Change the size of the icon pragmatically.
   */
  icon_size?: string;

  /**
   * Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.
   */
  icon_position?: AutocompleteIconPosition;

  /**
   * Position of arrow icon/triangle inside the drawer-list. Set to `left` or `right`. Defaults to `left` if not set.
   */
  triangle_position?: AutocompleteTrianglePosition;

  /**
   * Same as `icon`.
   */
  input_icon?: AutocompleteInputIcon;

  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: AutocompleteLabel;

  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`
   */
  label_direction?: AutocompleteLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: AutocompleteLabelSrOnly;

  /**
   * Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur.
   */
  keep_value?: AutocompleteKeepValue;

  /**
   * Like `keep_value` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept.
   */
  keep_value_and_selection?: AutocompleteKeepValueAndSelection;

  /**
   * If set to `true`, a clear button is shown inside the input field. Defaults to `false`.
   */
  show_clear_button?: AutocompleteShowClearButton;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: AutocompleteStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, string>;
  status_no_animation?: AutocompleteStatusNoAnimation;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.
   */
  suffix?: AutocompleteSuffix;

  /**
   * If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.
   */
  disable_filter?: AutocompleteDisableFilter;

  /**
   * If set to `true`, reordering of search results will be disabled. Defaults to `false`.
   */
  disable_reorder?: AutocompleteDisableReorder;

  /**
   * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`). Defaults to `true`.
   */
  scrollable?: AutocompleteScrollable;

  /**
   * If set to true, the element is then focusable by assertive technologies.
   */
  focusable?: AutocompleteFocusable;

  /**
   * If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.
   */
  disable_highlighting?: AutocompleteDisableHighlighting;

  /**
   * Defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.
   */
  direction?: AutocompleteDirection;

  /**
   * Defines if the maximum height (in `rem`) of the options list. Defaults to null, as this is set automatically by default.
   */
  max_height?: number;

  /**
   * To disable the React Portal behavior. Defaults to `false`.
   */
  skip_portal?: AutocompleteSkipPortal;

  /**
   * To disable appear/disappear (show/hide) animation. Defaults to `false`.
   */
  no_animation?: AutocompleteNoAnimation;

  /**
   * To disable scrolling animation. Defaults to `false`.
   */
  no_scroll_animation?: AutocompleteNoScrollAnimation;

  /**
   * Use `true` to show a Autocomplete button to toggle the <a href="/uilib/components/fragments/drawer-list">DrawerList</a>. Defaults to `false`.
   */
  show_submit_button?: AutocompleteShowSubmitButton;

  /**
   * Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from &#39;@dnb/eufemia/components/input/Input&#39;`.
   */
  submit_element?: React.ReactNode;

  /**
   * If set to true, the DrawerList will then not make any permanent selection. Defaults to `false`.
   */
  prevent_selection?: AutocompletePreventSelection;

  /**
   * Define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.
   */
  size?: AutocompleteSize;

  /**
   * Use `right` to change the options alignment direction. Defaults to `left`.
   */
  align_autocomplete?: AutocompleteAlignAutocomplete;

  /**
   * Has to be a function, returning the items again. Se <a href="/uilib/components/fragments/drawer-list#example-usage-of-options_render">example</a>. This can be used to add additional options above the actual rendered list.
   */
  options_render?: AutocompleteOptionsRender;

  /**
   * Lets you provide a custom React element as the input HTML element.
   */
  input_element?: AutocompleteInputElement;

  /**
   * <em>(required)</em> the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these <a href="/uilib/components/fragments/drawer-list/info#data-structure">data structure</a>. <br /> If you don&#39;t have to define a `value`, you can also send in a `function` which will be called once the user opens the DrawerList.
   */
  data?: AutocompleteData;

  /**
   * This gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`.
   */
  search_in_word_index?: AutocompleteSearchInWordIndex;

  /**
   * If set to `true` and `search_in_word_index` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.
   */
  search_numbers?: AutocompleteSearchNumbers;

  /**
   * If you want to define only a startup value (integer) or have to handle a re-render without handling the state during the re-render by yourself, then using `default_value` is a good choice. Defaults to `null`.
   */
  default_value?: AutocompleteDefaultValue;

  /**
   * Should either be an index (integer) of the data array or a key ("NB:" should not start with a number) – defined by `selected_key` inside an array item. If `data` is an object, use the object key (string) as the `value` to define the selected item. Can be a string or integer. Defaults to `null` and the `title` property will be shown. <br /> "NB:" In case the DrawerList will be re-rendered, this value will be used again. Use `default_value` instead.
   */
  value?: AutocompleteValue;

  /**
   * Lets you define a custom input value.
   */
  input_value?: string;

  /**
   * Use `true` to auto open the list once the user is entering the input field with the keyboard.
   */
  open_on_focus?: AutocompleteOpenOnFocus;

  /**
   * If set to true, the DrawerList will not close on any events. Defaults to `false`.
   */
  prevent_close?: AutocompletePreventClose;

  /**
   * If set to true, the DrawerList will close on outside clicks, but not on selection. Defaults to `false`.
   */
  keep_open?: AutocompleteKeepOpen;

  /**
   * If set to `true`, the Autocomplete will be rendered initially with a visible and accessible data list / options.
   */
  opened?: AutocompleteOpened;
  disabled?: AutocompleteDisabled;

  /**
   * If set to `true`, then the autocomplete will be 100% in available `width`.
   */
  stretch?: AutocompleteStretch;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: AutocompleteSkeleton;

  /**
   * Define a HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portal_class?: string;

  /**
   * Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.
   */
  drawer_class?: string;

  /**
   * Defines if the available scrollable height. If scrolling not should change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content). Defaults to `window.pageYOffset`.
   */
  page_offset?: AutocompletePageOffset;

  /**
   * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the <em>direction calculation</em> on.
   */
  observer_element?: AutocompleteObserverElement;

  /**
   * If set to true, the HTML body will get locked from scrolling when the Dropdown is open. Defaults to `false`.
   */
  enable_body_lock?: boolean;
  class?: string;
  className?: string;

  /**
   * <em>(required)</em> the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these <a href="/uilib/components/fragments/drawer-list/info#data-structure">data structure</a>. <br /> If you don&#39;t have to define a `value`, you can also send in a `function` which will be called once the user opens the DrawerList.
   */
  children?: AutocompleteChildren;
  ariaLiveDelay?: number;

  /**
   * Will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.
   */
  on_show?: (...args: any[]) => any;

  /**
   * Will be called for every key change the users makes. Returns an object with the input `value` inside `{ value, event, attributes }` including <a href="/uilib/components/autocomplete/events#dynamically-change-data">these methods</a>.
   */
  on_type?: (...args: any[]) => any;

  /**
   * Will be called on user generated focus action. Returns an object with the input `value` inside `{ value, event, attributes }` including <a href="/uilib/components/autocomplete/events#dynamically-change-data">these methods</a>.
   */
  on_focus?: (...args: any[]) => any;

  /**
   * Will be called on user generated blur action. Returns an object with the input `value` inside `{ value, event, attributes }` including <a href="/uilib/components/autocomplete/events#dynamically-change-data">these methods</a>.
   */
  on_blur?: (...args: any[]) => any;

  /**
   * Will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.
   */
  on_hide?: (...args: any[]) => any;

  /**
   * Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }` including <a href="/uilib/components/autocomplete/events#dynamically-change-data">these methods</a>.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Will be called once the users selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }` including <a href="/uilib/components/autocomplete/events#dynamically-change-data">these methods</a>. The "active_item" property is the currently selected item by keyboard navigation
   */
  on_select?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
}
export default class Autocomplete extends React.Component<
  AutocompleteProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
