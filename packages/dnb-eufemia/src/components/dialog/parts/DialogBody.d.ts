import React from 'react';
import type { ModalInnerProps } from '../../modal/parts/ModalInner';
import type { SectionStyleTypes } from '../../Section';
interface DialogBodyProps extends ModalInnerProps {
    /**
     * Give the inner content wrapper a class name (maps to `dnb-dialog__body`).
     */
    className?: string;
    /**
     * Color/Style of the dialog body
     */
    styleType?: SectionStyleTypes;
}
export default function DialogBody({ className, styleType, ref, ...props }: DialogBodyProps & React.HTMLProps<HTMLElement>): import("react/jsx-runtime").JSX.Element;
export {};
