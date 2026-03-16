/**
 * Web Input Component
 */
import React from 'react';
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers';
import type { ButtonIconPosition, ButtonSize, ButtonVariant } from '../Button';
import type { FormStatusBaseProps } from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type InputSize = 'default' | 'small' | 'medium' | 'large' | number;
export type InputValue = string | number;
export type InputSuffix = React.ReactNode;
export type InputAlign = 'left' | 'center' | 'right';
export type InputInputAttributes = string | Record<string, unknown>;
export type InputElementRenderProps = {
    className: string;
    autoComplete: string;
    type: string;
    id: string;
    disabled: boolean;
    name: string;
    value: string | number | null;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    [key: string]: unknown;
};
export type InputInputElement = React.ComponentType | React.ReactNode | ((params: InputElementRenderProps, ref: React.RefObject<HTMLInputElement | null>) => React.ReactNode);
export type InputSubmitElement = React.ComponentType | React.ReactNode;
export type InputSubmitButtonIcon = string | React.ReactNode;
export type InputChildren = React.ReactNode;
export type InputEvent<E = React.SyntheticEvent> = {
    value: string;
    event: E;
};
export type InputChangeEvent = InputEvent<React.ChangeEvent<HTMLInputElement> | React.MouseEvent>;
export type InputFocusEvent = InputEvent<React.FocusEvent<HTMLInputElement>>;
export type InputKeyDownEvent = InputEvent<React.KeyboardEvent<HTMLInputElement>>;
export type InputClearEvent = {
    value: string;
    previousValue: string | number | null;
    event: React.MouseEvent;
};
export interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'children' | 'onChange' | 'onKeyDown' | 'onSubmit' | 'onFocus' | 'onBlur' | 'size' | 'label' | 'placeholder'>, SpacingProps, FormStatusBaseProps {
    /**
     * Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.
     */
    type?: string;
    /**
     * The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.
     */
    size?: InputSize;
    /**
     * The content value of the input.
     */
    value?: InputValue;
    id?: string;
    /**
     * Prepends the Form Label component. If no ID is provided, a random ID is created.
     */
    label?: React.ReactNode;
    /**
     * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
     */
    labelDirection?: 'vertical' | 'horizontal';
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.
     */
    inputState?: string;
    /**
     * Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
     */
    autocomplete?: string;
    /**
     * Title attribute for the search/submit button. Only relevant when `type="search"`.
     */
    submitButtonTitle?: string;
    clearButtonTitle?: string;
    /**
     * The placeholder which shows up once the input value is empty.
     */
    placeholder?: React.ReactNode;
    /**
     * If set to `true`, then a clear button will be shown which lets the user clear any given input value.
     */
    clear?: boolean;
    /**
     * Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.
     */
    keepPlaceholder?: boolean;
    /**
     * Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.
     */
    suffix?: InputSuffix;
    /**
     * Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.
     */
    align?: InputAlign;
    /**
     * If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.
     */
    selectAll?: boolean;
    /**
     * If set to `true`, then the input field will be 100% in `width`.
     */
    stretch?: boolean;
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * In case we have to set a custom input class.
     */
    inputClass?: string;
    /**
     * Provide the Input element with any attributes by using an Object `inputAttributes={{size:'2'}}` or a JSON Object `inputAttributes='{"size":"2"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
     */
    inputAttributes?: InputInputAttributes;
    /**
     * By providing a new component we can change the internally used element. Also supports a string only, like `inputElement="input"`.
     */
    inputElement?: InputInputElement;
    /**
     * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
     */
    icon?: IconIcon;
    /**
     * The icon size of the icon shows. Defaults to `medium`.
     */
    iconSize?: IconSize;
    /**
     * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
     */
    iconPosition?: ButtonIconPosition;
    /**
     * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
     */
    ref?: React.Ref<HTMLInputElement>;
    readOnly?: boolean;
    /**
     * By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
     */
    innerElement?: React.ReactNode;
    /**
     * Accepts a React element which will show up like the "submit button" would do on `type="search"`.
     */
    submitElement?: InputSubmitElement;
    submitButtonVariant?: ButtonVariant;
    submitButtonIcon?: InputSubmitButtonIcon;
    submitButtonStatus?: string;
    children?: InputChildren;
    onChange?: (event: InputChangeEvent) => void;
    onKeyDown?: (event: InputKeyDownEvent) => void;
    onSubmit?: (event: InputEvent) => void;
    onFocus?: (event: InputFocusEvent) => void;
    onBlur?: (event: InputFocusEvent) => void;
    onSubmitFocus?: (event: InputEvent<React.FocusEvent>) => void;
    onSubmitBlur?: (event: InputEvent<React.FocusEvent>) => void;
    onClear?: (event: InputClearEvent) => void;
}
export interface SubmitButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'size' | 'onSubmit'>, FormStatusBaseProps {
    id?: string;
    /**
     * The content value of the input.
     */
    value?: string;
    title?: string;
    variant?: ButtonVariant;
    /**
     * The sizes you can choose is `small`, `default`, `medium` and `large`.
     */
    size?: ButtonSize;
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    /**
     * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
     */
    icon?: IconIcon;
    /**
     * The icon size of the icon shows. Defaults to `medium`.
     */
    iconSize?: IconSize;
    onSubmit?: (event: InputEvent) => void;
    onSubmitFocus?: (event: InputEvent<React.FocusEvent>) => void;
    onSubmitBlur?: (event: InputEvent<React.FocusEvent>) => void;
}
export declare const inputDefaultProps: {
    type: string;
    size: any;
    value: string;
    id: any;
    label: any;
    labelDirection: any;
    labelSrOnly: any;
    status: any;
    globalStatus: any;
    statusState: string;
    statusProps: any;
    statusNoAnimation: any;
    inputState: any;
    autocomplete: string;
    placeholder: any;
    clear: any;
    keepPlaceholder: any;
    suffix: any;
    align: any;
    selectAll: any;
    stretch: any;
    disabled: any;
    skeleton: any;
    inputClass: any;
    inputAttributes: any;
    inputElement: any;
    ref: any;
    icon: any;
    iconSize: any;
    iconPosition: string;
    readOnly: boolean;
    innerElement: any;
    submitElement: any;
    submitButtonTitle: any;
    clearButtonTitle: any;
    submitButtonVariant: string;
    submitButtonIcon: string;
    submitButtonStatus: any;
    className: any;
    children: any;
    onChange: any;
    onKeyDown: any;
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onSubmitFocus: any;
    onSubmitBlur: any;
    onClear: any;
};
declare function hasValue(value: string | number | null | undefined): boolean;
declare function getValue(props: InputProps): any;
declare function InputSubmitButton({ ref, ...ownProps }: SubmitButtonProps & {
    value?: string;
    attributes?: Record<string, unknown>;
    tooltip?: React.ReactNode;
    ref?: React.Ref<HTMLElement>;
}): import("react/jsx-runtime").JSX.Element;
export { InputSubmitButton as SubmitButton };
type InputComponentType = ((props: InputProps) => React.JSX.Element) & {
    getValue: typeof getValue;
    hasValue: typeof hasValue;
} & ComponentMarkers;
declare const Input: InputComponentType;
export default Input;
