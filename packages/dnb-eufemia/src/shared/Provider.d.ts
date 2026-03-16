/**
 * Lib Provider
 *
 */
import React from 'react';
import type { ContextProps } from './Context';
export type ProviderProps = {
    /**
     * Send in an object that gets spread as properties to the Provider
     */
    value?: ContextProps;
    /**
     * The content
     */
    children: React.ReactNode;
} & ContextProps;
export default function Provider<Props>(localProps: ProviderProps & Props): import("react/jsx-runtime").JSX.Element;
