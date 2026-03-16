/**
 * Web Radio Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers';
import React from 'react';
import RadioGroup from './RadioGroup';
import RadioGroupContext from './RadioGroupContext';
import type { FormStatusBaseProps } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type RadioLabel = string | React.ReactNode;
export type RadioLabelPosition = 'left' | 'right';
export type RadioSize = 'default' | 'medium' | 'large';
export type RadioSuffix = string | React.ReactNode;
export type RadioChildren = string | React.ReactNode;
export type RadioEvent<E = React.SyntheticEvent> = {
    group?: string;
    checked: boolean;
    value: string;
    event: E;
};
export type RadioChangeEvent = RadioEvent<React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>>;
export interface RadioProps extends Omit<React.HTMLProps<HTMLElement>, 'ref' | 'onChange' | 'label' | 'size' | 'children'>, SpacingProps, FormStatusBaseProps {
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: RadioLabel;
    /**
     * Use `true` to make the label only readable by screen readers.
     */
    labelSrOnly?: boolean;
    /**
     * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
     */
    labelPosition?: RadioLabelPosition;
    /**
     * Determine whether the radio is checked or not. Default will be `false`.
     */
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    element?: React.ElementType;
    /**
     * Use a unique group identifier to define the Radio buttons that belongs together.
     */
    group?: string;
    /**
     * The size of the Radio button. For now there is **medium** (default) and **large**.
     */
    size?: RadioSize;
    suffix?: RadioSuffix;
    /**
     * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **RadioGroup**.
     */
    value?: string;
    skeleton?: SkeletonShow;
    readOnly?: boolean;
    className?: string;
    children?: RadioChildren;
    onChange?: (event: RadioChangeEvent) => void;
    /**
     * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
     */
    ref?: React.Ref<HTMLInputElement>;
}
interface RadioComponentState {
    checked?: boolean;
    _checked?: boolean;
    __checked?: boolean;
    _listenForPropChanges: boolean;
}
/**
 * The radio component is our enhancement of the classic radio button.
 */
declare class RadioClass extends React.PureComponent<RadioProps, RadioComponentState> {
    static contextType: React.Context<import("./RadioGroupContext").RadioGroupContextValue>;
    context: React.ContextType<typeof RadioGroupContext>;
    _refInput: React.RefObject<HTMLInputElement | null>;
    _id: string;
    static defaultProps: {
        label: any;
        labelSrOnly: any;
        labelPosition: any;
        checked: any;
        disabled: any;
        id: any;
        size: any;
        element: string;
        group: any;
        status: any;
        statusState: string;
        statusProps: any;
        statusNoAnimation: any;
        globalStatus: any;
        suffix: any;
        value: string;
        readOnly: boolean;
        skeleton: any;
        className: any;
        children: any;
        onChange: any;
        ref: any;
    };
    static Group: typeof RadioGroup;
    static parseChecked: (state: string | boolean | null | undefined) => boolean;
    static getDerivedStateFromProps(props: RadioProps, state: RadioComponentState): RadioComponentState;
    constructor(props: RadioProps);
    onKeyDownHandler: (event: React.KeyboardEvent) => void;
    onChangeHandler: (_event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent) => void;
    isContextGroupOrSingle: () => boolean;
    isPlainGroup: () => string;
    isInNoGroup: () => boolean;
    onClickHandler: (event: React.MouseEvent<HTMLInputElement>) => void;
    callOnChange: ({ value, checked, event, }: {
        value: string;
        checked: boolean;
        event: React.SyntheticEvent;
    }) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
declare function RadioComponent({ ref, ...props }: RadioProps): import("react/jsx-runtime").JSX.Element;
declare const Radio: typeof RadioComponent & {
    Group: typeof RadioGroup;
    parseChecked: typeof RadioClass.parseChecked;
} & ComponentMarkers;
export default Radio;
