/**
 * Theme Provider
 *
 */
import React from 'react';
import type { DynamicElement } from './types';
export type ThemeNames = 'ui' | 'eiendom' | 'sbanken' | 'carnegie';
export type ThemeVariants = string;
export type ThemeSizes = 'basis';
export type PropMapping = string;
export type ContrastMode = boolean;
export type DarkMode = boolean;
export type DarkBackground = boolean;
export type ThemeProps = {
    name?: ThemeNames;
    variant?: ThemeVariants;
    size?: ThemeSizes;
    propMapping?: PropMapping;
    contrastMode?: ContrastMode;
    darkMode?: DarkMode;
    darkBackground?: DarkBackground;
    element?: DynamicElement | false;
};
export type ThemeAllProps = ThemeProps & React.HTMLAttributes<HTMLElement>;
declare function Theme(themeProps: ThemeAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace Theme {
    var Provider: ({ element, ...themeProps }: ThemeAllProps) => import("react/jsx-runtime").JSX.Element;
}
export default Theme;
export declare function ThemeWrapper({ children, theme, element, className, ...rest }: {
    [x: string]: any;
    children: any;
    theme: any;
    element?: any;
    className?: any;
}): any;
export declare function getThemeClasses(theme: ThemeProps, className?: any): any;
