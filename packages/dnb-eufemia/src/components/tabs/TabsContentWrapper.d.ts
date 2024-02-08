import * as React from 'react';
import type {
  SectionSpacing,
  SectionStyleTypes,
  SectionVariants
} from '../Section';
export type ContentWrapperSelectedKey = string | number;
export type ContentWrapperChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface ContentWrapperProps extends React.HTMLProps<HTMLElement> {
  id: string;
  /**
   * In case one of the tabs should be opened by a `key`.
   */
  selected_key?: ContentWrapperSelectedKey;
  /**
   * To enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  content_style?: SectionStyleTypes | SectionVariants;
  /**
   * Enable animation between tab switches.
   */
  animate?: boolean;
  /**
   * To modify the `spacing` onto the content wrapper. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `large`.
   */
  content_spacing?: SectionSpacing;
  /**
   * <em>(required)</em> the content to render. Can be a function, returning the current tab content `(key) => (&#39;Current tab&#39;)`, a React Component or an object with the keys and content `{key1: &#39;Current tab&#39;}`.
   */
  children?: ContentWrapperChildren;
}
export default class ContentWrapper extends React.Component<
  ContentWrapperProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
