import React from 'react';
import type { OnStepChange, StepIndex } from '../Context/types';
import type { ComponentProps } from '../../types';
export type Props = ComponentProps & {
    id?: string;
    /**
     * The mode of the wizard.
     */
    mode?: 'static' | 'strict' | 'loose';
    /**
     * If set to `true`, the wizard will not scroll to the first step when the user clicks on the next button.
     */
    omitScrollManagement?: boolean;
    /**
     * If set to `true`, the wizard will not focus on the next step when the user clicks on the next button.
     */
    omitFocusManagement?: boolean;
    /**
     * The index of the first step to be rendered.
     */
    initialActiveIndex?: StepIndex;
    /**
     * The callback function that will be called when the user clicks on the next button.
     */
    onStepChange?: OnStepChange;
    /**
     * If set to `true`, the wizard will not animate the steps.
     */
    noAnimation?: boolean;
    /**
     * Set to `true` to have the list be expanded initially. Defaults to `false`.
     */
    expandedInitially?: boolean;
    /**
     * If set to `true`, the wizard will not unmount the steps when navigating back and forth.
     */
    keepInDOM?: boolean;
    /**
     * Whether or not to break out (using negative margins) on larger screens. Defaults to `true`.
     */
    outset?: boolean;
    /**
     * If set to `true`, the wizard pre-render all steps so the props of each field is available in the data context.
     * Defaults to `true`.
     */
    prerenderFieldProps?: boolean;
    /**
     * Determines if and how the validation will be bypassed.
     */
    validationMode?: 'bypassOnNavigation';
    /**
     * The children of the wizard container.
     */
    children: React.ReactNode;
};
declare function WizardContainer(props: Props): import("react/jsx-runtime").JSX.Element;
export default WizardContainer;
