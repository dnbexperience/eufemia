import React from 'react';
import type { ComponentProps } from '../../types';
import type { ButtonProps } from '../../../../components/button/Button';
export type Props = {
    /**
     * Show the submit indicator
     */
    showIndicator?: boolean;
} & ComponentProps & Omit<ButtonProps, 'variant'> & Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>> & {
    variant?: 'send' | 'secondary';
};
declare function SubmitButton(props: Props): import("react/jsx-runtime").JSX.Element;
export default SubmitButton;
