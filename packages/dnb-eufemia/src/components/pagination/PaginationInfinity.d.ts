import * as React from 'react';
export type InfinityScrollerChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface InfinityScrollerProps
  extends React.HTMLProps<HTMLElement> {
  children?: InfinityScrollerChildren;
}
declare const InfinityScroller: React.ComponentClass<InfinityScrollerProps>;
export default InfinityScroller;
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
export declare const InfinityLoadButton: React.ComponentClass<InfinityLoadButtonProps>;
