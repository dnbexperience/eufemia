import React from 'react';
import type { IconIcon, IconSize } from '../../icon/Icon';
import type { SkeletonShow } from '../../skeleton/Skeleton';
import type { SpacingProps } from '../../../shared/types';
type CloseButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & SpacingProps & {
    type?: string;
    icon?: IconIcon | React.ReactNode;
    iconSize?: IconSize;
    iconPosition?: 'left' | 'right' | 'top';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'signal' | 'unstyled';
    size?: 'default' | 'small' | 'medium' | 'large';
    text?: React.ReactNode;
    children?: React.ReactNode;
    stretch?: boolean;
    wrap?: boolean;
    skeleton?: SkeletonShow;
};
export default function PopoverCloseButton({ icon, iconSize, iconPosition, variant, size, className, title, text, children, type: buttonType, stretch, wrap, skeleton, ...rest }: CloseButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
