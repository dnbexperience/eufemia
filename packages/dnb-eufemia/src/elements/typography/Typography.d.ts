/**
 * HTML Element
 *
 */
import React from 'react';
import type { SpacingProps } from '../../components/space/types';
import type { DynamicElement } from '../../shared/types';
export type TypographySize = 'x-small' | 'small' | 'basis' | 'medium' | 'large' | 'x-large' | 'xx-large';
export type TypographyAlign = 'center' | 'left' | 'right';
export type TypographyFamily = 'basis' | 'heading' | 'monospace';
export type TypographyWeight = 'regular' | 'medium' | 'bold';
export type TypographyDecoration = 'underline';
export type TypographySlant = 'italic';
export type TypographyContextType = {
    proseMaxWidth?: number | boolean;
};
export declare const TypographyContext: React.Context<TypographyContextType>;
export type TypographyProviderProps = {
    /**
     * Sets the maximum width based on character count for all Typography children. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean;
    children: React.ReactNode;
};
export type TypographyProps<ElementType extends HTMLElement = HTMLElement> = SpacingProps & React.HTMLAttributes<ElementType> & {
    /**
     * Defines the Element Type, like "p".
     */
    element?: DynamicElement;
    /**
     * Sets the font size, also sets the line-height if `line` prop is not set
     */
    size?: TypographySize;
    /**
     * Sets the line height, will use same value as `size` if not set.
     */
    lineHeight?: TypographySize;
    /**
     * Sets the text alignment
     */
    align?: TypographyAlign;
    /**
     * Sets the font family
     */
    family?: TypographyFamily;
    /**
     * Sets the font weight
     */
    weight?: TypographyWeight;
    /**
     * Sets the font decoration
     */
    decoration?: TypographyDecoration;
    /**
     * Sets the font style
     */
    slant?: TypographySlant;
    /**
     * Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.
     */
    proseMaxWidth?: number | boolean;
};
type TypographyInternalProps = {
    ref?: React.RefObject<HTMLElement> | React.Ref<unknown>;
};
declare const Typography: {
    ({ element, className, size, lineHeight, align, family, weight, decoration, slant, proseMaxWidth: proseMaxWidthProp, ...props }: TypographyProps & TypographyInternalProps): import("react/jsx-runtime").JSX.Element;
    Provider: ({ children, proseMaxWidth, }: TypographyProviderProps) => import("react/jsx-runtime").JSX.Element;
};
declare const Provider: ({ children, proseMaxWidth, }: TypographyProviderProps) => import("react/jsx-runtime").JSX.Element;
export default Typography;
export { Provider };
