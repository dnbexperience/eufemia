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
  selected_key?: ContentWrapperSelectedKey;
  content_style?: SectionStyleTypes | SectionVariants;
  animate?: boolean;
  content_spacing?: SectionSpacing;
  children?: ContentWrapperChildren;
}
export default class ContentWrapper extends React.Component<
  ContentWrapperProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
