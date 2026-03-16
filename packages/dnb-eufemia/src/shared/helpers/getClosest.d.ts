export type TargetSelector = string;
export type RootElement = Element;
/**
 * getClosestParent returns the first element that matches the `selector` starting with the given `element` and traversing up through its parent.
 *
 * @param  {string} selector CSS class or tag name (tag name with upper case chars, like "BUTTON")
 * @param  {Element} element The element to begin with
 * @return {Element} Found element or `null`
 */
export declare const getClosestParent: (selector: TargetSelector, element: RootElement) => Element | null;
