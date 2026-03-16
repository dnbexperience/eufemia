import React from 'react';
import type { ThemeNames } from '../../shared';
export type LogoType = 'dnb' | 'eiendom' | 'sbankenDefault' | 'sbankenCompact' | 'sbankenHorizontal' | 'carnegie';
export type LogoSvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & {
    alt?: React.ReactNode;
}> & {
    brand: ThemeNames;
    alt: string;
};
/**
 * SVG Logo alt texts
 */
export declare const DnbLogoAlt = "DNB Logo";
export declare const EiendomLogoAlt = "DNB Eiendom";
export declare const SbankenLogoAlt = "Sbanken - et konsept fra DNB";
export declare const CarnegieLogoAlt = "DNB Carnegie";
export declare const DnbDefault: LogoSvgComponent;
export declare const SbankenDefault: LogoSvgComponent;
export declare const CarnegieDefault: LogoSvgComponent;
export declare const EiendomDefault: LogoSvgComponent;
export declare const SbankenCompact: LogoSvgComponent;
export declare const SbankenHorizontal: LogoSvgComponent;
