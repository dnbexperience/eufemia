import React from 'react';
import type { DialogContentProps, DialogProps } from '../../../../components/dialog/types';
import type { EventStateObject } from '../../types';
export type ConfirmationState = 'idle' | 'readyToBeSubmitted' | 'submitInProgress' | 'submissionComplete';
export type ConfirmParams = {
    data: unknown;
    confirmationState: ConfirmationState;
    submitState: EventStateObject | undefined;
    connectWithDialog: Pick<DialogProps & DialogContentProps, 'open' | 'onConfirm' | 'onDecline' | 'onClose'>;
    setConfirmationState: (state: ConfirmationState) => void;
    submitHandler: () => void | Promise<void>;
    cancelHandler: () => void | Promise<void>;
};
export type ConfirmProps = {
    preventSubmitWhen?: (params: ConfirmParams) => boolean;
    onStateChange?: (params: ConfirmParams) => void | Promise<void>;
    onSubmitResult?: (params: ConfirmParams) => void;
    renderWithState?: (params: ConfirmParams) => React.ReactNode;
    children?: React.ReactNode;
};
declare function SubmitConfirmation(props: ConfirmProps): import("react/jsx-runtime").JSX.Element;
export default SubmitConfirmation;
