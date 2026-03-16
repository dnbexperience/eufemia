/**
 * Web Modal Component
 *
 */
import React from 'react';
import type { SectionProps } from '../../Section';
export interface ModalHeaderBarProps extends Omit<SectionProps, 'children'> {
    /**
     * The content which will appear when triggering the modal/drawer.
     */
    children?: React.ReactNode;
    /**
     * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
     */
    className?: string;
    shadowClass?: string;
}
export default function ModalHeaderBar({ className, children, ref: _ref, shadowClass, ...props }: ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>): import("react/jsx-runtime").JSX.Element;
