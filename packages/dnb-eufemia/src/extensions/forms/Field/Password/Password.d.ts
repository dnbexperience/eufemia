import type { RefObject } from 'react';
import React from 'react';
import type { Props as StringFieldProps } from '../String';
import type { InputProps } from '../../../../components/Input';
export type PasswordVisibilityEvent = React.MouseEvent<HTMLButtonElement> & {
    value: string;
};
export type PasswordProps = Omit<StringFieldProps, 'ref'> & {
    /**
     * Fires when the input toggles to show the password.
     */
    onShowPassword?: (event: PasswordVisibilityEvent) => void;
    /**
     * Fires when the input toggles to hide the password.
     */
    onHidePassword?: (event: PasswordVisibilityEvent) => void;
    /**
     * The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute.
     */
    size?: InputProps['size'];
    /**
     * ElementRef passed on to the password input element.
     */
    ref?: RefObject<HTMLInputElement>;
};
declare function Password({ id, className, ref: refProp, value, label, disabled, size, ...props }: PasswordProps): import("react/jsx-runtime").JSX.Element;
export default Password;
