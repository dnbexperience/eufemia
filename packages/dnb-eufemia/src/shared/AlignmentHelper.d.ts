/**
 * Alignment helper
 *
 * This helper element provides needed help when it comes to HTML inline alignment (vertically)
 *
 */
import React from 'react';
type Props = {
    className?: string;
    children?: React.ReactNode;
    pseudoElementOnly?: boolean;
} & React.HTMLAttributes<HTMLSpanElement>;
export default function AlignmentHelper({ className, children, pseudoElementOnly, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
