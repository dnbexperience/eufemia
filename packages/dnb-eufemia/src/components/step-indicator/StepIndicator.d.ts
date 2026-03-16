/**
 * Web StepIndicator Component
 *
 */
import React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { SkeletonShow } from '../Skeleton';
import type { StepIndicatorItemProps } from './StepIndicatorItem';
import type { FormStatusState, FormStatusText } from '../form-status/FormStatus';
export type StepIndicatorMode = 'static' | 'strict' | 'loose';
export type StepIndicatorDataItem = Pick<StepIndicatorItemProps, 'title' | 'isCurrent' | 'inactive' | 'disabled' | 'status' | 'statusState' | 'onClick'>;
export type StepIndicatorData = string | string[] | StepIndicatorDataItem[];
export type StepIndicatorMouseEvent = {
    event: React.MouseEvent<HTMLButtonElement>;
    item: StepIndicatorItemProps;
    currentStep: number;
};
export type StepIndicatorProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'ref' | 'data' | 'onChange' | 'onClick'> & SpacingProps & {
    /**
     * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     */
    mode: StepIndicatorMode;
    /**
     * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See parameters and the example above.
     */
    data: StepIndicatorData;
    /**
     *  The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`
     *  Defaults to `Steps Overview`
     */
    overviewTitle?: string;
    /**
     *  The label for `<StepIndicatorTriggerButton />` and supplemental screen reader text for `<StepIndicatorItem />`
     *  This value need to contain `%step` and `%count` if you want to display the current step and total amount of steps
     * `%step` is used to place the current step into the text
     * `%count` is used to place the step total into the text
     *  Defaults to `Step %step of %count`
     */
    stepTitle?: string;
    /**
     * Defines the active number marked step starting by 0. Defaults to `0`.
     */
    currentStep?: number;
    /**
     * Define whether to show automatically counted numbers or not. Defaults to `false`.
     */
    hideNumbers?: boolean;
    /**
     * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, currentStep, currentStep }`.
     */
    onClick?: ({ event, item, currentStep, }: StepIndicatorMouseEvent) => void;
    /**
     * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, currentStep, currentStep }`.
     */
    onChange?: ({ event, item, currentStep, }: StepIndicatorMouseEvent) => void;
    /**
     * Status text. Status is only shown if this prop has text. Defaults to `undefined`
     */
    status?: FormStatusText;
    /**
     * The type of status for the `status` prop. Is either `info`, `error` or `warn`.
     * Defaults to `warn`.
     */
    statusState?: FormStatusState;
    /**
     * If set to `true`, the height animation on the step items and the drawer button will be omitted. Defaults to `false`.
     */
    noAnimation?: boolean;
    /**
     * Set to `true` to have the list be expanded initially. Defaults to `false`.
     */
    expandedInitially?: boolean;
    /**
     * Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.
     */
    outset?: boolean;
    skeleton?: SkeletonShow;
    className?: string;
    children?: React.ReactNode;
};
declare function StepIndicator({ status, statusState, data, skeleton, currentStep, hideNumbers, noAnimation, expandedInitially, ...restOfProps }: StepIndicatorProps): import("react/jsx-runtime").JSX.Element;
export default StepIndicator;
