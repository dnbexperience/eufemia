import React from 'react';
import type { SpacingProps } from '../../../../shared/types';
export type Props = Omit<React.HTMLProps<HTMLFormElement>, 'ref' | 'autoComplete'> & SpacingProps & {
    ref?: React.RefObject<HTMLFormElement>;
    /**
     * Set to `false` to allow the browser's native form submission.
     */
    preventDefaultOnSubmit?: boolean;
};
export default function FormElement(props: Props): import("react/jsx-runtime").JSX.Element;
