/**
 * Web Tooltip Component
 *
 */
import type { TooltipAllProps } from './types';
export declare function injectTooltipSemantic(params: any): any;
export declare const defaultProps: Partial<TooltipAllProps>;
export declare function getTargetElement(target: HTMLElement | string | null): Element;
export declare function getPropsFromTooltipProp(localProps: {
    tooltip?: TooltipAllProps['tooltip'];
}): Partial<TooltipAllProps> | null;
export declare const isTouch: (type: string) => boolean;
