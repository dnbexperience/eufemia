/**
 * Web Checkbox Component
 */
import React from 'react';
import type { SpacingProps } from '../space/types';
import type { FormStatusBaseProps } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxSize = 'default' | 'medium' | 'large';
export type OnChangeParams = {
    checked: boolean;
    event: React.ChangeEvent<HTMLInputElement>;
};
export type OnClickParams = React.MouseEvent<HTMLInputElement> & {
    checked: boolean;
    event: React.MouseEvent<HTMLInputElement>;
};
export type CheckboxProps = {
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: React.ReactNode;
    /**
     * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
     */
    labelPosition?: CheckboxLabelPosition;
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * The `title` of the input - describing it a bit further for accessibility reasons.
     */
    title?: string;
    /**
     * Determine whether the checkbox is checked or not. The default is `false`.
     */
    checked?: boolean | undefined | null;
    /**
     * Determine whether to show the indeterminate checked state when checked. The default is `false`.
     */
    indeterminate?: boolean;
    /**
     * The size of the checkbox. For now there is "medium" (default) and "large".
     */
    size?: CheckboxSize;
    /**
     * Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.
     */
    suffix?: React.ReactNode;
    value?: string;
    element?: React.ElementType;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Will be called on state changes made by the user. Returns an boolean `{ checked, event }`.
     */
    onChange?: (args: OnChangeParams) => void;
    /**
     * Will be called on click made by the user. Returns the ClickEvent.
     */
    onClick?: (args: OnClickParams) => void;
    /**
     * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.createRef()` or `React.useRef()`.
     */
    ref?: React.RefObject<HTMLInputElement> | ((elem: HTMLInputElement) => void);
} & FormStatusBaseProps & SpacingProps & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'label' | 'size' | 'onChange' | 'onClick'>;
declare function Checkbox(localProps: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export default Checkbox;
