/**
 * Component helpers
 *
 */
import React from 'react';
import { warn } from './helpers';
import { getClosestParent } from './helpers/getClosest';
export * from './legacy/component-helper-legacy';
export { InteractionInvalidation } from './helpers/InteractionInvalidation';
export { extendPropsWithContext, extendPropsWithContextInClassComponent, } from './helpers/extendPropsWithContext';
export { assignPropsWithContext } from './helpers/assignPropsWithContext';
export { filterProps } from './helpers/filterProps';
export { getClosestParent, warn };
/**
 * @deprecated stop using this function as it only removes things that should be handled in the component any documented prop should be explicitly removed, and props should not have default value `null`
 * @description Removes invalid DOM attributes from `params`.
 * @param props properties from `props.attributes` are added to `params`
 * @param params object with DOM attributes
 * @returns `params` cleaned from invalid DOM attributes
 */
export declare const validateDOMAttributes: (
/** `null` or an object with property `attributes` that is merged with `params` */
props: Record<string, any>, 
/** object with DOM attributes */
params: Record<string, any>) => Record<string, any>;
export declare function isObject(item: any): boolean;
export declare function extendDeep(target?: {}, ...sources: any[]): {};
export declare const dispatchCustomElementEvent: (src: any, eventName: any, eventObjectOrig?: any) => any;
export declare const toPascalCase: (s: any) => any;
export declare const toKebabCase: (str: any) => any;
export declare function toCapitalized(str: any): any;
export declare const makeUniqueId: (prefix?: string, length?: number) => string;
export declare const slugify: (s: any) => string;
/**
 * Check if an element exists in its children
 * If it finds it, the child "element" of target will be returned.
 *
 * @param {HTMLElement} element The DOM Element to find
 * @param {HTMLElement} target The DOM Element that should contain "element"
 * @param {function} callback (optional)
 * @returns {HTMLElement | null} Returns the found child of all existing dom elements inside of "target"
 */
export declare const isChildOfElement: (element: any, target: any, callback?: any) => any;
export declare const roundToNearest: (num: any, target: any) => any;
export declare const getClosestScrollViewElement: (currentElement: any) => Element;
export declare function convertJsxToString(elements: React.ReactNode | React.ReactNode[], separator?: string, transformWord?: (element: React.ReactElement<any>) => React.ReactElement<any>): string;
export declare function getStatusState(status: any): boolean;
export declare function combineLabelledBy(...params: any[]): any;
export declare function combineDescribedBy(...params: any[]): any;
export declare function combineDetails(...params: any[]): any;
export declare function findElementInChildren(children: any, find: any): any;
export declare function escapeRegexChars(str: any): any;
export declare function removeUndefinedProps(object: any): any;
