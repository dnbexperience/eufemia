import React from 'react';
import type { SpacingProps } from '../space/types';
export type CustomContentTitle = Record<string, unknown> | React.ReactNode | ((...args: any[]) => any);
export type CustomContentChildren = React.ReactNode | ((...args: any[]) => any);
export interface CustomContentProps extends Omit<React.HTMLProps<HTMLElement>, 'title' | 'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'>, SpacingProps {
    displayName?: string;
    title?: CustomContentTitle;
    hash?: string;
    selected?: boolean;
    disabled?: boolean;
    id?: string;
    key?: string | number;
    children?: CustomContentChildren;
    className?: string;
}
/**
  Like:
  <Tabs>
    <Tabs.Content title="first" selected disabled>first</Tabs.Content>
    <Tabs.Content title="second">second</Tabs.Content>
  </Tabs>
 */
declare function CustomContent(props: CustomContentProps): import("react/jsx-runtime").JSX.Element;
export default CustomContent;
