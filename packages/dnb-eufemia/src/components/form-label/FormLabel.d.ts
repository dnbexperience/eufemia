/**
 * Web FormLabel Component
 *
 */
import React from 'react';
import type { FormElementProps } from '../../shared/helpers/filterValidProps';
import type { DynamicElement, SpacingProps } from '../../shared/types';
export type FormLabelProps = {
    forId?: string;
    element?: DynamicElement<HTMLLabelElement>;
    text?: React.ReactNode;
    size?: 'basis' | 'medium' | 'large';
    id?: string;
    skeleton?: boolean;
    label?: React.ReactNode;
    vertical?: boolean;
    srOnly?: boolean;
    ref?: React.Ref<HTMLElement>;
    /** Is not a part of HTMLLabelElement and not documented as of now */
    disabled?: boolean;
    /**
     * For internal use only
     */
    labelDirection?: FormElementProps['labelDirection'];
};
export type FormLabelAllProps = FormLabelProps & React.HTMLAttributes<HTMLLabelElement> & SpacingProps;
declare function FormLabel(localProps: FormLabelAllProps): import("react/jsx-runtime").JSX.Element;
export default FormLabel;
