import * as React from 'react';
export type InfinityScrollerChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface InfinityScrollerProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: InfinityScrollerChildren;
}
export default class InfinityScroller extends React.Component<
  InfinityScrollerProps,
  any
> {
  render(): JSX.Element;
}
export type InfinityLoadButtonElement =
  | Record<string, string>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityLoadButtonPressedElement =
  | Record<string, string>
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface InfinityLoadButtonProps {
  element?: InfinityLoadButtonElement;
  pressed_element?: InfinityLoadButtonPressedElement;
  icon: string;
  on_click: (...args: any[]) => any;
}
export class InfinityLoadButton extends React.Component<
  InfinityLoadButtonProps,
  any
> {
  render(): JSX.Element;
}
