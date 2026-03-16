/**
 * Web RadioGroup Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import React from 'react';
import Context from '../../shared/Context';
import type { FormStatusBaseProps, FormStatusText, FormStatusState } from '../FormStatus';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type RadioGroupLabelPosition = 'left' | 'right';
export type RadioGroupSize = 'default' | 'medium' | 'large';
export type RadioGroupSuffix = string | React.ReactNode;
export type RadioGroupLayoutDirection = 'column' | 'row';
export type RadioGroupChildren = string | React.ReactNode;
export type RadioGroupChangeEvent = {
    value: string;
    event: React.SyntheticEvent;
};
export type RadioGroupProps = {
    label?: React.ReactNode;
    labelDirection?: 'vertical' | 'horizontal';
    labelSrOnly?: boolean;
    labelPosition?: RadioGroupLabelPosition;
    title?: string;
    disabled?: boolean;
    skeleton?: SkeletonShow;
    id?: string;
    name?: string;
    size?: RadioGroupSize;
    status?: FormStatusText;
    statusState?: FormStatusState;
    statusProps?: FormStatusBaseProps;
    statusNoAnimation?: boolean;
    globalStatus?: FormStatusBaseProps['globalStatus'];
    suffix?: RadioGroupSuffix;
    vertical?: boolean;
    layoutDirection?: RadioGroupLayoutDirection;
    value?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: RadioGroupChildren;
    onChange?: (event: RadioGroupChangeEvent) => void;
} & SpacingProps;
interface RadioGroupComponentState {
    value?: string;
    _value?: string;
    _listenForPropChanges: boolean;
}
/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
export default class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupComponentState> {
    static contextType: React.Context<import("../../shared/Context").ContextProps>;
    context: React.ContextType<typeof Context>;
    _refInput: React.RefObject<HTMLInputElement | null>;
    _id: string;
    _name: string;
    static defaultProps: {
        label: any;
        labelDirection: any;
        labelSrOnly: any;
        labelPosition: any;
        title: any;
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
        className: any;
        children: any;
        onChange: any;
    };
    static parseChecked: (state: string | boolean | null | undefined) => boolean;
    static getDerivedStateFromProps(props: RadioGroupProps, state: RadioGroupComponentState): RadioGroupComponentState;
    constructor(props: RadioGroupProps);
    onChangeHandler: ({ value, event, }: {
        value: string;
        event: React.SyntheticEvent;
    }) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
