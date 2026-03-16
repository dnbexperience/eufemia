/**
 * Web GlobalError Component
 *
 */
import React from 'react';
import type { GetTranslationProps } from '../../shared/Context';
import type { SkeletonShow } from '../skeleton/Skeleton';
import type { SpacingProps } from '../../shared/types';
export type GlobalErrorLink = {
    text: string;
    url: string;
};
export type GlobalErrorProps = {
    /**
     * When `404` or `500` is given, a predefined text will be shown.
     * Defaults to `404`.
     */
    statusCode?: '404' | '500' | string;
    /**
     * Will overwrite the default title.
     */
    title?: React.ReactNode;
    /**
     * Will overwrite the default text.
     */
    text?: React.ReactNode;
    /**
     * Will overwrite the default error message code.
     */
    errorMessageCode?: React.ReactNode;
    /**
     * Will overwrite the default additional help text.
     */
    help?: React.ReactNode;
    /**
     * Provide an array with objects `{ text: 'Text', url: 'https://...' }` to display a list of anchor links.
     */
    links?: Array<GlobalErrorLink>;
    /**
     * If true, it will use 80vh as the height and center its content.
     */
    center?: boolean;
    /**
     * Skeleton should be applied when loading content
     * Default: null
     */
    skeleton?: SkeletonShow;
};
export type GlobalErrorAllProps = GlobalErrorProps & Omit<React.HTMLProps<HTMLElement>, 'ref'> & SpacingProps & GetTranslationProps;
export type GlobalErrorTranslationContent = {
    /**
     * Defining a `title` will overwrite the default provided by the `statusCode` translation.
     */
    title?: React.ReactNode;
    /**
     * Defining a `text` will overwrite the default provided by the `statusCode` translation.
     */
    text?: React.ReactNode;
};
export type GlobalErrorTranslation = {
    404?: GlobalErrorTranslationContent;
    500?: GlobalErrorTranslationContent;
};
export default function GlobalError(localProps: GlobalErrorAllProps): import("react/jsx-runtime").JSX.Element;
