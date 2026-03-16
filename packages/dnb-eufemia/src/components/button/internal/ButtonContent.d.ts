import React from 'react';
import type { IconIcon, IconSize } from '../../icon/Icon';
type ButtonContentProps = {
    title?: React.ReactNode;
    content?: React.ReactNode;
    customContent?: React.ReactNode;
    icon?: IconIcon | React.ReactNode | ((...args: any[]) => any);
    iconSize?: IconSize | string | number;
    bounding?: boolean;
    skeleton?: boolean;
    isIconOnly?: boolean;
    iconElement?: React.ReactNode;
};
export default function ButtonContent({ title, content, customContent, icon, iconSize, bounding, skeleton, isIconOnly, iconElement, }: ButtonContentProps): import("react/jsx-runtime").JSX.Element;
export {};
