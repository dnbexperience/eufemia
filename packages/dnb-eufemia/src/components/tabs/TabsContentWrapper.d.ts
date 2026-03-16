import React from 'react';
export default function ContentWrapper({ id, children, selectedKey, contentStyle, animate, contentSpacing, ...rest }: ContentWrapperProps): import("react/jsx-runtime").JSX.Element;
import type { SectionSpacing, SectionStyleTypes, SectionVariants } from '../Section';
export type ContentWrapperSelectedKey = string | number;
export type ContentWrapperChildren = React.ReactNode | ((...args: any[]) => any);
export interface ContentWrapperProps extends Omit<React.HTMLProps<HTMLElement>, 'children' | 'ref' | 'onAnimationStart' | 'onAnimationEnd'> {
    id: string;
    selectedKey?: ContentWrapperSelectedKey;
    contentStyle?: SectionStyleTypes | SectionVariants;
    animate?: boolean;
    contentSpacing?: SectionSpacing;
    children?: ContentWrapperChildren;
}
