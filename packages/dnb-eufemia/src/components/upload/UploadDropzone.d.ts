import React from 'react';
import type { UploadAllProps } from './types';
export type UploadDragEvent = React.DragEvent | DragEvent;
export default function UploadDropzone({ children, className, hideOutline, ...rest }: Partial<UploadAllProps> & {
    hideOutline?: boolean;
}): import("react/jsx-runtime").JSX.Element;
