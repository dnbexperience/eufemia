/**
 * HTML Element
 *
 */
import React from 'react';
import { TypographySize, TypographyProps } from './Typography';
export type PSize = TypographySize;
export type PProps = TypographyProps<HTMLParagraphElement>;
declare function P(props: PProps): import("react/jsx-runtime").JSX.Element;
export default P;
export type ParagraphContextType = {
    isNested?: boolean;
};
export declare const ParagraphContext: React.Context<ParagraphContextType>;
