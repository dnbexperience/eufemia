import React from 'react';
import type { SharedStateId } from '../../../../shared/helpers/useSharedState';
import type { InfoOverlayContent } from './setContent';
export type Props = {
    /**
     * The content to show.
     * If not given, the children will be shown.
     * Can be `success`, `error` or a custom content.
     */
    content?: InfoOverlayContent;
    onCancel?: () => void;
    /** Predefined content */
    success?: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        buttonText?: React.ReactNode;
        buttonHref?: string;
        buttonClickHandler?: () => void;
    };
    /** Predefined content */
    error?: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        retryButton?: React.ReactNode;
        cancelButton?: React.ReactNode;
    };
    id?: SharedStateId;
    children: React.ReactNode;
    className?: string;
};
declare function InfoOverlay(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace InfoOverlay {
    var setContent: typeof import("./setContent").default;
}
export default InfoOverlay;
