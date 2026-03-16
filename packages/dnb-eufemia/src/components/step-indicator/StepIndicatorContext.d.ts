/**
 * Web StepIndicator Context
 *
 */
import React from 'react';
import type { ContextProps } from '../../shared/Context';
import type { StepIndicatorData, StepIndicatorMode, StepIndicatorProps } from './StepIndicator';
import type { StepIndicatorItemProps } from './StepIndicatorItem';
export type StepIndicatorContextValues = StepIndicatorProviderProps & StepIndicatorProviderStates & ContextProps;
declare const StepIndicatorContext: React.Context<StepIndicatorContextValues>;
export default StepIndicatorContext;
export type StepIndicatorProviderProps = Omit<StepIndicatorProps, 'mode' | 'data'> & {
    /**
     * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See parameters and the example above.
     */
    data?: StepIndicatorData;
    /**
     * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
     */
    mode?: StepIndicatorMode;
    children: React.ReactNode;
};
export type StepIndicatorProviderStates = {
    data: (string | StepIndicatorItemProps)[];
    activeStep: number;
    open: boolean;
    listOfReachedSteps: number[];
    countSteps: number;
    stepsLabel: string;
    filterAttributes: string[];
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    openHandler: () => void;
    closeHandler: () => void;
};
export declare function StepIndicatorProvider(props: StepIndicatorProviderProps): import("react/jsx-runtime").JSX.Element;
