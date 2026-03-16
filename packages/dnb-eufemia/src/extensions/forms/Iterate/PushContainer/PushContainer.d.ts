import React from 'react';
import type { IsolationProps } from '../../Form/Isolation';
import type { AllProps as EditContainerProps } from '../EditContainer';
import type { OnCommit, Path } from '../../types';
import type { SpacingProps } from '../../../../shared/types';
import type { JsonObject } from '../../utils';
type OnlyPathRequired = {
    /**
     * The path to the array to add the new item to.
     */
    path: Path;
    /** The sub path to the array to add the new item to. */
    itemPath?: Path;
};
type OnlyItemPathRequired = {
    /**
     * The path to the array to add the new item to.
     */
    path?: Path;
    /** The sub path to the array to add the new item to. */
    itemPath: Path;
};
export type Props = (OnlyPathRequired | OnlyItemPathRequired) & {
    /**
     * The title of the container.
     */
    title?: React.ReactNode;
    /**
     * If the fields inside the container are required.
     */
    required?: boolean;
    /**
     * The index to insert the new item at.
     */
    insertAt?: number;
    /**
     * The button to open container.
     */
    openButton?: React.ReactNode;
    /**
     * Define when the "open button" should be shown.
     * Should be a function that returns a boolean.
     */
    showOpenButtonWhen?: (list: unknown[]) => boolean;
    /**
     * Prefilled data to add to the fields. The data will be put into this path: "/pushContainerItems/0".
     */
    data?: unknown | Record<string, unknown>;
    /**
     * Prefilled data to add to the fields. The data will be put into this path: "/pushContainerItems/0".
     */
    defaultData?: unknown | Record<string, unknown>;
    /**
     * Provide additional data that will be put into the root of the isolated data context (parallel to "/pushContainerItems/0").
     */
    isolatedData?: Record<string, unknown>;
    /**
     * Prevent the form from being submitted when there are fields with errors inside the PushContainer.
     */
    bubbleValidation?: boolean;
    /**
     * Prevents uncommitted changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.
     */
    preventUncommittedChanges?: boolean;
    /**
     * Show a button to clear the PushContainer data.
     */
    showResetButton?: boolean;
    /**
     * A custom toolbar to be shown below the container.
     */
    toolbar?: React.ReactNode;
    /**
     * Will be called when the user clicks on the "Done" button.
     */
    onCommit?: OnCommit;
    /**
     * The container contents.
     */
    children: React.ReactNode;
} & Pick<IsolationProps<JsonObject>, 'dataReference'>;
export type AllProps = Props & SpacingProps & Omit<EditContainerProps, 'data'>;
declare function PushContainer(props: AllProps): import("react/jsx-runtime").JSX.Element;
declare namespace PushContainer {
    var OpenButton: typeof import("./OpenButton").default;
}
export default PushContainer;
