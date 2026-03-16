/**
 * Web ToggleButton Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers';
import React from 'react';
declare const _default: ToggleButtonComponent;
export default _default;
import type { ButtonIconPosition, ButtonSize, ButtonTooltip } from '../Button';
import type { FormStatusBaseProps } from '../FormStatus';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceType } from '../space/types';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup';
export type ToggleButtonVariant = 'default' | 'checkbox' | 'radio';
export type ToggleButtonSuffix = string | ((...args: any[]) => any) | React.ReactNode;
export type ToggleButtonValue = string | number | Record<string, unknown> | any[];
export type ToggleButtonChildren = string | ((...args: any[]) => any);
export interface ToggleButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'label' | 'value' | 'children' | 'onChange' | 'size'>, Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'>, FormStatusBaseProps {
    /**
     * The text shown in the ToggleButton.
     */
    text?: React.ReactNode;
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
     * Determine whether the ToggleButton is checked or not. The default will be `false`.
     */
    checked?: boolean;
    variant?: ToggleButtonVariant;
    leftComponent?: React.ReactNode;
    disabled?: boolean;
    /**
     * If set to `true`, an overlaying skeleton with animation will be shown.
     */
    skeleton?: SkeletonShow;
    id?: string;
    /**
     * Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.
     */
    suffix?: ToggleButtonSuffix;
    /**
     * Provide a string or a React Element to be shown as the tooltip content.
     */
    tooltip?: ButtonTooltip;
    /**
     * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
     */
    value?: ToggleButtonValue;
    /**
     * The size of the button. For now there is `small`, `medium`, `default` and `large`.
     */
    size?: ButtonSize;
    /**
     * Icon to be included in the toggle button.
     */
    icon?: IconIcon;
    /**
     * Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.
     */
    iconPosition?: ButtonIconPosition;
    /**
     * Define icon width and height. Defaults to `16px`.
     */
    iconSize?: IconSize;
    readOnly?: boolean;
    className?: string;
    children?: ToggleButtonChildren;
    onChange?: (...args: any[]) => any;
    top?: SpaceType;
    right?: SpaceType;
    bottom?: SpaceType;
    left?: SpaceType;
}
export type ToggleButtonComponent = React.ComponentClass<ToggleButtonProps> & {
    Group: React.ComponentClass<ToggleButtonGroupProps>;
} & ComponentMarkers;
