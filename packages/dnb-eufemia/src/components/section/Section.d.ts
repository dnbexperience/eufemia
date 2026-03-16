/**
 * Web Section Component
 *
 */
import React from 'react';
import type { DynamicElement, ResponsiveProp, SpacingProps } from '../../shared/types';
import type { InnerSpaceType } from '../space/types';
export type SectionVariants = 'error' | 'info' | 'warning' | 'success';
export type SectionStyleTypes = 'divider' | 'white' | 'transparent'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'lavender'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'pistachio'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'emerald-green'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'sea-green'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'fire-red'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'fire-red-8'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'sand-yellow'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'black-3'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'mint-green'
/** @deprecated in v11 use "variant" or "backgroundColor" prop instead */
 | 'mint-green-12';
export type SectionSpacing = boolean | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
export type TextColor = string;
export type OutlineColor = string | boolean;
export type BackgroundColor = string;
export type DropShadow = boolean;
export type RoundedCorner = boolean | [boolean, boolean, boolean, boolean];
export type SectionProps = {
    /**
     * Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type prop
     */
    variant?: SectionVariants | string;
    /**
     * Define if the background color should break-out to a fullscreen view. Defaults to `true`.
     */
    breakout?: boolean | ResponsiveProp<boolean>;
    /**
     * Define if the Card should break out negatively on larger screens. You cannot use `breakout` and `outset` together.
     * Defaults to `false`
     */
    outset?: boolean | ResponsiveProp<boolean>;
    /**
     * Define if the section should have rounded corners. Defaults to `false`.
     */
    roundedCorner?: RoundedCorner | ResponsiveProp<RoundedCorner>;
    /**
     * Define a custom border color. Use a Eufemia color.
     */
    outline?: OutlineColor | ResponsiveProp<OutlineColor>;
    /**
     * Define a custom border width. Defaults to `var(--card-outline-width)`.
     */
    outlineWidth?: number | string | ResponsiveProp<number | string>;
    /**
     * Define a custom text color to compliment the backgroundColor. Use a Eufemia color.
     */
    textColor?: TextColor | ResponsiveProp<TextColor>;
    /**
     * Define a custom background color, instead of a variant. Use a Eufemia color.
     */
    backgroundColor?: BackgroundColor | ResponsiveProp<BackgroundColor>;
    /**
     * Define a custom drop-shadow.
     */
    dropShadow?: DropShadow | ResponsiveProp<DropShadow>;
    /**
     * Define what HTML element should be used. Defaults to `<section>`.
     */
    element?: DynamicElement;
    /**
     * Define a React.Ref.
     */
    ref?: React.RefObject<HTMLElement>;
    /**
     * @deprecated in v11 use "innerSpace" prop instead
     */
    spacing?: SectionSpacing | ResponsiveProp<SectionSpacing>;
    /**
     * @deprecated in v11 use "background" prop instead
     */
    style_type?: SectionStyleTypes | string;
};
type SectionSpacingProps = Omit<SpacingProps, 'innerSpace'> & {
    innerSpace?: InnerSpaceType;
};
export type SectionAllProps = SectionProps & SectionSpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref'>;
type SectionReturnParams = Record<string, unknown> & {
    className: string;
    ref: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    style: React.CSSProperties;
};
declare function Section(props: SectionAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace Section {
    var _name: string;
}
export default Section;
export declare function SectionParams(localProps: SectionAllProps): SectionReturnParams;
