import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import ContentWrapper from './TabsContentWrapper';
import CustomContent from './TabsCustomContent';
import { DynamicElement } from '../../shared/types';
import { ButtonProps } from '../Button';
import { AnchorAllProps } from '../Anchor';
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
export type TabsTabElement = DynamicElement<
  null,
  ButtonProps | AnchorAllProps
>;
export type TabsSelectedKey = string | number;
export type TabsAlign = 'left' | 'center' | 'right';
export type TabsChildren =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
export interface TabsProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  data?: TabsData;
  /**
   * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  content?: TabsContent;
  /**
   * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
   */
  content_style?: SectionStyleTypes | SectionVariants;
  /**
   * To modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `large`.
   */
  content_spacing?: SectionSpacing;
  label?: string;
  /**
   * Define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: ';url';, ... }]}`). Defaults to `<button>`.
   */
  tab_element?: TabsTabElement;
  /**
   * In case one of the tabs should be opened by a `key`.
   */
  selected_key?: TabsSelectedKey;
  /**
   * To align the tab list on the right side `align="right"`. Defaults to `left`.
   */
  align?: TabsAlign;
  /**
   * To enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.
   */
  tabs_style?: SectionStyleTypes | SectionVariants;
  /**
   * To modify the `spacing` inside the tab list. Defaults to `null`.
   */
  tabs_spacing?: boolean;
  /**
   * If set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.
   */
  no_border?: boolean;
  /**
   * If set to `false`, the default horizontal border line under the tablist remains inside the parent boundaries. Defaults to `true`.
   */
  breakout?: boolean;
  /**
   * If set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.
   */
  nav_button_edge?: boolean;
  use_hash?: boolean;
  /**
   * If set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.
   */
  prerender?: boolean;
  /**
   * If set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`.
   */
  prevent_rerender?: boolean;
  /**
   * If set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.
   */
  scroll?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  id?: string;
  className?: string;
  /**
   * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  children?: TabsChildren;
  render?: (...args: any[]) => any;
  on_change?: (...args: any[]) => any;
  on_mouse_enter?: (...args: any[]) => any;
  on_click?: (...args: any[]) => any;
  on_focus?: (...args: any[]) => any;
}
export default class Tabs extends React.Component<TabsProps, any> {
  static defaultProps: object;
  static ContentWrapper = ContentWrapper;
  static Content = CustomContent;
  render(): JSX.Element;
}
export interface DummyProps {
  /**
   * the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.
   */
  children: React.ReactNode;
}
export declare const Dummy: React.FC<DummyProps>;
