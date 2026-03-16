/**
 * Web StepIndicator Component
 *
 */
import React from 'react';
import type { AnchorAllProps } from '../anchor/Anchor';
import type { StepIndicatorMouseEvent } from './StepIndicator';
export type StepIndicatorStatusState = 'warning' | 'info' | 'error';
export type StepIndicatorItemProps = Omit<React.HTMLProps<HTMLElement>, 'title' | 'data' | 'onClick'> & {
    title: string | React.ReactNode;
    /**
     * If set to true, this item step will be set as the current current selected step. This can be used instead of `currentStep` on the component itself.
     */
    isCurrent?: boolean;
    /**
     * If set to true, this item step will be handled as an inactive step and will not be clickable.
     * Defaults to `false`
     */
    inactive?: boolean;
    /**
     * If set to true, this item step will not be clickable. Same as `inactive`, but will also add the `aria-disabled="true"` .
     * Defaults to false.
     */
    disabled?: boolean;
    /**
     * Is used to set the status text.
     */
    status?: string | React.ReactNode;
    /**
     * Used to set the status state to be either `info`, `error` or `warn`.
     * Defaults to `warn`.
     */
    statusState?: StepIndicatorStatusState;
    /**
     * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, currentStep }`.
     */
    onClick?: ({ event, item, currentStep }: StepIndicatorMouseEvent) => void;
    currentItemNum: number;
};
declare function StepIndicatorItem({ statusState: statusStateDefault, inactive: inactiveDefault, disabled: disabledDefault, ...restOfProps }: StepIndicatorItemProps): import("react/jsx-runtime").JSX.Element;
export type StepItemButtonProps = AnchorAllProps & Pick<StepIndicatorItemProps, 'status' | 'statusState'>;
export declare function StepItemButton({ children, className, status, statusState, ref, ...props }: StepItemButtonProps): import("react/jsx-runtime").JSX.Element;
export type StepItemWrapperProps = React.HTMLProps<HTMLElement> & {
    /** Content inside the step button */
    children?: React.ReactNode;
};
export declare function StepItemWrapper({ children }: StepItemWrapperProps): import("react/jsx-runtime").JSX.Element;
export default StepIndicatorItem;
