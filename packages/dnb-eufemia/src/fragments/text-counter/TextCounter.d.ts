import React from 'react';
import type { LocaleProps, SpacingProps } from '../../shared/types';
export type TextCounterProps = {
    variant?: 'down' | 'up' | true;
    text: string;
    max: number;
} & React.HTMLAttributes<HTMLParagraphElement> & LocaleProps & SpacingProps;
export default function TextCounter(localProps: TextCounterProps): import("react/jsx-runtime").JSX.Element;
