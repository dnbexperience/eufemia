import React from 'react';
import type { ModalHeaderProps } from '../../modal/parts/ModalHeader';
import type { SpacingProps } from '../../space/types';
interface DialogHeaderProps extends ModalHeaderProps, SpacingProps {
    titleClass?: string;
}
export default function DialogHeader({ className, titleClass, size, ref, ...props }: DialogHeaderProps & Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>): import("react/jsx-runtime").JSX.Element;
export {};
