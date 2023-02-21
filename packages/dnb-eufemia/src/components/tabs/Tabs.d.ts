import * as React from 'react';
import ContentWrapper from './TabsContentWrapper';
import CustomContent from './TabsCustomContent';
export type TabsData =
  | string
  | {
      title: string | React.ReactNode | ((...args: any[]) => any);
      key: string | number;
      selected?: boolean;
      disabled?: boolean;
    }[]
  | any;
export type TabsContent =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
export type TabsContentSpacing = string | boolean;
export type TabsTabElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
export type TabsSelectedKey = string | number;
export type TabsAlign = 'left' | 'center' | 'right';
export type TabsTabsSpacing = string | boolean;
export type TabsNoBorder = string | boolean;
export type TabsNavButtonEdge = string | boolean;
export type TabsUseHash = string | boolean;
export type TabsPrerender = string | boolean;
export type TabsPreventRerender = string | boolean;
export type TabsScroll = string | boolean;
export type TabsSkeleton = string | boolean;
export type TabsSpace =
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
export type TabsTop = string | number | boolean;
export type TabsRight = string | number | boolean;
export type TabsBottom = string | number | boolean;
export type TabsLeft = string | number | boolean;
export type TabsChildren =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface TabsProps extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> defines the data structure to load as a JSON. e.g. `[{title: &#39;...&#39;, content: &#39;Current tab&#39;, key: &#39;...&#39;, hash: &#39;...&#39;}]`
   */
  data?: TabsData;

  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  content?: TabsContent;

  /**
   * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  content_style?: string;

  /**
   * To modify the `spacing` onto the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `large`.
   */
  content_spacing?: TabsContentSpacing;
  label?: string;

  /**
   * Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: &#39;url&#39;, ... }]}`). Defaults to `<button>`.
   */
  tab_element?: TabsTabElement;

  /**
   * In case one of the tabs should be opened by a `key`.
   */
  selected_key?: TabsSelectedKey;

  /**
   * To align the tab list on the right side `align="right"`. Default to `left`.
   */
  align?: TabsAlign;

  /**
   * To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  tabs_style?: string;

  /**
   * To modify the `spacing` inside the tab list. Defaults to `null`.
   */
  tabs_spacing?: TabsTabsSpacing;

  /**
   * If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.
   */
  no_border?: TabsNoBorder;

  /**
   * If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.
   */
  nav_button_edge?: TabsNavButtonEdge;
  use_hash?: TabsUseHash;

  /**
   * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
   */
  prerender?: TabsPrerender;

  /**
   * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
   */
  prevent_rerender?: TabsPreventRerender;

  /**
   * If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.
   */
  scroll?: TabsScroll;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: TabsSkeleton;
  id?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: TabsSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: TabsTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: TabsRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: TabsBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: TabsLeft;
  class?: string;
  className?: string;

  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  children?: TabsChildren;
  render?: (...args: any[]) => any;

  /**
   * (preferred) this event gets triggered once the tab changes its selected key. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_change?: (...args: any[]) => any;

  /**
   * This event gets triggered once the user&#39;s mouse enters a tab (hover). Returns `{ key, selected_key, focus_key, event }`.
   */
  on_mouse_enter?: (...args: any[]) => any;

  /**
   * This event gets triggered once the tab gets clicked. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_click?: (...args: any[]) => any;

  /**
   * This event gets triggered once the tab changes its focus key. Returns `{ key, selected_key, focus_key, event }`.
   */
  on_focus?: (...args: any[]) => any;
}
export default class Tabs extends React.Component<TabsProps, any> {
  static defaultProps: object;
  static ContentWrapper = ContentWrapper;
  static Content = CustomContent;
  render(): JSX.Element;
}
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DummyProps {
  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  children: React.ReactNode;
}
export const Dummy: React.FC<DummyProps>;
