/**
 * Web Modal Component
 *
 */
import React from 'react';
import type { SectionProps } from '../../section/Section';
export interface ModalHeaderProps extends Omit<SectionProps, 'children'> {
    /**
     * The content which will appear when triggering the modal/drawer.
     */
    children?: React.ReactNode;
    /**
     * The modal/drawer title. Displays on the very top of the content.
     */
    title?: React.ReactNode;
    /**
     * Give the inner content wrapper a class name (maps to `dnb-modal__content__inner`).
     */
    className?: string;
    /**
     * Give the h1 component a classname (maps to `dnb-modal__title`)
     */
    titleClass?: string;
    /**
     * Font size of the title (maps to `dnb-h--<size>`)
     * Default is `large`
     */
    size?: 'medium' | 'large' | 'x-large' | 'xx-large';
}
export default function ModalHeader({ title, className, children, titleClass, size, ref, ...sectionProps }: ModalHeaderProps & Omit<React.HTMLProps<HTMLElement>, 'size' | 'title' | 'children'>): import("react/jsx-runtime").JSX.Element;
