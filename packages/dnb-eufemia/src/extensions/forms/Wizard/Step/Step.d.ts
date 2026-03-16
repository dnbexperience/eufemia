import React from 'react';
import type { ComponentProps } from '../../types';
import type { Props as FlexContainerProps } from '../../../../components/flex/Container';
import type { VisibleWhen } from '../../Form/Visibility';
export type Props = ComponentProps & FlexContainerProps & {
    /**
     * An unique title of the step.
     */
    title?: React.ReactNode;
    /**
     * Will treat the step as non-navigable if set to `true`.
     */
    inactive?: boolean;
    /**
     * To determine if the step should be rendered.
     * Used internally by the WizardContainer.
     */
    index?: number;
    /**
     * Will make all the fields inside the step to be required.
     */
    required?: boolean;
    /**
     * If set to `false`, the step will not be rendered.
     */
    include?: boolean;
    /**
     * Provide a `path` and a `hasValue` property with the expected value in order to enable the step. You can alternatively provide a `hasValue` function that returns a boolean. The first parameter is the value of the path.
     */
    includeWhen?: VisibleWhen;
    /**
     * Determines if the step should be kept in the DOM. Defaults to `false`.
     */
    keepInDOM?: boolean;
    /**
     * If set to `true`, the step will always be rendered.
     * For internal use only.
     */
    prerenderFieldProps?: boolean;
};
declare function Step(props: Props): React.JSX.Element;
export default Step;
