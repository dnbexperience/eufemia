/**
 * Web Logo Component
 */
import React from 'react';
import type { UseThemeReturn } from '../../shared/useTheme';
import type { IconColor } from '../Icon';
import type { SpacingProps } from '../space/types';
import type { LogoSvgComponent } from './LogoSvg';
export * from './LogoSvg';
export type LogoWidth = string;
export type LogoHeight = string;
export type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactElement<React.SVGProps<SVGSVGElement>>;
export type CustomLogoSvg = LogoSvgComponent | SvgComponent;
export type Svg = CustomLogoSvg | ((theme: UseThemeReturn) => CustomLogoSvg);
export type LogoProps = {
    /**
     * Define the width of the logo.
     */
    width?: LogoWidth;
    /**
     * Define the height of the logo.
     */
    height?: LogoHeight;
    /**
     * Define the color of the logo.
     */
    color?: IconColor;
    /**
     * Set to `true`to inherit the color with `currentColor`. Defaults to `false`.
     */
    inheritColor?: boolean;
    /**
     * Set to `true` if you want the logo to inherit the parent `height`. Defaults to `false`.
     */
    inheritSize?: boolean;
    /**
     * Provide a custom SVG to render instead of the built-in logos.
     * Can be a React component (receives standard SVG props), a React element, or a function that receives the theme and returns a SVG component.
     */
    svg?: Svg;
} & SpacingProps & Omit<React.HTMLProps<HTMLElement>, 'ref' | 'size'>;
declare function Logo(localProps: LogoProps): import("react/jsx-runtime").JSX.Element;
export default Logo;
