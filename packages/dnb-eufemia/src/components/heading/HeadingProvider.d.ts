/**
 * Web Heading Provider
 *
 */
import React from 'react';
import type { HeadingProps } from './Heading';
export type HeadingProviderProps = HeadingProps;
export type HeadingProviderAllProps = HeadingProviderProps & React.HTMLProps<HTMLElement>;
export default function HeadingProvider(props: HeadingProviderAllProps): import("react/jsx-runtime").JSX.Element;
