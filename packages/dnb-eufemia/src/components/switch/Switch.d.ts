import type { KeyboardEvent } from 'react';
import React from 'react';
import type { FormStatusBaseProps } from '../form-status/FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type SwitchLabelPosition = 'left' | 'right';
export type SwitchSize = 'default' | 'medium' | 'large';
export type SwitchAttributes = string | Record<string, unknown>;
export type SwitchOnChangeParams = {
    checked: boolean;
    event: MouseEvent | TouchEvent | KeyboardEvent;
};
export type SwitchOnClickParams = React.MouseEvent<HTMLInputElement> & {
    checked: boolean;
    event: React.MouseEvent<HTMLInputElement>;
};
export type SwitchOnChange = (args: SwitchOnChangeParams) => void;
export type SwitchProps = {
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: React.ReactNode;
    /**
     * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
     */
    labelPosition?: SwitchLabelPosition;
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * <em>(required)</em> the `title` of the input - describing it a bit further for accessibility reasons.
     */
    title?: string;
    /**
     * Determine whether the switch is checked or not. The default will be `false`.
     */
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    /**
     * The size of the switch. For now there is "medium" (default) and "large".
     */
    size?: SwitchSize;
    /**
     * Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.
     */
    suffix?: React.ReactNode;
    value?: string;
    attributes?: SwitchAttributes;
    readOnly?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    className?: string;
    children?: React.ReactNode;
    /**
     * Will be called on state changes made by the user. Returns a boolean `{ checked, event }`.
     */
    onChange?: SwitchOnChange;
    /**
     * Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.
     */
    /**
     * Will be called on click made by the user. Returns the ClickEvent.
     */
    onClick?: (args: SwitchOnClickParams) => void;
    onChangeEnd?: SwitchOnChange;
    /**
     * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.createRef()` or `React.useRef()`.
     */
    ref?: React.RefObject<HTMLInputElement> | ((elem: HTMLInputElement) => void);
} & FormStatusBaseProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size' | 'onChange' | 'onClick' | 'label'> & SpacingProps;
declare function Switch(props: SwitchProps): import("react/jsx-runtime").JSX.Element;
export default Switch;
