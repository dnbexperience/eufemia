/**
 * Web InputMasked Context
 *
 */
import React from 'react';
import type { ContextProps } from '../../shared/Context';
export type InputMaskedContextValue = {
    props: any;
    context: ContextProps;
};
declare const InputMaskedContext: React.Context<InputMaskedContextValue>;
export default InputMaskedContext;
