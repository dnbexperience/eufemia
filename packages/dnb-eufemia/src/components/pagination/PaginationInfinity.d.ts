import * as React from 'react';
export type InfinityScrollerChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface InfinityScrollerProps
  extends React.HTMLProps<HTMLElement> {
  children?: InfinityScrollerChildren;
}
export default class InfinityScroller extends React.Component<
  InfinityScrollerProps,
  any
> {
  render(): JSX.Element;
}
export type InfinityLoadButtonElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityLoadButtonPressedElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any);
export interface InfinityLoadButtonProps {
  element?: InfinityLoadButtonElement;
  pressedElement?: InfinityLoadButtonPressedElement;
  icon: string;
  onClick: (...args: any[]) => any;
}
export class InfinityLoadButton extends React.Component<
  InfinityLoadButtonProps,
  any
> {
  render(): JSX.Element;
}
