/**
 * Web RadioGroup Context
 *
 */
import React from 'react';
import type { RadioGroupLabelPosition, RadioGroupSize } from './RadioGroup';
export interface RadioGroupContextValue {
    name?: string;
    value?: string;
    size?: RadioGroupSize;
    disabled?: boolean;
    labelPosition?: RadioGroupLabelPosition;
    onChange?: (args: {
        value: string;
        event: React.SyntheticEvent;
    }) => void;
}
declare const RadioGroupContext: React.Context<RadioGroupContextValue>;
export default RadioGroupContext;
