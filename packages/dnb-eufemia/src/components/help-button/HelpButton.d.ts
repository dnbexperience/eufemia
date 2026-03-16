/**
 * Web HelpButton Component
 *
 */
import React from 'react';
import type { ButtonProps } from '../button/Button';
export type HelpButtonProps = {
    render?: (children: React.ReactNode, props: ButtonProps) => React.ReactElement;
} & ButtonProps;
export default function HelpButton(localProps: HelpButtonProps): import("react/jsx-runtime").JSX.Element;
