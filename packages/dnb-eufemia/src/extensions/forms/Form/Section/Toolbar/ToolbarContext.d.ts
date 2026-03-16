import React from 'react';
export interface ToolbarContextState {
    setShowError: (showError: boolean) => void;
    onEdit?: () => void;
    onDone?: () => void;
    onCancel?: () => void;
}
declare const ToolbarContext: React.Context<ToolbarContextState>;
export default ToolbarContext;
