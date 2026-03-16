/**
 * Web ToggleButtonGroup Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import { type ContextProps } from '../../shared/Context';
interface ToggleButtonGroupState {
    value?: ToggleButtonGroupValue;
    values?: any[];
    _listenForPropChanges: boolean;
}
declare class ToggleButtonGroup extends React.PureComponent<ToggleButtonGroupProps, ToggleButtonGroupState> {
    static contextType: React.Context<ContextProps>;
    context: ContextProps;
    static defaultProps: {
        label: any;
        labelDirection: any;
        labelSrOnly: any;
        title: any;
        multiselect: any;
        variant: any;
        leftComponent: any;
        disabled: any;
        skeleton: any;
        id: any;
        name: any;
        size: any;
        status: any;
        statusState: string;
        statusProps: any;
        statusNoAnimation: any;
        globalStatus: any;
        suffix: any;
        vertical: any;
        layoutDirection: string;
        value: any;
        values: any;
        className: any;
        children: any;
        onChange: any;
    };
    static getDerivedStateFromProps(props: ToggleButtonGroupProps, state: ToggleButtonGroupState): ToggleButtonGroupState;
    static getValues(props: ToggleButtonGroupProps): any;
    _refInput: React.RefObject<HTMLInputElement>;
    _id: string;
    _name: string;
    _tmp: Record<string, unknown> | undefined;
    constructor(props: ToggleButtonGroupProps);
    onChangeHandler: ({ value, event, }: {
        value: ToggleButtonGroupValue;
        event: React.SyntheticEvent;
    }) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default ToggleButtonGroup;
import type { FormStatusBaseProps } from '../FormStatus';
import type { ButtonSize } from '../Button';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceType } from '../space/types';
export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio';
export type ToggleButtonGroupSuffix = string | ((...args: any[]) => any) | React.ReactNode;
export type ToggleButtonGroupLayoutDirection = 'column' | 'row';
export type ToggleButtonGroupValue = string | number | Record<string, unknown> | any[];
export type ToggleButtonGroupValues = string | any[];
export type ToggleButtonGroupChildren = string | ((...args: any[]) => any) | React.ReactNode;
export interface ToggleButtonGroupProps extends Omit<React.HTMLProps<HTMLElement>, 'label' | 'value' | 'children' | 'onChange' | 'size'>, Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'>, FormStatusBaseProps {
    /**
     * Use either the `label` property or provide a custom one.
     */
    label?: string | React.ReactNode;
    labelDirection?: 'horizontal' | 'vertical';
    labelSrOnly?: boolean;
    /**
     * The `title` of the input - describing it a bit further for accessibility reasons.
     */
    title?: string;
    /**
     * Determine whether the ToggleButtonGroup is checked or not. The default will be `false`.
     */
    checked?: boolean;
    variant?: ToggleButtonGroupVariant;
    leftComponent?: React.ReactNode;
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    id?: string;
    /**
     * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
     */
    suffix?: ToggleButtonGroupSuffix;
    /**
     * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
     */
    value?: ToggleButtonGroupValue;
    /**
     * The size of the button. For now there is `small`, `medium`, `default` and `large`.
     */
    size?: ButtonSize;
    /**
     * Defines the layout direction of the ToggleButtonGroup. Set to `column` or `row`. Defaults to `row` if not set.
     */
    layoutDirection?: ToggleButtonGroupLayoutDirection;
    /**
     * Defines the `values` as a string. Use it to get the values during the `onChange` event listener callback in the **ToggleButtonGroup**.
     */
    values?: ToggleButtonGroupValues;
    readOnly?: boolean;
    className?: string;
    children?: ToggleButtonGroupChildren;
    onChange?: (...args: any[]) => any;
    top?: SpaceType;
    right?: SpaceType;
    bottom?: SpaceType;
    left?: SpaceType;
    multiselect?: boolean;
    name?: string;
    vertical?: boolean;
}
