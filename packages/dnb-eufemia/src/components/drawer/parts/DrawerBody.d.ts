import React from 'react';
import type { ModalInnerProps } from '../../modal/parts/ModalInner';
import type { SectionStyleTypes } from '../../Section';
interface DrawerBodyProps extends ModalInnerProps {
    /**
     * Give the inner content wrapper a class name (maps to `dnb-drawer__body`).
     */
    className?: string;
    /**
     * Color/Style of the drawer body
     */
    styleType?: SectionStyleTypes;
}
export default function DrawerBody({ className, styleType, ref, ...props }: DrawerBodyProps & React.HTMLProps<HTMLElement>): import("react/jsx-runtime").JSX.Element;
export {};
