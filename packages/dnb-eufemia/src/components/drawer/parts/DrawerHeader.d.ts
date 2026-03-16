import React from 'react';
import type { ModalHeaderProps } from '../../modal/parts/ModalHeader';
interface DrawerHeaderProps extends ModalHeaderProps {
    titleClass?: string;
}
export default function DrawerHeader({ className, titleClass, size, ref, ...props }: DrawerHeaderProps & Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>): import("react/jsx-runtime").JSX.Element;
export {};
