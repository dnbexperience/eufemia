/**
 * Web Tooltip Component
 *
 */
import { injectTooltipSemantic } from './TooltipHelpers';
import type { TooltipAllProps } from './types';
declare function Tooltip(localProps: TooltipAllProps): import("react/jsx-runtime").JSX.Element;
declare namespace Tooltip {
    var isTooltipComponent: boolean;
}
export { injectTooltipSemantic };
export default Tooltip;
