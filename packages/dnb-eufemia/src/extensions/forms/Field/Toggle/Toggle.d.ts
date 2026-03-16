import React from 'react';
import type { FieldProps } from '../../types';
import type { CheckboxProps } from '../../../../components/Checkbox';
import type { ToggleButtonProps } from '../../../../components/ToggleButton';
export type ToggleProps = {
    valueOn: unknown;
    valueOff: unknown;
    variant?: 'checkbox' | 'radio' | 'switch' | 'checkbox-button' | 'button' | 'buttons';
    textOn?: string;
    textOff?: string;
    size?: ToggleButtonProps['size'] | CheckboxProps['size'];
    /**
     * Checkbox props
     */
    onClick?: (value: unknown, params: {
        event: React.MouseEvent<HTMLInputElement>;
    }) => void;
};
export type Props = Omit<FieldProps<unknown>, 'layout' | 'layoutOptions'> & ToggleProps;
declare function Toggle(props: Props): import("react/jsx-runtime").JSX.Element;
export default Toggle;
