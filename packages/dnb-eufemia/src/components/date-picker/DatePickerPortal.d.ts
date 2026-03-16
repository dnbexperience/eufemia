import React from 'react';
import type { DatePickerProps } from './DatePicker';
type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
    skipPortal?: DatePickerProps['skipPortal'];
    alignment?: DatePickerProps['alignPicker'];
    targetElementRef?: React.RefObject<HTMLElement>;
};
export default function DatePickerPortal({ skipPortal, alignment, targetElementRef, children, }: DatePickerPortalProps): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>>;
export {};
